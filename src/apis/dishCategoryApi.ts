import MyError from "@/helper";
import { DishCategory, GetResponseType } from "@/types";

export async function getDishCategory(
  page: string,
  CategoryName: string,
  pageSize = "5"
): Promise<GetResponseType<DishCategory>> {
  const response = await fetch(
    `${process.env.API_URL}/v1/Category?PagingRequest.Page=${page}&PagingRequest.PageSize=${pageSize}&CategoryName=${CategoryName}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();

  return data;
}

export async function createDishCategory(
  categoryName: string,
  token: string
): Promise<string> {
  const response = await fetch(`${process.env.API_URL}/v1/Category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ categoryName: categoryName }),
    cache: "no-store",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await response.json();
  return data.message;
}

export async function updateDishCategory(
  id: string,
  categoryName: string,
  token: string
): Promise<string> {
  const response = await fetch(`${process.env.API_URL}/v1/Category/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ categoryName: categoryName }),
    cache: "no-store",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await response.json();
  return data.message;
}
