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
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { changeDishPriceAction } from "@/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function ChangePriceDialog({
  id,
  price,
  percentDiffirence,
  isOpenChangePriceDialog,
  setIsOpenChangePriceDialog,
}: {
  id: string;
  price: number;
  percentDiffirence: number;
  isOpenChangePriceDialog: boolean;
  setIsOpenChangePriceDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: price,
    },
  });

  const { execute, isPending } = useAction(changeDishPriceAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      handleOpen(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
      handleOpen(false);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    execute({ id, price: data.price });
  };

  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpenChangePriceDialog(value);
  };
  return (
    <Dialog open={isOpenChangePriceDialog} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Thay đổi giá tiền món ăn?</DialogTitle>
          <DialogDescription>
            Giá tiền của món ăn sẽ được thay đổi trong khoảng nhất định
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="flex flex-col">
              <Label htmlFor={"price"} className="mb-2">
                Giá món ăn (
                {(price - (price * percentDiffirence) / 100).toLocaleString()}đ
                - {(price + (price * percentDiffirence) / 100).toLocaleString()}
                đ)
              </Label>
              <Input
                id={"price"}
                className="col-span-3"
                type={"number"}
                placeholder={`Nhập tên món ăn`}
                disabled={isPending}
                {...register("price", {
                  required: "Vui lòng nhập giá tiền món ăn",
                  valueAsNumber: true,
                  min: {
                    value: price - (price * percentDiffirence) / 100,
                    message: `Giá tiền không được nhỏ hơn ${(
                      price -
                      (price * percentDiffirence) / 100
                    ).toLocaleString()}đ`,
                  },
                  max: {
                    value: price + (price * percentDiffirence) / 100,
                    message: `Giá tiền không được lớn hơn ${(
                      price +
                      (price * percentDiffirence) / 100
                    ).toLocaleString()}đ`,
                  },
                })}
              />
              {errors.price?.message && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.price?.message as string}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Đang xử lý..." : "xác nhận"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePriceDialog;
