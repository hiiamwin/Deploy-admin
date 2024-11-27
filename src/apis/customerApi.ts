import { Customer, GetResponseType } from "@/types";

export async function getCustomer(
  page: string,
  //   pageSize: string,
  token: string,
  userName: string
): Promise<GetResponseType<Customer>> {
  const response = await fetch(
    `${process.env.API_URL}/User/users?PagingRequest.Page=${page}&PagingRequest.PageSize=5&UserName=${userName}`,
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
  const data = await response.json();
  return data;
}
