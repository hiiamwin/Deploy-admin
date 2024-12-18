"use client";
import { activeRestaurantAction } from "@/actions";
import { Button } from "@/components/ui/button";
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

type ActiveRestaurantDialogProps = {
  id: string;
  isOpenActivateDialog: boolean;
  setIsOpenActivateDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function ActiveRestaurantDialog({
  id,
  isOpenActivateDialog,
  setIsOpenActivateDialog,
}: ActiveRestaurantDialogProps) {
  const { execute, isPending } = useAction(activeRestaurantAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      setIsOpenActivateDialog(false);
    },
  });

  const handleActive = () => {
    execute({ id });
  };
  return (
    <AlertDialog
      open={isOpenActivateDialog}
      onOpenChange={setIsOpenActivateDialog}
    >
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc nhà hàng này sẽ hoạt động lại không ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Nhà hàng sẽ hoạt động lại và có thể nhận đơn hàng từ khách hàng
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="text-black" disabled={isPending}>
              Đóng
            </Button>
          </AlertDialogCancel>
          <Button disabled={isPending} onClick={() => handleActive()}>
            Có
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ActiveRestaurantDialog;
