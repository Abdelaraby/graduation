import { useOutletContext } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import React from "react";

interface Category {
  id: number;
  name: string;
  image: string;
}

const useLayoutContext = () => {
  return useOutletContext<{ categories: Category[] }>();
};

const CategoriesSection = () => {
  const { categories } = useLayoutContext();

  return (
    <div className="max-w-screen-2xl px-5 mx-auto mt-6">
      {/* Section Title */}
      <div className="flex justify-center items-center">
        <h2 className="text-black mt-10 text-3xl font-bold tracking-[1.56px] max-sm:text-4xl mb-12 text-center relative inline-block px-4">
          SHOP BY CATEGORY
          {/* Underline */}
          <br />
          <span className="absolute left-6 right-6 bottom-0 h-[4px] bg-gradient-to-r from-black via-red-500 to-black rounded-full"></span>
        </h2>
      </div>

      {/* Categories Container */}
      <div className="relative flex justify-center">
        {/* Scrollable Categories Container */}
        <div
          className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide justify-center min-w-[80%]"
        >
          {/* Wrapper to Center Categories */}
          <div className="flex justify-center flex-nowrap gap-6">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
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
      </div>
    </div>
  );
};

export default CategoriesSection;