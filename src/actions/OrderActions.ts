"use server";

import { z } from "zod";
import { authActionClient } from "./safe-action";
import { getOrderDetail } from "@/apis";

export const getOrderDetailAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getOrderDetail(parsedInput.id, accesstoken);

    return data;
  });
