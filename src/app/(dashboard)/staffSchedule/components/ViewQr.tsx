"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format, isAfter, isWithinInterval, parse } from "date-fns";
import { vi } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { getQRCodeAction } from "@/actions";
import { Loader2 } from "lucide-react";
const shifts = [
  {
    id: "8918424e-62c6-4d06-b35a-481ad0ccfb9e",
    name: "Ca sáng",
    startTime: "08:00:00",
    endTime: "12:00:00",
    lockTime: "08:30:00", // Thời gian khóa
  },
  {
    id: "a2c28140-85bb-48e9-8725-c381b610556f",
    name: "Ca chiều",
    startTime: "13:00:00",
    endTime: "17:00:00",
    lockTime: "13:30:00", // Thời gian khóa
  },
  {
    id: "ccabc8b6-480d-4e83-99da-246cceeb714c",
    name: "Ca tối",
    startTime: "18:00:00",
    endTime: "22:00:00",
    lockTime: "18:30:00", // Thời gian khóa
  },
];

function ViewQr() {
  const getCurrentShift = () => {
    const now = new Date(); // Giờ hiện tại

    for (const shift of shifts) {
      // Chuyển đổi startTime và endTime thành Date
      const start = parse(shift.startTime, "HH:mm:ss", now);
      const end = parse(shift.endTime, "HH:mm:ss", now);

      // Kiểm tra giờ hiện tại có nằm trong khoảng của ca không
      if (isWithinInterval(now, { start, end })) {
        return shift; // Trả về ca làm việc hiện tại
      }
    }

    return null; // Không thuộc ca nào
  };
  const scheduleInfo = getCurrentShift();

  const { data, isFetching } = useQuery({
    queryKey: ["qr-code", scheduleInfo?.id],
    queryFn: () =>
      getQRCodeAction({
        shiftId: scheduleInfo?.id as string,
        date: format(Date.now(), "yyyy-MM-dd", { locale: vi }),
      }),
    refetchOnWindowFocus: false,
  });

  const isDisabled = (() => {
    if (!scheduleInfo) return true; // Không có ca làm việc thì vô hiệu hóa

    const now = new Date();
    const lockTime = parse(scheduleInfo.lockTime, "HH:mm:ss", now);

    // Kiểm tra nếu hiện tại đã qua thời gian khóa
    return isAfter(now, lockTime);
  })();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isDisabled}>Xem QR</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>QR điểm danh</DialogTitle>
          <DialogDescription>
            Ngày {format(Date.now(), "dd/MM/yyyy", { locale: vi })}, ca{" "}
            {scheduleInfo?.name}: {scheduleInfo?.startTime} -{" "}
            {scheduleInfo?.endTime}
          </DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <div className="w-full flex items-center justify-center ">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <Image
            alt="QR điểm danh"
            src={data?.data.url}
            width={420}
            height={420}
            className="mx-auto"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ViewQr;
