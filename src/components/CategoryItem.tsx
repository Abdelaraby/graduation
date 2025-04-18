import { Link } from "react-router-dom";
const CategoryItem = ({
  categoryTitle,
  image,
  link,
}: {
  categoryTitle: string;
  image: string;
  link: string;
}) => {
  return (
    <div className="w-[200px] sm:w-[250px] flex flex-col items-center justify-center text-center group mx-auto">
      {/* Image Container with Dark Overlay and Centered Title */}
      <Link
  to={`/shop/${link}`} // Ensure `link` matches the category name
  className="relative w-full h-[200px] sm:h-[250px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group"
>
  {/* Image */}
  <img
    src={image}
    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
    alt={categoryTitle}
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300"></div>

  {/* Text Title in the Center of the Image */}
  <h3
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl sm:text-3xl font-bold max-sm:text-lg z-10"
  >
    {categoryTitle}
  </h3>
</Link>
    </div>
  );
};

export default CategoryItem;