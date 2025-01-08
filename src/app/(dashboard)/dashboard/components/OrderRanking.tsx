/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Crown, Loader2 } from "lucide-react";
import {
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isSameMonth,
  isSameWeek,
  isSameYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { vi } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { getOrderRankingAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function OrderRanking() {
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

  const { data, isFetching } = useQuery({
    queryKey: ["orderRanking", { timeFrame: period, date }],
    queryFn: () =>
      getOrderRankingAction({
        timeFrame: period === "week" ? 0 : period === "month" ? 1 : 2,
        date,
      }),
    refetchOnWindowFocus: false,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-center pb-2 space-y-0">
        {/* <Button
          size={"sm"}
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
          disabled={isFetching}
        >
          Trước
        </Button> */}

        <CardTitle>
          <div className="text-xl font-bold  flex items-center gap-2 justify-center">
            Top Đơn Hàng Chi Nhánh
            <Crown className="w-4 h-4 text-yellow-500" />(
            {period === "week"
              ? `${format(date, "dd/MM/yyy", { locale: vi })} - ${format(
                  endOfWeek(date, { weekStartsOn: 1 }),
                  "dd/MM/yyyy",
                  {
                    locale: vi,
                  }
                )}`
              : period === "month"
              ? `${format(date, "dd/MM/yyy", { locale: vi })} - ${format(
                  endOfMonth(date),
                  "dd/MM/yyyy",
                  {
                    locale: vi,
                  }
                )}`
              : `${format(date, "dd/MM/yyy", { locale: vi })} - ${format(
                  endOfYear(date),
                  "dd/MM/yyyy",
                  {
                    locale: vi,
                  }
                )}`}
            )
          </div>
        </CardTitle>
        {/* <Button
          size={"sm"}
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
        </Button> */}
      </CardHeader>

      <div className="float-right flex items-center justify-center space-x-2 mr-2">
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
          <SelectTrigger className="w-40 float-right my-2 mr-2 text-base">
            <SelectValue placeholder="Chọn thời gian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Trong Tuần</SelectItem>
            <SelectItem value="month">Trong Tháng</SelectItem>
            <SelectItem value="year">Trong Năm</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
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
          disabled={isFetching}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
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
          <ChevronRight />
        </Button>
      </div>

      <CardContent>
        {isFetching ? (
          <div className="w-full flex items-center justify-center h-[400px]">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32 text-xl">Xếp Hạng</TableHead>
                <TableHead className="text-xl">Chi Nhánh</TableHead>
                <TableHead className="text-right text-xl">Số Đơn</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-lg">
              {data?.data.map((branch: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell>{branch.restaurantName}</TableCell>
                  <TableCell className="text-right">
                    {branch.totalOrders}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default OrderRanking;
