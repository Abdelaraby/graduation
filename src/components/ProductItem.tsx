import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductToCartWithLoginCheck, AppDispatch } from "../features/cart/cartSlice";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: string;
  image: string;
  title: string;
  category: string | Category;
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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const categoryValue =
    typeof category === "string" ? category : category?.name || "Unknown";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the <Link>'s navigation behavior
    dispatch(
      addProductToCartWithLoginCheck(
        {
          id,
          product_id: id.toString(),
          title,
          price: parseFloat(price.toFixed(2)),
          quantity: 1,
          image,
          stock: stock > 0,
        },
        navigate
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-[300px] group">
      {/* Image Container with Dark Overlay */}
      <Link to={`/product/${id}`} className="block relative">
        <div className="relative w-full h-64 overflow-hidden">
          {/* Image */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300"></div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col justify-between h-[220px]">
        {/* Title and Category */}
        <div>
          <Link to={`/product/${id}`} className="block">
            {/* Title */}
            <p
              className="font-bold text-md line-clamp-2 h-12 text-[#8B0000]"
              style={{ lineHeight: "1.5rem" }}
            >
              {title}
            </p>
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
            className="w-full bg-black text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            <span className="mr-2">+</span> ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;