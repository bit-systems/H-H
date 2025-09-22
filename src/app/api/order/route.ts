import { createRazorpayOrder } from "@/app/utils/razorpay/order";
import { getOrder } from "@/models/order/order.repository";

export async function GET(request: Request) {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { orderId } = body;

  const order = await getOrder(orderId);

  //TODO get product and variants and check if the price and stock is valid

  await createRazorpayOrder(orderId);

  return new Response(JSON.stringify(orderId), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
