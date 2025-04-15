interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
}

interface ProductInCart extends Product {
  id: string;
  quantity: number;
  // size: string;
  // color: string;
  stock: number;
}

interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
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
  subtotal: string; // API returns strings for monetary values
  shipping: string;
  tax: string;
  total: string;
  paymob_payment_key: string | null;
  paymob_order_id: string | null;
  payment_status: string;
  order_status: string;
  order_date: string; // Changed from orderDate to order_date
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
