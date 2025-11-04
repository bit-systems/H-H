"use client";
import { useEffect } from "react";

import { useCartContextV2 } from "@/hooks/useCartContextV2";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { useCheckout } from "@/hooks/useCheckout";

import { formatPrice } from "@/helpers/format";
import { addAllItemsPriceNumber } from "@/helpers/item";

import { MediaContainer } from "@/components/common";

import styles from "./index.module.scss";

const OrderSummary = () => {
  const { cartItems: items } = useCartContextV2();

  let shipping_price = 0;

  const subtotal = addAllItemsPriceNumber(items);
  const total = +subtotal + shipping_price;

  return (
    <>
      <div className={styles.list_wrapper}>
        {items.map((item) => (
          <div key={item.skuId} className={styles.item_container}>
            <div className={styles.image}>
              <MediaContainer
                containerClassName={styles.image_container}
                fillClassName={styles.image_fill}
                image={item.images[0].src}
              />
              <div className={styles.quantity}>
                <div>{item.purchaseQuantity}</div>
              </div>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>
                {item.title} {item.brand} - {item.color}
              </p>
              <p className={styles.size}>{item.size?.toUpperCase()}</p>
            </div>
            <p className={styles.price}>{formatPrice(item.salePrice)}</p>
          </div>
        ))}
      </div>
      <div className={styles.subtotal_wrapper}>
        <div>
          <p>Subtotal</p>
          <p className={styles.subtotal_price}> {formatPrice(subtotal)}</p>
        </div>
        {/* <div>
          <p>
            Shipping <i>{shipping_option}</i>
          </p>
          <p className={shipping_option_className}>
            {shipping_price > 0
              ? `$ ${formatPrice(shipping_price)}`
              : shipping_price_text}
          </p>
        </div> */}
      </div>
      <div className={styles.total_wrapper}>
        <p>Total</p>
        <p className={styles.total_price}>{formatPrice(total)}</p>
      </div>
    </>
  );
};

export default OrderSummary;
