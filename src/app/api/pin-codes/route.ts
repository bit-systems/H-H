import { delhiveryGet } from "@/app/utils/delhivery/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const myParam = searchParams.get("pin_code");
  const endpoint = `/pin-codes/json/?filter_codes=${myParam}`;
  return delhiveryGet(endpoint);
}
