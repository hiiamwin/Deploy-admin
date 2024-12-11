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
    id: "7346b17a-2c84-4ee5-be16-16ad90d29537",
    name: "Ca sáng",
    startTime: "09:00:00",
    endTime: "14:00:00",
  },
  {
    id: "4f8cc7f6-d331-443b-a857-f83d7fce5d0b",
    name: "Ca chiều",
    startTime: "14:00:00",
    endTime: "19:00:00",
  },
  {
    id: "d42c0840-faf3-4ee4-9b09-65a4673e270d",
    name: "Ca tối",
    startTime: "19:00:00",
    endTime: "23:59:59",
  },
];

function ViewQr() {
  const checkQRCode = () => {
    const now = new Date();
    const currentTime = parse(now.toTimeString().slice(0, 8), "HH:mm:ss", now);

    for (let i = 0; i < shifts.length; i++) {
      const shift = shifts[i];

      if (
        isWithinInterval(currentTime, {
          start: parse(shift.startTime, "HH:mm:ss", now),
          end: parse(shift.endTime, "HH:mm:ss", now),
        })
      ) {
        if (now >= subMinutes(parse(shift.endTime, "HH:mm:ss", now), 15)) {
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
