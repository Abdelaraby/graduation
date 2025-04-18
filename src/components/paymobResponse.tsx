import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const PaymobResponseHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get("success");
    const orderId = queryParams.get("order");

    if (success === "true") {
      // Payment successful, navigate to OrderConfirmation page
      toast.success("Payment successful!");
      navigate("/order-confirmation", { state: { orderId } });
    } else {
      // Payment failed, show error and redirect to checkout
      toast.error("Payment failed. Please try again.");
      navigate("/checkout");
    }
  }, [location, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg text-gray-700">Processing your payment...</p>
    </div>
  );
};

export default PaymobResponseHandler;