"use client";
import { inactiveRestaurantAction } from "@/actions";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

type InactiveRestaurantDialogProps = {
  id: string;
  isOpenInactivateDialog: boolean;
  setIsOpenInactivateDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function InactiveRestaurantDialog({
  id,
  isOpenInactivateDialog,
  setIsOpenInactivateDialog,
}: InactiveRestaurantDialogProps) {
  const { execute, isPending } = useAction(inactiveRestaurantAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      setIsOpenInactivateDialog(false);
    },
  });

  const handleInactive = () => {
    execute({ id });
  };
  return (
    <AlertDialog
      open={isOpenInactivateDialog}
      onOpenChange={setIsOpenInactivateDialog}
    >
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc sẽ dừng hoạt động nhà hàng này không?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Nhà hàng sẽ dừng hoạt động và không thể nhận đơn hàng từ khách hàng
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Đóng</AlertDialogCancel>
          <Button disabled={isPending} onClick={() => handleInactive()}>
            Có
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default InactiveRestaurantDialog;
