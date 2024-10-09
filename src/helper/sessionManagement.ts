import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { loginType } from "@/types";

const key = new TextEncoder().encode(process.env.SECRET_KEY);
export async function encrypt(payload: loginType) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3day")
    .sign(key);
}

export async function decrypt(session: string) {
  const { payload } = await jwtVerify(session, key, { algorithms: ["HS256"] });
  return payload;
}
