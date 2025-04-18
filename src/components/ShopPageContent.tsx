import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ProductGrid,
  ProductGridWrapper,
  ShopFilterAndSort,
} from "../components";

const ShopPageContent = () => {
  const { category } = useParams(); // Retrieve the category from the URL
  const [sortCriteria, setSortCriteria] = useState<string>("");

  return (
    <>
      {/* Filter and Sort Section */}
      <ShopFilterAndSort sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />

      {/* Product Grid */}
      <ProductGridWrapper sortCriteria={sortCriteria} category={category || ""}>
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