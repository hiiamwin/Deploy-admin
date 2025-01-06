import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { confirmMoneyAction } from "@/actions";
import { toast } from "sonner";

function ConfirmMoneyDialog({
  id,
  isOpenConfimDialog,
  setIsOpenConfimDialog,
}: {
  id: string;
  isOpenConfimDialog: boolean;
  setIsOpenConfimDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const { isPending, execute } = useAction(confirmMoneyAction, {
    onSuccess: () => {
      toast.success("Xác nhận thành công");
      handleOpen(false);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpenConfimDialog(value);
  };
  return (
    <Dialog open={isOpenConfimDialog} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Bạn có chắc là đã nhận được tiền?</DialogTitle>
          <DialogDescription>Bạn đã nhận được tiền?</DialogDescription>
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

export default ConfirmMoneyDialog;
