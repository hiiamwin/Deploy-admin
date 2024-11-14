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
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
} from "date-fns";
import { vi } from "date-fns/locale";

const generateData = (period: string) => {
  const today = new Date();
  let start, end, dateFormat;

  if (period === "week") {
    start = startOfWeek(today, { weekStartsOn: 1 });
    // start = startOfWeek(today);
    end = addDays(start, 6);
    dateFormat = "dd/MM/yyyy";
  } else if (period === "month") {
    start = startOfMonth(today);
    end = endOfMonth(today);
    dateFormat = "dd/MM/yyyy";
  } else {
    start = startOfYear(today);
    end = endOfYear(today);
    dateFormat = "MMMM";
  }

  const interval =
    period === "year"
      ? eachMonthOfInterval({ start, end })
      : eachDayOfInterval({ start, end });

  return interval.map((date) => ({
    name: format(date, dateFormat, { locale: vi }),
    revenue: Math.floor(Math.random() * 1000) + 500,
  }));
};

function RevenueChart({ role }: { role: string }) {
  const [period, setPeriod] = useState("week");
  const [restaurant, setRestaurant] = useState("all");
  const data = generateData(period);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Doanh thu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần</SelectItem>
              <SelectItem value="month">Tháng</SelectItem>
              <SelectItem value="year">Năm</SelectItem>
            </SelectContent>
          </Select>

          {role === "Administrator" && (
            <Select value={restaurant} onValueChange={setRestaurant}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Chọn nhà hàng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="month">nhà hàng thủ đức</SelectItem>
                <SelectItem value="year">nhà hàng quận 1</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
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
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default RevenueChart;
