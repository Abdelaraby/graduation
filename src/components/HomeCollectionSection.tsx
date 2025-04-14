import ProductGrid from "./ProductGrid";
import ProductGridWrapper from "./ProductGridWrapper";

const HomeCollectionSection = () => {
  return (
    <div>
      <div className="flex justify-center">
  <h2 className="text-black mt-10 text-3xl font-bold tracking-[1.56px] max-sm:text-4xl mb-12 text-center relative inline-block px-4">
    FEATURED PRODUCTS
    {/* Underline */}
    <br></br>
    <span className="absolute left-7 right-7 bottom-0 h-[4px] bg-gradient-to-r from-black via-red-500 to-black rounded-full"></span>
  </h2>
</div>


      <ProductGridWrapper>
        <ProductGrid />
      </ProductGridWrapper>
    </div>
  );
};
export default HomeCollectionSection;
