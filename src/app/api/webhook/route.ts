import { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import crypto from "crypto";

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    // 1. Get raw body
    const rawBody = await req.text();

    // 2. Get signature from headers
    const signature = req.headers.get("x-razorpay-signature") as string;

    // 3. Create expected signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    // 4. Compare
    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 5. Parse JSON after validation
    const body = JSON.parse(rawBody);

    // Example: Handle events
    if (body.event === "payment.captured") {
      console.log("✅ Payment captured:", body);
    } else if (body.event === "payment.failed") {
      console.log("❌ Payment failed:", body);
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
