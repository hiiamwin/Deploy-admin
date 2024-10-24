"use server";
import { createTable } from "@/apis";
import { authActionClient } from "./safe-action";
import { decrypt } from "@/helper";
import { revalidatePath } from "next/cache";
import { createTableSchema } from "@/schemas";
import { cookies } from "next/headers";

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
