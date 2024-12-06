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
import { format, isWithinInterval, parse, subMinutes } from "date-fns";
import { vi } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { getQRCodeAction } from "@/actions";
import { Loader2 } from "lucide-react";
const shifts = [
  {
    id: "8918424e-62c6-4d06-b35a-481ad0ccfb9e",
    name: "Ca sáng",
    startTime: "09:00:00",
    endTime: "14:00:00",
    qrAvalableStartTime: "08:45:00",
    qrAvalableEndTime: "09:15:00",
  },
  {
    id: "a2c28140-85bb-48e9-8725-c381b610556f",
    name: "Ca chiều",
    startTime: "14:00:00",
    endTime: "19:00:00",
    qrAvalableStartTime: "13:45:00",
    qrAvalableEndTime: "14:15:00",
  },
  {
    id: "ccabc8b6-480d-4e83-99da-246cceeb714c",
    name: "Ca tối",
    startTime: "19:00:00",
    endTime: "24:00:00",
    qrAvalableStartTime: "18:45:00",
    qrAvalableEndTime: "19:15:00",
  },
];

function ViewQr() {
  // const getCurrentShiftAndQRStatus = () => {
  //   const now = new Date();

  //   for (const shift of shifts) {
  //     // Kiểm tra xem có phải đang trong ca làm việc không
  //     const shiftStart = parse(shift.startTime, "HH:mm:ss", now);
  //     const shiftEnd = parse(shift.endTime, "HH:mm:ss", now);

  //     if (isWithinInterval(now, { start: shiftStart, end: shiftEnd })) {
  //       // Kiểm tra xem có trong thời gian QR khả dụng không
  //       const qrStart = parse(shift.qrAvalableStartTime, "HH:mm:ss", now);
  //       const qrEnd = parse(shift.qrAvalableEndTime, "HH:mm:ss", now);

  //       const isQRAvailable = isWithinInterval(now, {
  //         start: qrStart,
  //         end: qrEnd,
  //       });

  //       return {
  //         shift,
  //         isQRAvailable,
  //         message: isQRAvailable
  //           ? "QR code đang khả dụng"
  //           : `QR code chỉ khả dụng từ ${shift.qrAvalableStartTime} đến ${shift.qrAvalableEndTime}`,
  //       };
  //     }
  //   }

  //   return {
  //     shift: null,
  //     isQRAvailable: false,
  //     message: "Hiện không trong ca làm việc nào",
  //   };
  // };
  // const { shift, isQRAvailable, message } = getCurrentShiftAndQRStatus();

  const checkQRCode = () => {
    const now = new Date();

    for (let i = 0; i < shifts.length; i++) {
      const shift = shifts[i];

      const shiftStart = parse(shift.startTime, "HH:mm:ss", now);
      const shiftEnd = parse(shift.endTime, "HH:mm:ss", now);

      if (isWithinInterval(now, { start: shiftStart, end: shiftEnd })) {
        if (now >= subMinutes(shiftEnd, 15)) {
          const nextShift = shifts[i + 1];
          if (nextShift) {
            return nextShift;
          } else {
            return shift;
          }
        }
        return shift;
      }
    }

    if (now >= subMinutes(parse("09:00:00", "HH:mm:ss", now), 15)) {
      return shifts[0];
    }
  };

  const shift = checkQRCode();

  const { data, isFetching } = useQuery({
    queryKey: [
      "qr-code",
      shift?.id,
      format(Date.now(), "yyyy-MM-dd", { locale: vi }),
    ],
    queryFn: () =>
      getQRCodeAction({
        shiftId: shift?.id as string,
        date: format(Date.now(), "yyyy-MM-dd", { locale: vi }),
      }),
    refetchOnWindowFocus: false,
    enabled: !!shift,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Xem QR</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>QR điểm danh</DialogTitle>
          <DialogDescription>
            {shift && (
              <>
                Ngày {format(Date.now(), "dd/MM/yyyy", { locale: vi })},{" "}
                {shift?.name}: {shift?.startTime} - {shift?.endTime}
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {shift === undefined ? (
          <span className="text-center">Chưa có ca làm</span>
        ) : isFetching ? (
          <div className="w-full flex items-center justify-center">
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
