import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: string;
  image: string;
  title: string;
  category: string | Category; // Support for both types
  price: number;
  popularity: number;
  stock: number;
}

const ProductItem = ({
  id,
  image,
  title,
  category,
  price,
}: Product) => {
  const categoryValue =
    typeof category === "string" ? category : category?.name || "Unknown";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-[300px]">
      {/* Image */}
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="p-4">
        {/* Title */}
        <p className="font-bold mb-2">{title}</p>

        {/* Category */}
        <p className="text-gray-500 text-sm mb-2">{categoryValue}</p>

        {/* Price */}
        <p className="text-[#8B0000] font-semibold mb-4">
          ${price.toFixed(2)}
        </p>

        {/* Add to Cart Button */}
        <button
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors flex items-center justify-center"
        >
          <span className="mr-2">+</span> ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductItem;