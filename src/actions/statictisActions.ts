"use server";
import { z } from "zod";
import { authActionClient } from "./safe-action";
import {
  getCustomerStatistic,
  getOrderStatistic,
  getRevenueStatistic,
} from "@/apis";

export const getRevenueStatisticAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getRevenueStatistic(
      parsedInput.timeFrame,
      parsedInput.date,
      accesstoken
    );
    return data;
  });

export const getOrderStatisticAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getOrderStatistic(
      parsedInput.timeFrame,
      parsedInput.date,
      accesstoken
    );
    return data;
  });

export const getCustomerStatisticAction = authActionClient
  .schema(z.object({ timeFrame: z.number(), date: z.string() }))
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getCustomerStatistic(
      parsedInput.timeFrame,
      parsedInput.date,
      accesstoken
    );
    return data;
  });
