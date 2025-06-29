import { Banner, CategoriesSection, HomeCollectionSection } from "../components";
import ArticlesSection from "../components/Articles";

const Landing = () => {
  return (
    <>
      <Banner />
      <ArticlesSection/>
      <CategoriesSection />

      <HomeCollectionSection />
      
    </>
  );
};
export default Landing;
