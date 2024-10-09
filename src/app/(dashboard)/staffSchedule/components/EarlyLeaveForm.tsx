import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

function EarlyLeaveForm() {
  return (
    <form className="space-y-4">
      <div>
        {/* <Label>Nhân viên: {staff.name}</Label> */}
        <Label>Nhân viên: Thắng</Label>
      </div>
      <div>
        <Label>
          {/* Ca làm việc: {shift.name} ({shift.startTime} - {shift.endTime}) */}
          Ca làm việc
        </Label>
      </div>
      <div>
        <Label htmlFor="leaveTime">Thời gian ra về</Label>
        <Input
          id="leaveTime"
          type="time"
          //   value={formData.leaveTime}
          //   onChange={(e) =>
          //     setFormData({ ...formData, leaveTime: e.target.value })
          //   }
          required
        />
      </div>
      <div>
        <Label htmlFor="reason">Lý do</Label>
        <Textarea
          id="reason"
          //   value={formData.reason}
          //   onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
        />
      </div>
      <DialogFooter>
        <Button type="submit">Xác nhận</Button>
      </DialogFooter>
    </form>
  );
}

export default EarlyLeaveForm;
