"use client";
import { useAction } from "next-safe-action/hooks";
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
import { inactiveDishGeneralAction } from "@/actions";

function InactiveDishGeneralDialog({
  id,
  isOpenInactivateDialog,
  setIsOpenInactivateDialog,
}: {
  id: string;
  isOpenInactivateDialog: boolean;
  setIsOpenInactivateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { execute, isPending } = useAction(inactiveDishGeneralAction, {
    onSuccess: ({ data }) => {
      console.log(data);

      toast.success("Món ăn đã được dừng hoạt động");
      handleOpen(false);
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

export default InactiveDishGeneralDialog;
