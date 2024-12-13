"use client";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { createEmployeeAction } from "@/actions";
import { toast } from "sonner";
import { z } from "zod";
import { createEmployeeFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddWaiterDialog({ restaurantId }: { restaurantId: string }) {
  const [open, setOpen] = useState(false);
  const [roleId, setRoleId] = useState("2");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof createEmployeeFormSchema>>({
    resolver: zodResolver(createEmployeeFormSchema),
  });

  const { execute, isPending } = useAction(createEmployeeAction, {
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

  const onSubmit: SubmitHandler<z.infer<typeof createEmployeeFormSchema>> = (
    data
  ) => {
    execute({ ...data, roleId: +roleId });
  };

  const handleOpen = useCallback(
    (value: boolean) => {
      if (isPending) return;
      reset();
      setOpen(value);
    },
    [isPending, reset]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button>Thêm mới nhân viên</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Thêm mới nhân viên</DialogTitle>
          <DialogDescription>
            Vui lòng nhập thông tin nhân viên
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="hidden"
            value={restaurantId}
            {...register("restaurantId")}
          />
          <div className="space-y-4 py-4">
            <div className="flex flex-col">
              <Label htmlFor={"fullName"} className="mb-2">
                Họ và tên
              </Label>
              <Input
                id={"fullName"}
                className="col-span-3"
                type="text"
                {...register("fullName")}
                placeholder={`Nhập họ và tên`}
                disabled={isPending}
              />
              {errors.fullName?.message && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.fullName?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Label htmlFor={"phoneNumber"} className="mb-2">
                Số điện thoại
              </Label>
              <Input
                id={"phoneNumber"}
                className="col-span-3"
                type="text"
                {...register("phoneNumber")}
                placeholder={`Nhập số điện thoại`}
                disabled={isPending}
              />
              {errors.phoneNumber?.message && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.phoneNumber?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <Label htmlFor={"roleId"} className="mb-2">
                Vị trí
              </Label>
              <Select
                name="roleId"
                defaultValue="2"
                onValueChange={setRoleId}
                disabled={isPending}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Vị trí" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Nhân viên phục vụ</SelectItem>
                  <SelectItem value="3">Nhân viên bếp</SelectItem>
                </SelectContent>
              </Select>
              {errors.root?.message && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.root?.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Đang xử lý..." : "Xác nhận"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddWaiterDialog;
