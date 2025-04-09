import React from "react";
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
  category: Category | string; // دعم للحالتين
  popularity: number;
  stock: number;
}

const ProductGrid = ({ products }: { products?: Product[] }) => {
  console.log("Products received in ProductGrid:", products);

  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div
        id="gridTop"
        className="max-w-screen-2xl flex flex-wrap justify-between items-center gap-y-8 mx-auto mt-12 max-xl:justify-start max-xl:gap-5 px-5 max-[400px]:px-3"
      >
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div
      id="gridTop"
      className="max-w-screen-2xl flex flex-wrap justify-between items-center gap-y-8 mx-auto mt-12 max-xl:justify-start max-xl:gap-5 px-5 max-[400px]:px-3"
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
            } // تمرير الـ category الصح
            price={parseFloat(product.price) || 0}
            popularity={product.popularity}
            stock={product.stock}
          />
        );
      })}
    </div>
  );
};

export default React.memo(ProductGrid);