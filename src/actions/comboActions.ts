"use server";
import { z } from "zod";
import { authActionClient } from "./safe-action";
import { activeCombo, createCombo, getDishes, inactiveCombo } from "@/apis";
import { cookies } from "next/headers";
import { decrypt, uploadASingleImage } from "@/helper";
import { createComboSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export const getDishesAction = authActionClient
  .schema(
    z.object({
      page: z.string(),
      name: z.string(),
      category: z.string(),
    })
  )
  .action(async ({ parsedInput }) => {
    const cookie = cookies().get("session")?.value;
    if (!cookie) return null;
    const session = await decrypt(cookie);
    const data = await getDishes(
      parsedInput.page,
      parsedInput.name,
      session.restaurantId as string,
      "",
      "10",
      parsedInput.category
    );
    return data;
  });

export const createComboAction = authActionClient
  .schema(createComboSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const thumbnailUrl = await uploadASingleImage(
      parsedInput.thumbnail.get("thumbnail")
    );

    const message = await createCombo(
      { ...parsedInput, thumbnail: thumbnailUrl },
      accesstoken
    );
    revalidatePath("/combo");
    return message;
  });

export const inactiveComboAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await inactiveCombo(parsedInput.id, accesstoken);
    revalidatePath("/combo");
    return message;
  });

export const activeComboAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await activeCombo(parsedInput.id, accesstoken);
    revalidatePath("/combo");
    return message;
  });
