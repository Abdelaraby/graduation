import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
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

export const loader = async ({ params }: { params: { id: string } }) => {
  try {
    const response = await customFetch.get(`/orders/${params.id}`);
    return response.data.order || null;
  } catch (error: any) {
    console.error("Failed to fetch order:", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      toast.error("Session expired. Please login again.");
    }
    return null;
  }
};

const SingleOrderHistory = () => {
  const [user] = useState<User>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const order = useLoaderData() as Order | null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      toast.error("Please login to view this page");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!order) {
    return (
      <div className="max-w-screen-2xl mx-auto pt-20 px-5">
        <h1 className="text-3xl font-bold mb-8">Order Not Found</h1>
        <Link to="/order-history" className="text-blue-500 hover:underline">
          Back to Order History
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto pt-20 px-5">
      <h1 className="text-3xl font-bold mb-8">Order Details - #{order.id}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>
          <strong>Date:</strong> {formatDate(order.order_date)}
        </p>
        <p>
          <strong>Status:</strong> {order.order_status}
        </p>
        <p>
          <strong>Total:</strong> $
          {order.total ? parseFloat(order.total).toFixed(2) : "N/A"}
        </p>
        <p>
          <strong>Shipping Address:</strong> {order.address}, {order.city},{" "}
          {order.region}, {order.country}, {order.postal_code}
        </p>
        <p>
          <strong>Phone:</strong> {order.phone}
        </p>
        <p>
          <strong>Payment Type:</strong> {order.payment_type}
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Order Items</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Product</th>
              <th className="py-3 px-4 border-b">Quantity</th>
              <th className="py-3 px-4 border-b">Price</th>
              <th className="py-3 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.order_items.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-4 border-b">{item.product.title}</td>
                <td className="py-3 px-4 border-b text-center">
                  {item.quantity}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  ${item.price ? parseFloat(item.price).toFixed(2) : "N/A"}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  $
                  {item.price
                    ? (parseFloat(item.price) * item.quantity).toFixed(2)
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link
          to="/order-history"
          className="mt-6 inline-block text-blue-500 hover:underline"
        >
          Back to Order History
        </Link>
      </div>
    </div>
  );
};

export default SingleOrderHistory;