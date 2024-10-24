"use server";

import { z } from "zod";
import { authActionClient } from "./safe-action";
import {
  activeDishGeneral,
  addIngredientInDishGeneral,
  createDishGeneral,
  deleteIngredientInDishGeneral,
  getDishCategory,
  getDishGeneralById,
  getIngredientGenerals,
  inactiveDishGeneral,
  updateIngredientQuantityInDishGeneral,
} from "@/apis";
import {
  addIngredientInDishGeneralSchema,
  createDishGeneralSchema,
  deleteIngredientInDishGeneralSchema,
  updateIngredientQuantityInDishGeneralSchema,
} from "@/schemas";
import { uploadImage } from "@/helper";
import { revalidatePath, revalidateTag } from "next/cache";

export const getIngredientGeneralAction = authActionClient
  .schema(
    z.object({
      ingredientGeneralName: z.string(),
      page: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getIngredientGenerals(
      parsedInput.page,
      parsedInput.ingredientGeneralName,
      accesstoken,
      "10"
    );
    return data;
  });

export const getDishCategoriesAction = authActionClient.action(async () => {
  const data = await getDishCategory("1", "", "8683");
  return data;
});

export const getDishGeneralByIdAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getDishGeneralById(parsedInput.id, accesstoken);
    return data;
  });

export const createDishGeneralAction = authActionClient
  .schema(createDishGeneralSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const imageUrls = await uploadImage(parsedInput.images);
    let ingredients: { ingredientId: string; quantity: number }[] = [];
    if (!parsedInput.isRefundable && parsedInput.ingredients.length > 0) {
      ingredients = parsedInput.ingredients.map((ingredient) => ({
        ingredientId: ingredient.ingredient.id,
        quantity: ingredient.quantity,
      }));
    }
    // const
    const newDishGeneral = {
      dishGeneralName: parsedInput.dishGeneralName,
      dishGeneralPrice: parsedInput.dishGeneralPrice,
      dishGeneralDescription: parsedInput.dishGeneralDescription,
      categoryId: parsedInput.categoryId,
      isRefund: parsedInput.isRefundable,
      ingredients: ingredients,
      percentPriceDifference: parsedInput.percentPriceDifference,
      images: imageUrls,
    };
    const message = await createDishGeneral(newDishGeneral, accesstoken);
    revalidatePath("/adminDish");

    return message;
  });

export const deleteIngredientInDishGeneralAction = authActionClient
  .schema(deleteIngredientInDishGeneralSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await deleteIngredientInDishGeneral(
      parsedInput.ingredientId,
      parsedInput.dishGeneralId,
      accesstoken
    );

    revalidateTag(`getDishGeneralById${parsedInput.dishGeneralId}`);
    return message;
  });

export const addIngredientInDishGeneralAction = authActionClient
  .schema(
    addIngredientInDishGeneralSchema.extend({ dishGeneralId: z.string() })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const ingredientAdds = parsedInput.ingredients.map((ingredient) => {
      return {
        ingredientId: ingredient.ingredient.id,
        quantity: ingredient.quantity,
      };
    });
    const message = await addIngredientInDishGeneral(
      ingredientAdds,
      accesstoken,
      parsedInput.dishGeneralId
    );

    revalidateTag(`getDishGeneralById${parsedInput.dishGeneralId}`);
    return message;
  });

export const updateIngredientQuantityInDishGeneralAction = authActionClient
  .schema(updateIngredientQuantityInDishGeneralSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await updateIngredientQuantityInDishGeneral(
      parsedInput.updateIngredient,
      parsedInput.id,
      accesstoken
    );

    return message;
  });

export const activeDishGeneralAction = authActionClient
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await activeDishGeneral(parsedInput.id, accesstoken);
    revalidatePath("/adminDish");
    return message;
  });

export const inactiveDishGeneralAction = authActionClient
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await inactiveDishGeneral(parsedInput.id, accesstoken);
    revalidatePath("/adminDish");
    return message;
  });
