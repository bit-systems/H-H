"use client";
import { useState, useEffect } from "react";

import { useCollection } from "@/hooks/useCollection";

import { ProductSliderV2 } from "@/components/common";

import { getAllProducts } from "@/models/products/product.repository";

import styles from "./index.module.scss";

const ProductSliderSection = ({ titleTop, titleBottom, sortBy }) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchVariants = async () => {
      const fetchedProducts = await getAllProducts();
      console.log(fetchedProducts, "fetchedVariants");

      const mappedProducts = fetchedProducts.map((p) => ({
        ...p,
        slides: p.images,
        variants: p.variants.map((v) => ({
          ...v,
          slides: v.images,
        })),
      }));

      setSlides(() => [...mappedProducts]);
    };

    fetchVariants();
  }, []);

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        {titleTop && <p className={styles.section_title_top}>{titleTop}</p>}
        {titleBottom && (
          <h1 className={styles.section_title_bottom}>{titleBottom}</h1>
        )}
        <div className={styles.carousel_container}>
          <ProductSliderV2
            products={slides}
            slides={slides}
            slidesPerView="auto"
            spaceBetween={20}
            pagination={false}
            sliderClassName={styles.slider}
            slideClassName={styles.slide}
            fillClassName={styles.fill}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductSliderSection;
