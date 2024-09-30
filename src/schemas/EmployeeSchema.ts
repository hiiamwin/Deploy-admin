import { z } from "zod";

export const createEmployeeFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  lastName: z.string().trim().min(2, { message: "Họ phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  address: z
    .string()
    .trim()
    .min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" }),
});

export const activeAndInactiveEmployeeSchema = z.object({
  id: z.string(),
});
