"use server";

import {
  activeAndInactiveEmployeeSchema,
  createEmployeeSchema,
} from "@/schemas";
import { actionClient } from "./safe-action";
import {
  activeEmployee,
  createEmployee,
  getRestaurants,
  inactiveEmployee,
} from "@/apis";
import { revalidatePath } from "next/cache";

export const getRestaurantAction = actionClient.action(async () => {
  const data = await getRestaurants("1", "", "", "8683");
  return data;
});

export const createEmployeeAction = actionClient
  .schema(createEmployeeSchema)
  .action(async ({ parsedInput }) => {
    const message = await createEmployee(parsedInput);
    if (parsedInput.roleId === 1) {
      revalidatePath("/manager");
    }
    if (parsedInput.roleId === 2) {
      revalidatePath("/staff");
    }
    return message;
  });

export const activeEmployeeAction = actionClient
  .schema(activeAndInactiveEmployeeSchema)
  .action(async ({ parsedInput }) => {
    const message = await activeEmployee(parsedInput.id);

    revalidatePath(parsedInput.path);
    return message;
  });

export const inactiveEmployeeAction = actionClient
  .schema(activeAndInactiveEmployeeSchema)
  .action(async ({ parsedInput }) => {
    const message = await inactiveEmployee(parsedInput.id);
    revalidatePath(parsedInput.path);
    return message;
  });
