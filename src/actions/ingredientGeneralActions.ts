"use server";
import {
  activeIngredientGeneral,
  createIngredientGeneral,
  createIngredientGeneralMeasure,
  getIngredientGeneralById,
  getIngredientGeneralMeasure,
  getIngredientTypes,
  inActiveIngredientGeneral,
  updateIngredientGeneral,
} from "@/apis";
import { authActionClient } from "./safe-action";
import { z } from "zod";
import {
  ActiveAndInactiveIngredientGeneralSchema,
  CreateIngredientGeneralSchema,
  UpdateIngredientGeneralSchema,
} from "@/schemas";
import { revalidatePath } from "next/cache";

export const getIngredientTypesAction = authActionClient
  .schema(
    z.object({
      ingredientTypeName: z.string(),
      page: z.string(),
    })
  )
  .action(async ({ parsedInput: { ingredientTypeName, page } }) => {
    const data = await getIngredientTypes(page, ingredientTypeName, "10");
    return data;
  });

export const getIngredientGeneralByIdAction = authActionClient
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput: { id }, ctx: { accesstoken } }) => {
    const data = await getIngredientGeneralById(id, accesstoken);
    return data;
  });

export const createIngredientGeneralAction = authActionClient
  .schema(CreateIngredientGeneralSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await createIngredientGeneral(
      {
        ...parsedInput,
        ingredientMeasureId: parsedInput.ingredientMeasureType,
      },
      accesstoken
    );
    revalidatePath("/ingredientGeneral");
    return message;
  });

export const updateIngredientGeneralAction = authActionClient
  .schema(UpdateIngredientGeneralSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await updateIngredientGeneral(parsedInput, accesstoken);
    revalidatePath("/ingredientGeneral");
    return message;
  });

export const activeIngredientGeneralAction = authActionClient
  .schema(ActiveAndInactiveIngredientGeneralSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await activeIngredientGeneral(parsedInput.id, accesstoken);
    revalidatePath("/ingredientGeneral");
    return message;
  });

export const inActiveIngredientGeneralAction = authActionClient
  .schema(ActiveAndInactiveIngredientGeneralSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await inActiveIngredientGeneral(
      parsedInput.id,
      accesstoken
    );
    revalidatePath("/ingredientGeneral");
    return message;
  });

export const getIngredientGeneralMeasureAction = authActionClient.action(
  async ({ ctx: { accesstoken } }) => {
    const data = await getIngredientGeneralMeasure(accesstoken);
    return data;
  }
);

export const createIngredientGeneralMeasureAction = authActionClient
  .schema(z.object({ ingredientMeasureName: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await createIngredientGeneralMeasure(
      parsedInput.ingredientMeasureName,
      accesstoken
    );
    return data;
  });
