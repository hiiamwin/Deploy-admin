import React from "react";
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
import { UserIcon } from "lucide-react";

type StaffListProps = {
  isEditableDate: boolean;
  date: string;
  shiftTime: string;
};
function StaffList({ isEditableDate, date, shiftTime }: StaffListProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white">
          <UserIcon className="h-4 w-4 mr-2" />
          Xem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Danh Sách Nhân Viên Trong Ca</DialogTitle>
          <DialogDescription>Ngày: {date}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Label>Ca làm việc: {shiftTime}</Label>
          <div>
            <Label>Danh sách nhân viên:</Label>
            <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
              {/* {assignedStaff.map((staff) => ( */}
              <li className="flex items-center justify-between">
                <span>thang</span>
                <Button size={"sm"} disabled={!isEditableDate}>
                  Hủy
                </Button>
              </li>
              {/* ))} */}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StaffList;
