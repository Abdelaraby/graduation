// src/components/OrderHistory.tsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../axios/custom";
import { formatDate } from "../utils/formatDate";

interface User {
  id: number;
  token?: string;
}

interface Order {
  id: number;
  user_id: number;
  email_address: string;
  address: string;
  city: string;
  country: string;
  region: string;
  postal_code: string;
  phone: string;
  payment_type: string;
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  paymob_payment_key: string | null;
  paymob_order_id: string | null;
  payment_status: string;
  order_status: string;
  order_date: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
  user: {
    id: number;
  };
}

interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    title: string;
    image: string;
    price: string;
    category_id: number;
    stock: number;
    quantity: number;
    popularity: number;
    description: string;
    created_at: string;
    updated_at: string;
  };
}

export const loader = async () => {
  try {
    const response = await customFetch.get("/orders");
    console.log("API Response:", response.data);
    return response.data.orders || [];
  } catch (error: any) {
    console.error("Failed to fetch orders:", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      toast.error("Session expired. Please login again.");
      throw new Response("Unauthorized", { status: 401 });
    }
    throw error; // Let React Router handle other errors
  }
};

const OrderHistory = () => {
  const [user] = useState<User>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const orders = useLoaderData() as Order[];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      toast.error("Please login to view this page");
      navigate("/login");
    }
    setIsLoading(false);
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="max-w-screen-lg mx-auto pt-20 px-5 min-h-screen bg-white text-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto pt-20 px-5 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] mb-10">
        Order History
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-2xl shadow-md">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Order ID
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Total
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders
                .filter((order) => order?.user_id === user.id)
                .map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors duration-300"
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {formatDate(order.order_date)}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-[#8B0000]">
                      ${parseFloat(order.total).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {order.order_status}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium">
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-[#8B0000] hover:text-[#FF4500] transition-colors duration-300"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;