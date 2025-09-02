import HeroSection from "./home-page/hero-section";
import ProductSliderSection from "./home-page/product-slider-section";
import SlideshowSection from "./home-page/slideshow-section";
import CollectionsSection from "./home-page/collections-section";

export const Home = () => {
  return (
    <>
      <SlideshowSection />
      <ProductSliderSection
        titleBottom="New Arrivals"
        sortBy={{ field: "price", direction: "desc" }}
        titleTop=""
      />
      <CollectionsSection />
      <ProductSliderSection
        titleTop="Everyday"
        titleBottom="Essentials"
        sortBy={{ field: "createdAt", direction: "asc" }}
      />
      <HeroSection />
    </>
  );
};

export default Home;
