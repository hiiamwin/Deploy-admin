"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import {
  getUnassignedEmployeesAction,
  registerScheduleAction,
} from "@/actions";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type AddWaiterFormProps = {
  date: string;
  shiftTime: string;
  shiftId: string;
  refetchCount: () => void;
  openAdd: boolean;
  setOpenAdd: Dispatch<SetStateAction<boolean>>;
};
function AddWaiterForm({
  date,
  shiftTime,
  shiftId,
  openAdd,
  setOpenAdd,
  refetchCount,
}: AddWaiterFormProps) {
  const [registerList, setRegisterList] = useState<string[]>([]);
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["unassigned-employees", date, shiftId],
    queryFn: () => getUnassignedEmployeesAction({ shiftId, date }),
    enabled: openAdd,
  });

  const handleOpen = (value: boolean) => {
    if (isFetching) return;
    setOpenAdd(value);
  };

  const handleCheckboxRegister = (employeeId: string) => {
    if (registerList.includes(employeeId)) {
      setRegisterList((prevList) => prevList.filter((id) => id !== employeeId));
    } else {
      setRegisterList((prevList) => [...prevList, employeeId]);
    }
  };

  const { execute, isPending } = useAction(registerScheduleAction, {
    onSuccess: () => {
      refetch();
      refetchCount();
      toast.success("Đăng ký nhân viên thành công");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
  const handleRegister = () => {
    execute({ date, shiftId, employeeIds: registerList });
  };

  return (
    <Dialog open={openAdd} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Thêm Nhân Viên Cho Ca Làm Việc</DialogTitle>
          <DialogDescription>{date}</DialogDescription>
        </DialogHeader>
        <Label>Ca làm việc: {shiftTime}</Label>
        {isFetching ? (
          <div className="flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <form className="space-y-4">
            <div>
              <Label>Chọn Nhân Viên</Label>
              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto grid grid-cols-2">
                {data?.data?.map((employee) => (
                  <div
                    className="flex items-center gap-2"
                    key={employee.employeeId}
                  >
                    <Checkbox
                      id={employee.employeeId}
                      checked={registerList.includes(employee.employeeId)}
                      onCheckedChange={() =>
                        handleCheckboxRegister(employee.employeeId)
                      }
                    />
                    <Label htmlFor={employee.employeeId}>
                      {employee.employeeName}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Button
              type="submit"
              disabled={registerList.length === 0 || isFetching || isPending}
              onClick={handleRegister}
            >
              Xác nhận
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default AddWaiterForm;
