import { inActiveIngredientGeneralAction } from "@/actions";
import { useAction } from "next-safe-action/hooks";
import React from "react";
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
import { toast } from "sonner";

function InactiveIngredientGeneralDialog({
  id,
  isOpenInactivateDialog,
  setIsOpenInactivateDialog,
}: {
  id: string;
  isOpenInactivateDialog: boolean;
  setIsOpenInactivateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { execute, isPending } = useAction(inActiveIngredientGeneralAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      setIsOpenInactivateDialog(false);
    },
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(JSON.parse(error.serverError)[0].message);
        setIsOpenInactivateDialog(false);
      }
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
            Bạn có chắc sẽ dừng hoạt động nguyên liệu này không?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Nguyên liệu sẽ bị dừng hoạt động
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="text-black" disabled={isPending}>
              Đóng
            </Button>
          </AlertDialogCancel>
          <Button disabled={isPending} onClick={() => handleInactive()}>
            Có
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default InactiveIngredientGeneralDialog;
