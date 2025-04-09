import React, { ReactElement, useCallback, useEffect, useState } from "react";
import customFetch from "../axios/custom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setShowingProducts,
  setTotalProducts,
} from "../features/shop/shopSlice";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  image_url: string;
  title: string;
  price: string;
  category: Category; // الـ category دلوقتي object
}

const ProductGridWrapper = ({
  searchQuery,
  sortCriteria,
  category,
  page = 1,
  limit = 9,
  children,
}: {
  searchQuery?: string;
  sortCriteria?: string;
  category?: string;
  page?: number;
  limit?: number;
  children:
    | ReactElement<{ products: Product[] }>
    | ReactElement<{ products: Product[] }>[];
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalProducts } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  const getSearchedProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: any = {
        page,
        limit,
      };
      if (searchQuery) params.search = searchQuery;
      if (sortCriteria) params.sort = sortCriteria;
      if (category) params.category_id = category;

      const response = await customFetch.get("/products", { params });
      console.log("API Response:", response.data);

      const fetchedProducts: Product[] = response.data.data || response.data;

      if (!Array.isArray(fetchedProducts)) {
        throw new Error("Invalid API response: products is not an array");
      }

      const validProducts = fetchedProducts.filter(
        (product) => product && typeof product.id !== "undefined"
      );

      if (response.data.meta?.total) {
        dispatch(setTotalProducts(response.data.meta.total));
      } else {
        dispatch(setTotalProducts(validProducts.length));
      }

      setProducts(validProducts);
      dispatch(setShowingProducts(validProducts.length));
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      dispatch(setShowingProducts(0));
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, sortCriteria, category, page, limit, dispatch]);

  useEffect(() => {
    getSearchedProducts();
  }, [getSearchedProducts]);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      console.log("Passing products to children:", products);
      return React.cloneElement(child, { products });
    }
    return null;
  });

  return <>{childrenWithProps}</>;
};

export default ProductGridWrapper;