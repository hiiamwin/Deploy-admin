"use server";
import { z } from "zod";
import { authActionClient } from "./safe-action";
import {
  getCustomerStatistic,
  getOrderStatistic,
  getRevenueStatistic,
  getRevenueRanking,
  getOrderRanking,
  getTopDish,
  getTopCombo,
  getTopRefundDish,
  getTopUnpopularDish,
  getTopUnpopularRefundDish,
  getTopUnpopularCombo,
} from "@/apis";

export const getRevenueStatisticAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
      resId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getRevenueStatistic(
      parsedInput.timeFrame,
      parsedInput.date,
      accesstoken,
      parsedInput.resId
    );
    return data;
  });

export const getOrderStatisticAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
      resId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getOrderStatistic(
      parsedInput.timeFrame,
      parsedInput.date,
      accesstoken,
      parsedInput.resId
    );
    return data;
  });

export const getCustomerStatisticAction = authActionClient
  .schema(
    z.object({ timeFrame: z.number(), date: z.string(), resId: z.string() })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getCustomerStatistic(
      parsedInput.timeFrame,
      parsedInput.date,
      accesstoken,
      parsedInput.resId
    );

    return data;
  });

export const getRevenueRankingAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getRevenueRanking(
      parsedInput.timeFrame,
      parsedInput.date,
      accesstoken
    );
    return data;
  });

export const getOrderRankingAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getOrderRanking(
      parsedInput.timeFrame,
      parsedInput.date,
      accesstoken
    );
    return data;
  });

export const getTopDishAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
      restaurantId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getTopDish(
      parsedInput.timeFrame,
      parsedInput.date,
      parsedInput.restaurantId,
      accesstoken
    );
    return data;
  });

export const getTopComboAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
      restaurantId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getTopCombo(
      parsedInput.timeFrame,
      parsedInput.date,
      parsedInput.restaurantId,
      accesstoken
    );
    return data;
  });

export const getTopRefundDishAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
      restaurantId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getTopRefundDish(
      parsedInput.timeFrame,
      parsedInput.date,
      parsedInput.restaurantId,
      accesstoken
    );
    return data;
  });

export const getTopUnpopularDishAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
      restaurantId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getTopUnpopularDish(
      parsedInput.timeFrame,
      parsedInput.date,
      parsedInput.restaurantId,
      accesstoken
    );
    return data;
  });

export const getTopUnpopularRefundDishAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
      restaurantId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getTopUnpopularRefundDish(
      parsedInput.timeFrame,
      parsedInput.date,
      parsedInput.restaurantId,
      accesstoken
    );
    return data;
  });

export const getTopUnpopularComboAction = authActionClient
  .schema(
    z.object({
      timeFrame: z.number(),
      date: z.string(),
      restaurantId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const data = await getTopUnpopularCombo(
      parsedInput.timeFrame,
      parsedInput.date,
      parsedInput.restaurantId,
      accesstoken
    );
    return data;
  });
