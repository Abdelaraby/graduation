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
    <div className="max-w-screen-2xl px-5 mx-auto mt-24">
      <h2 className="text-black text-5xl font-normal tracking-[1.56px] max-sm:text-4xl mb-12 text-center">
        Our Categories
      </h2>
      <div className="flex justify-between flex-wrap gap-y-10">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <CategoryItem
              key={category.id}
              categoryTitle={category.name}
              image={category.image}
              link={category.name.toLowerCase().replace(/\s+/g, "-")}
            />
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesSection;
