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
            Bạn có chắc sẽ dừng hoạt động nhà hàng này không?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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

export default ActiveIngredientGeneral;
