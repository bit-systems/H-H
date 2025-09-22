export interface Order {
  id: string;
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
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  id: string;
  orderId: string;
  variantId: string;
  size: string;
}

export interface OrderInput {
  id: string;
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
}

export interface OrderOutput {
  id: string;
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
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
}
