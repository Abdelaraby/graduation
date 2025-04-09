import { Link } from "react-router-dom";

const CategoryItem = ({ categoryTitle, image, link }: { categoryTitle: string; image: string; link: string }) => {
  return (
    <div className="w-[280px] flex flex-col items-center text-center group">
      <Link to={`/shop/${link}`} className="relative w-[250px] h-[250px] rounded-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img
          src={image}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          alt={categoryTitle}
        />
      </Link>
      <h3 
  className="mt-4 text-xl font-semibold text-brown-800 group-hover:text-brown-600 transition-colors duration-300 text-center bg-secondaryBrown text-white py-3 px-4 w-full flex items-center justify-center max-md:text-base 
  transform active:scale-105 transition-transform duration-200">
  {categoryTitle}
</h3>



    </div>
  );
};

export default CategoryItem;