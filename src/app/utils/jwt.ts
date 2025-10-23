import { sign, verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY ?? "";

export const generateJwtToken = (payload: object) => {
  return sign(payload, secret, { expiresIn: "30d" });
};

export const verifyJwtToken = (token: string) => {
  try {
    const decoded =
      token && (token.startsWith("Bearer ") ? token.slice(7) : token);
    return verify(decoded, secret);
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new Error("Invalid token");
  }
};
