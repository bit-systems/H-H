"use client";
import { useEffect, useState } from "react";

import { CgShoppingBag } from "react-icons/cg";

import { useCartContextV2 } from "@/hooks/useCartContextV2";

import { addAllItemsQuantity } from "@/helpers/item";

import styles from "./index.module.scss";

const CartIcon = () => {
  const { cartItems: items } = useCartContextV2();

  const [bump, setBump] = useState(false);

  let iconStyles = bump
    ? `${styles.bump} ${styles.cart_icon}`
    : styles.cart_icon;

  const totalQuantity = addAllItemsQuantity(items);
  let amountStyles = totalQuantity === 0 ? styles.no_items : styles.cart_amount;

  useEffect(() => {
    if (totalQuantity === 0) {
      return;
    } else {
      setBump(true);
    }

    const timer = setTimeout(() => {
      setBump(false);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [totalQuantity]);

  return (
    <div className={iconStyles}>
      <CgShoppingBag />
      <div className={amountStyles}>
        <div>{totalQuantity}</div>
      </div>
    </div>
  );
};

export default CartIcon;
