import MyError from "@/helper";
import { Combo, CreateCombo, GetResponseType } from "@/types";

export async function getCombo(
  page: string,
  name: string,
  status: string,
  token: string,
  RestaurantId: string
): Promise<GetResponseType<Combo>> {
  const response = await fetch(
    `${process.env.API_URL}/v1/Combo?PagingRequest.Page=${page}&PagingRequest.PageSize=5&ComboName=${name}&ComboStatus=${status}&RestaurantId=${RestaurantId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw Error("Something went wrong");
  }
  const data = await response.json();

  return data;
}

export async function createCombo(newCombo: CreateCombo, token: string) {
  const response = await fetch(`${process.env.API_URL}/v1/Combo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newCombo),
    cache: "no-store",
  });
  if (!response.ok) {
    const data = await response.json();
    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await response.json();
  return data.message;
}

export async function inactiveCombo(id: string, token: string) {
  const response = await fetch(
    `${process.env.API_URL}/v1/Combo/${id}/inactive`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw Error("Something went wrong");
  }
  const data = await response.json();
  return data.message;
}

export async function activeCombo(id: string, token: string) {
  const response = await fetch(`${process.env.API_URL}/v1/Combo/${id}/active`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw Error("Something went wrong");
  }
  const data = await response.json();
  return data.message;
}

export async function getDetailCombo(id: string, token: string) {
  const response = await fetch(`${process.env.API_URL}/v1/Combo/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw Error("Something went wrong");
  }
  const data = await response.json();
  return data;
}
