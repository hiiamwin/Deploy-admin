import MyError from "@/helper";
import { loginType } from "@/types";

export async function login(
  code: string,
  password: string
): Promise<loginType> {
  const res = await fetch(`${process.env.API_URL}/v1/Auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      code,
      password,
    }),
  });
  const data = await res.json();
  if (data.statusCode === 400) {
    throw new MyError(400, JSON.stringify(data.errors));
  }
  return data.metadata;
}
