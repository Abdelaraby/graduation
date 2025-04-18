import { useState } from "react";
import {
  Button,
  ProductGrid,
  ProductGridWrapper,
} from "../components";
import { Form, useSearchParams, useNavigate } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";
  const [] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-10">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] mb-4">
          Find Your Perfect Product
        </h3>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Explore our vast collection of products tailored just for you. Start typing below to discover something amazing.
        </p>
      </div>

      {/* Search Bar with Embedded Button */}
      <Form
        method="get"
        className="flex items-center justify-center mb-16"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const searchInput = formData.get("searchInput") as string;
          navigate(`/search?query=${encodeURIComponent(searchInput)}&page=1`);
        }}
      >
        <div className="relative w-full sm:w-[600px] lg:w-[700px] xl:w-[800px]">
          <input
            type="text"
            placeholder="Search for products..."
            defaultValue={query}
            className=" h-16 w-full text-xl px-6 pr-20 rounded-full outline-none transition-all duration-300 shadow-md hover:shadow-lg"
            name="searchInput"
          />
          <Button
            text="Search"
            type="submit"
            className="absolute right-0 top-0 h-16 px-6 rounded-full font-bold text-lg text-white bg-gradient-to-r from-[#8B0000] to-[#FF4500] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          />
        </div>
      </Form>

      {/* Product Grid */}
      <ProductGridWrapper searchQuery={query}>
        <ProductGrid />
      </ProductGridWrapper>

    </div>
  );
};

export default Search;