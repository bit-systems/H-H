import { Product, ProductModel } from "../products/product.model";
import { Variant } from "../variants/variant.model";

export interface Order {
  id?: string;
  userId: string;
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
  createdAt: string;
  updatedAt: string;
  paymentGatewayPaymentId: string;
  deliveryPartnerTrackingId: string;
  paymentGatewayResponse?: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  id?: string;
  orderId: string;
  variantId: string;
  size: string;
  totalAmount: number;
  variant: Pick<
    Variant,
    "images" | "colorDisplay" | "sku" | "price" | "salePrice" | "color"
  > &
    Pick<
      ProductModel,
      | "title"
      | "subTitle"
      | "brand"
      | "category"
      | "description"
      | "productCategory"
      | "productType"
    >;
}

export interface OrderInput {
  id?: string;
  userId: string;
  orderItems: OrderItem[];
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
  createdAt: string;
  updatedAt: string;
  paymentGatewayPaymentId: string | null;
  deliveryPartnerTrackingId: string | null;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  address: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface OrderOutput {
  id?: string;
  userId: string;
  orderItems: OrderItem[];
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
  createdAt: string;
  updatedAt: string;
  paymentGatewayPaymentId: string;
  deliveryPartnerTrackingId: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
}
