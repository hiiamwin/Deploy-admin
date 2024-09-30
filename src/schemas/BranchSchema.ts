import { z } from "zod";

export const createRestaurantFormSchema = z.object({
  restaurantName: z
    .string()
    .trim()
    .min(5, { message: "Tên chi nhánh phải có ít nhất 5 ký tự" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, {
      message: "Tên phải bao gồm cả chữ và số",
    }),

  address: z
    .string()
    .trim()
    .min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, {
      message: "Địa chỉ phải bao gồm cả chữ và số",
    }),

  restaurantPhone: z
    .string()
    .trim()
    .regex(/^0\d{9,10}$/, {
      message: "Số điện thoại phải bắt đầu bằng 0 và có 10-11 chữ số",
    }),
});

export const updateRestaurantFormSchema = z.object({
  id: z.string(),
  restaurantName: z
    .string()
    .trim()
    .min(5, { message: "Tên chi nhánh phải có ít nhất 5 ký tự" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, {
      message: "Tên phải bao gồm cả chữ và số",
    }),

  address: z
    .string()
    .trim()
    .min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, {
      message: "Địa chỉ phải bao gồm cả chữ và số",
    }),

  restaurantPhone: z
    .string()
    .trim()
    .regex(/^0\d{9,10}$/, {
      message: "Số điện thoại phải bắt đầu bằng 0 và có 10-11 chữ số",
    }),
});

export const activeAndInactiveRestaurantSchema = z.object({
  id: z.string(),
});
