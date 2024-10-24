import React from "react";
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
import { inactiveDishAction } from "@/actions";

function InactiveDishDialog({
  id,
  isOpenInactivateDialog,
  setIsOpenInactivateDialog,
}: {
  id: string;
  isOpenInactivateDialog: boolean;
  setIsOpenInactivateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { execute, isPending } = useAction(inactiveDishAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      handleOpen(false);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra ");
    },
  });
  const handleInactive = () => {
    execute({ id });
  };
  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpenInactivateDialog(value);
  };
  return (
    <Dialog open={isOpenInactivateDialog} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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

export default InactiveDishDialog;
