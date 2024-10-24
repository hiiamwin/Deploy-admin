"use client";
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
import { activeDishGeneralAction } from "@/actions";

function ActiveDishGeneralDialog({
  id,
  isOpenActivateDialog,
  setIsOpenActivateDialog,
}: {
  id: string;
  isOpenActivateDialog: boolean;
  setIsOpenActivateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { execute, isPending } = useAction(activeDishGeneralAction, {
    onSuccess: ({ data }) => {
      console.log(data);

      toast.success("Món ăn đã được hoạt động");
      handleOpen(false);
    },
  });
  const handleActive = () => {
    execute({ id });
  };
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

export default ActiveDishGeneralDialog;
