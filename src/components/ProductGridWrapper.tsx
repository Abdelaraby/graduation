import React, { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppDispatch } from "../hooks";
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
  category: Category;
}

const useProductsFromLayout = () => {
  return useOutletContext<{ products: Product[] }>();
};

const ProductGridWrapper = ({
  children,
}: {
  children:
    | ReactElement<{ products: Product[] }>
    | ReactElement<{ products: Product[] }>[];
}) => {
  const { products } = useProductsFromLayout();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (products && products.length) {
      dispatch(setShowingProducts(products.length));
      dispatch(setTotalProducts(products.length)); // or adjust based on meta
    }
  }, [products, dispatch]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { products });
    }
    return null;
  });

  return <>{childrenWithProps}</>;
};

export default ProductGridWrapper;
