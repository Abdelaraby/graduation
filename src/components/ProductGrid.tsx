import React, { useRef } from "react";
import ProductItem from "./ProductItem";
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
  category: Category | string;
  popularity: number;
  stock: number;
}

const ProductGrid = ({ products }: { products?: Product[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) {
    return (
      <div className="max-w-screen-2xl mx-auto mt-12 px-5 max-[400px]:px-3">
        <p>No products found.</p>
      </div>
    );
  }

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="relative max-w-screen-2xl mx-auto mt-0 px-5 max-[400px]:px-3">
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

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 py-4 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {products.map((product) => (
          <ProductItem
            key={nanoid()}
            id={product.id.toString()}
            image={product.image_url}
            title={product.title}
            category={
              typeof product.category === "string"
                ? product.category
                : product.category?.name || "Unknown"
            }
            price={parseFloat(product.price) || 0}
            popularity={product.popularity}
            stock={product.stock}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductGrid);
