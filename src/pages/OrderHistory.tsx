import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../axios/custom";
import { formatDate } from "../utils/formatDate";

interface User {
  id: number;
  token?: string; // Add token if stored here
}

export const loader = async () => {
  try {
    const response = await customFetch.get("/orders");
    return response.data.orders;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
};

const OrderHistory = () => {
  const [user] = useState<User>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const orders = useLoaderData() as Order[];
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      toast.error("Please login to view this page");
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="max-w-screen-lg mx-auto pt-20 px-5 min-h-screen bg-white">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] mb-10">
        Order History
      </h1>

      {/* Orders Table */}
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
              orders.map(
                (order) =>
                  order?.user_id === user.id && (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-300">
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
                          to={`/order-history/${order.id}`}
                          className="text-[#8B0000] hover:text-[#FF4500] transition-colors duration-300"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;