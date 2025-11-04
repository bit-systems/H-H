import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Pagination } from "swiper";

import { useCartV2 } from "@/hooks/useCartV2";
import { useToast } from "@/hooks/useToast";
import { getProduct } from "@/models/products/product.repository";
import ProductColors from "@/components/product/product-colors";
import ProductSize from "@/components/product/product-size";
import ProductTags from "@/components/product/product-tags";

import {
  Button,
  Loader,
  Slider,
  MediaContainer,
  NotFound,
} from "@/components/common";

import { formatPrice } from "@/helpers/format";

import styles from "./index.module.scss";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const { addItem, isLoading, error } = useCartV2();
  const { sendToast } = useToast();

  const router = useRouter();

  const [notify, setNotify] = useState(false);
  const [productIsReady, setProductIsReady] = useState(false);
  const [product, setProduct] = useState();
  const [selectedVariant, setSelectedVariant] = useState();
  const [allSizes, setAllSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState();
  const [buttonContent, setButtonContent] = useState("");
  const [addEventHandler, setAddEventHandler] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    await addItem({
      productId: selectedVariant.productId,
      variantId: selectedVariant.id,
      skuId: selectedVariant.id + "_" + selectedSize,
      size: selectedSize,
      availableQuantity:
        selectedVariant.sizeVariants.find((s) => s.size === selectedSize)
          ?.quantity ?? 0,
      salePrice: selectedVariant.salePrice,
      price: selectedVariant.price,
      images: selectedVariant.images,
      color: selectedVariant.color,
      title: product.title,
      brand: product.brand,
    });
    setNotify(true);
  };

  const selectVariant = (variant) => {
    setSelectedVariant(variant);
    setSelectedSize(null);
  };

  useEffect(() => {
    if (notify) {
      if (!error) {
        sendToast({
          addToCart: true,
          content: {
            image: selectedVariant.images[0].src,
            message: `${product.title} ${product.brand} - ${
              selectedVariant.color
            } ${selectedSize ? ` - ${selectedSize.toUpperCase()}` : ""}`,
          },
        });
      } else if (error) {
        sendToast({ error: true, content: { message: error.message } });
      }

      setNotify(false);
    }
  }, [notify]);

  const get = async (id) => {
    const s = await getProduct(id);
    setProduct(s);

    const sizes = s.variants.flatMap((v) => v.sizes);
    setAllSizes(() => [...new Set(sizes)]);

    setProductIsReady(true);
    console.log(s, "s");
  };

  useEffect(() => {
    if (router.isReady) {
      get(router.query.id).then();
    }
  }, [router.isReady]);

  const getButton = () => {
    setAddEventHandler(false);
    if (!selectedVariant) {
      return "CHOOSE COLOR";
    }
    if (!selectedSize) {
      return "SELECT SIZE";
    }

    if (selectedSize) {
      const v = selectedVariant.sizeVariants.find(
        (s) => s.size === selectedSize
      );

      if (v.quantity > 0) {
        setAddEventHandler(true);
      }

      //check if stock in that size exists
      return v.quantity <= 0
        ? "OUT OF STOCK"
        : `ADD ${selectedSize?.toUpperCase() ?? ""} TO BAG`;
    }

    return `NO ITEMS LEFT`;
  };

  useEffect(() => {
    setButtonContent(getButton());
  }, [selectedSize, selectedVariant]);

  const buttonStyles = `
    ${buttonContent.includes("ADD") ? styles.button : styles.button_disabled}
  `;

  const isButtonDisabled = buttonContent.includes("ADD") ? false : true;

  const isBigScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <>
      {!productIsReady && (
        <>
          <div className={styles.loader_section} />
          <Loader />
        </>
      )}
      {productIsReady && !product && (
        <section className="main-container">
          <NotFound />
        </section>
      )}
      {productIsReady && product && (
        <>
          {!isBigScreen && (
            <>
              <section>
                <div className={styles.container_s}>
                  <div className={styles.slider_container}>
                    <div className={styles.slider_wrapper}>
                      <Slider
                        slides={product.images}
                        bp={{
                          500: {
                            slidesPerView: 1.5,
                          },
                          600: {
                            slidesPerView: 1.7,
                          },
                          800: {
                            slidesPerView: 2,
                          },
                        }}
                        slidesPerView={1.3}
                        spaceBetween={30}
                        loop={true}
                        centeredSlides={true}
                        grabCursor={true}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[Pagination]}
                        sliderClassName={styles.slider}
                        slideClassName={styles.slide}
                        mediaContainerClassName={styles.image_container}
                        imageFillClassName={styles.image_fill}
                        imageClassName={styles.image}
                      />
                    </div>
                  </div>
                  <div className={styles.grid_footer}>
                    <div className={styles.details_wrapper}>
                      <div className={styles.details}>
                        <div className={styles.name_wrapper}>
                          <h1 className={styles.name}>{product.title}</h1>
                        </div>
                        <p className={styles.description}>
                          {product.description}
                        </p>
                        {selectedVariant && (
                          <p className={styles.color}>
                            {selectedVariant.color}
                          </p>
                        )}

                        <ProductTags
                          currentPrice={
                            selectedVariant ? selectedVariant.salePrice : null
                          }
                          actualPrice={
                            selectedVariant ? selectedVariant.price : null
                          }
                          tags={product.tags}
                        />
                      </div>
                      <div className={styles.price_wrapper}>
                        {selectedVariant &&
                          (selectedVariant.salePrice < selectedVariant.price ? (
                            <>
                              <span className={styles.discounted_price}>
                                {" "}
                                {formatPrice(selectedVariant.salePrice)}
                              </span>
                              <span className={styles.crossed_price}>
                                {formatPrice(selectedVariant.price)}
                              </span>
                            </>
                          ) : (
                            <span>{formatPrice(selectedVariant.price)}</span>
                          ))}
                      </div>
                    </div>

                    <div className={styles.controls_wrapper}>
                      <div className={styles.variants_container}>
                        <p className={styles.number_of_colors}>
                          {product.variants.length}{" "}
                          {product.variants.length > 1 ? "Colors" : "Color"}{" "}
                          {selectedVariant && (
                            <span>| {selectedVariant.color}</span>
                          )}
                        </p>
                        <div className={styles.variants_wrapper}>
                          {product.variants.map((variant) => (
                            <ProductColors
                              key={variant.id}
                              id={variant.id}
                              thumbnail={variant.images[0].src}
                              selectedId={selectedVariant?.id}
                              selectVariant={() => selectVariant(variant)}
                            />
                          ))}
                        </div>
                      </div>
                      {selectedVariant && (
                        <div className={styles.sizes_container}>
                          <p className={styles.pick_size}>
                            {selectedVariant
                              ? "Select Size"
                              : "Available Sizes"}
                          </p>

                          <div className={styles.sizes_wrapper}>
                            {(selectedVariant
                              ? selectedVariant.sizeVariants
                              : []
                            ).map((size) => (
                              <ProductSize
                                key={size.size}
                                skuId={size.size}
                                value={size.size}
                                quantity={size.quantity}
                                selectedSize={selectedSize}
                                setSelectedSize={setSelectedSize}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={styles.button_wrapper}>
                      {!isLoading && (
                        <Button
                          className={buttonStyles}
                          disabled={isButtonDisabled}
                          onClick={
                            addEventHandler ? handleAddToCart : undefined
                          }
                        >
                          <span className={styles.button_content_show}>
                            {buttonContent}
                          </span>
                        </Button>
                      )}
                      {isLoading && (
                        <Button className={buttonStyles} disabled={true}>
                          <span className={styles.button_loader}></span>
                          <span className={styles.button_content_no_show}>
                            {buttonContent}
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {isBigScreen && (
            <>
              <section className="main-container">
                <div className={styles.container_b}>
                  <div className={styles.details_wrapper}>
                    <div className={styles.details}>
                      <h1 className={styles.name}>{product.title}</h1>
                      <p className={styles.description}>
                        {product.description}
                      </p>
                      {selectedVariant && (
                        <p className={styles.color}>{selectedVariant.color}</p>
                      )}
                      <ProductTags
                        currentPrice={
                          selectedVariant ? selectedVariant.salePrice : null
                        }
                        actualPrice={
                          selectedVariant ? selectedVariant.price : null
                        }
                        tags={product.tags}
                      />
                      <div className={styles.price_wrapper}>
                        {selectedVariant &&
                          (selectedVariant.salePrice < selectedVariant.price ? (
                            <>
                              <span className={styles.discounted_price}>
                                {" "}
                                {formatPrice(selectedVariant.salePrice)}
                              </span>
                              <span className={styles.crossed_price}>
                                {formatPrice(selectedVariant.price)}
                              </span>
                            </>
                          ) : (
                            <span>{formatPrice(selectedVariant.price)}</span>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.images}>
                    {(selectedVariant ?? product).images.map((image) => (
                      <MediaContainer
                        key={image.id}
                        image={image.src}
                        alt=""
                        containerClassName={styles.image_container}
                        fillClassName={styles.image_fill}
                      />
                    ))}
                  </div>

                  <div className={styles.controls_wrapper}>
                    <div className={styles.variants_container}>
                      <p className={styles.number_of_colors}>
                        {product.variants.length}{" "}
                        {product.variants.length > 1 ? "Colors" : "Color"}{" "}
                        {selectedVariant && (
                          <span>| {selectedVariant.color}</span>
                        )}
                      </p>
                      <div className={styles.variants_wrapper}>
                        {product.variants.map((variant) => (
                          <ProductColors
                            key={variant.id}
                            id={variant.id}
                            thumbnail={variant.images[0].src}
                            selectedId={selectedVariant?.id}
                            selectVariant={() => selectVariant(variant)}
                          />
                        ))}
                      </div>
                    </div>

                    {selectedVariant && (
                      <div className={styles.sizes_container}>
                        <p className={styles.pick_size}>Select Size</p>

                        <div className={styles.sizes_wrapper}>
                          {(selectedVariant
                            ? selectedVariant.sizeVariants
                            : []
                          ).map((size) => (
                            <ProductSize
                              key={size.size}
                              skuId={size.size}
                              value={size.size}
                              quantity={size?.quantity}
                              selectedSize={selectedSize}
                              setSelectedSize={setSelectedSize}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {!isLoading && (
                      <Button
                        className={buttonStyles}
                        disabled={isButtonDisabled}
                        onClick={addEventHandler ? handleAddToCart : undefined}
                      >
                        <span className={styles.button_content_show}>
                          {buttonContent}
                        </span>
                      </Button>
                    )}
                    {isLoading && (
                      <Button className={buttonStyles} disabled={true}>
                        <span className={styles.button_loader}></span>
                        <span className={styles.button_content_no_show}>
                          {buttonContent}
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductPage;
