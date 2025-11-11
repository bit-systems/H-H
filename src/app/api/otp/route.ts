import { generateJwtToken } from "@/app/utils/jwt";
import { getOtp } from "@/models/user/helpers";
import {
  getUserByMobileNumber,
  sendOtpToUser,
  verifyOtpForUser,
} from "@/models/user/user.repository";
import { NextRequest } from "next/server";
import { sendSms } from "./helper";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const myParam = searchParams.get("phone_number");

    const user = await getUserByMobileNumber(myParam || "");
    if (!user) {
      throw new Error("User not found");
    }
    const otp = process.env.NODE_ENV !== "production" ? "5555" : getOtp();
    const phone_number =
      process.env.NODE_ENV === "production" ? `91${myParam}` : "919000408310";
    await sendOtpToUser(user, otp);
    await sendSms(phone_number, otp);
    return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: (err as Error)["message"] || "OTP sending failed",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const phoneNumber = body.phoneNumber;
    const otp = body.otp;

    const resp = await verifyOtpForUser(phoneNumber, otp);
    return new Response(
      JSON.stringify({
        message: "OTP verified successfully",
        token: generateJwtToken(resp),
        user: resp,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: (err as Error)["message"] || "OTP verification failed",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
