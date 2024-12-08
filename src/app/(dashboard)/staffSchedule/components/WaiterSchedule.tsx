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
} from "date-fns";
import { is, vi } from "date-fns/locale";
import AddWaiterForm from "./AddWaiterForm";
import StaffList from "./StaffList";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyShiftCountAction } from "@/actions";
import ScheduleSkeleton from "./ScheduleSkeleton";
import ViewQr from "./ViewQr";

const shifts = [
  {
    id: "8918424e-62c6-4d06-b35a-481ad0ccfb9e",
    name: "Ca sáng",
    startTime: "09:00:00",
    endTime: "14:00:00",
  },
  {
    id: "a2c28140-85bb-48e9-8725-c381b610556f",
    name: "Ca chiều",
    startTime: "14:00:00",
    endTime: "19:00:00",
  },
  {
    id: "ccabc8b6-480d-4e83-99da-246cceeb714c",
    name: "Ca tối",
    startTime: "19:00:00",
    endTime: "24:00:00",
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

  const isEditable = (dateString: string) => {
    const date = parseISO(dateString);
    const now = new Date();
    const isPast = isAfter(now, date);

    return isPast;
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

                    const isEditableDate = isEditable(date);
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
