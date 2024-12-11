import { z } from "zod";

export const createTableSchema = z.object({
  quantity: z
    .number({ message: "Số lượng bàn không hợp lệ" })
    .int("Số lượng bàn phải là số nguyên")
    .positive("Số lượng bàn phải lớn hơn 0")
    .min(1, "Số lượng bàn phải lớn hơn 0")
    .max(100, "Số lượng bàn không được vượt quá 100"),
});
