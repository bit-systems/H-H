import { verifyJwtToken } from "@/app/utils/jwt";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const myParam = request.headers.get("Authorization");

  const user = verifyJwtToken(myParam || "");
  if (!user) {
    throw new Error("User not found");
  }
  return new Response(JSON.stringify({ user }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
