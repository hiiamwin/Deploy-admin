"use server";

import { z } from "zod";
import { authActionClient } from "./safe-action";
import { getLocations } from "@/apis";

export const getLocationsAction = authActionClient
  .schema(
    z.object({
      query: z.string(),
    })
  )
  .action(async ({ parsedInput }) => {
    const data = await getLocations(parsedInput.query);

    return data;
  });
