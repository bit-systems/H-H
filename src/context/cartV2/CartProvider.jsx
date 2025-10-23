import { useReducer, useEffect, useRef, useState } from "react";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useToast } from "@/hooks/useToast";

import CartContext from "./cart-context";

import { updateCartAtLogin } from "@/helpers/cart";
import { useRouter } from "next/router";

const initialState = {
  items: [],
  cartIsReady: false,
  cartNeedsCheck: true,
  isLogin: true,
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItesmsFromStorage =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cartItesmsFromStorage);
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
