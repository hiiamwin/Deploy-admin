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
              <DialogDescription>
                {/* {format(parseISO(formData.date), "dd/MM/yyyy", { locale: vi })} */}
                Ngày: {date}
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <Label>
                Ca làm việc: {shiftTime}
                {/* {shift
        ? `${shift.name} (${shift.startTime} - ${shift.endTime})`
        : "Không xác định"} */}
              </Label>
              <div>
                <Label>Chọn Nhân Viên</Label>
                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`staff-1`}
                      //   checked={formData.staffIds.includes(staff.id)}
                      //   onChange={() => handleStaffToggle(staff.id)}
                      className="mr-2"
                    />
                    <Label htmlFor={`staff-1`}>thang</Label>
                    {/* {errors[`staff_${staff.id}`] && (
              <span className="text-red-500 text-sm ml-2">
                {errors[`staff_${staff.id}`]}
              </span>
            )} */}
                  </div>
                </div>
              </div>
              {/* disabled={Object.keys(errors).length > 0} */}
              <Button type="submit">Lưu Lịch</Button>
              {/* {errors.staffCount && (
        <p className="text-red-500 text-sm">{errors.staffCount}</p>
      )} */}
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
export default AddWaiterForm;
