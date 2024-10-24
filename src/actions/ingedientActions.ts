"use server";
import {
  createIngredientUnit,
  downloadIngredientFile,
  updateIngredientUnit,
  uploadIngredientFile,
} from "@/apis";
import { authActionClient } from "./safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createUnitSchema, updateUnitSchema } from "@/schemas";

export const downloadIngredientFileAction = authActionClient.action(
  async ({ ctx: { accesstoken } }) => {
    const arrayBuffer = await downloadIngredientFile(accesstoken);
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return base64;
  }
);

export const uploadIngredientFileAction = authActionClient
  .schema(
    z.object({
      file: z.any(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await uploadIngredientFile(parsedInput.file, accesstoken);
    revalidatePath("/ingredient");
    return data;
  });

export const createIngredientUnitAction = authActionClient
  .schema(createUnitSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await createIngredientUnit(parsedInput, accesstoken);
    revalidatePath("/ingredient");
    return message;
  });

export const updateIngredientUnitAction = authActionClient
  .schema(updateUnitSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    console.log(parsedInput);

    const message = await updateIngredientUnit(
      {
        unitName: parsedInput.unitName,
        conversionFactor: parsedInput.conversionFactor,
      },
      parsedInput.id,
      accesstoken
    );
    revalidatePath("/ingredient");
    return message;
  });
