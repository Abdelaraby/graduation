import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ProductGrid,
  ProductGridWrapper,
  ShopFilterAndSort,
} from "../components";

const ShopPageContent = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category"); // Get category ID from query param

  const [sortCriteria, setSortCriteria] = useState<string>("");

  return (
    <>
      {/* Filter and Sort Section */}
      <ShopFilterAndSort sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />

      {/* Product Grid */}
      <ProductGridWrapper sortCriteria={sortCriteria} categoryId={categoryId}>
        <ProductGrid />
      </ProductGridWrapper>

      {/* Floating Back to Top Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <a
          href="#gridTop"
          className="flex justify-center items-center w-12 h-12 bg-[#8B0000] text-white rounded-full shadow-lg hover:bg-[#FF4500] transition-colors duration-300"
        >
          ↑
        </a>
      </div>
    </>
  );
};

export default ShopPageContent;