"use client";
import React from "react";
import { useAction } from "next-safe-action/hooks";
import { activeWaiterAction } from "@/actions";
import { toast } from "sonner";
import { ReuseAlerDialog } from "@/app/(dashboard)/components";

type ActiveWaiterDialogProps = {
  id: string;
  isOpenActivateDialog: boolean;
  setIsOpenActivateDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function ActiveWaiterDialog({
  id,
  isOpenActivateDialog,
  setIsOpenActivateDialog,
}: ActiveWaiterDialogProps) {
  const { execute, isPending } = useAction(activeWaiterAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      setIsOpenActivateDialog(false);
    },
  });
  const handleActive = () => {
    execute({ id });
  };
  return (
    <ReuseAlerDialog
      alertTitle="Bạn có chắc nhân viên này sẽ hoạt động lại không ?"
      alertDescription="Bạn có chắc nhân viên này sẽ hoạt động lại không ?"
      handleActive={handleActive}
      isPending={isPending}
      open={isOpenActivateDialog}
      setopen={setIsOpenActivateDialog}
    />
  );
}

export default ActiveWaiterDialog;
