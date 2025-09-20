import { useContext } from "react";

import CartContext from "../context/cartV2/cart-context";

export const useCartContextV2 = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error("useCartContextV2 must be inside CartProvider");
  }

  return context;
};
