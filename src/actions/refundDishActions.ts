"use server";
import { downloadRefundDishFile, uploadRefundDishFile } from "@/apis";
import { authActionClient } from "./safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const downloadRefundDishFileAction = authActionClient.action(
  async ({ ctx: { accesstoken } }) => {
    const arrayBuffer = await downloadRefundDishFile(accesstoken);
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return base64;
  }
);

export const uploadRefundDishFileAction = authActionClient
  .schema(
    z.object({
      file: z.any(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await uploadRefundDishFile(parsedInput.file, accesstoken);
    revalidatePath("/refundDish");
    return data;
  });
