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
import { useAction } from "next-safe-action/hooks";
import { activeIngredientGeneralAction } from "@/actions";

function ActiveIngredientGeneral({
  id,
  isOpenActivateDialog,
  setIsOpenActivateDialog,
}: {
  id: string;
  isOpenActivateDialog: boolean;
  setIsOpenActivateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { execute, isPending } = useAction(activeIngredientGeneralAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      setIsOpenActivateDialog(false);
    },
  });

  const handleInactive = () => {
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
            Bạn có chắc sẽ hoạt động lại nguyên liệu này không?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Nguyên liệu sẽ được hoạt động lại
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

export default ActiveIngredientGeneral;
