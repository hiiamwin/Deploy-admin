import MyError from "@/helper";
import {
  CreateRestaurant,
  GetResponseType,
  Restaurant,
  UpdateRestaurant,
} from "@/types";

export async function getRestaurants(
  page: string,
  address: string,
  restaurantStatus: string,
  pageSize = "5"
): Promise<GetResponseType<Restaurant>> {
  const res = await fetch(
    `${process.env.API_URL}/Restaurant?PagingRequest.Page=${page}&PagingRequest.PageSize=${pageSize}&PagingRequest.SortType=2&Address=${address}&RestaurantStatus=${restaurantStatus}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    const data = await res.json();
    console.log(data);

    throw new MyError(500, "Something went wrong");
  }
  const data = await res.json();

  return data;
}

export async function createRestaurant(
  restaurant: CreateRestaurant,
  token: string
): Promise<string> {
  const res = await fetch(`${process.env.API_URL}/Restaurant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(restaurant),
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await res.json();
  return data.message;
}

export async function updateRestaurant(
  id: string,
  restaurant: UpdateRestaurant,
  token: string
): Promise<string> {
  const res = await fetch(`${process.env.API_URL}/Restaurant/${id}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(restaurant),
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }

  const data = await res.json();
  return data.message;
}

export async function activeRestaurant(id: string, token: string) {
  const res = await fetch(`${process.env.API_URL}/Restaurant/${id}/active`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    cache: "no-store",
  });

  const data = await res.json();
  return data.message;
}

export async function inActiveRestaurant(id: string, token: string) {
  const res = await fetch(`${process.env.API_URL}/Restaurant/${id}/inactive`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POSt",
    cache: "no-store",
  });

  const data = await res.json();
  return data.message;
}
