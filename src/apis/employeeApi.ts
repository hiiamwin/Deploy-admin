import MyError from "@/helper";
import { CreateEmployee, Employee, GetResponseType } from "@/types";

export async function getManagers(
  page: string,
  fullName: string,
  status: string
): Promise<GetResponseType<Employee>> {
  const response = await fetch(
    `${process.env.API_URL}/Employee/employee?PagingRequest.Page=${page}&PagingRequest.PageSize=5&Role=Manager&Status=${status}&FullName=${fullName}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
}

export async function getWaiters(
  page: string,
  fullName: string,
  restaurantId: string,
  status: string
): Promise<GetResponseType<Employee>> {
  const res = await fetch(
    // &Role=Waiter
    `${process.env.API_URL}/Employee/employee?PagingRequest.Page=${page}&PagingRequest.PageSize=5&RestaurantId=${restaurantId}&FullName=${fullName}&Status=${status}`,
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

export async function createEmployee(employee: CreateEmployee) {
  const res = await fetch(`${process.env.API_URL}/Employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(employee),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new MyError(data.statusCode, JSON.stringify(data.errors));
  }
  const data = await res.json();

  return data.message;
}

export async function activeEmployee(id: string) {
  const res = await fetch(`${process.env.API_URL}/Employee/activate/${id}`, {
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

export async function inactiveEmployee(id: string) {
  const res = await fetch(`${process.env.API_URL}/Employee/inactivate/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const data = await res.json();
    // throw new Error("Something went wrong");
    // console.log(data);

    throw new MyError(400, data.errors[0].message);
  }
  const data = await res.json();
  return data.message;
}

export async function getEmployeeSalary(
  id: string,
  date: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Salary/salary-restaurant?UserId=${id}&ChosenDate=${date}`,
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
