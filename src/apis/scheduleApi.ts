import {
  AssignedEmployeeInfo,
  UnassignedEmployeeInfo,
  WeeklyShiftCount,
} from "@/types";

export async function getWeeklyShiftCount(
  date: string,
  token: string
): Promise<WeeklyShiftCount[]> {
  const response = await fetch(
    `${process.env.API_URL}/Schedule/weekly-shift-count?SpecificDate=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function getUnassignedEmployees(
  shiftId: string,
  date: string,
  token: string
): Promise<UnassignedEmployeeInfo[]> {
  const response = await fetch(
    `${process.env.API_URL}/Schedule/unassigned-employees?ShiftId=${shiftId}&Date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function getEmployeeInShiftAtDate(
  shiftId: string,
  date: string,
  token: string
): Promise<AssignedEmployeeInfo[]> {
  const response = await fetch(
    `${process.env.API_URL}/Schedule/shift-employees?ShiftId=${shiftId}&Date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function registerSchedule(
  date: string,
  shiftId: string,
  employeeIds: string[],
  token: string
) {
  const response = await fetch(`${process.env.API_URL}/Schedule/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      date,
      shiftId,
      employeeIds,
    }),
  });
  const data = await response.json();

  return data;
}

export async function unregisterSchedule(
  employeeId: string,
  scheduleId: string,
  token: string
) {
  const response = await fetch(`${process.env.API_URL}/Schedule/unregister`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      employeeId,
      scheduleId,
    }),
  });
  const data = await response.json();
  return data;
}

export async function getQRCode(
  restaurantId: string,
  shiftId: string,
  date: string,
  token: string
) {
  const response = await fetch(
    `${process.env.API_URL}/Attendance/qr?RestaurantId=${restaurantId}&ShiftId=${shiftId}&Date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return data;
}
