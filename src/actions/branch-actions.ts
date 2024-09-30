"use server";

import {
  createRestaurantFormSchema,
  activeAndInactiveRestaurantSchema,
  updateRestaurantFormSchema,
} from "@/schemas";
import { actionClient } from "./safe-action";
import {
  activeRestaurant,
  createRestaurant,
  inActiveRestaurant,
  updateRestaurant,
} from "@/apis";
import { revalidatePath } from "next/cache";

export const createRestaurantAction = actionClient
  .schema(createRestaurantFormSchema)
  .action(async ({ parsedInput }) => {
    const mesage = await createRestaurant(parsedInput);
    revalidatePath("/branch");
    return mesage;
  });

export const activeRestaurantAction = actionClient
  .schema(activeAndInactiveRestaurantSchema)
  .action(async ({ parsedInput }) => {
    const mesage = await activeRestaurant(parsedInput.id);
    revalidatePath("/branch");
    return mesage;
  });

export const inactiveRestaurantAction = actionClient
  .schema(activeAndInactiveRestaurantSchema)
  .action(async ({ parsedInput }) => {
    const mesage = await inActiveRestaurant(parsedInput.id);
    revalidatePath("/branch");
    return mesage;
  });

export const updateRestaurantAction = actionClient
  .schema(updateRestaurantFormSchema)
  .action(
    async ({
      parsedInput: { address, id, restaurantName, restaurantPhone },
    }) => {
      const mesage = await updateRestaurant(id, {
        address,
        restaurantName,
        restaurantPhone,
      });
      revalidatePath("/branch");
      return mesage;
    }
  );
