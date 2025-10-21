/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, OrderInput, OrderItem } from "@/models/order/order.model";
import { getVariantsByIds } from "@/models/variants/variant.repository";
import { OrderInputBody } from "./inputs";
import {
  createOrder,
  getOrderOnly,
  updateOrder,
} from "@/models/order/order.repository";
import { createDelhiveryShipment } from "@/app/utils/delhivery/shipment";

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

  console.log(JSON.stringify(variants), "oooooooooooooooooooooooo");
  console.log(inputItems, "pppppppppppppppppppppp");

  const orderItems: OrderItem[] = inputItems.map((input) => {
    const v = variants.find((v) => input.variantId === v.id);

    if (!v) {
      throw new Error("Variant not found, Please contact admin");
    }

    const variantSize = v.sizeVariants.find((s) => s.size === input.size);

    if (!variantSize) {
      throw new Error("Variant size not found, Please contact admin");
    }

    if (variantSize.quantity < input.quantity) {
      throw new Error("Out of quantity, Please try again");
    }

    return {
      id: undefined,
      orderId: null as unknown as string,
      price: v.salePrice,
      productId: v.productId as string,
      quantity: input.quantity,
      size: input.size,
      variantId: v.id,
      totalAmount: input.quantity * v.salePrice,
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
  order.status = "confirmed";
  order.paymentGatewayPaymentId = paymentEvent.payload.payment.entity.id;
  order.updatedAt = new Date().toISOString();
  order.paymentGatewayResponse = JSON.stringify(paymentEvent);

  if (status === "paid") {
    await createDelhiveryShipment(order.userId, order.id as string);
  }

  await updateOrder(order.id as string, order as OrderInput);
};
