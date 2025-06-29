import { useEffect } from "react";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import {
  HiCheck as CheckIcon,
  HiXMark as XMarkIcon,
  HiQuestionMarkCircle as QuestionMarkCircleIcon,
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { updateProductQuantity, removeProductFromTheCart, clearCart, addProductToTheCart } from "../features/cart/cartSlice";

interface CartProduct {
  id: string;
  user_id: number;
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  image: string | null;
  stock: boolean;
}

const Cart = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const { loginStatus, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [loginStatus, token, navigate]);

  const fetchCart = async () => {
    try {
      const response = await customFetch.get("/cart");
      if (response.data.success) {
        // Clear the existing cart to avoid duplicates
        dispatch(clearCart());
        // Add each product to the Redux store
        response.data.productsInCart.forEach((product: CartProduct) => {
          dispatch(addProductToTheCart(product));
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to load cart");
      navigate("/login");
    }
  };

  const handleRemoveProduct = async (id: string) => {
    try {
      const response = await customFetch.delete(`/cart/${id}`);
      if (response.data.success) {
        dispatch(removeProductFromTheCart({ id }));
        toast.success("Product removed from the cart");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to remove product");
    }
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    try {
      const response = await customFetch.put(`/cart/${id}`, { quantity });
      if (response.data.success) {
        dispatch(updateProductQuantity({ id, quantity }));
        toast.success("Quantity updated successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  if (!loginStatus) return null;

  return (
    <div className="bg-white mx-auto max-w-screen-2xl px-5 py-10">
      {/* Cart Header */}
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] mb-10">
        Shopping Cart
      </h1>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products Section */}
        <section className="lg:col-span-2">
          <h2 className="sr-only">Items in your shopping cart</h2>
          <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
            {productsInCart.length === 0 ? (
              <li className="py-6 text-center text-gray-500">Your cart is empty.</li>
            ) : (
              productsInCart.map((product) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={product.image || "/src/assets/placeholder.png"}
                      alt={product.title}
                      className="h-24 w-24 object-cover object-center sm:h-48 sm:w-48 rounded-lg shadow-md"
                      onError={(e) => {
                        e.currentTarget.src = "/src/assets/placeholder.png";
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <Link
                          to={`/product/${product.id}`}
                          className="text-lg font-medium text-[#8B0000] hover:text-[#FF4500]"
                        >
                          {product.title}
                        </Link>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${product.price}
                        </p>
                      </div>

                      {/* Quantity Input */}
                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${product.id}`} className="mr-5 text-lg font-medium text-gray-800">
                          Quantity:
                        </label>
                        <input
                          type="number"
                          id={`quantity-${product.id}`}
                          className="border border-gray-300 focus:border-transparent h-14 px-5 text-lg rounded-full outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100"
                          value={product.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(product.id, parseInt(e.target.value) || 1)
                          }
                          min="1"
                        />
                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-red-600"
                            onClick={() => handleRemoveProduct(product.id)}
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Stock Status
                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.stock ? (
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <XMarkIcon
                          className="h-5 w-5 flex-shrink-0 text-red-00"
                          aria-hidden="true"
                        />
                      )}
                      {/* <span>{product.stock ? "In stock" : "Out of stock"}</span> */}
                    {/* </p> */} 
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

        {/* Order Summary Section */}
        <section className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          <dl className="space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">${subtotal}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a
                  href="#"
                  className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">
                    Learn more about how shipping is calculated
                  </span>
                  <QuestionMarkCircleIcon className="h-5 w-5 text-secondaryBrown" />
                </a>
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                ${subtotal === 0 ? 0 : 5.0}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a
                  href="#"
                  className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Learn more about how tax is calculated</span>
                  <QuestionMarkCircleIcon className="h-5 w-5 text-secondaryBrown" />
                </a>
              </dt>
              <dd className="text-sm font-medium text-gray-900">${subtotal / 5}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">Order total</dt>
              <dd className="text-base font-medium text-gray-900">
                ${subtotal === 0 ? 0 : subtotal + subtotal / 5 + 5}
              </dd>
            </div>
          </dl>

          {/* Checkout Button */}
          {productsInCart.length > 0 && (
            <div className="mt-6">
              <Link
                to="/checkout"
                className="h-14 text-lg font-bold text-white bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full flex items-center justify-center"
              >
                Checkout
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Cart;