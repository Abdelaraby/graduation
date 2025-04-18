import React, { useState } from "react";
import { HiTrash as TrashIcon } from "react-icons/hi2";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart, clearCart, updateProductQuantity } from "../features/cart/cartSlice";
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

    const checkoutData = {
        email_address: formData.get("email_address") as string,
        address: addressData.address,
        city: addressData.city,
        country: addressData.country,
        region: addressData.region,
        postal_code: addressData.postal_code,
        phone: formData.get("phone") as string,
        payment_type: selectedPaymentMethod,
        subtotal: Number(subtotal),
        products: productsInCart.map((product) => ({ id: Number(product.id) })),
        latitude: location ? location.lat.toString() : "",
        longitude: location ? location.lng.toString() : "",
        amount: Math.round((Number(subtotal) + (subtotal ? 5 + Number(subtotal) / 5 : 0)) * 100),
    };

    if (!checkCheckoutFormData(checkoutData)) return;

    setIsSubmitting(true);
    try {
        if (selectedPaymentMethod === "paymob") {
            const response = await customFetch.post("/generatePaymentKey", checkoutData);
            console.log("Generate Payment Key Response:", response.data);

        

            const { payment_key, order_id } = response.data;
            if (!payment_key) {
                toast.error("مفتاح الدفع غير متوفر");
                throw new Error("مفتاح الدفع غير متوفر");
            }

            const iframeId = 791606;
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
    } catch (error) {
        console.error("API Error Response:", error);
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
    <div className="max-w-screen-lg mx-auto mt-10 px-0 min-h-screen bg-white">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mt-10 text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500]">
        Checkout
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleCheckoutSubmit}
        className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Left Column - Shipping and Payment Details */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
            <div>
              <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email_address"
                name="email_address"
                autoComplete="email"
                required
                className="mt-1 block w-full h-14 px-5 text-lg rounded-full border border-gray-300 focus:border-transparent outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
            <Button
              text="Use my current location"
              mode="primary"
              type="button"
              onClick={handleGetCurrentLocation}
              className="w-full h-14 text-lg font-bold text-white bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            />
            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={addressData.address}
                  onChange={(e) =>
                    setAddressData({ ...addressData, address: e.target.value })
                  }
                  autoComplete="street-address"
                  required
                  className="mt-1 block w-full h-14 px-5 text-lg rounded-full border border-gray-300 focus:border-transparent outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={addressData.city}
                  onChange={(e) =>
                    setAddressData({ ...addressData, city: e.target.value })
                  }
                  autoComplete="address-level2"
                  required
                  className="mt-1 block w-full h-14 px-5 text-lg rounded-full border border-gray-300 focus:border-transparent outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100"
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={addressData.country}
                  onChange={(e) =>
                    setAddressData({ ...addressData, country: e.target.value })
                  }
                  autoComplete="country-name"
                  required
                  className="mt-1 block w-full h-14 px-5 text-lg rounded-full border border-gray-300 focus:border-transparent outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100"
                />
              </div>

              {/* Region */}
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                  State / Province
                </label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={addressData.region}
                  onChange={(e) =>
                    setAddressData({ ...addressData, region: e.target.value })
                  }
                  autoComplete="address-level1"
                  required
                  className="mt-1 block w-full h-14 px-5 text-lg rounded-full border border-gray-300 focus:border-transparent outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  value={addressData.postal_code}
                  onChange={(e) =>
                    setAddressData({ ...addressData, postal_code: e.target.value })
                  }
                  autoComplete="postal-code"
                  required
                  className="mt-1 block w-full h-14 px-5 text-lg rounded-full border border-gray-300 focus:border-transparent outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  required
                  className="mt-1 block w-full h-14 px-5 text-lg rounded-full border border-gray-300 focus:border-transparent outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
            <fieldset className="space-y-4">
              {paymentMethods.map((paymentMethod) => (
                <div key={paymentMethod.id} className="flex items-center">
                  <input
                    id={paymentMethod.id}
                    name="payment_type"
                    type="radio"
                    value={paymentMethod.id}
                    checked={selectedPaymentMethod === paymentMethod.id}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="h-5 w-5 border-gray-300 text-[#8B0000] focus:ring-[#FF4500]"
                  />
                  <label
                    htmlFor={paymentMethod.id}
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    {paymentMethod.title}
                  </label>
                </div>
              ))}
            </fieldset>
            {selectedPaymentMethod === "cash" && (
              <p className="mt-4 text-sm text-gray-600">
                سيتم جمع الدفع عند التسليم.
              </p>
            )}
          </div>

         
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <ul role="list" className="divide-y divide-gray-200">
              {productsInCart.map((product) => (
                <li key={product?.id} className="flex py-4">
                  <div className="flex-shrink-0">
                    <img
                      src={product?.image || "/src/assets/placeholder.png"}
                      alt={product?.title}
                      className="w-20 h-20 object-cover object-center rounded-md shadow-md"
                      onError={(e) => {
                        e.currentTarget.src = "/src/assets/placeholder.png";
                      }}
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 hover:text-[#8B0000]">
                        {product?.title}
                      </h4>
                    </div>
                    <div className="flex flex-1 items-end justify-between pt-2">
  <p className="mt-1 text-sm font-medium text-gray-900">
    ${Number(product?.price).toFixed(2)}
  </p>
  <div className="ml-4">
    <label htmlFor={`quantity-${product.id}`} className="sr-only">
      Quantity
    </label>
    <input
      type="number"
      id={`quantity-${product.id}`}
      name="quantity"
      value={product.quantity || 1} // Ensure a default value of 1 if quantity is undefined
      onChange={(e) => {
        const newQuantity = parseInt(e.target.value) || 1; // Ensure the value is at least 1
        handleUpdateQuantity(product.id, newQuantity);
      }}
      min="1"
      className="w-16 h-8 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#8B0000]"
    />
  </div>
</div>
                  </div>
                  <button
                    type="button"
                    className="-m-2 flex items-center justify-center bg-white p-2 text-gray-400 hover:text-red-600"
                    onClick={() =>
                      dispatch(removeProductFromTheCart({ id: product?.id }))
                    }
                  >
                    <span className="sr-only">Remove</span>
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${Number(subtotal).toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Shipping</dt>
                <dd className="text-sm font-medium text-gray-900">${subtotal ? 5 : 0}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Taxes</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${subtotal ? (Number(subtotal) / 5).toFixed(2) : 0}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium">Total</dt>
                <dd className="text-base font-medium text-gray-900">
                  ${(subtotal ? Number(subtotal) + 5 + Number(subtotal) / 5 : 0).toFixed(2)}
                </dd>
              </div>
            </dl>
            <Button
              text={isSubmitting ? "جاري المعالجة..." : "تأكيد الطلب"}
              mode="gradient"
              type="submit"
              disabled={isSubmitting || productsInCart.length === 0}
              className="w-full h-14 text-lg font-bold text-white bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;