import React, { useState } from "react";
import { HiTrash as TrashIcon } from "react-icons/hi2";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart } from "../features/cart/cartSlice";
import customFetch from "../axios/custom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { checkCheckoutFormData } from "../utils/checkCheckoutFormData";
import LocationPicker from "../components/LocationPicker"; // تأكدي من صحة المسار

/*
ملاحظة: دالة checkCheckoutFormData تتوقع بيانات النموذج بالشكل:
{
  data: { [key: string]: FormDataEntryValue },
  products: any[],
  subtotal: number
}
*/

const paymentMethods = [
  { id: "paypal", title: "PayPal" },
  { id: "cash", title: "Cash" },
];

const Checkout: React.FC = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // حالة لتخزين موقع المستخدم الذي يختاره (عن طريق الخريطة أو الموقع الحالي)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  // حالة لتعطيل زر الإرسال أثناء العملية
  const [isSubmitting, setIsSubmitting] = useState(false);
  // حالة لتخزين طريقة الدفع المختارة
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal");

  // حالة لتخزين بيانات العنوان التي سيتم تعبئتها تلقائيًا
  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    country: "",
    region: "",
    postalCode: "",
  });

  // دالة تحديث بيانات العنوان باستخدام reverse geocoding (OpenStreetMap Nominatim)
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
        postalCode: addr.postcode || "",
      });
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      toast.error("Unable to fetch address from the selected location");
    }
  };

  // دالة تستخدم Geolocation API للحصول على الموقع الحالي
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
          toast.error("Unable to retrieve your current location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  // دالة استدعاء عند اختيار الموقع من الخريطة (في حال المستخدم يختار يدويًا)
  const handleLocationSelected = async (lat: number, lng: number) => {
    setLocation({ lat, lng });
    await fetchAddressFromCoordinates(lat, lng);
  };

  // دالة إرسال النموذج
  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);

    const enrichedData = {
      ...formEntries,
      latitude: location ? location.lat.toString() : "",
      longitude: location ? location.lng.toString() : "",
      // تعبئة بيانات العنوان من الحالة
      address: addressData.address,
      city: addressData.city,
      country: addressData.country,
      region: addressData.region,
      postalCode: addressData.postalCode,
    };

    const checkoutData = {
      data: enrichedData,
      products: productsInCart,
      subtotal: subtotal,
    };

    if (!checkCheckoutFormData(checkoutData)) return;

    setIsSubmitting(true);
    try {
      let response;
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.email) {
        response = await customFetch.post("/orders", {
          ...checkoutData,
          user: {
            email: user.email,
            id: user.id,
          },
          orderStatus: "Processing",
          orderDate: new Date().toISOString(),
        });
      } else {
        response = await customFetch.post("/orders", {
          ...checkoutData,
          orderStatus: "Processing",
          orderDate: new Date().toLocaleDateString(),
        });
      }

      if (response.status === 201) {
        toast.success("Order has been placed successfully");
        navigate("/order-confirmation");
      } else {
        toast.error("Something went wrong, please try again later");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Server error, please try again later");
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
            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact information
              </h2>
              <div className="mt-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="emailAddress"
                    autoComplete="email"
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>
              {/* زر لاستخدام الموقع الحالي */}
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
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
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
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postal-code"
                      name="postalCode"
                      value={addressData.postalCode}
                      onChange={(e) =>
                        setAddressData({ ...addressData, postalCode: e.target.value })
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

            {/* Payment Information */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>
              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {paymentMethods.map((paymentMethod) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      <input
                        id={paymentMethod.id}
                        name="paymentType"
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

              {/* Conditionally render PayPal input fields */}
              {selectedPaymentMethod === "paypal" && (
                <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                  <div className="col-span-4">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="card-number"
                        name="cardNumber"
                        autoComplete="cc-number"
                        className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="name-on-card"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name on card
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name-on-card"
                        name="nameOnCard"
                        autoComplete="cc-name"
                        className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label
                      htmlFor="expiration-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="expirationDate"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="cvc"
                        id="cvc"
                        autoComplete="csc"
                        className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              {selectedPaymentMethod === "cash" && (
                <p className="mt-6 text-sm text-gray-600">
                  Payment will be collected on delivery.
                </p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <div className="mt-4 border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {productsInCart.map((product) => (
                  <li key={product?.id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={`/src/assets/${product?.image}`}
                        alt={product?.title}
                        className="w-20 rounded-md"
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
                          ${product?.price}
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
                  <dd className="text-sm font-medium text-gray-900">${subtotal}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">${subtotal ? 5 : 0}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal ? subtotal / 5 : 0}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${subtotal ? subtotal + 5 + subtotal / 5 : 0}
                  </dd>
                </div>
              </dl>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <Button
                  text={isSubmitting ? "Placing Order..." : "Confirm Order"}
                  mode="brown"
                  type="submit"
                  disabled={isSubmitting}
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