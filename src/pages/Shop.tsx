import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { ShopBanner, ShopPageContent } from "../components";

export const shopCategoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const { category } = params;
  return category;
};

const Shop = () => {
  const category = useLoaderData() as string;

  return (
    <div className="max-w-screen-2xl mx-auto pt-10 bg-gray-50 min-h-screen">
      {/* Banner */}
      <ShopBanner category={category} />

      {/* Content */}
      <ShopPageContent/>
    </div>
  );
};

export default Shop;