import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { PlusIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type AddWaiterFormProps = {
  isEditableDate: boolean;
  date: string;
  shiftTime: string;
};
function AddWaiterForm({
  isEditableDate,
  date,
  shiftTime,
}: AddWaiterFormProps) {
  return (
    <>
      {!isEditableDate ? (
        <Button variant="outline" size="sm" className="bg-white" disabled>
          <PlusIcon className="h-4 w-4 mr-2" />
          Thêm
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              // onClick={() => openAddStaffDialog(date, shift.id)}
              // disabled={isFullyStaffed}
              className="bg-white"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Thêm
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Thêm Nhân Viên Cho Ca Làm Việc</DialogTitle>
              <DialogDescription>Ngày: {date}</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <Label>Ca làm việc: {shiftTime}</Label>
              <div>
                <Label>Chọn Nhân Viên</Label>
                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                  <div className="flex items-center gap-2">
                    <Checkbox id="staff-1" />
                    <Label htmlFor={`staff-1`}>thang</Label>
                  </div>
                </div>
              </div>
              <Button type="submit">Lưu Lịch</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
export default AddWaiterForm;
