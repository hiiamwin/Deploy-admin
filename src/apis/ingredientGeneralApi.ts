import MyError from "@/helper";
import {
  CreateIngredientGeneral,
  IngredientGeneralDetail,
  UpdateIngredientGeneral,
} from "@/types";

export async function getIngredientGenerals(
  page: string,
  IngredientGeneralName: string,
  token: string,
  pageSize: string = "5"
) {
  const response = await fetch(
    `${process.env.API_URL}/v1/IngredientGeneral?IngredientGeneralName=${IngredientGeneralName}&PagingRequest.Page=${page}&PagingRequest.PageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await response.json();

  return data;
}

export async function getIngredientGeneralById(
  id: string,
  token: string
): Promise<IngredientGeneralDetail> {
  const response = await fetch(
    `${process.env.API_URL}/v1/IngredientGeneral/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await response.json();

  return data;
}

export async function createIngredientGeneral(
  newIngedientGeneral: CreateIngredientGeneral,
  token: string
) {
  const response = await fetch(`${process.env.API_URL}/v1/IngredientGeneral`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newIngedientGeneral),
  });

  if (!response.ok) {
    const data = await response.json();

    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await response.json();
  console.log(data);

  return data.message;
}

export async function updateIngredientGeneral(
  updatedIngredientGeneral: UpdateIngredientGeneral,
  token: string
) {
  const response = await fetch(
    `${process.env.API_URL}/v1/IngredientGeneral/${updatedIngredientGeneral.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedIngredientGeneral),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    console.log(data);

    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await response.json();

  return data.message;
}

export async function activeIngredientGeneral(
  id: string,
  token: string
): Promise<string> {
  const response = await fetch(
    `${process.env.API_URL}/v1/IngredientGeneral/${id}/active`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return data.message;
}

export async function inActiveIngredientGeneral(
  id: string,
  token: string
): Promise<string> {
  const response = await fetch(
    `${process.env.API_URL}/v1/IngredientGeneral/${id}/inactive`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  if (data.statusCode === 400) {
    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }

  return data.message;
}

export async function getIngredientGeneralMeasure(token: string) {
  const response = await fetch(`${process.env.API_URL}/IngredientMeasure`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const data = await response.json();

  return data;
}

export async function createIngredientGeneralMeasure(
  ingredientMeasureName: string,
  token: string
) {
  const response = await fetch(`${process.env.API_URL}/IngredientMeasure`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ingredientMeasureName }),
  });

  if (!response.ok) {
    const data = await response.json();

    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await response.json();

  return data.message;
}
