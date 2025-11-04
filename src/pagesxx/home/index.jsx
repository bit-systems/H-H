import HeroSection from "@/components/home/hero-section";
import ProductSliderSection from "@/components/home/product-slider-section";
import SlideshowSection from "@/components/home/slideshow-section";
import CollectionsSection from "@/components/home/collections-section";

export const HomePage = () => {
  return (
    <>
      <SlideshowSection />
      <ProductSliderSection
        titleBottom="New Arrivals"
        sortBy={{ field: "price", direction: "desc" }}
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

export default HomePage;
