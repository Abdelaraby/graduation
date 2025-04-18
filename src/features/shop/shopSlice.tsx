import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Product interface (if not already defined elsewhere)
interface Product {
  id: number;
  image_url: string;
  title: string;
  price: string;
  category: { id: number; name: string };
  popularity: number;
  stock: number;
}

interface ShopState {
  showingProducts: number;
  totalProducts: number;
  products: Product[]; // Add this line
}

// Initialize the state with all required fields
const initialState: ShopState = {
  showingProducts: 0,
  totalProducts: 0,
  products: [], // Initialize as an empty array
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setTotalProducts: (state, action: PayloadAction<number>) => {
      state.totalProducts = action.payload;
    },
    setShowingProducts: (state, action: PayloadAction<number>) => {
      state.showingProducts = action.payload;
    },
  },
});

export const { setTotalProducts, setShowingProducts } = shopSlice.actions;

export default shopSlice.reducer;