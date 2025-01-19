export async function getCurrentStatictis(token: string) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/current-statistic`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export async function getRevenueStatistic(
  timeFrame: number,
  date: string,
  token: string,
  resId: string
) {
  if (resId === "all") {
    const res = await fetch(
      `${process.env.API_URL}/Statistics/revenue?TimeFrame=${timeFrame}&ChosenDate=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  }
  const res = await fetch(
    `${process.env.API_URL}/Statistics/revenue?TimeFrame=${timeFrame}&ChosenDate=${date}&RestaurantId=${resId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export async function getOrderStatistic(
  timeFrame: number,
  date: string,
  token: string,
  resId: string
) {
  if (resId === "all") {
    const res = await fetch(
      `${process.env.API_URL}/Statistics/orders?TimeFrame=${timeFrame}&ChosenDate=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  }
  const res = await fetch(
    `${process.env.API_URL}/Statistics/orders?TimeFrame=${timeFrame}&ChosenDate=${date}&RestaurantId=${resId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export async function getCustomerStatistic(
  timeFrame: number,
  date: string,
  token: string,
  resId: string
) {
  if (resId === "all") {
    const res = await fetch(
      `${process.env.API_URL}/Statistics/customers?TimeFrame=${timeFrame}&ChosenDate=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  }
  const res = await fetch(
    `${process.env.API_URL}/Statistics/customers?TimeFrame=${timeFrame}&ChosenDate=${date}&RestaurantId=${resId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export async function getRevenueRanking(
  timeFrame: number,
  date: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/top-restaurant-revenues?TimeFrame=${timeFrame}&ChosenDate=${date}&SortAscending=false`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export async function getOrderRanking(
  timeFrame: number,
  date: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/top-restaurant-orders?TimeFrame=${timeFrame}&ChosenDate=${date}&SortAscending=false`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export async function getTopDish(
  timeFrame: number,
  date: string,
  restaurantId: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/details-restaurant?TimeFrame=${timeFrame}&ChosenDate=${date}&TopNDish=10&RestaurantId=${restaurantId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export async function getTopCombo(
  timeFrame: number,
  date: string,
  restaurantId: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/details-restaurant?TimeFrame=${timeFrame}&ChosenDate=${date}&TopNCombo=10&RestaurantId=${restaurantId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export async function getTopRefundDish(
  timeFrame: number,
  date: string,
  restaurantId: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/details-restaurant?TimeFrame=${timeFrame}&ChosenDate=${date}&TopNRefundableDish=10&RestaurantId=${restaurantId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export async function getTopUnpopularDish(
  timeFrame: number,
  date: string,
  restaurantId: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/top-unpopular?TimeFrame=${timeFrame}&ChosenDate=${date}&TopNDish=10&RestaurantId=${restaurantId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  console.log(data);

  return data;
}

export async function getTopUnpopularCombo(
  timeFrame: number,
  date: string,
  restaurantId: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/top-unpopular?TimeFrame=${timeFrame}&ChosenDate=${date}&TopNCombo=10&RestaurantId=${restaurantId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export async function getTopUnpopularRefundDish(
  timeFrame: number,
  date: string,
  restaurantId: string,
  token: string
) {
  const res = await fetch(
    `${process.env.API_URL}/Statistics/top-unpopular?TimeFrame=${timeFrame}&ChosenDate=${date}&TopNRefundableDish=10&RestaurantId=${restaurantId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}
