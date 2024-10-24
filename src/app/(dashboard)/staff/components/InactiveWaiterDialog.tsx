"use client";
import React from "react";
import { useAction } from "next-safe-action/hooks";
import { inactiveEmployeeAction } from "@/actions";
import { toast } from "sonner";
import { ReuseAlerDialog } from "@/app/(dashboard)/components";

type InactiveWaiterDialogProps = {
  id: string;
  isOpenInactivateDialog: boolean;
  setIsOpenInactivateDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
function InactiveWaiterDialog({
  id,
  isOpenInactivateDialog,
  setIsOpenInactivateDialog,
}: InactiveWaiterDialogProps) {
  const { execute, isPending } = useAction(inactiveEmployeeAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      setIsOpenInactivateDialog(false);
    },
  });
  const handleInactive = () => {
    execute({ id: id, path: "/staff" });
  };
  return (
    <ReuseAlerDialog
      alertTitle="Bạn có chắc nhân viên này sẽ không hoạt động nữa không ?"
      alertDescription="Bạn có chắc nhân viên này sẽ không hoạt động nữa không ?"
      handleInactive={handleInactive}
      isPending={isPending}
      open={isOpenInactivateDialog}
      setopen={setIsOpenInactivateDialog}
    />
  );
}

export default InactiveWaiterDialog;
