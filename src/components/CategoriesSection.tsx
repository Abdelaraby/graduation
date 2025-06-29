import { useOutletContext } from "react-router-dom";
import CategoryItem from "./CategoryItem";

interface Category {
  id: number;
  name: string;
  image: string;
}

const useLayoutContext = () => {
  return useOutletContext<{ categories: Category[] }>();
};
const CategoriesSection = () => {
  const { categories } = useLayoutContext();

  return (
    <div className="flex justify-center items-center bg-gray-100">
      {/* Inner Container */}
      <div className="max-w-screen-2xl px-5 sm:px-8 md:px-12 mx-auto mt-6 mb-4 text-center">
        {/* Section Title */}
        <h2 className="text-black mt-0 text-2xl sm:text-3xl md:text-4xl font-bold tracking-[1.56px] max-sm:text-2xl mb-10 relative inline-block px-4">
          SHOP BY CATEGORY
          <br />
          {/* Underline */}
          <span className="absolute left-6 right-6 bottom-0 h-[4px] bg-gradient-to-r from-black via-red-500 to-black rounded-full"></span>
        </h2>

        {/* Categories Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-6 justify-center">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <CategoryItem
                key={category.id}
                categoryTitle={category.name}
                image={category.image}
                categoryId={category.id.toString()}
              />
            ))
          ) : (
            <p className="col-span-full text-center">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;