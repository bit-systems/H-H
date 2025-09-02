import HeroSection from './hero-section';
import ProductSliderSection from './product-slider-section';
import SlideshowSection from './slideshow-section';
import CollectionsSection from './collections-section';

export const HomePage = () => {
  return (
    <>
      <SlideshowSection />
      <ProductSliderSection
        titleBottom="New Arrivals"
        sortBy={{ field: 'price', direction: 'desc' }}
      />
      <CollectionsSection />
      <ProductSliderSection
        titleTop="Everyday"
        titleBottom="Essentials"
        sortBy={{ field: 'createdAt', direction: 'asc' }}
      />
      <HeroSection />
    </>
  );
};

export default HomePage;
