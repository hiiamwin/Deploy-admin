"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();
export const autocomplete = async (input: string) => {
  if (!input) return [];

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: "",
      },
    });

    return response.data.predictions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("error", error.response.data);
  }
};
