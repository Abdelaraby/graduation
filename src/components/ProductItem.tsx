import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import customFetch from "../axios/custom";

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
  stock,
}: Product) => {
  const categoryValue =
    typeof category === "string" ? category : category?.name || "Unknown";

  // Function to handle adding the product to the cart
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the <Link>'s navigation behavior
    try {
      const newProduct = {
        product_id: id.toString(),
        title: title,
        price: parseFloat(price.toFixed(2)), // Ensure price is a valid float
        quantity: 1,
        image: image,
        stock: stock > 0, // Check if the product is in stock
      };

      const response = await customFetch.post("/cart", newProduct);
      if (response.data.success) {
        toast.success("Product added to the cart");
      } else {
        toast.error(response.data.message || "Failed to add product to cart");
      }
    } catch (error) {
      console.error("Add to Cart Error:", error);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-[300px]">
      {/* Image */}
      <Link to={`/product/${id}`} className="block">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col justify-between h-[220px]">
        {/* Title and Category */}
        <div>
          <Link to={`/product/${id}`} className="block">
            <p className="font-bold text-md line-clamp-2">{title}</p> {/* Limit to 2 lines */}
          </Link>
          <p className="text-gray-500 text-sm mt-1">{categoryValue}</p>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Price and Add to Cart Button */}
        <div>
          {/* Price */}
          <p className="text-[#8B0000] font-semibold mb-4">
            ${price.toFixed(2)}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            <span className="mr-2">+</span> ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;