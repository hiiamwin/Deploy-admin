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
import { toast } from "sonner";
import { inactiveTableAction } from "@/actions";
import { Button } from "@/components/ui/button";

function InactiveTableDialog({
  id,
  isOpenInactivateDialog,
  setIsOpenInactivateDialog,
}: {
  id: string;
  isOpenInactivateDialog: boolean;
  setIsOpenInactivateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { execute, isPending } = useAction(inactiveTableAction, {
    onSuccess: () => {
      toast.success("Bàn đã được dừng hoạt động");
      handleOpen(false);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    },
  });
  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpenInactivateDialog(value);
  };
  return (
    <Dialog open={isOpenInactivateDialog} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Bạn có chắc muốn vô hiệu hóa bàn này?</DialogTitle>
          <DialogDescription>Bàn sẽ bị vô hiệu hóa</DialogDescription>
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

export default InactiveTableDialog;
