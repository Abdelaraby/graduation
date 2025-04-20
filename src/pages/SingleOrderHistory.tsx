// src/pages/SingleOrderHistory.tsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData, useNavigate, LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
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

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  try {
    const id = params.id;
    if (!id) {
      throw new Response("Order ID is missing", { status: 400 });
    }
    console.log("Fetching order with ID:", id);
    const response = await customFetch.get(`/orders/${id}`);
    console.log("API Response:", response.data);
    if (!response.data.order) {
      throw new Response("Order not found", { status: 404 });
    }
    return response.data.order as Order;
  } catch (error: any) {
    console.error("Failed to fetch order:", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      toast.error("Session expired. Please login again.");
      throw new Response("Unauthorized", { status: 401 });
    }
    if (error.response?.status === 403) {
      throw new Response("Forbidden", { status: 403 });
    }
    if (error.response?.status === 404) {
      throw new Response("Order not found", { status: 404 });
    }
    throw error;
  }
};

const SingleOrderHistory = () => {
  const [user] = useState<User>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const order = useLoaderData() as Order | null;
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

  if (!order) {
    return (
      <div className="max-w-screen-lg mx-auto pt-20 px-5 min-h-screen bg-white">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] mb-8">
          Order Not Found
        </h1>
        <Link
          to="/order-history"
          className="text-[#8B0000] hover:text-[#FF4500] transition-colors duration-300 block text-center mt-4"
        >
          Back to Order History
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto pt-20 px-5 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] mb-10">
        Order Details - #{order.id}
      </h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <div className="space-y-4">
          <p className="text-lg font-medium text-gray-900">
            <strong>Date:</strong>{" "}
            <span className="font-normal">{formatDate(order.order_date)}</span>
          </p>
          <p className="text-lg font-medium text-gray-900">
            <strong>Status:</strong>{" "}
            <span className="font-normal">{order.order_status}</span>
          </p>
          <p className="text-lg font-medium text-gray-900">
            <strong>Total:</strong>{" "}
            <span className="font-normal">
              ${order.total ? parseFloat(order.total).toFixed(2) : "N/A"}
            </span>
          </p>
          <p className="text-lg font-medium text-gray-900">
            <strong>Shipping Address:</strong>{" "}
            <span className="font-normal">
              {order.address}, {order.city}, {order.region}, {order.country},{" "}
              {order.postal_code}
            </span>
          </p>
          <p className="text-lg font-medium text-gray-900">
            <strong>Phone:</strong>{" "}
            <span className="font-normal">{order.phone}</span>
          </p>
          <p className="text-lg font-medium text-gray-900">
            <strong>Payment Type:</strong>{" "}
            <span className="font-normal">{order.payment_type}</span>
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Items</h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.order_items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-300"
                >
                  <td className="py-3 px-6 text-sm font-medium text-gray-900">
                    {item.product.title}
                  </td>
                  <td className="py-3 px-6 text-center text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-6 text-center text-sm text-gray-500">
                    ${item.price ? parseFloat(item.price).toFixed(2) : "N/A"}
                  </td>
                  <td className="py-3 px-6 text-center text-sm font-semibold text-gray-900">
                    $
                    {item.price
                      ? (parseFloat(item.price) * item.quantity).toFixed(2)
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <Link
            to="/order-history"
            className="text-lg font-bold text-[#8B0000] hover:text-[#FF4500] transition-colors duration-300 underline"
          >
            Back to Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderHistory;