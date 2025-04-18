import React, { ReactElement, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setShowingProducts, setTotalProducts } from "../features/shop/shopSlice";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  image_url: string;
  title: string;
  price: string;
  category: Category;
  popularity: number;
  stock: number;
}

interface ProductGridWrapperProps {
  children: ReactElement<{ products: Product[] }> | ReactElement<{ products: Product[] }>[];
  searchQuery?: string;
  sortCriteria?: string;
  category?: string; // Add this line
}

const useProductsFromLayout = () => {
  return useOutletContext<{ products: Product[] }>();
};

const ProductGridWrapper = ({ children, searchQuery, sortCriteria, category }: ProductGridWrapperProps) => {
  const { products } = useProductsFromLayout();
  const dispatch = useAppDispatch();

  // Apply category filter
  const filteredByCategory = category
    ? products.filter((product) => product.category.name.toLowerCase() === category.toLowerCase())
    : products;

  // Apply search query
  const filteredProducts = searchQuery
    ? filteredByCategory.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredByCategory;

  // Apply sorting criteria
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortCriteria === "price_asc") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortCriteria === "price_desc") {
      return parseFloat(b.price) - parseFloat(a.price);
    } else if (sortCriteria === "popularity") {
      return b.popularity - a.popularity;
    }
    return 0;
  });

  useEffect(() => {
    dispatch(setShowingProducts(sortedProducts.length));
    dispatch(setTotalProducts(products.length));
  }, [sortedProducts, products, dispatch]);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child, { products: sortedProducts }) : null
  );

  return <>{childrenWithProps}</>;
};

export default ProductGridWrapper;