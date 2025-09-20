import { useEffect } from "react";

import { CgShoppingBag, CgCheckO } from "react-icons/cg";

import { useCartContextV2 } from "@/hooks/useCartContextV2";
import { useCartV2 } from "@/hooks/useCartV2";
import { useToast } from "@/hooks/useToast";

import {
  CartItem,
  ProductSlider,
  Button,
  ProductSliderV2,
} from "@/components/common";

import { addAllItemsPrice, addAllItemsQuantity } from "@/helpers/item";

import styles from "./index.module.scss";

const CartContent = ({ closeCartModal, slides }) => {
  console.log("Rendering CartContent", slides);
  const { cartItems: items } = useCartContextV2();
  console.log("Cart items:", items);
  const { addItem, removeItem, deleteItem, isLoading, loadingItemId, error } =
    useCartV2();
  const { sendToast } = useToast();

  useEffect(() => {
    if (error) {
      sendToast({ error: true, content: { message: error.message } });
    }
  }, [error]);

  const totalQuantity = addAllItemsQuantity(items);

  return (
    <>
      {items.length === 0 ? (
        <div className={styles.empty_container}>
          <div className={styles.no_products_container}>
            <div className={styles.no_products_wrapper}>
              <p className={styles.no_products}>Show your bag some love!</p>
              <Button
                className={`${styles.button} ${styles.empty_button}`}
                to="/collections/products"
                onClick={closeCartModal}
              >
                Shop now
              </Button>
            </div>
          </div>
          <div className={styles.product_slider_container}>
            <p className={styles.title}>Recommended Products</p>
            <ProductSliderV2
              slides={slides}
              products={slides}
              slidesPerView="auto"
              spaceBetween={20}
              pagination={false}
              sliderClassName={styles.slider}
              slideClassName={styles.slide}
              fillClassName={styles.fill}
              cardExpandableClassName={styles.expandable}
              onCardPick={closeCartModal}
            />
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.list_wrapper}>
              <div className={styles.list}>
                {items.map((item) => (
                  <CartItem
                    closeCartModal={closeCartModal}
                    key={item.skuId}
                    productId={item.productId}
                    variantId={item.variantId}
                    skuId={item.skuId}
                    model={item.title}
                    type={item.brand}
                    color={item.color}
                    size={item.size}
                    price={item.salePrice}
                    slug={item.slug}
                    quantity={item.purchaseQuantity}
                    image={item.images[0]?.src}
                    addItem={() => addItem(item)}
                    removeItem={removeItem}
                    deleteItem={deleteItem}
                    isLoading={isLoading}
                    loadingItemId={loadingItemId}
                  />
                ))}
              </div>
              <div className={styles.product_slider_container}>
                <p className={styles.title}>Recommended Products</p>
                <ProductSliderV2
                  slides={slides}
                  products={slides}
                  slidesPerView="auto"
                  spaceBetween={20}
                  pagination={false}
                  sliderClassName={styles.slider}
                  slideClassName={styles.slide}
                  fillClassName={styles.fill}
                  cardExpandableClassName={styles.expandable}
                  onCardPick={closeCartModal}
                />
              </div>
            </div>
          </div>
          <div className={styles.footer_container}>
            <div className={styles.footer_wrapper}>
              <p>
                <span>Total: {addAllItemsPrice(items)} </span> | {totalQuantity}{" "}
                {+totalQuantity > 1 ? "items" : "item"}
              </p>
              <div className={styles.buttons_wrapper}>
                <Button
                  className={`${styles.button} ${styles.cart_button}`}
                  to="/cart"
                  onClick={closeCartModal}
                >
                  Your bag{" "}
                  <span>
                    <CgShoppingBag />
                  </span>
                </Button>
                <Button
                  className={`${styles.button} ${styles.checkout_button}`}
                  to="/checkout"
                  onClick={closeCartModal}
                >
                  Checkout{" "}
                  <span>
                    <CgCheckO />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartContent;
