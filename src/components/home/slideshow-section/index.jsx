import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import { Autoplay, Pagination } from "swiper";

import { Button, Slider } from "@/components/common";

export const bigScreenSlides = [
  {
    src: "/assets/images/slide-1-c.jpg",
    id: 1,
  },
  {
    src: "/assets/images/slide-2-c.jpg",
    id: 2,
  },
  {
    src: "/assets/images/slide-3-c.jpg",
    id: 3,
  },
];

export const smallScreenSlides = [
  {
    src: "/assets/images/slide-1-c.jpg",
    id: 1,
  },
  {
    src: "/assets/images/slide-2-c.jpg",
    id: 2,
  },
  {
    src: "/assets/images/slide-3-c.jpg",
    id: 3,
  },
];

import styles from "./index.module.scss";

const SlideshowSection = () => {
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    setShowContent(false);

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const isBigScreen = useMediaQuery({
    query: "(min-width: 900px)",
  });

  if (!showContent) {
    console.log("Not showing content");
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className={styles.content_container}>
          {showContent && (
            <div className={styles.content_wrapper}>
              <p className={styles.content_title}>New Drops</p>
              {/* <p className={styles.content_title}>De gira</p> */}
              <p className={styles.content_subtitle}>
                All kinds of shirts & many more
              </p>
              <Button className={styles.button} to="/collections/products">
                Shop now
              </Button>
            </div>
          )}
          {isBigScreen && (
            <Slider
              slides={bigScreenSlides}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              centeredSlides={true}
              grabCursor={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              sliderClassName={styles.slider}
              imageFillClassName={styles.big_image_fill}
              imageClassName={styles.big_image}
            />
          )}
          {!isBigScreen && (
            <Slider
              slides={smallScreenSlides}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              centeredSlides={true}
              grabCursor={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              sliderClassName={styles.slider}
              imageFillClassName={styles.small_image_fill}
              imageClassName={styles.small_image}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SlideshowSection;
