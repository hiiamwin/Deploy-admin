"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAction } from "next-safe-action/hooks";
import { activeTableAction } from "@/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function ActiveTableDialog({
  id,
  isOpenActivateDialog,
  setIsOpenActivateDialog,
}: {
  id: string;
  isOpenActivateDialog: boolean;
  setIsOpenActivateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { execute, isPending } = useAction(activeTableAction, {
    onSuccess: () => {
      toast.success("Bàn đã hoạt động trở lại");
      handleOpen(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    },
  });
  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpenActivateDialog(value);
  };
  return (
    <Dialog open={isOpenActivateDialog} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <Button disabled={isPending} onClick={() => handleOpen(false)}>
            Hủy
          </Button>
          <Button disabled={isPending} onClick={() => execute({ id })}>
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ActiveTableDialog;
