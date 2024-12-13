import { z } from "zod";

export const createDishGeneralFormSchema = z
  .object({
    dishGeneralName: z
      .string()
      .trim()
      .min(1, { message: "Tên món ăn không được để trống" }),
    dishGeneralPrice: z
      .number()
      .int({ message: "Giá tiền phải là số nguyên" })
      .positive({ message: "Giá tiền phải lớn hơn 0" })
      .min(1000, { message: "Giá tiền phải lớn hơn 1000" })
      .max(100000, { message: "Giá tiền phải nhỏ hơn 100000" }),

    dishGeneralDescription: z
      .string()
      .trim()
      .min(1, { message: "Mô tả món ăn không được để trống" }),
    categoryId: z
      .string()
      .trim()
      .min(1, { message: "Danh mục món ăn không được để trống" }),
    isRefundable: z.boolean(),
    ingredients: z.array(
      z.object({
        ingredient: z.object({
          id: z.string().trim().min(1, {
            message: "Nguyên liệu không được để trống",
          }),
          name: z.string(),
          ingredientMeasureType: z.string(),
        }),
        quantity: z
          .number()
          .int({ message: "Số lượng phải là số nguyên" })
          .positive({ message: "Số lượng phải lớn hơn 0" })
          .min(1, { message: "Số lượng phải lớn hơn 0" }),
      })
    ),
    // .min(1, { message: "Món ăn phải có ít nhất 1 nguyên liệu" })
    // .optional(),
    percentPriceDifference: z
      .number()
      .int({ message: "Phần trăm chênh lệch phải là số nguyên" })
      .min(0, { message: "Phần trăm chênh lệch phải lớn hơn hoặc bằng 0%" })
      .max(100, {
        message: "Phần trăm chênh lệch phải nhỏ hơn hoặc bằng 100%",
      }),
  })
  .refine(
    (data) => {
      if (
        !data.isRefundable &&
        (!data.ingredients || data.ingredients.length === 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Món ăn không thể trả lại phải có ít nhất 1 nguyên liệu",
      path: ["ingredients"],
    }
  );

export const createDishGeneralSchema = z.object({
  dishGeneralName: z
    .string()
    .trim()
    .min(1, { message: "Tên món ăn không được để trống" }),
  dishGeneralPrice: z
    .number()
    .int({ message: "Giá tiền phải là số nguyên" })
    .positive({ message: "Giá tiền phải lớn hơn 0" })
    .min(1, { message: "Giá tiền phải lớn hơn 0" }),

  dishGeneralDescription: z
    .string()
    .trim()
    .min(1, { message: "Mô tả món ăn không được để trống" }),
  categoryId: z
    .string()
    .trim()
    .min(1, { message: "Danh mục món ăn không được để trống" }),
  isRefundable: z.boolean(),
  ingredients: z
    .array(
      z.object({
        ingredient: z.object({
          id: z.string().trim().min(1, {
            message: "Nguyên liệu không được để trống",
          }),
          name: z.string(),
          ingredientMeasureType: z.string(),
        }),
        quantity: z
          .number()
          .int({ message: "Số lượng phải là số nguyên" })
          .positive({ message: "Số lượng phải lớn hơn 0" })
          .min(1, { message: "Số lượng phải lớn hơn 0" }),
      })
    )
    .default([]),
  percentPriceDifference: z
    .number()
    .int({ message: "Phần trăm chênh lệch phải là số nguyên" })
    .min(0, { message: "Phần trăm chênh lệch phải lớn hơn hoặc bằng 0" }),
  images: z.any(),
});

export const addIngredientInDishGeneralSchema = z.object({
  ingredients: z
    .array(
      z.object({
        ingredient: z.object({
          id: z.string().trim().min(1, {
            message: "Nguyên liệu không được để trống",
          }),
          name: z.string(),
          ingredientMeasureType: z.string(),
        }),
        quantity: z
          .number()
          .int({ message: "Số lượng phải là số nguyên" })
          .positive({ message: "Số lượng phải lớn hơn 0" })
          .min(1, { message: "Số lượng phải lớn hơn 0" }),
      })
    )
    .min(1, { message: "Món ăn phải có ít nhất 1 nguyên liệu" }),
});

export const deleteIngredientInDishGeneralSchema = z.object({
  dishGeneralId: z.string(),
  ingredientId: z.array(z.string()),
});

export const updateIngredientQuantityInDishGeneralSchema = z.object({
  updateIngredient: z
    .array(
      z.object({
        ingredientGeneralId: z.string(),
        quantity: z
          .number()
          .int({ message: "Số lượng phải là số nguyên" })
          .positive({ message: "Số lượng phải lớn hơn 0" })
          .min(1, { message: "Số lượng phải lớn hơn 0" }),
      })
    )
    .min(1, { message: "Món ăn phải có ít nhất 1 nguyên liệu" }),
  id: z.string(),
});

export const updateDishGeneralNormalInformationFormSchema = z.object({
  dishGeneralName: z
    .string()
    .trim()
    .min(1, { message: "Tên món ăn không được để trống" }),
  price: z
    .number({ message: "Giá tiền phải là số" })
    .int({ message: "Giá tiền phải là số nguyên" })
    .positive({ message: "Giá tiền phải lớn hơn 0" })
    .min(1, { message: "Giá tiền phải lớn hơn 0" }),

  percentagePriceDifference: z
    .number({ message: "Phần trăm chênh lệch phải là số" })
    .int({ message: "Phần trăm chênh lệch phải là số nguyên" })
    .min(0, { message: "Phần trăm chênh lệch phải lớn hơn hoặc bằng 0%" })
    .max(100, { message: "Phần trăm chênh lệch phải nhỏ hơn hoặc bằng 100%" }),

  dishGeneralDescription: z
    .string()
    .trim()
    .min(1, { message: "Mô tả món ăn không được để trống" }),
  categoryId: z
    .string()
    .trim()
    .min(1, { message: "Danh mục món ăn không được để trống" }),
});
