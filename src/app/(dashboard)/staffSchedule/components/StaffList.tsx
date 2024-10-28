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

function StaffList() {
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
          <DialogDescription>Ngày: 10/8/2024</DialogDescription>
        </DialogHeader>
        {/* <ViewStaffList
        scheduleItem={currentScheduleItem}
        staffMembers={staffMembers}
        shifts={shifts}
      /> */}
        {/* <StaffList /> */}
        <div className="space-y-4">
          <Label>
            Ca làm việc:
            {/* {shift
        ? `${shift.name} (${shift.startTime} - ${shift.endTime})`
        : "Không xác định"} */}
          </Label>
          <div>
            <Label>Danh sách nhân viên:</Label>
            <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
              {/* {assignedStaff.map((staff) => ( */}
              <li className="flex items-center justify-between">
                <span>thang</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Ra về sớm
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                      <DialogTitle>Đăng ký ra về sớm</DialogTitle>
                      <DialogDescription>Ngày:</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
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
