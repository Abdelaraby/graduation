import { Link, useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div className="max-w-screen-lg mx-auto pt-20 px-5 min-h-screen bg-white">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] mb-6">
        Order Confirmation
      </h1>
      <p className="text-center mt-4 text-lg text-gray-700">
        Your order has been confirmed and will be shipped shortly.
      </p>

      {/* Order Details */}
      {orderId && (
        <div className="mt-6 text-center">
          <p className="text-gray-700">Order ID: <span className="font-bold">{orderId}</span></p>
          <p className="text-gray-700">Estimated Delivery: 3-5 business days</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col items-center space-y-4 mt-10">
        {/* Continue Shopping Button */}
        <Link
          to="/shop"
          className="w-full sm:w-[400px] h-14 text-lg font-bold text-white bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
        >
          Continue Shopping
        </Link>

        {/* See Order History Button */}
        <Link
          to="/order-history"
          className="w-full sm:w-[400px] h-14 text-lg font-bold text-white bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
        >
          See Order History and Status
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;