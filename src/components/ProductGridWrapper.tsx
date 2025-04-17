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
  page: number;
}

const useProductsFromLayout = () => {
  return useOutletContext<{ products: Product[] }>();
};

const ProductGridWrapper = ({ children, searchQuery }: ProductGridWrapperProps) => {
  const { products } = useProductsFromLayout();
  const dispatch = useAppDispatch();

  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  useEffect(() => {
    dispatch(setShowingProducts(filteredProducts.length));
    dispatch(setTotalProducts(products.length));
  }, [filteredProducts, products, dispatch]);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child, { products: filteredProducts }) : null
  );

  return <>{childrenWithProps}</>;
};

export default ProductGridWrapper;
