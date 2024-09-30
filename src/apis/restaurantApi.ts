import {
  CreateAndUpdateRestaurant,
  GetResponseType,
  Restaurant,
} from "@/types";

export async function getRestaurants(
  page: string,
  address: string,
  restaurantStatus: string
): Promise<GetResponseType<Restaurant>> {
  const res = await fetch(
    `${process.env.API_URL}/Restaurant?PagingRequest.Page=${page}&PagingRequest.PageSize=5&PagingRequest.SortType=2&Address=${address}&RestaurantStatus=${restaurantStatus}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();

  return data;
}

export async function createRestaurant(
  restaurant: CreateAndUpdateRestaurant
): Promise<string> {
  const res = await fetch(`${process.env.API_URL}/Restaurant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restaurant),
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(JSON.stringify(data.errors));
  }
  const data = await res.json();
  return data.message;
}

export async function updateRestaurant(
  id: string,
  restaurant: CreateAndUpdateRestaurant
): Promise<string> {
  const res = await fetch(`${process.env.API_URL}/Restaurant/${id}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restaurant),
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(JSON.stringify(data.errors));
  }

  const data = await res.json();
  return data.message;
}

export async function activeRestaurant(id: string) {
  const res = await fetch(`${process.env.API_URL}/Restaurant/${id}/active`, {
    method: "POST",
    cache: "no-store",
  });

  const data = await res.json();
  return data.message;
}

export async function inActiveRestaurant(id: string) {
  const res = await fetch(`${process.env.API_URL}/Restaurant/${id}/inactive`, {
    method: "POSt",
    cache: "no-store",
  });

  const data = await res.json();
  return data.message;
}
