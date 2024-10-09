import { z } from "zod";

export const loginSchema = z.object({
  code: z.string(),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .regex(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ cái in hoa")
    .regex(/[a-z]/, "Mật khẩu phải có ít nhất một chữ cái thường")
    .regex(/\d/, "Mật khẩu phải có ít nhất một chữ số")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Mật khẩu phải có ít nhất một ký tự đặc biệt"
    ),
});
