"use client";
import { useAction } from "next-safe-action/hooks";
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
import { inactiveDishGeneralAction } from "@/actions";

function InactiveDishGeneralDialog({
  id,
  isOpenInactivateDialog,
  setIsOpenInactivateDialog,
}: {
  id: string;
  isOpenInactivateDialog: boolean;
  setIsOpenInactivateDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const { execute, isPending } = useAction(inactiveDishGeneralAction, {
    onSuccess: () => {
      toast.success("Món ăn đã được dừng hoạt động");
      handleOpen(false);
    },
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(JSON.parse(error.serverError)[0].message);
        handleOpen(false);
      }
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
          <DialogTitle>Bạn có muốn dừng hoạt động món ăn này?</DialogTitle>
          <DialogDescription>Món ăn sẽ bị dừng hoạt động</DialogDescription>
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
