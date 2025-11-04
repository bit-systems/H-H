"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import { useKeyDown } from "@/hooks/useKeyDown";

import { Backdrop, ProductSlider, ProductSliderV2 } from "@/components/common";

import styles from "./index.module.scss";
import Portal from "@/components/common/Portal";

const CartModal = ({
  children,
  close,
  slides,
  backdropClassName,
  containerClassName,
  wrapperClassName,
  modalClassName,
  productSliderModalClassName,
}) => {
  useKeyDown(() => {
    close();
  }, ["Escape"]);

  const [isSliderInUse, setIsSliderInUse] = useState(false);

  const isBigScreen = useMediaQuery({
    query: "(min-width: 900px)",
  });

  const cartModalVariants = isBigScreen
    ? {
        initial: { x: "50vw", opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: "50vw", opacity: 0 },
      }
    : {
        initial: { y: "50vh", opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: "50vh", opacity: 0 },
      };

  const productSliderVariants = {
    initial: { x: "-50vw", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-25vw", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {children && (
        <>
          <Portal containerId="overlay">
            <>
              <Backdrop
                backdropClassName={`${styles.backdrop} ${backdropClassName}`}
              />
              <div
                onClick={close}
                className={`${styles.modal_container} ${containerClassName} ${
                  isSliderInUse ? styles.disable_backdrop : undefined
                }`}
              >
                <div className={`${styles.modal_wrapper} ${wrapperClassName}`}>
                  <motion.aside
                    onClick={(e) => e.stopPropagation()}
                    key="product-slider-modal"
                    variants={productSliderVariants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className={`${styles.product_slider_modal} ${productSliderModalClassName}`}
                  >
                    <p className={styles.title}>Recommended Products</p>
                    <ProductSliderV2
                      onTouchStart={() => setIsSliderInUse(true)}
                      onTouchEnd={() => setIsSliderInUse(false)}
                      slides={slides}
                      products={slides}
                      slidesPerView="auto"
                      spaceBetween={20}
                      pagination={false}
                      sliderClassName={styles.slider}
                      slideClassName={styles.slide}
                      fillClassName={styles.fill}
                      cardExpandableClassName={styles.expandable}
                      onCardPick={close}
                    />
                  </motion.aside>
                  <motion.aside
                    onClick={(e) => e.stopPropagation()}
                    key="cart-modal"
                    variants={cartModalVariants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className={`${styles.cart_modal} ${modalClassName}`}
                  >
                    {children}
                  </motion.aside>
                </div>
              </div>
            </>
          </Portal>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
