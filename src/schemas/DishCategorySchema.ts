import { z } from "zod";

export const createDishCategoryFormSchema = z.object({
  categoryName: z
    .string()
    .trim()
    .min(3, { message: "Tên danh mục món ăn phải có ít nhất 3 ký tự" }),
});
export const updateDishCategoryFormSchema = z.object({
  id: z.string(),
  categoryName: z
    .string()
    .trim()
    .min(3, { message: "Tên danh mục món ăn phải có ít nhất 3 ký tự" }),
});
