/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getEmployeeSalaryAction } from "@/actions";
import { compareDesc, format, parseISO } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function ViewSalarySheet({
  id,
  isOpenViewSalarySheet,
  setIsOpenViewSalarySheet,
}: {
  id: string;
  isOpenViewSalarySheet: boolean;
  setIsOpenViewSalarySheet: Dispatch<SetStateAction<boolean>>;
}) {
  const currentMonth = parseInt(format(new Date(), "MM"));
  const currentYear = parseInt(format(new Date(), "yyyy"));
  const [selectedMonth, setSelectedMonth] = useState<string>(
    currentMonth.toString().padStart(2, "0")
  );

  const handleOpen = (value: boolean) => {
    setIsOpenViewSalarySheet(value);
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["salary", id, selectedMonth],
    queryFn: () =>
      getEmployeeSalaryAction({
        id,
        date: `${currentYear}-${selectedMonth}-01`,
      }),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [selectedMonth, refetch]);

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const monthNumber = i + 1;
    return {
      value: monthNumber.toString().padStart(2, "0"),
      label: `Tháng ${monthNumber}`,
    };
  });

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Sheet open={isOpenViewSalarySheet} onOpenChange={handleOpen}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className="bg-white overflow-y-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Xem lương nhân viên</SheetTitle>
          <SheetDescription>Chọn tháng để xem thông tin lương</SheetDescription>
          <Select value={selectedMonth} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn tháng" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SheetHeader>
        <div className="mt-4">
          {isFetching ? (
            <div className="w-full flex items-center justify-center">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : data && data.data.results.length > 0 ? (
            <Card className="border-none ">
              <CardHeader className="p-4">
                <CardTitle>
                  Thông tin lương tháng {selectedMonth}/{currentYear} (Tạm tính)
                </CardTitle>
              </CardHeader>
              <CardContent className="border-b pb-4 px-4">
                <div className="space-y-2">
                  <p>
                    <strong>Mã nhân viên:</strong>{" "}
                    {data.data.results[0].employeeCode}
                  </p>
                  <p>
                    <strong>Tên nhân viên:</strong>{" "}
                    {data.data.results[0].employeeName}
                  </p>
                  <p>
                    <strong>Tổng số ca:</strong>{" "}
                    {data.data.results[0].salary.totalShifts}
                  </p>
                  <p>
                    <strong>Tổng số giờ làm việc:</strong>{" "}
                    {data.data.results[0].salary.totalHoursWorked}
                  </p>
                  <p>
                    <strong>Số giờ làm việc thực tế:</strong>{" "}
                    {data.data.results[0].salary.actualHoursWorked}
                  </p>
                  <p>
                    <strong>Lương cơ bản:</strong>{" "}
                    {formatCurrency(data.data.results[0].salary.regularSalary)}
                  </p>
                  <p>
                    <strong>Lương làm thêm giờ:</strong>{" "}
                    {formatCurrency(data.data.results[0].salary.overtimeSalary)}
                  </p>
                  <p>
                    <strong>Tiền phạt:</strong> -
                    {formatCurrency(data.data.results[0].salary.penalty)}
                  </p>
                  <p className="text-lg font-bold">
                    <strong>Tổng lương:</strong>{" "}
                    {formatCurrency(data.data.results[0].salary.totalSalaries)}
                  </p>
                </div>
              </CardContent>

              <ScrollArea className="border-none h-[400px]">
                <Accordion type="single" collapsible className="p-4">
                  {data.data.results[0].salary.attendanceDetailsDtos
                    .reduce((acc: any, item: any) => {
                      const { date, shiftName, checkInTime, checkOutTime } =
                        item;
                      const existingItem = acc.find(
                        (i: any) => i.date === date
                      );
                      if (existingItem) {
                        existingItem.attendance.push({
                          shiftName,
                          checkInTime,
                          checkOutTime,
                        });
                        return acc;
                      }

                      acc.push({
                        date,
                        attendance: [{ shiftName, checkInTime, checkOutTime }],
                      });
                      return acc;
                    }, [])
                    .sort((a: any, b: any) => {
                      return compareDesc(parseISO(a.date), parseISO(b.date));
                    })
                    .map((attendanceDate: any, i: number) => (
                      <AccordionItem value={`item-${i}`} key={i}>
                        <AccordionTrigger>
                          Ngày {format(attendanceDate.date, "dd/MM/yyyy")}
                        </AccordionTrigger>
                        {attendanceDate.attendance.map(
                          (attendance: any, i: number) => (
                            <AccordionContent
                              className="flex items-center justify-between"
                              key={i}
                            >
                              Ca: {attendance.shiftName}{" "}
                              <div>
                                {attendance.checkInTime ===
                                "Chưa thực hiện CheckIn"
                                  ? attendance.checkInTime
                                  : attendance.checkInTime.split(" ")[1]}{" "}
                                -{" "}
                                {attendance.checkOutTime ===
                                "Chưa thực hiện CheckOut"
                                  ? attendance.checkOutTime
                                  : attendance.checkOutTime.split(" ")[1]}
                              </div>
                            </AccordionContent>
                          )
                        )}
                      </AccordionItem>
                    ))}
                </Accordion>
              </ScrollArea>
            </Card>
          ) : (
            <p>Không có dữ liệu lương cho tháng này</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ViewSalarySheet;
