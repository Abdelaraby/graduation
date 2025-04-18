import { useAppSelector } from "../hooks";

const ShopFilterAndSort = ({
  sortCriteria,
  setSortCriteria,
}: {
  sortCriteria: string;
  setSortCriteria: (value: string) => void;
}) => {
  const { showingProducts, totalProducts } = useAppSelector((state) => state.shop);

  return (
    <div className="flex justify-between items-center px-5 py-6 max-sm:flex-col max-sm:gap-5 bg-white shadow-md rounded-lg">
      {/* Showing Products Count */}
      <div className="flex items-center"> {/* Added flex and items-center */}
        <p className="text-lg text-gray-700 font-medium">
          Showing {showingProducts} of {totalProducts}
        </p>
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF4500] transition-all duration-300"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
          ▼
        </span>
      </div>
    </div>
  );
};

export default ShopFilterAndSort;