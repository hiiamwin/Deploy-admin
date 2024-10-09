"use server";

import {
  createIngredientTypeFormSchema,
  updateIngredientTypeFormSchema,
} from "@/schemas";
import { authActionClient } from "./safe-action";
import { createIngredientType, updateIngredientType } from "@/apis";
import { revalidatePath } from "next/cache";

export const createIngredientTypeAction = authActionClient
  .schema(createIngredientTypeFormSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await createIngredientType(
      parsedInput.ingredientTypeName,
      parsedInput.ingredientTypeDescription,
      accesstoken
    );
    revalidatePath("/ingredientType");
    return message;
  });

export const updateIngredientTypeAction = authActionClient
  .schema(updateIngredientTypeFormSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await updateIngredientType(
      parsedInput.id,
      parsedInput.ingredientTypeName,
      parsedInput.ingredientTypeDescription,
      accesstoken
    );
    revalidatePath("/ingredientType");
    return message;
  });
