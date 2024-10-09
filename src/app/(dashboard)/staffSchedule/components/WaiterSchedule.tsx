"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { format, startOfWeek, addDays, parseISO, isBefore } from "date-fns";
import { vi } from "date-fns/locale";
import AddWaiterForm from "./AddWaiterForm";
import StaffList from "./StaffList";

const shifts = [
  { id: 1, name: "Ca Sáng", startTime: "08:00", endTime: "12:00" },
  { id: 2, name: "Ca Trưa", startTime: "12:00", endTime: "16:00" },
  { id: 3, name: "Ca Chiều", startTime: "16:00", endTime: "20:00" },
  { id: 4, name: "Ca Tối", startTime: "20:00", endTime: "24:00" },
];

// Mock data for initial schedule
const initialSchedule = [
  { id: 1, date: "2023-05-15", shiftId: 1, staffIds: [1, 2, 3, 4, 5] },
  { id: 2, date: "2023-05-15", shiftId: 2, staffIds: [2, 3, 4, 5, 1] },
  // Add more initial schedule data as needed
];

function WaiterSchedule() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentScheduleItem, setCurrentScheduleItem] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const addOrUpdateScheduleItem = (newItem) => {
    const existingItemIndex = schedule.findIndex(
      (item) => item.date === newItem.date && item.shiftId === newItem.shiftId
    );

    if (existingItemIndex !== -1) {
      const updatedSchedule = [...schedule];
      updatedSchedule[existingItemIndex] = newItem;
      setSchedule(updatedSchedule);
    } else {
      setSchedule([...schedule, { ...newItem, id: schedule.length + 1 }]);
    }
  };

  const openAddStaffDialog = (date, shiftId) => {
    const existingItem = schedule.find(
      (item) => item.date === date && item.shiftId === shiftId
    );
    setCurrentScheduleItem(existingItem || { date, shiftId, staffIds: [] });
    setIsAddDialogOpen(true);
  };

  const openViewStaffDialog = (date, shiftId) => {
    const existingItem = schedule.find(
      (item) => item.date === date && item.shiftId === shiftId
    );
    setCurrentScheduleItem(existingItem || { date, shiftId, staffIds: [] });
    setIsViewDialogOpen(true);
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const isPastDate = (date: string) => {
    return isBefore(parseISO(date), new Date());
  };
  return (
    <>
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
                  const scheduleItem = schedule.find(
                    (item) => item.date === date && item.shiftId === shift.id
                  );
                  const staffCount = scheduleItem
                    ? scheduleItem.staffIds.length
                    : 0;
                  const isUnderStaffed = staffCount < 5;
                  const isFullyStaffed = staffCount === 15;
                  const isPast = isPastDate(date);

                  return (
                    <td
                      key={day.toISOString()}
                      className={`border p-2 ${
                        isUnderStaffed
                          ? "bg-red-100"
                          : isFullyStaffed
                          ? "bg-green-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      <div className="text-sm font-semibold mb-2">
                        Nhân viên: {staffCount}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <AddWaiterForm isPast={isPast} />
                        <StaffList />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <AddStaffForm
            scheduleItem={currentScheduleItem}
            onSave={(updatedItem) => {
              addOrUpdateScheduleItem(updatedItem);
              setIsAddDialogOpen(false);
            }}
            staffMembers={staffMembers}
            shifts={shifts}
            schedule={schedule}
          /> */}
    </>
  );
}

export default WaiterSchedule;
