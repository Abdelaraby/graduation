import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import customFetch from "../../axios/custom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

interface ProductInCart {
  id: string;
  user_id?: number;
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  image: string | null;
  stock: boolean;
}

type CartState = {
  productsInCart: ProductInCart[];
  subtotal: number;
};

const initialState: CartState = {
  productsInCart: [],
  subtotal: 0,
};

export type AppDispatch = ThunkDispatch<CartState, unknown, AnyAction>;

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToTheCart: (state, action: PayloadAction<ProductInCart>) => {
      const product = state.productsInCart.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        state.productsInCart = state.productsInCart.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              quantity: product.quantity + action.payload.quantity,
            };
          }
          return product;
        });
      } else {
        state.productsInCart.push(action.payload);
      }
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    removeProductFromTheCart: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      state.productsInCart = state.productsInCart.filter(
        (product) => product.id !== action.payload.id
      );
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      state.productsInCart = state.productsInCart.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: action.payload.quantity,
          };
        }
        return product;
      });
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    calculateTotalPrice: (state) => {
      state.subtotal = state.productsInCart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.productsInCart = [];
      state.subtotal = 0;
    },
  },
});

export const {
  addProductToTheCart,
  removeProductFromTheCart,
  updateProductQuantity,
  calculateTotalPrice,
  clearCart,
} = cartSlice.actions;

export const addProductToCartWithLoginCheck =
  (
    product: Omit<ProductInCart, "user_id">,
    navigate: (path: string) => void
  ) =>
  async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token"); // Use "token" for consistency

    if (!token) {
      toast.error("You must be logged in to add items to your cart");
      navigate("/login");
      return;
    }

    try {
      const response = await customFetch.post("/cart", {
        product_id: product.product_id,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        stock: product.stock,
      });

      if (response.data.success) {
        const addedProduct: ProductInCart = {
          ...product,
          user_id: response.data.user_id || 1,
        };
        dispatch(addProductToTheCart(addedProduct));
        toast.success("Product added to the cart");
      } else {
        toast.error(response.data.message || "Failed to add product to cart");
      }
    } catch (error: any) {
      console.error("Add to Cart Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      if (error.response?.status === 401) {
        toast.error("Your session has expired. Please log in again.");
        localStorage.removeItem("token"); // Remove "token" on 401 error
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to add product to cart. Please try again.");
      }
    }
  };

export default cartSlice.reducer;
