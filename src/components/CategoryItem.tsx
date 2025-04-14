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
    <div className="w-[200px] flex flex-col items-center text-center group">
      {/* Image Container */}
      <Link
        to={`/shop/${link}`}
        className="relative w-[180px] h-[180px] rounded-full overflow-hidden shadow-sm hover:shadow-l transition-shadow duration-300"
      >
        <img
          src={image}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          alt={categoryTitle}
        />
      </Link>

      {/* Category Title */}
      <h3
        className="mt-4 text-lg font-semibold text-white py-2 px-4 bg-black rounded-md max-md:text-sm 
        group-hover:bg-brown-600 transition-colors duration-300 
        transform active:scale-95 transition-transform duration-200"
      >
        {categoryTitle}
      </h3>
    </div>
  );
};

export default CategoryItem;