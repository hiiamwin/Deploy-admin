"use server";

import { z } from "zod";
import { authActionClient } from "./safe-action";
import { confirmMoney, getOrderDetail } from "@/apis";
import { revalidatePath } from "next/cache";

export const getOrderDetailAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getOrderDetail(parsedInput.id, accesstoken);

    return data;
  });

export const confirmMoneyAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await confirmMoney(parsedInput.id, accesstoken);
    revalidatePath("/order");
    return data;
  });
