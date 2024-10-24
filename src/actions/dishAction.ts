"use server";
import { z } from "zod";
import { authActionClient } from "./safe-action";
import {
  activeDish,
  addDish,
  getDishById,
  getDishGeneral,
  inactiveDish,
} from "@/apis";
import { revalidatePath } from "next/cache";

export const getDishGeneralAction = authActionClient
  .schema(
    z.object({
      dishName: z.string(),
      page: z.string(),
      categoryId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getDishGeneral(
      parsedInput.page,
      parsedInput.dishName,
      "10",
      accesstoken,
      "",
      parsedInput.categoryId
    );
    return data;
  });

export const getDishByIdAction = authActionClient
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getDishById(parsedInput.id, accesstoken);
    return data;
  });

export const addDishAction = authActionClient
  .schema(
    z.object({
      productId: z.array(z.string()),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await addDish(parsedInput.productId, accesstoken);
    revalidatePath("//managerDish");
    return message;
  });

export const inactiveDishAction = authActionClient
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await inactiveDish(parsedInput.id, accesstoken);
    revalidatePath("/managerDish");
    return message;
  });

export const activeDishAction = authActionClient
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await activeDish(parsedInput.id, accesstoken);
    revalidatePath("/managerDish");
    return message;
  });
