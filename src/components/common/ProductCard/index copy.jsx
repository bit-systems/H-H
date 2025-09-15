import { useState, useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper";

import { useCart } from "@/hooks/useCart";

import QuickAddV2 from "./QuickAdd/index copy";
import { Button, SliderV2 } from "@/components/common";

import { formatPrice } from "@/helpers/format";

import styles from "./index.module.scss";
import { useRouter } from "next/router";

const ProductCardV2 = ({
  productId,
  variantId,
  model,
  type,
  numberOfVariants,
  handleDeleteStart,
  allVariants,
  nested,
  onTouchStart,
  onTouchEnd,
  expandableClassName,
  onCardPick,
  product,
}) => {
  const location = useRouter();
  const isAdmin = location.pathname.split("/")[1] === "admin";

  const { addItem, isLoading } = useCart();

  const [currentVariant, setCurrentVariant] = useState({
    variantId: product.variants[0].id,
    color: product.variants[0].color,
    currentPrice: product.variants[0].salePrice,
    actualPrice: product.variants[0].price,
    discount: product.variants[0].salePrice,
    slides: product.images,
    skus: product.variants[0].sizes,
    isSoldOut: false,
    ...product.variants[0],
  });

  const [showDetailsPlaceholder, setDetailsShowPlaceholder] = useState(true);

  const [isSmallContainer, setIsSmallContainer] = useState(false);
  const [allVariantSlides, setAllVariantSlides] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    const containerElement = containerRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        setIsSmallContainer(width < 220);
      }
    });

    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const allVariantSlides = product.variants.map((v) => ({
      ...v.images[0],
      variantId: v.id,
    }));
    setAllVariantSlides(() => [...allVariantSlides]);
  }, []);

  const handlePickVariant = (slide) => {
    const selectedVariant = allVariants.find(
      (variant) => variant.id === slide.variantId
    );
    console.log(selectedVariant, "selectedVariant");

    setCurrentVariant(() => ({
      ...{
        variantId,
        color: selectedVariant.color,
        currentPrice: selectedVariant.salePrice,
        actualPrice: selectedVariant.price,
        discount: selectedVariant.salePrice,
        slides: selectedVariant.images,
        images: selectedVariant.images,
        skus: selectedVariant.sizes,
        isSoldOut: selectedVariant.stock <= 0,
        ...selectedVariant,
      },
    }));
  };

  const handleAddItem = async ({ skuId, size }) => {
    await addItem({
      skuId,
      productId: productId,
      variantId: currentVariant.variantId,
      size,
      model: model,
      type: type,
      color: currentVariant.color,
      price: currentVariant.currentPrice,
      slug: currentVariant.slides[0].url,
      image: currentVariant.slides[0].src,
    });
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`${styles.container} ${
          isSmallContainer ? styles.is_small_container : undefined
        }`}
      >
        {!showDetailsPlaceholder && (
          <div className={styles.tag_container}>
            {currentVariant.isSoldOut && (
              <span className={styles.sold_out}>Sold Out</span>
            )}
            {currentVariant.currentPrice < currentVariant.actualPrice && ( //TODO calc
              <span className={styles.discount}>
                -{currentVariant.discount}%
              </span>
            )}
          </div>
        )}
        <div className={styles.slider_container}>
          <>
            <SliderV2
              onCardPick={onCardPick}
              clearPlaceholders={() => setDetailsShowPlaceholder(false)}
              showPlaceholder={showDetailsPlaceholder}
              slides={currentVariant.slides}
              toPage={"/products/"}
              slidesPerView={1}
              spaceBetween={0}
              centeredSlides={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".image-swiper-button-next",
                prevEl: ".image-swiper-button-prev",
                disabledClass: "swiper-button-disabled",
              }}
              allowTouchMove={false}
              modules={[Navigation]}
              sliderClassName={styles.slider}
              slideClassName={styles.slide}
              mediaContainerClassName={styles.image_container}
              imageFillClassName={styles.image_fill}
              imageClassName={styles.image}
              product={product}
            />
            {!showDetailsPlaceholder && !isSmallContainer && (
              <QuickAddV2
                skus={currentVariant.skus}
                handleAddItem={handleAddItem}
                isLoading={isLoading}
                containerClassName={styles.quick_add_container}
                wrapperClassName={styles.quick_add_wrapper}
                topContainerClassName={styles.quick_add_top}
                bottomContainerClassName={styles.quick_add_bottom}
                variant={currentVariant}
              />
            )}
          </>
        </div>

        <div className={styles.info_wrapper}>
          <div
            className={styles.expandable_container}
            style={{ opacity: showDetailsPlaceholder && 0 }}
          >
            {!isSmallContainer ? (
              <div className={`${styles.expandable} ${expandableClassName}`}>
                <SliderV2
                  clearPlaceholders={() => setDetailsShowPlaceholder(false)}
                  onVariantPick={handlePickVariant}
                  showPlaceholder={showDetailsPlaceholder}
                  slides={allVariantSlides}
                  nested={nested}
                  slidesPerView="auto"
                  spaceBetween={5}
                  allowTouchMove={true}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  sliderClassName={styles.other_variants_slider}
                  slideClassName={styles.other_variants_slide}
                  mediaContainerClassName={
                    styles.other_variants_image_container
                  }
                  imageFillClassName={styles.other_variants_image_fill}
                  imageClassName={styles.other_variants_image}
                />
              </div>
            ) : (
              <div className={styles.small_expandable}>
                <QuickAddV2
                  isSmallContainer={true}
                  skus={currentVariant.skus}
                  handleAddItem={handleAddItem}
                  isLoading={isLoading}
                  nested={nested}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  containerClassName={styles.quick_add_container}
                  wrapperClassName={styles.quick_add_wrapper}
                  topContainerClassName={styles.quick_add_top}
                  bottomContainerClassName={styles.quick_add_bottom}
                  sizesSliderClassName={styles.sizes_slider}
                />
              </div>
            )}
          </div>
          <ul
            className={styles.info_list}
            style={{ opacity: showDetailsPlaceholder && 1 }}
          >
            {showDetailsPlaceholder && (
              <>
                <li className={styles.title_placeholder} />
                <li className={styles.color_placeholder} />
                <li className={styles.price_placeholder} />
              </>
            )}
            {!showDetailsPlaceholder && (
              <>
                <li className={styles.title}>
                  {model} {type}
                </li>
                <li className={styles.color}>
                  <span className={styles.text}>{currentVariant.color}</span>
                  {numberOfVariants > 1 && (
                    <span
                      className={styles.tag}
                    >{`${numberOfVariants} colors`}</span>
                  )}
                </li>
                <li className={styles.price}>
                  {currentVariant.currentPrice < currentVariant.actualPrice ? ( //TODO
                    <>
                      <span className={styles.discounted_price}>
                        {formatPrice(currentVariant.currentPrice)}
                      </span>
                      <span className={styles.crossed_price}>
                        {formatPrice(currentVariant.actualPrice)}
                      </span>
                    </>
                  ) : (
                    <span>{formatPrice(currentVariant.currentPrice)}</span>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>

        {isAdmin && (
          <div className={styles.admin_buttons_wrapper}>
            <Button className={styles.edit} to={`/admin/products/${productId}`}>
              Edit
            </Button>
            <Button
              onClick={() =>
                handleDeleteStart({
                  productId,
                  variantId,
                })
              }
              className={styles.delete}
              type="button"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCardV2;
