"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.module.css";

import { Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import MediaContainer from "../MediaContainer";

import { useRouter } from "next/navigation";

const SliderV2 = ({
  slides,
  clearPlaceholders,
  onVariantPick,
  onCardPick,
  showPlaceholder,
  toPage,
  bp,
  slidesPerView,
  spaceBetween,
  loop,
  centeredSlides,
  grabCursor,
  autoplay,
  pagination,
  navigation,
  allowTouchMove = true,
  nested,
  modules,
  onTouchStart,
  onTouchEnd,
  sliderClassName,
  slideClassName,
  mediaContainerClassName,
  imageFillClassName,
  imagePlaceholderClassName,
  imageClassName,
  product,
}) => {
  let slugCheck;
  if (toPage) {
    const { pathname } = useRouter();
    // slugCheck = slides[0].url === pathname.split('/')[2]; //TODO fix this
    slugCheck = false;
  }

  console.log(navigation, showPlaceholder, modules, "ooookk");

  return (
    <>
      <Swiper
        breakpoints={bp ? bp : undefined}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        centeredSlides={centeredSlides}
        grabCursor={grabCursor}
        autoplay={autoplay}
        pagination={pagination}
        navigation={navigation}
        allowTouchMove={allowTouchMove}
        nested={nested}
        modules={[Navigation]}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={`${sliderClassName} slider-navigation`}
      >
        {navigation && (
          <>
            <div
              className={`swiper-button image-swiper-button-prev ${
                showPlaceholder ? "no-show" : undefined
              }`}
            >
              <FaArrowLeft />
            </div>
            <div
              className={`swiper-button image-swiper-button-next ${
                showPlaceholder ? "no-show" : undefined
              }`}
            >
              <FaArrowRight />
            </div>
          </>
        )}
        {slides?.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className={slideClassName}
            onClick={
              onVariantPick
                ? () => onVariantPick(slide)
                : onCardPick
                ? () => onCardPick(slide)
                : undefined
            }
          >
            <MediaContainer
              image={slide.src}
              to={toPage && toPage + (product ? product.id : "")}
              alt={slide.alt || ""}
              slugCheck={slugCheck}
              clearPlaceholders={clearPlaceholders}
              containerClassName={mediaContainerClassName}
              fillClassName={imageFillClassName}
              placeholderClassName={imagePlaceholderClassName}
              mediaClassName={imageClassName}
              key={slide.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SliderV2;
