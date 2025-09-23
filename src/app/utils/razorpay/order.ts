import { Order } from "@/models/order/order.model";
import Razorpay from "razorpay";
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY || "",
});

export const createRazorpayOrder = async (order: Order, currency = "INR") => {
  return await instance.orders.create({
    amount: order.totalAmount * 100, // amount in the smallest currency unit
    currency,
    receipt: `receipt_order_${order.id ?? ""}`,
    line_items: [],
    line_items_total: order.totalAmount * 100,
    notes: {
      orderId: order.id as string,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateRazorpaySignature = (body: any, signature: string) => {
  return Razorpay.validateWebhookSignature(
    body,
    process.env.RAZORPAY_SECRET_KEY || "",
    signature
  );
};
