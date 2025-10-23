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
import { getUserById } from "@/models/user/user.repository";
import { getProductsByIds } from "@/models/products/product.repository";

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
    productId: i.productId,
  }));

  const variants = await getVariantsByIds(inputItems.map((oi) => oi.variantId));
  const products = await getProductsByIds(inputItems.map((oi) => oi.productId));
  const user = await getUserById(userId);
  console.log(JSON.stringify(variants), "variants fetched");
  console.log(inputItems, "Input items");

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

    const product = products.find((p) => p.id === v.productId);

    return {
      id: undefined,
      orderId: null as unknown as string,
      price: v.salePrice,
      productId: v.productId as string,
      quantity: input.quantity,
      size: input.size,
      variantId: v.id,
      totalAmount: input.quantity * v.salePrice,
      variant: {
        images: v.images,
        colorDisplay: v.colorDisplay,
        sku: v.sku,
        price: v.price,
        salePrice: v.salePrice,
        brand: product?.brand ?? "",
        category: product?.category ?? "",
        description: product?.description ?? "",
        productCategory: product?.productCategory ?? "",
        productType: product?.productType ?? "",
        subTitle: product?.subTitle ?? "",
        title: product?.title ?? "",
        color: v.color,
      },
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
    address: {
      address: user?.address.address ?? "",
      city: user?.address.city ?? "",
      state: user?.address.state ?? "",
      zipCode: user?.address.zipCode ?? "",
    },
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
    const waybill = await createDelhiveryShipment(
      order.userId,
      order.id as string
    );
    order.deliveryPartnerTrackingId = waybill;
  }

  await updateOrder(order.id as string, order as OrderInput);
};
