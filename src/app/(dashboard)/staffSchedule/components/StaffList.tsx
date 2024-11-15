"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, UserIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  getEmployeeInShiftAtDateAction,
  unregisterScheduleAction,
} from "@/actions";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type StaffListProps = {
  isEditableDate: boolean;
  date: string;
  shiftTime: string;
  shiftId: string;
  openList: boolean;
  setOpenList: Dispatch<SetStateAction<boolean>>;
  refetchCount: () => void;
};
function StaffList({
  isEditableDate,
  date,
  shiftTime,
  shiftId,
  openList,
  setOpenList,
  refetchCount,
}: StaffListProps) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["assigned-employees", date, shiftId],
    queryFn: () => getEmployeeInShiftAtDateAction({ shiftId, date }),
    enabled: openList,
  });
  const handleOpen = (value: boolean) => {
    if (isFetching) return;
    setOpenList(value);
  };
  const { execute, isPending } = useAction(unregisterScheduleAction, {
    onSuccess: () => {
      refetch();
      refetchCount();
      toast.success("Hủy đăng ký nhân viên khỏi ca làm thành công");
    },

    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
  const handleUnregister = (employeeId: string, scheduleId: string) => {
    execute({ employeeId, scheduleId });
  };
  return (
    <Dialog open={openList} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white">
          <UserIcon className="h-4 w-4 mr-2" />
          Xem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Danh Sách Nhân Viên Trong Ca</DialogTitle>
          <DialogDescription>{date}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Label>Ca làm việc: {shiftTime}</Label>
          <div>
            <Label>Danh sách nhân viên:</Label>
            {isFetching ? (
              <div className="flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                {data?.data?.map((employee) => (
                  <li
                    className="flex items-center justify-between"
                    key={employee.employeeId}
                  >
                    <span>{employee.employeeName}</span>
                    <Button
                      size={"sm"}
                      disabled={!isEditableDate || isPending || isFetching}
                      onClick={() =>
                        handleUnregister(
                          employee.employeeId,
                          employee.waiterScheduleId
                        )
                      }
                    >
                      Hủy
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StaffList;
