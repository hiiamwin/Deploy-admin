import { GetResponseType, Order, OrderDetail } from "@/types";

export async function getOrder(
  page: string,
  phone: string,
  token: string
): Promise<GetResponseType<Order>> {
  const response = await fetch(
    `${process.env.API_URL}/Order?PagingRequest.Page=${page}&PagingRequest.PageSize=5&PhoneNumber=${phone}`,
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

export async function getOrderDetail(
  id: string,
  token: string
): Promise<OrderDetail> {
  const response = await fetch(`${process.env.API_URL}/Order/${id}/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}
