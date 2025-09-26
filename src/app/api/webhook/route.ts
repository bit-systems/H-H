import { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateOrderPayment } from "../order/helper";

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    const signature = req.headers.get("x-razorpay-signature") as string;

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const body = JSON.parse(rawBody);

    // Example: Handle events
    if (body.event === "payment.captured") {
      console.log("✅ Payment captured:", body);
      await updateOrderPayment(body, "paid");
    } else if (body.event === "payment.failed") {
      console.log("❌ Payment failed:", body);
      await updateOrderPayment(body, "failed");
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
