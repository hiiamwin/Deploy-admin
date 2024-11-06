"use server";
import { activeTable, createTable, inactiveTable } from "@/apis";
import { authActionClient } from "./safe-action";
import { decrypt } from "@/helper";
import { revalidatePath } from "next/cache";
import { createTableSchema } from "@/schemas";
import { cookies } from "next/headers";
import { z } from "zod";

export const createTableAction = authActionClient
  .schema(createTableSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const cookie = cookies().get("session")?.value;
    if (!cookie) return null;
    const session = await decrypt(cookie);

    const message = await createTable(
      session.restaurantId as string,
      parsedInput.quantity,
      accesstoken
    );
    revalidatePath("/table");
    return message;
  });

export const inactiveTableAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await inactiveTable(parsedInput.id, accesstoken);
    revalidatePath("/table");
    return message;
  });

export const activeTableAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await activeTable(parsedInput.id, accesstoken);
    revalidatePath("/table");
    return message;
  });
