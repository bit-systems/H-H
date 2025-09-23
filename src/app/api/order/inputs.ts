export interface CartInputBody {
  productId: string;
  variantId: string;
  skuId: string;
  size: string;
  availableQuantity: number;
  salePrice: number;
  price: number;
  images: string;
  color: string;
  title: string;
  brand: string;
  purchaseQuantity: number;
}

export interface OrderInputBody {
  cart: CartInputBody[];
  userId: string;
}
