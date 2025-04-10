import React, { useEffect, useState } from "react";
import { Button, ProductItem, QuantityInput, Dropdown } from "../components";
import { useParams } from "react-router-dom";
import WithNumberInputWrapper from "../utils/withNumberInputWrapper";
import { formatCategoryName } from "../utils/formatCategoryName";
import toast from "react-hot-toast";
import customFetch from "../axios/custom";

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
  const params = useParams<{ id: string }>();

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

  const handleAddToCart = async () => {
    if (singleProduct) {
      try {
        const newProduct = {
          product_id: singleProduct.id.toString(),
          title: singleProduct.title,
          price: parseFloat(singleProduct.price),
          quantity: quantity,
          image: singleProduct.image_url,
          stock: singleProduct.stock > 0,
        };
        const response = await customFetch.post("/cart", newProduct);
        if (response.data.success) {
          toast.success("Product added to the cart");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Add to Cart Error:", error);
        toast.error("Failed to add product to cart");
      }
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading product...</div>;
  }

  if (!singleProduct) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-5 max-[400px]:px-3 py-10">
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        {/* Image Section */}
        <div className="lg:col-span-2 flex justify-center items-center">
          <div className="w-full max-w-[600px] h-[450px] max-[400px]:h-[300px] overflow-hidden">
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
            <h1 className="text-4xl">{singleProduct.title}</h1>
            <div className="flex justify-between items-center">
              <p className="text-base text-secondaryBrown">
                {formatCategoryName(
                  typeof singleProduct.category === "string"
                    ? singleProduct.category
                    : singleProduct.category?.name || ""
                )}
              </p>
              <p className="text-base font-bold">${singleProduct.price}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full max-w-[400px]">
            <QuantityInputUpgrade
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(() => parseInt(e.target.value) || 1)
              }
            />
          </div>
          <div className="flex flex-col gap-3 w-full max-w-[400px]">
            <Button mode="brown" text="Add to cart" onClick={handleAddToCart} />
          </div>
          <div className="w-full max-w-[400px]">
            <Dropdown dropdownTitle="Description">
              {singleProduct.description || "No description available."}
            </Dropdown>
            <Dropdown dropdownTitle="Details">
              <div className="flex flex-col gap-2">
                <p className="text-secondaryBrown text-base font-bold">
                  Category:{" "}
                  {typeof singleProduct.category === "string"
                    ? singleProduct.category
                    : singleProduct.category?.name || ""}
                </p>
                <p className="text-secondaryBrown text-base font-bold">
                  Popularity: {singleProduct.popularity}
                </p>
                <p className="text-secondaryBrown text-base font-bold">
                  Stock: {singleProduct.stock}
                </p>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-black/90 text-5xl mt-24 mb-12 text-center max-lg:text-4xl">
          Similar Products
        </h2>
        <div className="flex flex-wrap justify-between items-center gap-y-8 mt-12 max-xl:justify-start max-xl:gap-5">
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