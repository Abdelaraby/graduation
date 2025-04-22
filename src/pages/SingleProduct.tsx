import React, { useEffect, useState } from "react";
import { Button, ProductItem, QuantityInput, Dropdown } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, addProductToCartWithLoginCheck } from "../features/cart/cartSlice";
import WithNumberInputWrapper from "../utils/withNumberInputWrapper";
import { formatCategoryName } from "../utils/formatCategoryName";
import toast from "react-hot-toast";
import customFetch from "../axios/custom";
import LoadingSpinner from "../components/LoadingSpinner";

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
  description: string;
  popularity: number;
  stock: number;
}

const SingleProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  // Separate state for each dropdown
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const QuantityInputUpgrade = WithNumberInputWrapper(QuantityInput);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      setIsLoading(true);
      try {
        const response = await customFetch.get(`/products/${params.id}`);
        const data = response.data.product;
        setSingleProduct(data);
      } catch (error: any) {
        console.error("Error fetching single product:", error);
        setSingleProduct(null);
        if (error.response?.data?.message === "Product not found.") {
          toast.error("Product not found.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await customFetch.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchSingleProduct();
    fetchProducts();
  }, [params.id]);

  const handleAddToCart = () => {
    if (singleProduct) {
      dispatch(
        addProductToCartWithLoginCheck(
          {
            id: singleProduct.id.toString(),
            product_id: singleProduct.id.toString(),
            title: singleProduct.title,
            price: parseFloat(singleProduct.price),
            quantity,
            image: singleProduct.image_url,
            stock: singleProduct.stock > 0,
          },
          navigate
        )
      );
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!singleProduct) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-5 max-[400px]:px-3 py-10 bg-white min-h-screen">
      {/* Product Details Section */}
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        {/* Image Section */}
        <div className="lg:col-span-2 flex justify-center items-center">
          <div className="w-full max-w-[900px] h-[450px] max-[400px]:h-[300px] overflow-hidden rounded-lg shadow-md">
            <img
              src={singleProduct.image_url}
              alt={singleProduct.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full flex flex-col gap-5 justify-center items-center max-lg:mt-6 px-6">
          <div className="flex flex-col gap-2 w-full max-w-[400px]">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500]">
              {singleProduct.title}
            </h1>
            <div className="flex justify-between items-center">
              <p className="text-base text-gray-700">
                {formatCategoryName(
                  typeof singleProduct.category === "string"
                    ? singleProduct.category
                    : singleProduct.category?.name || ""
                )}
              </p>
              <p className="text-base font-bold text-[#8B0000]">
                ${parseFloat(singleProduct.price).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="flex flex-col gap-2 w-full max-w-[400px]">
            <label htmlFor="quantity" className="text-lg font-medium text-gray-800">
              Quantity
            </label>
            <QuantityInputUpgrade
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(() => parseInt(e.target.value) || 1)
              }
              className="border border-gray-300 focus:border-transparent h-14 px-5 text-lg rounded-full outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100"
            />
          </div>

          {/* Add to Cart Button */}
          <div className="flex flex-col gap-3 w-full max-w-[400px]">
            <Button
              mode="gradient"
              text="Add to Cart"
              onClick={handleAddToCart}
              className="h-14 text-lg font-bold text-white bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            />
          </div>
        </div>
      </div>

      {/* Description and Details Dropdowns in One Row */}
      <div className="w-full flex gap-4 mt-10">
        {/* Description Dropdown */}
        <div className="w-1/2">
          <Dropdown
            dropdownTitle="Description"
            isOpen={isDescriptionOpen}
            toggle={() => setIsDescriptionOpen((prev) => !prev)}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <p className="text-gray-700">{singleProduct.description || "No description available."}</p>
          </Dropdown>
        </div>

        {/* Details Dropdown */}
        <div className="w-1/2">
          <Dropdown
            dropdownTitle="Details"
            isOpen={isDetailsOpen}
            toggle={() => setIsDetailsOpen((prev) => !prev)}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex flex-col gap-2">
              <p className="text-gray-700 font-medium">
                Category:{" "}
                {typeof singleProduct.category === "string"
                  ? singleProduct.category
                  : singleProduct.category?.name || ""}
              </p>
              <p className="text-gray-700 font-medium">
                Popularity: {singleProduct.popularity}
              </p>
              <p className="text-gray-700 font-medium">
                Stock: {singleProduct.stock}
              </p>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-24">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] text-center mb-12">
          Similar Products
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-y-8 gap-x-5">
          {products.slice(0, 3).map((product: Product) => (
            <ProductItem
              key={product.id}
              id={product.id.toString()}
              image={product.image_url}
              title={product.title}
              category={
                typeof product.category === "string"
                  ? product.category
                  : product.category?.name || "Unknown"
              }
              price={parseFloat(product.price)}
              popularity={product.popularity}
              stock={product.stock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;