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
  if (!res.ok) {
    throw new MyError(data.statusCode, data.message);
  }
  // if (data.statusCode === 400) {
  //   throw new MyError(400, JSON.stringify(data.errors));
  // }
  return data.metadata;
}

export async function changeProfile(
  fullName: string,
  phoneNumber: string,
  token: string
) {
  const res = await fetch(`${process.env.API_URL}/v1/Auth/edit-profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({
      phoneNumber,
      fullName,
    }),
  });
  const data = await res.json();
  console.log(data);

  if (data.statusCode === 400) {
    throw new MyError(400, JSON.stringify(data.errors));
  }
  return data.message;
}

export async function changePassword(
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  token: string
) {
  const res = await fetch(`${process.env.API_URL}/v1/Auth/change-password`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({
      oldPassword,
      newPassword,
      confirmPassword,
    }),
  });
  const data = await res.json();
  if (data.statusCode === 400) {
    throw new MyError(400, JSON.stringify(data.errors));
  }
  return data.message;
}
