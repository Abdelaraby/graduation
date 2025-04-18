import ProductGrid from "./ProductGrid";
import ProductGridWrapper from "./ProductGridWrapper";

const HomeCollectionSection = () => {
  return (
    <div>
      {/* Section Title */}
      <div className="flex justify-center">
        <h2 className="text-black bg-clip-text mt-10 text-2xl sm:text-3xl md:text-4xl font-bold tracking-[1.56px] max-sm:text-2xl mb-10 text-center relative inline-block px-4">
          FEATURED PRODUCTS
          {/* Underline */}
          <br />
          <span className="absolute left-7 right-7 bottom-0 h-[4px] bg-gradient-to-r from-black via-red-500 to-black rounded-full"></span>
        </h2>
      </div>

      {/* Product Grid */}
      <ProductGridWrapper>
        <ProductGrid />
      </ProductGridWrapper>
    </div>
  );
};

export default HomeCollectionSection;