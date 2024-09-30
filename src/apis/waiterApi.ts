import { CreateEmployee, Employee, GetResponseType } from "@/types";

export async function getWaiters(
  page: string,
  fullName: string,
  restaurantId: string = "d42cf3c6-cbe4-4431-ac91-9eae870fa007"
): Promise<GetResponseType<Employee>> {
  const res = await fetch(
    `${process.env.API_URL}/User/employee?PagingRequest.Page=${page}&PagingRequest.PageSize=5&PagingRequest.SortType=2&Role=Waiter&RestaurantId=${restaurantId}&FullName=${fullName}`,
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

export async function createWaiter(waiter: CreateEmployee) {
  const res = await fetch(`${process.env.API_URL}/User`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(waiter),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(JSON.stringify(data.errors));
  }
  const data = await res.json();
  return data.message;
}

export async function activeWaiter(id: string) {
  const res = await fetch(`${process.env.API_URL}/User/activate/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  return data.message;
}

export async function inactiveWaiter(id: string) {
  const res = await fetch(`${process.env.API_URL}/User/inactivate/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  return data.message;
}
