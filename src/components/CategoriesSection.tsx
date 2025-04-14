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

  // Scroll functionality
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 200; // Adjust scroll distance as needed
    const container = scrollContainerRef.current;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-screen-2xl px-5 mx-auto mt-6">
      {/* Section Title */}
      <h2 className="text-[#8B0000] text-3xl font-bold tracking-[1.56px] max-sm:text-4xl mb-12 text-center">
        SHOP BY CATEGORY
      </h2>

      {/* Categories Container with Scroll Buttons */}
      <div className="relative flex justify-center">
      
        {/* Categories Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide justify-center min-w-[80%]"
        >
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
  );
};

export default CategoriesSection;