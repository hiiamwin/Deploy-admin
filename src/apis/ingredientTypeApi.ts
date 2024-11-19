import MyError from "@/helper";
import { GetResponseType, IngredientType } from "@/types";

export async function getIngredientTypes(
  page: string,
  ingredientTypeName: string,
  pageSize: string = "5"
): Promise<GetResponseType<IngredientType>> {
  const response = await fetch(
    `${process.env.API_URL}/v1/IngredientType?PagingRequest.Page=${page}&PagingRequest.PageSize=${pageSize}&IngredientTypeName=${ingredientTypeName}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
}

export async function createIngredientType(
  ingredientTypeName: string,
  ingredientTypeDescription: string,
  token: string
): Promise<string> {
  const response = await fetch(`${process.env.API_URL}/v1/IngredientType`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ingredientTypeName, ingredientTypeDescription }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await response.json();
  return data.message;
}

export async function updateIngredientType(
  id: string,
  ingredientTypeName: string,
  ingredientTypeDescription: string,
  token: string
): Promise<string> {
  const response = await fetch(
    `${process.env.API_URL}/v1/IngredientType/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ingredientTypeName, ingredientTypeDescription }),
    }
  );

  if (!response.ok) {
    const data = await response.json();

    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await response.json();

  return data.message;
}
