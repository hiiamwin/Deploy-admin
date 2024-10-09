"use server";
import {
  createDishCategoryFormSchema,
  updateDishCategoryFormSchema,
} from "@/schemas";
import { authActionClient } from "./safe-action";
import { createDishCategory, updateDishCategory } from "@/apis";
import { revalidatePath } from "next/cache";

export const createDishCategoryAction = authActionClient
  .schema(createDishCategoryFormSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const mesage = await createDishCategory(
      parsedInput.categoryName,
      accesstoken
    );
    revalidatePath("/dishCategory");
    return mesage;
  });

export const updateDishCategoryAction = authActionClient
  .schema(updateDishCategoryFormSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const mesage = await updateDishCategory(
      parsedInput.id,
      parsedInput.categoryName,
      accesstoken
    );
    revalidatePath("/dishCategory");
    return mesage;
  });
