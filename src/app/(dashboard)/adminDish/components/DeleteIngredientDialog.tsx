"use client";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { deleteIngredientInDishGeneralAction } from "@/actions";
import { toast } from "sonner";

type DeleteIngredientDialogProps = {
  id: string;
  refetch: () => void;
  selectedIngredients: {
    ingredientGeneralId: string;
    ingredientGeneralName: string;
    ingredientGeneralQuantity: number;
    ingredientMeasureName: string;
  }[];
  setSelectedIngredients: Dispatch<
    SetStateAction<
      {
        ingredientGeneralId: string;
        ingredientGeneralName: string;
        ingredientGeneralQuantity: number;
        ingredientMeasureName: string;
      }[]
    >
  >;
};

function DeleteIngredientDialog({
  id,
  refetch,
  selectedIngredients,
  setSelectedIngredients,
}: DeleteIngredientDialogProps) {
  const [open, setOpen] = useState(false);
  const { execute, isPending: isDeleting } = useAction(
    deleteIngredientInDishGeneralAction,
    {
      onSuccess: () => {
        refetch();
        handleOpen(false);
        setSelectedIngredients([]);
        toast.success("Xóa nguyên liệu thành công");
      },
      onError: () => {
        toast.error("Có lỗi xảy ra");
      },
    }
  );
  const handleDeleteIngredient = useCallback(() => {
    const ingredients = selectedIngredients.map(
      (ingredient) => ingredient.ingredientGeneralId
    );
    execute({ dishGeneralId: id, ingredientId: ingredients });
  }, [execute, id, selectedIngredients]);
  const handleOpen = useCallback(
    (value: boolean) => {
      if (isDeleting) return;
      setOpen(value);
    },
    [isDeleting, setOpen]
  );
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4">Xóa nguyên liệu</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Bạn có chắc muốn xóa nguyên liệu này ra khỏi món ăn?
          </DialogTitle>
          <DialogDescription>
            Nguyên liệu sẽ bị xóa khỏi món ăn
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isDeleting}
            className="bg-black hover:bg-black hover:text-white"
            onClick={() => handleOpen(false)}
          >
            Hủy
          </Button>
          <Button
            disabled={isDeleting}
            onClick={() => handleDeleteIngredient()}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteIngredientDialog;
