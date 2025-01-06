/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getRevenueRankingAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
  addMonths,
  addWeeks,
  addYears,
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
import { Crown, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function RevenueRanking() {
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
    queryKey: ["revenueRanking", { timeFrame: period, date }],
    queryFn: () =>
      getRevenueRankingAction({
        timeFrame: period === "week" ? 0 : period === "month" ? 1 : 2,
        date,
      }),
    refetchOnWindowFocus: false,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center pb-2 space-y-0 justify-between">
        <Button
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
        </Button>
        <CardTitle>
          <div className="text-2xl font-bold  flex items-center gap-2 justify-center">
            Top Doanh Thu Chi Nhánh
            <Crown className="w-4 h-4 text-yellow-500" />
          </div>
        </CardTitle>
        <Button
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
        </Button>
      </CardHeader>
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
        <SelectTrigger className="w-32 float-right my-2 mr-2 text-base">
          <SelectValue placeholder="Chọn thời gian" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">Tuần</SelectItem>
          <SelectItem value="month">Tháng</SelectItem>
          <SelectItem value="year">Năm</SelectItem>
        </SelectContent>
      </Select>
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
                <TableHead className="text-right text-xl">Doanh Thu</TableHead>
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
                    {branch.totalRevenues.toLocaleString("vi-VN")} đ
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

export default RevenueRanking;
