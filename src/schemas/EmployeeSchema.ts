import { z } from "zod";

export const createEmployeeFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Họ và Tên phải có ít nhất 2 ký tự" }),
  phoneNumber: z
    .string()
    .trim()
    .min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự" }),
  restaurantId: z.string().trim(),
});

export const createEmployeeSchema = createEmployeeFormSchema.extend({
  roleId: z.number(),
});

export const activeAndInactiveEmployeeSchema = z.object({
  path: z.string(),
  id: z.string(),
});
