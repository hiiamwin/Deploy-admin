"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createTableSchema } from "@/schemas";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTableAction } from "@/actions";
import { toast } from "sonner";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function AddTableDialog() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof createTableSchema>>({
    resolver: zodResolver(createTableSchema),
  });
  const { execute, isPending } = useAction(createTableAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      reset();
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
  const handleOpen = (value: boolean) => {
    if (isPending) return;
    reset();
    setOpen(value);
  };
  const onSubmit: SubmitHandler<z.infer<typeof createTableSchema>> = (data) => {
    execute(data);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button>Thêm mới bàn</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Thêm mới bàn</DialogTitle>
          <DialogDescription>Nhập số lượng bàn cần thêm</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="flex flex-col">
              <Label htmlFor={"quantity"} className="mb-2">
                Số lượng bàn cần thêm
              </Label>
              <Input
                id={"quantity"}
                className="col-span-3"
                type={"number"}
                {...register("quantity", { valueAsNumber: true })}
                placeholder={`Nhập số lượng bàn cần thêm`}
                disabled={isPending}
              />
              {errors.quantity?.message && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.quantity?.message as string}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Đang xử lý..." : "Thêm bàn"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTableDialog;
