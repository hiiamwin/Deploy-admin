"use server";

import { authActionClient } from "@/actions/safe-action";
import {
  getEmployeeInShiftAtDate,
  getQRCode,
  getUnassignedEmployees,
  getWeeklyShiftCount,
  registerSchedule,
  unregisterSchedule,
} from "@/apis";
import { decrypt } from "@/helper";
import { format, parse } from "date-fns";
import { vi } from "date-fns/locale";
import { cookies } from "next/headers";
import { z } from "zod";

export const getWeeklyShiftCountAction = authActionClient
  .schema(
    z.object({
      date: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getWeeklyShiftCount(parsedInput.date, accesstoken);
    return data;
  });

export const getUnassignedEmployeesAction = authActionClient
  .schema(
    z.object({
      shiftId: z.string(),
      date: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const parsedDate = parse(parsedInput.date, "EEEE,dd/MM/yyyy", new Date(), {
      locale: vi,
    });
    const formattedDate = format(parsedDate, "yyyy-MM-dd");
    const data = await getUnassignedEmployees(
      parsedInput.shiftId,
      formattedDate,
      accesstoken
    );
    return data;
  });

export const registerScheduleAction = authActionClient
  .schema(
    z.object({
      date: z.string(),
      shiftId: z.string(),
      employeeIds: z.array(z.string()),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const parsedDate = parse(parsedInput.date, "EEEE,dd/MM/yyyy", new Date(), {
      locale: vi,
    });
    const formattedDate = format(parsedDate, "yyyy-MM-dd");
    const data = await registerSchedule(
      formattedDate,
      parsedInput.shiftId,
      parsedInput.employeeIds,
      accesstoken
    );
    return data;
  });

export const getEmployeeInShiftAtDateAction = authActionClient
  .schema(z.object({ shiftId: z.string(), date: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const parsedDate = parse(parsedInput.date, "EEEE,dd/MM/yyyy", new Date(), {
      locale: vi,
    });
    const formattedDate = format(parsedDate, "yyyy-MM-dd");
    const data = await getEmployeeInShiftAtDate(
      parsedInput.shiftId,
      formattedDate,
      accesstoken
    );
    return data;
  });

export const unregisterScheduleAction = authActionClient
  .schema(z.object({ employeeId: z.string(), scheduleId: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await unregisterSchedule(
      parsedInput.employeeId,
      parsedInput.scheduleId,
      accesstoken
    );
    return data;
  });

export const getQRCodeAction = authActionClient
  .schema(
    z.object({
      shiftId: z.string(),
      date: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const cookie = cookies().get("session")?.value;
    if (!cookie) return null;
    const session = await decrypt(cookie);
    const data = await getQRCode(
      session.restaurantId as string,
      parsedInput.shiftId,
      parsedInput.date,
      accesstoken
    );
    return data;
  });
