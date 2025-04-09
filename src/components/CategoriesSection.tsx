import { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";

interface Category {
  id: number;
  name: string;
  image: string;
  created_at?: string; 
  updated_at?: string; 
}

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setCategories(data.categories as Category[]); // نأخد الـ categories array من الـ response
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-screen-2xl px-5 mx-auto mt-24">
    <h2 className="text-black text-5xl font-normal tracking-[1.56px] max-sm:text-4xl mb-12 text-center">
  Our Categories
    </h2>
      <div className="flex justify-between flex-wrap gap-y-10">
        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : categories.length > 0 ? (
          categories.map((category: Category) => (
            <CategoryItem
              key={category.id}
              categoryTitle={category.name}
              image={category.image}
              link={category.name.toLowerCase().replace(/\s+/g, "-")}
            />
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesSection;