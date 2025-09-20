import { formatPrice } from "./format";

export const addIndividualItemPrice = ({ price, quantity }) => {
  return formatPrice(price * quantity);
};

export const addAllItemsPrice = (items) => {
  return formatPrice(
    items.reduce((total, item) => {
      return total + item.salePrice * item.purchaseQuantity;
    }, 0)
  );
};

export const addAllItemsPriceNumber = (items) => {
  return items.reduce((total, item) => {
    return total + item.purchaseQuantity * item.salePrice;
  }, 0);
};

export const addAllItemsQuantity = (items) => {
  return items.reduce((total, item) => {
    return total + item.purchaseQuantity;
  }, 0);
};
