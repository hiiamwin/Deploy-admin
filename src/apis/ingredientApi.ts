import MyError from "@/helper";
import { GetResponseType, Ingredient } from "@/types";

export async function getIngredients(
  page: string,
  name: string,
  token: string
): Promise<GetResponseType<Ingredient>> {
  const response = await fetch(
    `${process.env.API_URL}/v1/ingredients?IngredientName=${name}&PagingRequest.Page=${page}&PagingRequest.PageSize=5`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const data = await response.json();
  return data;
}

export async function downloadIngredientFile(
  token: string
): Promise<ArrayBuffer> {
  const response = await fetch(`${process.env.API_URL}/v1/ingredients/export`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}

export async function uploadIngredientFile(file: FormData, token: string) {
  const response = await fetch(`${process.env.API_URL}/v1/ingredients/import`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: file,
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const data = await response.json();
  console.log(data);
  return data.message;
}

export async function createIngredientUnit(
  newUnit: {
    unitName: string;
    conversionFactor: number;
    ingredientUnitParentId: string;
    ingredientId: string;
  },
  token: string
) {
  const response = await fetch(`${process.env.API_URL}/IngredientUnit`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(newUnit),
    cache: "no-store",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await response.json();
  return data.message;
}

export async function updateIngredientUnit(
  data: { unitName: string; conversionFactor: number },
  id: string,
  token: string
) {
  const response = await fetch(`${process.env.API_URL}/IngredientUnit/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!response.ok) {
    const data = await response.json();
    console.log(data);

    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const res = await response.json();
  return res.message;
}
