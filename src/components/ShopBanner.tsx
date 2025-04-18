import { formatCategoryName } from "../utils/formatCategoryName";

const ShopBanner = ({ category }: { category: string }) => {

  return (
    <div className="bg-gradient-to-r from-[#8B0000] to-[#FF4500] text-white py-10 flex justify-center items-center my-0">
      <h2 className="text-3xl max-sm:text-2xl">
        {category ? formatCategoryName(category) : "Shop page"}
      </h2>
    </div>
  );
};
export default ShopBanner;
