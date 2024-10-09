"use server";

import {
  createRestaurantFormSchema,
  activeAndInactiveRestaurantSchema,
  updateRestaurantFormSchema,
} from "@/schemas";
import { authActionClient } from "./safe-action";
import {
  activeRestaurant,
  createRestaurant,
  inActiveRestaurant,
  updateRestaurant,
} from "@/apis";
import { revalidatePath } from "next/cache";

export const createRestaurantAction = authActionClient
  .schema(createRestaurantFormSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const mesage = await createRestaurant(parsedInput, accesstoken);
    revalidatePath("/restaurant");
    return mesage;
  });

export const activeRestaurantAction = authActionClient
  .schema(activeAndInactiveRestaurantSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const mesage = await activeRestaurant(parsedInput.id, accesstoken);
    revalidatePath("/restaurant");
    return mesage;
  });

export const inactiveRestaurantAction = authActionClient
  .schema(activeAndInactiveRestaurantSchema)
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const mesage = await inActiveRestaurant(parsedInput.id, accesstoken);
    revalidatePath("/restaurant");
    return mesage;
  });

export const updateRestaurantAction = authActionClient
  .schema(updateRestaurantFormSchema)
  .action(
    async ({
      parsedInput: { address, id, restaurantName, restaurantPhone },
      ctx: { accesstoken },
    }) => {
      const mesage = await updateRestaurant(
        id,
        {
          address,
          restaurantName,
          restaurantPhone,
        },
        accesstoken
      );
      revalidatePath("/restaurant");
      return mesage;
    }
  );
