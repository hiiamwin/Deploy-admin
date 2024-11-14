import MyError from "@/helper";
import {
  CreateDishGeneral,
  DishGeneral,
  DishGeneralDetail,
  GetResponseType,
} from "@/types";

export async function getDishGeneral(
  page: string,
  dishGeneralName: string,
  pageSize = "5",
  token: string,
  status: string,
  categoryId: string = ""
): Promise<GetResponseType<DishGeneral>> {
  const response = await fetch(
    `${process.env.API_URL}/v1/DishGeneral?DishGeneralName=${dishGeneralName}&PagingRequest.Page=${page}&PagingRequest.PageSize=${pageSize}&CategoryId=${categoryId}&Status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
      cache: "no-store",
    }
  );
  if (!response.ok) {
    const data = await response.json();
    console.log(data);

    throw Error("Error");
  }
  const data = await response.json();

  return data;
}

export async function getDishGeneralById(
  id: string,
  token: string
): Promise<DishGeneralDetail> {
  const response = await fetch(`${process.env.API_URL}/v1/DishGeneral/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new MyError(500, "Error");
  }
  const data = await response.json();

  return data.metadata;
}

export async function createDishGeneral(
  newDishGeneral: CreateDishGeneral,
  token: string
) {
  const response = await fetch(`${process.env.API_URL}/v1/DishGeneral`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newDishGeneral),
    cache: "no-store",
  });
  if (!response.ok) {
    const data = await response.json();

    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await response.json();

  return data.message;
}

export async function deleteIngredientInDishGeneral(
  ingredientId: string[],
  dishGeneralId: string,
  token: string
) {
  const response = await fetch(
    `${process.env.API_URL}/v1/DishGeneral/${dishGeneralId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ingredientId }),
      cache: "no-store",
    }
  );
  if (!response.ok) {
    const data = await response.json();
    console.log(data);
    throw new MyError(500, "Error");
  }
  const data = await response.json();

  return data.message;
}

export async function addIngredientInDishGeneral(
  ingredientAdds: { ingredientId: string; quantity: number }[],
  token: string,
  dishGeneralId: string
) {
  const response = await fetch(
    `${process.env.API_URL}/v1/DishGeneral/${dishGeneralId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ingredientAdds }),
      cache: "no-store",
    }
  );
  if (!response.ok) {
    const data = await response.json();
    console.log(data);

    throw new MyError(500, "Error");
  }
  const data = await response.json();

  return data.message;
}

export async function updateIngredientQuantityInDishGeneral(
  updateIngredient: { ingredientGeneralId: string; quantity: number }[],
  dishGeneralId: string,
  token: string
) {
  const response = await fetch(
    `${process.env.API_URL}/v1/DishGeneral/${dishGeneralId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ updateIngredient }),
      cache: "no-store",
    }
  );
  if (!response.ok) {
    const data = await response.json();
    console.log(data);

    throw new MyError(500, "Error");
  }
  const data = await response.json();

  return data.message;
}

export async function inactiveDishGeneral(id: string, token: string) {
  const response = await fetch(
    `${process.env.API_URL}/v1/DishGeneral/${id}/inactive`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new MyError(500, "Error");
  }
  const data = await response.json();

  return data.message;
}

export async function activeDishGeneral(id: string, token: string) {
  const response = await fetch(
    `${process.env.API_URL}/v1/DishGeneral/${id}/active`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new MyError(500, "Error");
  }
  const data = await response.json();

  return data.message;
}
