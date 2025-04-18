import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ScrollToTop } from "../components";
import customFetch from "../axios/custom";
import LoadingSpinner from "../components/LoadingSpinner";

interface Product {
  id: number;
  image_url: string;
  title: string;
  price: string;
  category: { id: number; name: string };
}

interface Category {
  id: number;
  name: string;
  image: string;
}

const HomeLayout = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          customFetch.get("/products", { params: { page: 1, limit: 9 } }),
          fetch("http://127.0.0.1:8000/api/categories"),
        ]);

        const productsData: Product[] = productsRes.data.data || productsRes.data;
        const validProducts = productsData.filter((p) => p && typeof p.id !== "undefined");
        setProducts(validProducts);

        const categoryJson = await categoriesRes.json();
        setCategories(categoryJson.categories || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet context={{ products, categories }} />
      <Footer />
    </>
  );
};

export default HomeLayout;
