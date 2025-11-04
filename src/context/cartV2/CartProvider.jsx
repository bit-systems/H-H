import { useReducer, useEffect, useRef, useState } from "react";

import CartContext from "./cart-context";

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
