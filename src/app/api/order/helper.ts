/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, OrderInput, OrderItem } from "@/models/order/order.model";
import { getVariantsByIds } from "@/models/variants/variant.repository";
import { OrderInputBody } from "./inputs";
import {
  createOrder,
  getOrderOnly,
  updateOrder,
} from "@/models/order/order.repository";

const calculatePrice = (orderItems: OrderItem[]) => {
  let price = 0;

  orderItems.forEach((o) => {
    price += o.totalAmount;
  });

  return price;
};

export const prepareOrder = async ({
  cart,
  userId,
}: OrderInputBody): Promise<Order> => {
  const inputItems = cart.map((i) => ({
    variantId: i.variantId,
    quantity: i.purchaseQuantity,
    size: i.size,
  }));

  const variants = await getVariantsByIds(inputItems.map((oi) => oi.variantId));

  const orderItems: OrderItem[] = variants.map((v) => {
    const variantToBuy = inputItems.find((v) => v.variantId === v.variantId);

    if (!variantToBuy) {
      throw new Error("Variant not found, Please contact admin");
    }

    const sku = v.sizeVariants.find((size) => size.size === variantToBuy.size);

    if (!sku) {
      throw new Error("Size not found, Please contact admin");
    }

    if (sku.quantity < variantToBuy.quantity) {
      throw new Error("Out of quantity, Please try again");
    }

    return {
      id: undefined,
      orderId: null as unknown as string,
      price: v.salePrice,
      productId: v.productId as string,
      quantity: variantToBuy.quantity,
      size: variantToBuy.size,
      variantId: variantToBuy.variantId,
      totalAmount: variantToBuy.quantity * v.salePrice,
    };
  });

  const order: OrderInput = {
    createdAt: new Date().toISOString(),
    deliveryPartnerTrackingId: null,
    orderItems,
    paymentGatewayPaymentId: null,
    paymentStatus: "pending",
    status: "pending",
    totalAmount: calculatePrice(orderItems),
    updatedAt: new Date().toISOString(),
    userId,
  };

  return await createOrder(order);
};

export const updateOrderPayment = async (
  paymentEvent: any,
  status: "paid" | "failed"
) => {
  const order = await getOrderOnly(
    paymentEvent.payload.payment.entity.notes.orderId
  );

  if (!order) {
    throw new Error("Order not found");
  }

  order.paymentStatus = status;
  order.paymentGatewayPaymentId = paymentEvent.payload.payment.entity.id;
  order.updatedAt = new Date().toISOString();
  order.paymentGatewayResponse = JSON.stringify(paymentEvent);

  await updateOrder(order.id as string, order as OrderInput);
};
