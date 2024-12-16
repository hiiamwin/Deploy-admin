/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  UserIcon,
} from "lucide-react";
import {
  format,
  startOfWeek,
  addDays,
  parseISO,
  endOfWeek,
  isAfter,
  isWithinInterval,
  parse,
  startOfDay,
} from "date-fns";
import { vi } from "date-fns/locale";
import AddWaiterForm from "./AddWaiterForm";
import StaffList from "./StaffList";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyShiftCountAction } from "@/actions";
import ScheduleSkeleton from "./ScheduleSkeleton";
import ViewQr from "./ViewQr";

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

function WaiterSchedule() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState({
    date: "",
    shiftTime: "",
    shiftId: "",
    isEditableDate: true,
  });
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["weekly-shift-count", currentWeekStart.toISOString()],
    queryFn: () =>
      getWeeklyShiftCountAction({
        date: format(currentWeekStart, "yyyy-MM-dd"),
      }),
    refetchOnWindowFocus: false,
  });

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const isEditable = (
    dateString: string,
    startTime: string,
    endTime: string
  ) => {
    const date = parseISO(dateString);
    const now = new Date();
    const isPast = isAfter(startOfDay(now), startOfDay(date));

    const checkTime = isAfter(
      parse(now.toTimeString().slice(0, 8), "HH:mm:ss", now),
      parse(startTime, "HH:mm:ss", now)
    );
    const isToday = format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
    // ? isPast : checkTime;
    return isPast ? isPast : isToday ? checkTime : false;
  };
  return (
    <>
      <div className="flex justify-end mb-2">
        <ViewQr />
      </div>
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={goToPreviousWeek}
          variant="outline"
          className="bg-black text-white hover:bg-zinc-800 hover:text-white"
        >
          <ChevronLeftIcon className="mr-2" />
          Tuần trước
        </Button>
        <span className="text-lg font-semibold">
          Tuần từ {format(currentWeekStart, "d MMMM, yyyy", { locale: vi })}
        </span>
        <Button
          onClick={goToNextWeek}
          variant="outline"
          className="bg-black text-white hover:bg-zinc-800 hover:text-white"
        >
          Tuần sau
          <ChevronRightIcon className="ml-2" />
        </Button>
      </div>
      <div className="overflow-x-auto">
        {isFetching ? (
          <ScheduleSkeleton />
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-100">Ca làm việc</th>
                {weekDays.map((day) => (
                  <th
                    key={day.toISOString()}
                    className="border p-2 bg-gray-100 text-center"
                  >
                    <div>{format(day, "EEE", { locale: vi })}</div>
                    <div>{format(day, "dd/MM", { locale: vi })}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.id}>
                  <td className="border p-2 font-medium">
                    {shift.name}
                    <br />
                    <span className="text-sm text-gray-500">
                      {shift.startTime} - {shift.endTime}
                    </span>
                  </td>
                  {weekDays.map((day) => {
                    const date = format(day, "yyyy-MM-dd");

                    const isEditableDate = isEditable(
                      date,
                      shift.startTime,
                      shift.endTime
                    );
                    const shiftCount = data?.data?.find(
                      (item) => item.date === date && item.shiftId === shift.id
                    );

                    return (
                      <td
                        key={day.toISOString()}
                        className={`border p-2 bg-red-100`}
                      >
                        <div className="text-sm font-semibold mb-2">
                          Nhân viên: {shiftCount?.employeeCount}
                        </div>
                        <div className="flex flex-col space-y-2">
                          {isEditableDate ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white"
                              disabled
                            >
                              <PlusIcon className="h-4 w-4 mr-2" />
                              Thêm
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white"
                              onClick={() => {
                                setScheduleInfo({
                                  date: format(day, "EEEE,dd/MM/yyyy", {
                                    locale: vi,
                                  }),
                                  shiftTime: `${shift.startTime} - ${shift.endTime}`,
                                  shiftId: shift.id,
                                  isEditableDate: true,
                                });
                                setOpenAdd(true);
                              }}
                            >
                              <PlusIcon className="h-4 w-4 mr-2" />
                              Thêm
                            </Button>
                          )}
                          {/* <Button
                            variant="outline"
                            size="sm"
                            className="bg-white"
                            onClick={() => {
                              setScheduleInfo({
                                date: format(day, "EEEE,dd/MM/yyyy", {
                                  locale: vi,
                                }),
                                shiftTime: `${shift.startTime} - ${shift.endTime}`,
                                shiftId: shift.id,
                              });
                              setOpenAdd(true);
                            }}
                          >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Thêm
                          </Button> */}

                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white"
                            onClick={() => {
                              setScheduleInfo({
                                date: format(day, "EEEE,dd/MM/yyyy", {
                                  locale: vi,
                                }),
                                shiftTime: `${shift.startTime} - ${shift.endTime}`,
                                shiftId: shift.id,
                                isEditableDate: isEditableDate,
                              });
                              setOpenList(true);
                            }}
                          >
                            <UserIcon className="h-4 w-4 mr-2" />
                            Xem
                          </Button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddWaiterForm
        date={scheduleInfo.date}
        shiftTime={scheduleInfo.shiftTime}
        shiftId={scheduleInfo.shiftId}
        refetchCount={refetch}
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
      />
      <StaffList
        isEditableDate={scheduleInfo.isEditableDate}
        date={scheduleInfo.date}
        shiftTime={scheduleInfo.shiftTime}
        shiftId={scheduleInfo.shiftId}
        refetchCount={refetch}
        openList={openList}
        setOpenList={setOpenList}
      />
    </>
  );
}

export default WaiterSchedule;
