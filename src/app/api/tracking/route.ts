import { delhiveryGet } from "@/app/utils/delhivery/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const myParam = searchParams.get("tracking_number");
  const endpoint = `/api/v1/packages/json?waybill=${myParam}`;
  const res = await delhiveryGet(endpoint);

  const endpoint2 = `/api/p/packing_slip?wbns=${myParam}&pdf=true&pdf_size=A4`;
  const res2 = await delhiveryGet(endpoint2);
  console.log(JSON.stringify(res2), "packing slip response");
  return new Response(JSON.stringify(res), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
