/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  format,
  startOfWeek,
  startOfMonth,
  startOfYear,
  subMonths,
  subYears,
  subWeeks,
  addWeeks,
  addMonths,
  addYears,
  isSameWeek,
  isSameMonth,
  isSameYear,
} from "date-fns";
import { vi } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getCustomerStatisticAction, getRestaurantAction } from "@/actions";
import { Loader2 } from "lucide-react";

function CustomerChart({ role }: { role: string }) {
  /**
   * 0: week
   * 1: month
   * 2: year
   */
  const [period, setPeriod] = useState("week");
  const [date, setDate] = useState(
    period === "week"
      ? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd", {
          locale: vi,
        })
      : period === "month"
      ? format(startOfMonth(new Date()), "yyyy-MM-dd", {
          locale: vi,
        })
      : format(startOfYear(new Date()), "yyyy-MM-dd", {
          locale: vi,
        })
  );

  const [res, setRes] = useState("all");

  const { data, isFetching } = useQuery({
    queryKey: ["getCustomerStatistic", { timeFrame: period, date, resId: res }],
    queryFn: () =>
      getCustomerStatisticAction({
        timeFrame: period === "week" ? 0 : period === "month" ? 1 : 2,
        date,
        resId: res,
      }),
    refetchOnWindowFocus: false,
  });

  const { data: restaurants, isFetching: isFetchingRestaurant } = useQuery({
    queryKey: ["restaurant"],
    queryFn: () => getRestaurantAction(),
    refetchOnWindowFocus: false,
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-evenly">
          <Button
            disabled={isFetching}
            onClick={() => {
              setDate((prevDate) => {
                const currentDate = new Date(prevDate);
                if (period === "week") {
                  return format(
                    startOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 1 }),
                    "yyyy-MM-dd",
                    {
                      locale: vi,
                    }
                  );
                } else if (period === "month") {
                  return format(
                    startOfMonth(subMonths(currentDate, 1)),
                    "yyyy-MM-dd",
                    { locale: vi }
                  );
                } else {
                  return format(
                    startOfYear(subYears(currentDate, 1)),
                    "yyyy-MM-dd",
                    { locale: vi }
                  );
                }
              });
            }}
          >
            Trước
          </Button>
          Khách hàng
          <Button
            onClick={() => {
              setDate((prevDate) => {
                const currentDate = new Date(prevDate);
                if (period === "week") {
                  return format(
                    startOfWeek(addWeeks(currentDate, 1), { weekStartsOn: 1 }),
                    "yyyy-MM-dd",
                    {
                      locale: vi,
                    }
                  );
                } else if (period === "month") {
                  return format(
                    startOfMonth(addMonths(currentDate, 1)),
                    "yyyy-MM-dd",
                    { locale: vi }
                  );
                } else {
                  return format(
                    startOfYear(addYears(currentDate, 1)),
                    "yyyy-MM-dd",
                    { locale: vi }
                  );
                }
              });
            }}
            disabled={
              (() => {
                const currentDate = new Date(date);
                const now = new Date();

                if (period === "week") {
                  return isSameWeek(currentDate, now, { weekStartsOn: 1 });
                } else if (period === "month") {
                  return isSameMonth(currentDate, now);
                } else {
                  return isSameYear(currentDate, now);
                }
              })() || isFetching
            }
          >
            Sau
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end gap-4">
          {role === "Administrator" && (
            <>
              {isFetchingRestaurant ? (
                <Loader2 className="animate-spin h-8 w-8" />
              ) : (
                <Select
                  defaultValue={res}
                  onValueChange={setRes}
                  disabled={isFetching}
                >
                  <SelectTrigger className="w-80">
                    <SelectValue placeholder="Chọn nhà hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"all"}>Tất cả</SelectItem>
                    {restaurants?.data?.results.map((restaurant: any) => (
                      <SelectItem value={restaurant.id} key={restaurant.id}>
                        {restaurant.restaurantName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </>
          )}

          <Select
            disabled={isFetching}
            value={period}
            onValueChange={(value: string) => {
              setPeriod(value);
              setDate(
                value === "week"
                  ? format(
                      startOfWeek(new Date(), { weekStartsOn: 1 }),
                      "yyyy-MM-dd",
                      {
                        locale: vi,
                      }
                    )
                  : value === "month"
                  ? format(startOfMonth(new Date()), "yyyy-MM-dd", {
                      locale: vi,
                    })
                  : format(startOfYear(new Date()), "yyyy-MM-dd", {
                      locale: vi,
                    })
              );
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần</SelectItem>
              <SelectItem value="month">Tháng</SelectItem>
              <SelectItem value="year">Năm</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isFetching ? (
          <div className="w-full flex items-center justify-center h-[400px]">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data?.data.map((item: any) => ({
                time: format(new Date(item.timePeriod), "dd/MM/yyyy", {
                  locale: vi,
                }),
                revenue: item.totalCustomers,
              }))}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                interval={period === "year" ? 0 : "preserveStartEnd"}
                angle={period === "year" ? 0 : -45}
                textAnchor={period === "year" ? "middle" : "end"}
                height={60}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="revenue"
                name="Khách hàng"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default CustomerChart;
