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
    <div className="bg-white mx-auto max-w-screen-2xl px-5 max-[400px]:px-3">
      <div className="pb-24 pt-16">
        <h1 className="text-3xl tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {productsInCart.length === 0 ? (
                <li className="py-6 text-center text-gray-500">Your cart is empty.</li>
              ) : (
                productsInCart.map((product) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image || "/src/assets/placeholder.png"}
                        alt={product.title}
                        className="h-24 w-24 object-cover object-center sm:h-48 sm:w-48"
                        onError={(e) => {
                          e.currentTarget.src = "/src/assets/placeholder.png";
                        }}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                to={`/product/${product.id}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.title}
                              </Link>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${product.price}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label htmlFor={`quantity-${product.id}`} className="mr-5">
                            Quantity:
                          </label>
                          <input
                            type="number"
                            id={`quantity-${product.id}`}
                            className="w-16 h-7 indent-1 bg-white border"
                            value={product.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(product.id, parseInt(e.target.value) || 1)
                            }
                            min="1"
                          />

                          <div className="absolute right-0 top-0">
                            <button
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => handleRemoveProduct(product.id)}
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        {product.stock ? (
                          <CheckIcon
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <XMarkIcon
                            className="h-5 w-5 flex-shrink-0 text-red-600"
                            aria-hidden="true"
                          />
                        )}
                        <span>{product.stock ? "In stock" : "Out of stock"}</span>
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
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

            {productsInCart.length > 0 && (
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="text-white bg-secondaryBrown text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
                >
                  Checkout
                </Link>
              </div>
            )}
          </section>
        </form>
      </div>
    </div>
  );
};

export default Cart;