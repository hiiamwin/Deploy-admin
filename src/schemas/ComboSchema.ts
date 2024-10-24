import { z } from "zod";

export const createComboFormSchema = z.object({
  comboName: z.string().min(1, "Vui lòng nhập tên combo"),
  comboDescription: z.string().min(1, "Vui lòng nhập mô tả cho combo"),
  price: z
    .number({ message: "Giá tiền không hợp lệ" })
    .positive("Giá tiền phải lớn hơn 0")
    .min(1, "Giá tiền không hợp lệ"),

  thumbnail: z.any().optional(),
  // isActive: z.boolean(),

  // thumbnail: z
  //   .custom<FileList>()
  //   .refine((files) => files.length === 1, "Vui lòng chọn một ảnh cho combo")
  //   .transform((files) => files[0]),

  productInCombos: z.array(
    z.object({
      productId: z.string(),
      quantity: z
        .number({ message: "Số lượng không hợp lệ" })
        .int()
        .min(1, "Số lượng ít nhất là 1"),
    })
  ),
});

export const createComboSchema = createComboFormSchema.extend({
  isActive: z.boolean(),
});
