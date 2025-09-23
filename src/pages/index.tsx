import HeroSection from "../components/home/hero-section";
import ProductSliderSection from "../components/home/product-slider-section";
import SlideshowSection from "../components/home/slideshow-section";
import CollectionsSection from "../components/home/collections-section";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCartContext } from "@/hooks/useCartContext";
import { Loader } from "@/components/common";

export const Home = () => {
  const { authIsReady } = useAuthContext();
  const { cartIsReady } = useCartContext();

  return !authIsReady || !cartIsReady ? (
    <Loader
      noPortal={false}
      backdropClassName={""}
      containerClassName={""}
      loaderClassName={""}
    />
  ) : (
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
