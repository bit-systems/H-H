import Razorpay from "razorpay";
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY || "",
});

export const createRazorpayOrder = async (amount: number, currency = "INR") => {
  return await instance.orders.create({
    amount: amount * 100, // amount in the smallest currency unit
    currency,
    receipt: `receipt_order_${Math.random() * 1000}`,
    line_items: [],
    line_items_total: amount * 100,
    notes: {},
  });
};
