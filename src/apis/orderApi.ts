import { GetResponseType, Order, OrderDetail } from "@/types";

export async function getOrder(
  page: string,
  phone: string,
  isAdminConfirm: boolean | string,
  token: string
): Promise<GetResponseType<Order>> {
  if (isAdminConfirm === "") {
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

  const response = await fetch(
    `${process.env.API_URL}/Order?PagingRequest.Page=${page}&PagingRequest.PageSize=5&PhoneNumber=${phone}&IsAdminConfirm=${isAdminConfirm}`,
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

export async function confirmMoney(id: string, token: string): Promise<void> {
  const response = await fetch(
    `${process.env.API_URL}/Payment/${id}/confirm-received-money`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();
  console.log(data);

  return data;
}
