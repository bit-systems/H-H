"use client";
import HeroSection from "../components/home/hero-section";
import ProductSliderSection from "../components/home/product-slider-section";
import SlideshowSection from "../components/home/slideshow-section";
import CollectionsSection from "../components/home/collections-section";
import { useAuthContextV2 } from "@/hooks/useAuthContextV2";
import { Loader } from "@/components/common";

export default function HomePage() {
  const { authIsReady } = useAuthContextV2();

  return !authIsReady ? (
    <Loader
      noPortal={false}
      backdropClassName={""}
      containerClassName={""}
      loaderClassName={""}
    />
  ) : (
    <>
      <div></div>
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
}

// export default Home;
