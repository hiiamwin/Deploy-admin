import { Dish, GetResponseType } from "@/types";

export async function getRefundDish(
  page: string,
  name: string,
  restaurantId: string,
  status: string,
  pageSize: string = "5",
  category: string = ""
): Promise<GetResponseType<Dish>> {
  const res = await fetch(
    `${process.env.API_URL}/v1/Dish/dish?PagingRequest.Page=${page}&PagingRequest.PageSize=${pageSize}&RestaurantId=${restaurantId}&DishName=${name}&Status=${status}&CategoryName=${category}&IsRefundDish=true`,
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

export async function downloadRefundDishFile(
  token: string
): Promise<ArrayBuffer> {
  const response = await fetch(
    `${process.env.API_URL}/RefundDishInventory/export`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}

export async function uploadRefundDishFile(
  file: FormData,
  token: string
): Promise<string> {
  const res = await fetch(`${process.env.API_URL}/RefundDishInventory/import`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: file,
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();
  return data.message;
}
