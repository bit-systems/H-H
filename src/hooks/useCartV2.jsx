import { useState } from "react";

import { doc, getDoc, setDoc, deleteDoc, collection } from "firebase/firestore";

import { db } from "@/db/config";

import { useAuthContext } from "./useAuthContext";
import { useCartContextV2 } from "./useCartContextV2";

import { addAllItemsQuantity } from "@/helpers/item";
import { CustomError } from "@/helpers/error/customError";
import { handleError } from "@/helpers/error/handleError";

export const useCartV2 = () => {
  const { user } = useAuthContext();
  const { cartItems: items, setCartItems: setItems } = useCartContextV2();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(false);
  const [error, setError] = useState(null);

  const addItem = async (itemToAdd) => {
    console.log("Adding item to cart v2", itemToAdd, items);
    if (isLoading) return;
    setLoadingItemId(itemToAdd.skuId);
    setError(null);
    setIsLoading(true);
    try {
      const itemInCart = items.find((item) => item.skuId === itemToAdd.skuId);
      const itemInCartIndex = items.findIndex(
        (item) => item.skuId === itemToAdd.skuId
      );

      let updatedItems = [...items];

      const availableQuantity = itemToAdd.availableQuantity;

      // const { quantity: availableQuantity } = await getCurrentStock(
      //   itemToAdd.productId,
      //   itemToAdd.skuId
      // ); // TODO check if stock is needed

      let noStock;
      let stockWasUpdated;

      if (availableQuantity <= 0) {
        if (itemInCart) {
          updatedItems = updatedItems.filter(
            (item) => item.skuId !== itemInCart.skuId
          );
          noStock = true;
        } else {
          throw new CustomError(
            `Size ${itemToAdd.size.toUpperCase()} is out of stock!`
          );
        }
      } else {
        if (itemInCart) {
          if (itemInCart.purchaseQuantity > availableQuantity) {
            itemInCart.purchaseQuantity = availableQuantity;
            stockWasUpdated = true;
          } else if (itemInCart.purchaseQuantity === availableQuantity) {
            throw new CustomError("All available stock is currently in cart!");
          } else {
            const updatedItem = {
              ...itemInCart,
              purchaseQuantity: itemInCart.purchaseQuantity + 1,
            };

            updatedItems[itemInCartIndex] = updatedItem;
          }
        } else {
          const addedItem = {
            ...itemToAdd,
            purchaseQuantity: 1,
          };
          updatedItems.push(addedItem);
        }
      }

      const cartTotalItemQuantity = addAllItemsQuantity(updatedItems);

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      setItems(updatedItems);

      if (noStock) {
        throw new CustomError("This item is out of stock. Cart was updated!");
      }

      if (stockWasUpdated) {
        throw new CustomError(
          "Stock is limited. Item quantity in cart updated!"
        );
      }

      setLoadingItemId(null);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(handleError(err));
      setLoadingItemId(null);
      setIsLoading(false);
    }
  };

  const removeItem = async (productId, skuId) => {
    setLoadingItemId(skuId);

    setError(null);
    setIsLoading(true);
    try {
      const itemInCartIndex = items.findIndex((item) => item.skuId === skuId);

      const itemInCart = items[itemInCartIndex];

      let updatedItems = [...items];
      console.log("itemInCartIndex", updatedItems, itemInCart);

      let noStock;
      let stockWasUpdated;

      if (itemInCart.purchaseQuantity === 1) {
        updatedItems = items.filter((item) => item.skuId !== skuId);
      } else {
        const availableQuantity = itemInCart.availableQuantity;
        if (availableQuantity <= 0) {
          updatedItems = updatedItems.filter(
            (item) => item.skuId !== itemInCart.skuId
          );
          noStock = true;
        } else if (availableQuantity < itemInCart.purchaseQuantity) {
          const updatedItem = {
            ...itemInCart,
            purchaseQuantity: availableQuantity,
          };

          updatedItems[itemInCartIndex] = updatedItem;

          stockWasUpdated = true;
        } else {
          const updatedItem = {
            ...itemInCart,
            purchaseQuantity: itemInCart.purchaseQuantity - 1,
          };

          updatedItems[itemInCartIndex] = updatedItem;
        }
      }

      const cartTotalItemQuantity = addAllItemsQuantity(updatedItems);
      setItems(() => [...updatedItems]);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      // const cartRef = doc(db, "carts", user.uid);

      // if (cartTotalItemQuantity === 0) {
      //   await deleteDoc(cartRef);

      //   dispatch({
      //     type: "DELETE_CART",
      //   });
      // } else {
      //   const updatedItemsDb = updatedItems.map((item) => ({
      //     skuId: item.skuId,
      //     productId: item.productId,
      //     variantId: item.variantId,
      //     quantity: item.quantity,
      //   }));

      //   await setDoc(cartRef, {
      //     items: updatedItemsDb,
      //   });

      //   dispatch({
      //     type: "UPDATE_CART",
      //     payload: updatedItems,
      //   });
      // }

      if (noStock) {
        throw new CustomError(
          "This item is out of stock and was removed from cart!"
        );
      }

      if (stockWasUpdated) {
        throw new CustomError(
          "Stock is limited. Item quantity in cart updated!"
        );
      }

      setLoadingItemId(null);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setLoadingItemId(null);
      setError(handleError(err));
      setIsLoading(false);
    }
  };

  const deleteItem = async (skuId) => {
    setError(null);
    setIsLoading(true);
    try {
      const itemInCartIndex = items.findIndex((item) => item.skuId === skuId);
      const itemInCart = items[itemInCartIndex];

      const updatedItems = items.filter(
        (item) => item.skuId !== itemInCart.skuId
      );

      const cartRef = doc(db, "carts", user.uid);

      const cartTotalItemQuantity = addAllItemsQuantity(updatedItems);

      if (cartTotalItemQuantity === 0) {
        await deleteDoc(cartRef);

        dispatch({
          type: "DELETE_CART",
        });
      } else {
        const updatedItemsDb = updatedItems.map((item) => ({
          skuId: item.skuId,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        }));

        await setDoc(cartRef, {
          items: updatedItemsDb,
        });

        dispatch({
          type: "UPDATE_CART",
          payload: updatedItems,
        });
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError({ details: err.message });
      setIsLoading(false);
    }
  };

  const deleteCart = async () => {
    const cartRef = doc(db, "carts", user.uid);
    await deleteDoc(cartRef);
    dispatch({
      type: "DELETE_CART",
    });
  };

  const activateCartCheck = () => {
    //TODO implement cart check
  };

  return {
    addItem,
    removeItem,
    deleteItem,
    deleteCart,
    activateCartCheck,
    isLoading,
    loadingItemId,
    error,
  };
};
