import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { inactiveEmployeeAction } from "@/actions";

function InactiveManagerDialog({
  id,
  isOpenInactivateDialog,
  setIsOpenInactivateDialog,
}: {
  id: string;
  isOpenInactivateDialog: boolean;
  setIsOpenInactivateDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const { execute, isPending } = useAction(inactiveEmployeeAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      handleOpen(false);
    },

    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
  const handleInactive = () => {
    execute({ id: id, path: "/manager" });
  };
  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpenInactivateDialog(value);
  };
  return (
    <Dialog open={isOpenInactivateDialog} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Dừng hoạt động quản lý này</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn dừng hoạt động của quản lý này không?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => handleOpen(false)}
          >
            Hủy
          </Button>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => handleInactive()}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default InactiveManagerDialog;
