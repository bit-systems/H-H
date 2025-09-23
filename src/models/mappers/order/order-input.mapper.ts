/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderInput } from "@/models/order/order.model";
import { User } from "@/models/user/user.model";

export const orderInputMapper = (input: any, user: User): OrderInput => {
  return {
    id: input.id,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
    userId: user.id,
    deliveryPartnerTrackingId: null,
    paymentGatewayPaymentId: null,
    orderItems: input.orderItems.map((item: any) =>
      mapInputToOrderItem(item, input.id)
    ),
    totalAmount: input.totalAmount,
    status: "pending",
    paymentStatus: "pending",
  };
};

const mapInputToOrderItem = (
  item: any,
  orderId: string
): OrderInput["orderItems"][0] => {
  return {
    id: item.id,
    orderId,
    price: item.price,
    productId: item.productId,
    quantity: item.quantity,
    size: item.size,
    variantId: item.variantId,
    totalAmount: item.totalAmount,
  };
};
