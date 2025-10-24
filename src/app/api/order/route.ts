import { createRazorpayOrder } from "@/app/utils/razorpay/order";
import { OrderInputBody, OrderStatusBody } from "./inputs";
import { prepareOrder, updateOrderStatus } from "./helper";
import { verifyJwtToken } from "@/app/utils/jwt";
import { OrderStatus } from "@/models/order/order.model";

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

export async function PUT(request: Request) {
  const body = await request.json();
  const payload = body as OrderStatusBody;

  if (
    !payload.orderId ||
    !Object.values(OrderStatus).includes(payload.status)
  ) {
    return new Response(JSON.stringify({ message: "Invalid payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const myParam = request.headers.get("Authorization");
  const user = verifyJwtToken(myParam || "") as Record<string, unknown>;

  if (user.role !== "admin") {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  await updateOrderStatus(payload.orderId, payload.status as OrderStatus);

  return new Response(
    JSON.stringify({ message: "Order status updated successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
