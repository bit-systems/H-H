import { delhiveryGet } from "@/app/utils/delhivery/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const myParam = searchParams.get("pin_code");
  const endpoint = `/c/api/pin-codes/json/?filter_codes=${myParam}`;
  const res = await delhiveryGet(endpoint);

  return new Response(
    JSON.stringify({ isDeliverable: res.delivery_codes.length > 0 }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
