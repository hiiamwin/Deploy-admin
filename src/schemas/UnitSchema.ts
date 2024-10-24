import { z } from "zod";

export const createUnitSchema = z.object({
  unitName: z
    .string()
    .trim()
    .min(1, { message: "Tên đơn vị không được để trống" }),
  conversionFactor: z
    .number({ message: "Hệ số chuyển đổi phải là số" })
    .positive({ message: "Hệ số chuyển đổi phải lớn hơn 0" })
    .int({ message: "Hệ số chuyển đổi phải là số nguyên" }),
  ingredientUnitParentId: z.string(),
  ingredientId: z.string(),
});

export const updateUnitSchema = z.object({
  unitName: z
    .string()
    .trim()
    .min(1, { message: "Tên đơn vị không được để trống" }),
  conversionFactor: z
    .number({ message: "Hệ số chuyển đổi phải là số" })
    .positive({ message: "Hệ số chuyển đổi phải lớn hơn 0" })
    .int({ message: "Hệ số chuyển đổi phải là số nguyên" }),
  ingredientUnitParentName: z.string().optional(),
  id: z.string(),
});
