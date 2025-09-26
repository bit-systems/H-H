import { Swiper, SwiperSlide } from "swiper/react";

import { FaPlus } from "react-icons/fa";

import styles from "./index.module.scss";

const QuickAddV2 = ({
  isSmallContainer,
  skus,
  handleAddItem,
  isLoading,
  nested,
  onTouchStart,
  onTouchEnd,
  containerClassName,
  wrapperClassName,
  topContainerClassName,
  bottomContainerClassName,
  sizesSliderClassName,
  variant,
}) => {
  console.log(skus, "sssssss", isSmallContainer, variant);
  if (isSmallContainer) {
    return (
      <>
        <Swiper
          slidesPerView="auto"
          spaceBetween={5}
          nested={nested}
          centeredSlides={skus?.length === 1}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className={sizesSliderClassName}
        >
          {variant.sizeVariants?.length > 1 ? (
            <div
              className={`${styles.sizes_wrapper} ${
                isLoading ? styles.center : undefined
              }`}
            >
              {variant.sizeVariants?.map((sku) => (
                <SwiperSlide
                  key={sku}
                  onClick={
                    !isLoading && sku.quantity > 0
                      ? () =>
                          handleAddItem({ skuId: variant.id, size: sku.size })
                      : undefined
                  }
                  className={`
                    ${
                      sku.quantity > 0 ? styles.size : styles.size_no_quantity
                    } ${isLoading && styles.no_show}`}
                >
                  {sku.size}
                </SwiperSlide>
              ))}
            </div>
          ) : (
            <div className={styles.single_size_wrapper}>
              {variant.sizeVariants?.map((singleSku) => (
                <SwiperSlide
                  key={singleSku.size}
                  onClick={
                    !isLoading && singleSku.quantity > 0
                      ? () =>
                          handleAddItem({
                            skuId: singleSku.size,
                            size: singleSku.size,
                          })
                      : undefined
                  }
                  className={`${
                    singleSku.quantity > 0
                      ? styles.single_size
                      : styles.single_size_no_quantity
                  } ${isLoading && styles.no_show} ${
                    isSmallContainer ? styles.is_small_container : undefined
                  }`}
                >
                  Add To Bag
                </SwiperSlide>
              ))}
            </div>
          )}
        </Swiper>
        {isLoading && (
          <div
            className={`${styles.loader} ${
              isSmallContainer ? styles.is_small_container : undefined
            }`}
          />
        )}
      </>
    );
  }
  return (
    <div className={containerClassName}>
      <div className={wrapperClassName}>
        <div className={topContainerClassName}>
          <p>Quick Add</p>
          <span>
            <FaPlus />
          </span>
        </div>
        <div className={bottomContainerClassName}>
          {variant.sizeVariants?.length > 1 ? (
            <div
              className={`${styles.sizes_wrapper} ${
                isLoading ? styles.center : undefined
              }`}
            >
              {variant.sizeVariants?.map((sku) => (
                <div
                  key={sku.size}
                  onClick={
                    !isLoading && sku.quantity > 0
                      ? () =>
                          handleAddItem({ skuId: variant.id, size: sku.size })
                      : undefined
                  }
                  className={`
                    ${
                      sku.quantity > 0 ? styles.size : styles.size_no_quantity
                    } ${isLoading && styles.no_show}`}
                >
                  {sku.size}
                </div>
              ))}
              {isLoading && <div className={styles.loader}></div>}
            </div>
          ) : (
            <div className={styles.single_size_wrapper}>
              {variant.sizeVariants?.map((singleSku) => (
                <div
                  key={size}
                  onClick={
                    !isLoading && singleSku.quantity > 0
                      ? () =>
                          handleAddItem({
                            skuId: variant.id,
                            size: singleSku.size,
                          })
                      : undefined
                  }
                  className={`${
                    singleSku.quantity > 0
                      ? styles.single_size
                      : styles.single_size_no_quantity
                  } ${isLoading && styles.no_show}`}
                >
                  Add To Bag
                </div>
              ))}
              {isLoading && <div className={styles.loader}></div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickAddV2;
