import { z } from "zod";

export const createIngredientTypeFormSchema = z.object({
  ingredientTypeName: z
    .string()
    .trim()
    .min(2, { message: "Tên loại nguyên liệu phải có ít nhất 2 ký tự" }),
  ingredientTypeDescription: z
    .string()
    .trim()
    .min(2, { message: "Mô tả loại nguyên liệu phải có ít nhất 2 ký tự" }),
});

export const updateIngredientTypeFormSchema = z.object({
  id: z.string(),
  ingredientTypeName: z
    .string()
    .trim()
    .min(2, { message: "Tên loại nguyên liệu phải có ít nhất 2 ký tự" }),
  ingredientTypeDescription: z
    .string()
    .trim()
    .min(2, { message: "Mô tả loại nguyên liệu phải có ít nhất 2 ký tự" }),
});
