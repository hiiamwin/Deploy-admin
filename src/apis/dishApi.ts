import MyError from "@/helper";
import { Dish, DishDetail, GetResponseType } from "@/types";

export async function getDishes(
  page: string,
  name: string,
  restaurantId: string,
  status: string,
  pageSize: string = "5",
  token: string
): Promise<GetResponseType<Dish>> {
  const res = await fetch(
    `${process.env.API_URL}/v1/Dish/dish?PagingRequest.Page=${page}&PagingRequest.PageSize=${pageSize}&Status${status}&RestaurantId=${restaurantId}&DishName=${name}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();

  return data;
}

export async function getDishById(
  id: string,
  token: string
): Promise<DishDetail> {
  const res = await fetch(`${process.env.API_URL}/v1/Dish/${id}/detail`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const data = await res.json();
    console.log(data);

    throw new Error("Something went wrong");
  }
  const data = await res.json();
  return data;
}

export async function addDish(productId: string[], token: string) {
  const res = await fetch(`${process.env.API_URL}/v1/Dish/addProduct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) {
    const data = await res.json();
    console.log(data);

    throw Error("Something went wrong");
  }
  const data = await res.json();

  return data.message;
}

export async function inactiveDish(id: string, token: string) {
  const res = await fetch(`${process.env.API_URL}/v1/Dish/${id}/inactive`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const data = await res.json();
    console.log(data);
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  return data.message;
}

export async function activeDish(id: string, token: string) {
  const res = await fetch(`${process.env.API_URL}/v1/Dish/${id}/active`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new MyError(data.statusCode, data.message);
  }
  const data = await res.json();

  return data.message;
}

export async function changeDishPrice(
  id: string,
  price: number,
  token: string
) {
  const res = await fetch(`${process.env.API_URL}/v1/Dish/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify({ price }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new MyError(data.statusCode, data.message);
  }
  const data = await res.json();
  console.log(data);

  return data.message;
}
