"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Ingredient } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { createUnitSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIngredientUnitAction } from "@/actions";
import { toast } from "sonner";

function AddUnitDialog({
  item,
  isOpenAddUnitDialog,
  setIsOpenAddUnitDialog,
}: {
  item: Ingredient;
  isOpenAddUnitDialog: boolean;
  setIsOpenAddUnitDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof createUnitSchema>>({
    resolver: zodResolver(createUnitSchema),
  });

  const { execute, isPending } = useAction(createIngredientUnitAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      handleOpen(false);
    },
    onError: ({ error }) => {
      if (error.serverError) {
        const errorArray = JSON.parse(error.serverError);
        errorArray.forEach((error: { field: string; message: string }) => {
          setError(error.field as keyof typeof errors, {
            message: error.message,
          });
        });
      }
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createUnitSchema>> = async (
    data
  ) => {
    execute(data);
  };
  const handleOpen = (value: boolean) => {
    reset();
    if (isPending) return;
    setIsOpenAddUnitDialog(value);
  };

  return (
    <Dialog open={isOpenAddUnitDialog} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Tạo mới đơn vị</DialogTitle>
          <DialogDescription>Nhập thông tin đơn vị</DialogDescription>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 py-4">
              <div className="flex flex-col">
                <Label htmlFor={"unitName"} className="mb-2">
                  Tên đơn vị
                </Label>
                <Input
                  id={"unitName"}
                  className="col-span-3"
                  type={"text"}
                  {...register("unitName")}
                  placeholder={`Nhập tên đơn vị`}
                  disabled={isPending}
                />
                {errors.unitName?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.unitName.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor={"conversionFactor"} className="mb-2">
                  Hệ số chuyển đổi
                </Label>
                <Input
                  id={"conversionFactor"}
                  className="col-span-3"
                  type={"number"}
                  {...register("conversionFactor", { valueAsNumber: true })}
                  placeholder={`Nhập hệ số chuyển đổi`}
                  disabled={isPending}
                />
                {errors.conversionFactor?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.conversionFactor.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor={"ingredientUnitParentId"} className="mb-2">
                  Đơn vị chuyển đổi
                </Label>
                <Input
                  value={
                    item.ingredientUnits[item.ingredientUnits.length - 1]
                      .unitName
                  }
                  id={"ingredientUnitParentId"}
                  className="col-span-3"
                  type={"text"}
                  disabled={true}
                />
                <Input
                  value={
                    item.ingredientUnits[item.ingredientUnits.length - 1]
                      .ingredientUnitId
                  }
                  className="col-span-3"
                  type={"hidden"}
                  {...register("ingredientUnitParentId")}
                />
                <Input
                  value={item.id}
                  className="col-span-3"
                  type={"hidden"}
                  {...register("ingredientId")}
                />

                {errors.conversionFactor?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.conversionFactor.message as string}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {/* {isPending ? "Đang xử lý..." : addButtonTitle} */}
                Thêm đơn vị
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddUnitDialog;
