import { GetResponseType, Table } from "@/types";

export async function getTables(
  page: string,
  tableNumber: string,
  tableStatus: string,
  token: string
): Promise<GetResponseType<Table>> {
  const response = await fetch(
    `${process.env.API_URL}/Table?PagingRequest.Page=${page}&PagingRequest.PageSize=5&TableNumber=${tableNumber}&TableStatus=${tableStatus}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
}

export async function createTable(
  restaurantId: string,
  quantity: number,
  token: string
) {
  const response = await fetch(
    `${process.env.API_URL}/Table/${restaurantId}?Amount=${quantity}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);

  return data.message;
}
