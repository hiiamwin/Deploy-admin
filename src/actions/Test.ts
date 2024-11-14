"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();
export const autocomplete = async (input: string) => {
  if (!input) return [];

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: "AIzaSyBJiskC6eMx2GrY9c9k2ZKlldWLdnBFGzw",
      },
    });

    return response.data.predictions;
  } catch (error) {
    console.error("error", error.response.data);
  }
};
