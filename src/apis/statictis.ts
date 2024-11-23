export async function getCurrentStatictis(token: string) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/current-statistic`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function getRevenueStatistic(
  timeFrame: number,
  date: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/revenue?TimeFrame=${timeFrame}&ChosenDate=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function getOrderStatistic(
  timeFrame: number,
  date: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/orders?TimeFrame=${timeFrame}&ChosenDate=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function getCustomerStatistic(
  timeFrame: number,
  date: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/customers?TimeFrame=${timeFrame}&ChosenDate=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}
