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
import { createVariantAction } from "@/actions";

function CreateVariantDialog({
  id,
  isOpenCreateVariationDialog,
  setIsOpenCreateVariationDialog,
}: {
  id: string;
  isOpenCreateVariationDialog: boolean;
  setIsOpenCreateVariationDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { execute, isPending } = useAction(createVariantAction, {
    onSuccess: ({ data }) => {
      console.log(data);

      toast.success("Món ăn đã được tạo");
      handleOpen(false);
    },
  });
  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpenCreateVariationDialog(value);
  };
  const handleCreateVariant = () => {
    execute({ id });
  };
  return (
    <Dialog open={isOpenCreateVariationDialog} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Bạn có muốn tạo ra món ăn mới dựa trên món ăn này?
          </DialogTitle>
          <DialogDescription>
            Một món ăn mơi sẽ được tạo dựa trên món ăn này
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
            onClick={() => handleCreateVariant()}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateVariantDialog;
