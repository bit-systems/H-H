import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCardV2 from "../ProductCard/index copy";

const ProductSliderV2 = ({
  onTouchStart,
  onTouchEnd,
  products,
  bp,
  slidesPerView,
  spaceBetween,
  pagination,
  allowTouchMove = true,
  modules,
  sliderClassName,
  slideClassName,
  fillClassName,
  cardExpandableClassName,
  onCardPick,
}) => {
  console.log(products, "products");
  const [isNestedBeingDragged, setIsNestedBeingDragged] = useState(false);

  return (
    <>
      <Swiper
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        breakpoints={bp ? bp : undefined}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        pagination={pagination}
        allowTouchMove={allowTouchMove}
        noSwiping={isNestedBeingDragged}
        noSwipingClass="swiper-slide"
        modules={modules}
        className={`${sliderClassName}`}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className={slideClassName}>
            {product.variants.length ? (
              <ProductCardV2
                productId={product.id}
                variantId={product.variants[0].id}
                model={product.title}
                color={product.variants[0].color}
                type={product.brand}
                numberOfVariants={product.variants.length}
                allVariants={product.variants}
                nested={true}
                onTouchStart={() => setIsNestedBeingDragged(true)}
                onTouchEnd={() => setIsNestedBeingDragged(false)}
                expandableClassName={cardExpandableClassName}
                onCardPick={onCardPick}
                product={product}
              />
            ) : (
              <div
                className={fillClassName}
                style={{
                  paddingTop: "168.11965812%",
                  background: "grey",
                }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductSliderV2;
