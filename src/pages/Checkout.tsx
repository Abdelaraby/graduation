import React, { useState } from "react";
import { HiTrash as TrashIcon } from "react-icons/hi2";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart, clearCart } from "../features/cart/cartSlice";
import customFetch from "../axios/custom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { checkCheckoutFormData } from "../utils/checkCheckoutFormData";
import LocationPicker from "../components/LocationPicker";

const paymentMethods = [
  { id: "paymob", title: "Paymob (Card)" },
  { id: "cash", title: "Cash" },
];

const Checkout: React.FC = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paymob");

  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    country: "",
    region: "",
    postal_code: "",
  });

  const fetchAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      const addr = data.address || {};
      setAddressData({
        address: addr.road || addr.neighbourhood || "",
        city: addr.city || addr.town || addr.village || "",
        country: addr.country || "",
        region: addr.state || "",
        postal_code: addr.postcode || "",
      });
      toast.success("تم استرجاع العنوان بنجاح");
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      toast.error("تعذر استرجاع العنوان من الموقع المحدد");
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          await fetchAddressFromCoordinates(latitude, longitude);
          toast.success("تم استرجاع الموقع الحالي بنجاح");
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("تعذر استرجاع موقعك الحالي");
        }
      );
    } else {
      toast.error("المتصفح لا يدعم تحديد الموقع");
    }
  };

  const handleLocationSelected = async (lat: number, lng: number) => {
    setLocation({ lat, lng });
    await fetchAddressFromCoordinates(lat, lng);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);

    // إنشاء بيانات الطلب
    const checkoutData = {
      email_address: formEntries.email_address as string,
      address: addressData.address,
      city: addressData.city,
      country: addressData.country,
      region: addressData.region,
      postal_code: addressData.postal_code,
      phone: formEntries.phone as string,
      payment_type: selectedPaymentMethod,
      subtotal: Number(subtotal),
      products: productsInCart.map((product) => ({ id: Number(product.id) })),
      latitude: location ? location.lat.toString() : "",
      longitude: location ? location.lng.toString() : "",
      amount: Number(subtotal) + (subtotal ? 5 + Number(subtotal) / 5 : 0),
    };

    // التحقق من البيانات
    if (!checkCheckoutFormData(checkoutData)) {
      return;
    }

    if (productsInCart.length === 0) {
      toast.error("السلة فاضية، أضف منتجات قبل المتابعة");
      return;
    }

    // تحقق إضافي لضمان إن الموقع مختار
    if (!location) {
      toast.error("من فضلك اختر موقعًا من الخريطة");
      return;
    }

    setIsSubmitting(true);

    try {
      if (selectedPaymentMethod === "paymob") {
        const response = await customFetch.post("/generatePaymentKey", checkoutData);
        const { payment_key, order_id } = response.data;

        if (!payment_key) {
          throw new Error("مفتاح الدفع غير متوفر");
        }

        const iframeId = process.env.REACT_APP_PAYMOB_IFRAME_ID;
        if (!iframeId) {
          console.warn("تحذير: Paymob Iframe ID غير معرّف");
          throw new Error("إعدادات Paymob غير مكتملة");
        }

        const iframeURL = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${payment_key}`;
        window.location.href = iframeURL;
      } else if (selectedPaymentMethod === "cash") {
        const response = await customFetch.post("/orders", checkoutData);

        if (response.data.success && response.status === 201) {
          toast.success("تم تسجيل الطلب بنجاح");
          dispatch(clearCart());
          navigate("/order-confirmation", { state: { orderId: response.data.order_id } });
        } else {
          throw new Error(response.data.message || "فشل تسجيل الطلب");
        }
      }
    } catch (error: unknown) {
      console.error("خطأ في الدفع:", error);
      let errorMessage = "حصل خطأ، حاول مرة أخرى";
      if (error instanceof Error && error.message) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as any;
        errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.errors?.[0] ||
          errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="pb-24 pt-16 px-5 max-[400px]:px-3">
        <h2 className="sr-only">Checkout</h2>
        <form
          onSubmit={handleCheckoutSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Contact information</h2>
              <div className="mt-4">
                <label
                  htmlFor="email_address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email_address"
                    name="email_address"
                    autoComplete="email"
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>
              <div className="mt-4">
                <Button
                  text="Use my current location"
                  mode="primary"
                  type="button"
                  onClick={handleGetCurrentLocation}
                />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={addressData.address}
                      onChange={(e) =>
                        setAddressData({ ...addressData, address: e.target.value })
                      }
                      autoComplete="street-address"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={addressData.city}
                      onChange={(e) =>
                        setAddressData({ ...addressData, city: e.target.value })
                      }
                      autoComplete="address-level2"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={addressData.country}
                      onChange={(e) =>
                        setAddressData({ ...addressData, country: e.target.value })
                      }
                      autoComplete="country-name"
                      className="block w/full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="region"
                      name="region"
                      value={addressData.region}
                      onChange={(e) =>
                        setAddressData({ ...addressData, region: e.target.value })
                      }
                      autoComplete="address-level1"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="postal_code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      value={addressData.postal_code}
                      onChange={(e) =>
                        setAddressData({ ...addressData, postal_code: e.target.value })
                      }
                      autoComplete="postal-code"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>
              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {paymentMethods.map((paymentMethod) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      <input
                        id={paymentMethod.id}
                        name="payment_type"
                        type="radio"
                        value={paymentMethod.id}
                        checked={selectedPaymentMethod === paymentMethod.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              {selectedPaymentMethod === "cash" && (
                <p className="mt-6 text-sm text-gray-600">
                  سيتم جمع الدفع عند التسليم.
                </p>
              )}
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Select Location</h2>
              <LocationPicker onLocationSelected={handleLocationSelected} />
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <div className="mt-4 border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {productsInCart.map((product) => (
                  <li key={product?.id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product?.image || "/src/assets/placeholder.png"}
                        alt={product?.title}
                        className="w-20 h-20 object-cover object-center rounded-md"
                        onError={(e) => {
                          e.currentTarget.src = "/src/assets/placeholder.png";
                        }}
                      />
                    </div>
                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                            {product?.title}
                          </h4>
                        </div>
                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            onClick={() =>
                              dispatch(removeProductFromTheCart({ id: product?.id }))
                            }
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${Number(product?.price).toFixed(2)}
                        </p>
                        <div className="ml-4">
                          <p className="text-base">
                            Quantity: {product?.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${Number(subtotal).toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">${subtotal ? 5 : 0}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal ? (Number(subtotal) / 5).toFixed(2) : 0}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${(subtotal ? Number(subtotal) + 5 + Number(subtotal) / 5 : 0).toFixed(2)}
                  </dd>
                </div>
              </dl>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <Button
                  text={isSubmitting ? "جاري المعالجة..." : "تأكيد الطلب"}
                  mode="brown"
                  type="submit"
                  disabled={isSubmitting || productsInCart.length === 0}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;