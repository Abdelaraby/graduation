import React, { useRef } from "react";
import ProductItem from "./ProductItem"; // Ensure this component is correctly implemented
import { nanoid } from "nanoid";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  image_url: string;
  title: string;
  price: string;
  category: Category | string; // Support for both types
  popularity: number;
  stock: number;
}

const ProductGrid = ({ products }: { products?: Product[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log("Products received in ProductGrid:", products);

  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="max-w-screen-2xl mx-auto mt-12 px-5 max-[400px]:px-3">
        <p>No products found.</p>
      </div>
    );
  }

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative max-w-screen-2xl mx-auto mt-0 px-5 max-[400px]:px-3">
      {/* Left and Right Navigation Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg z-10"
      >
        {"<"}
      </button>
      <button
        onClick={scrollRight}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg z-10"
      >
        {">"}
      </button>

      {/* Horizontal Scrolling Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 py-4 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {products.map((product, index) => {
          console.log(`Product at index ${index}:`, product);

          if (!product || typeof product.id === "undefined") {
            console.warn(`Skipping invalid product at index ${index}`);
            return null;
          }

          return (
            <ProductItem
              key={nanoid()}
              id={product.id.toString()}
              image={product.image_url || ""}
              title={product.title || "Untitled"}
              category={
                typeof product.category === "string"
                  ? product.category
                  : product.category?.name || "Unknown"
              }
              price={parseFloat(product.price) || 0}
              popularity={product.popularity}
              stock={product.stock}
              maxWidth="w-[300px]" // Reduce item width
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ProductGrid);