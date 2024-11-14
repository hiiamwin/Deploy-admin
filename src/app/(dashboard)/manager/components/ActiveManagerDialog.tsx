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
import { activeEmployeeAction } from "@/actions";

function ActiveManagerDialog({
  id,
  isOpenActivateDialog,
  setIsOpenActivateDialog,
}: {
  id: string;
  isOpenActivateDialog: boolean;
  setIsOpenActivateDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const { execute, isPending } = useAction(activeEmployeeAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      handleOpen(false);
    },
  });
  const handleActive = () => {
    execute({ id: id, path: "/manager" });
  };
  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpenActivateDialog(value);
  };
  return (
    <Dialog open={isOpenActivateDialog} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Kích hoạt quản lý này</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn kích hoạt quản lý này không?
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
            onClick={() => handleActive()}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ActiveManagerDialog;
