import { createRazorpayOrder } from "@/app/utils/razorpay/order";
import { OrderInputBody } from "./inputs";
import { prepareOrder } from "./helper";

export async function GET(request: Request) {
  console.log(
    "Razorpay Instance:",
    "process.env.RAZORPAY_KEY_ID",
    "process.env.RAZORPAY_SECRET_KEY"
  );

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
  const payload = body as OrderInputBody;

  const order = await prepareOrder(payload);

  const rzOrder = await createRazorpayOrder(order);

  return new Response(
    JSON.stringify({
      orderId: rzOrder.id,
    }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
