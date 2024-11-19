import { z } from "zod";

export const CreateIngredientGeneralFormSchema = z.object({
  ingredientGeneralName: z
    .string()
    .trim()
    .min(2, { message: "Tên nguyên liệu phải có ít nhất 2 ký tự" }),
  ingredientGeneralDescription: z
    .string()
    .trim()
    .min(2, { message: "Mô tả nguyên liệu phải có ít nhất 2 ký tự" }),
  ingredientGeneralType: z.string().trim().min(1, {
    message: "Vui lòng chọn loại nguyên liệu",
  }),
  ingredientMeasureType: z.string().trim().min(1, {
    message: "Vui lòng chọn đơn vị cơ sở",
  }),
});

export const CreateIngredientGeneralSchema = z.object({
  ingredientGeneralName: z
    .string()
    .min(2, { message: "Tên nguyên liệu phải có ít nhất 2 ký tự" }),
  ingredientGeneralDescription: z
    .string()
    .min(2, { message: "Mô tả nguyên liệu phải có ít nhất 2 ký tự" }),
  ingredientType: z.string(),
  ingredientMeasureType: z.string(),
});

export const UpdateIngredientGeneralSchema = z.object({
  id: z.string(),
  ingredientGeneralName: z
    .string()
    .trim()
    .min(2, { message: "Tên nguyên liệu phải có ít nhất 2 ký tự" }),
  ingredientGeneralDescription: z
    .string()
    .trim()
    .min(2, { message: "Mô tả nguyên liệu phải có ít nhất 2 ký tự" }),
  ingredientTypeId: z.string(),
});

export const ActiveAndInactiveIngredientGeneralSchema = z.object({
  id: z.string(),
});
