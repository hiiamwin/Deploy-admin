"use server";

import {
  activeAndInactiveEmployeeSchema,
  createEmployeeFormSchema,
} from "@/schemas";
import { actionClient } from "./safe-action";
import { activeWaiter, createWaiter, inactiveWaiter } from "@/apis";
import { revalidatePath } from "next/cache";

export const createWaiterAction = actionClient
  .schema(createEmployeeFormSchema)
  .action(async ({ parsedInput }) => {
    const message = await createWaiter({
      ...parsedInput,
      roleId: 2,
      restaurantId: "d42cf3c6-cbe4-4431-ac91-9eae870fa007",
    });
    revalidatePath("/staff");
    return message;
  });

export const activeWaiterAction = actionClient
  .schema(activeAndInactiveEmployeeSchema)
  .action(async ({ parsedInput }) => {
    const message = await activeWaiter(parsedInput.id);
    revalidatePath("/staff");
    return message;
  });

export const inactiveWaiterAction = actionClient
  .schema(activeAndInactiveEmployeeSchema)
  .action(async ({ parsedInput }) => {
    const message = await inactiveWaiter(parsedInput.id);
    revalidatePath("/staff");
    return message;
  });
