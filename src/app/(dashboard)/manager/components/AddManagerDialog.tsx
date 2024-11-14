"use client";
import { createEmployeeFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { useQuery } from "@tanstack/react-query";
import { createEmployeeAction, getRestaurantAction } from "@/actions";
import { Loader2 } from "lucide-react";

function AddManagerDialog() {
  const [open, setOpen] = useState(false);

  const { data, isPending: isGetting } = useQuery({
    queryKey: ["getRestaurants"],
    queryFn: () => getRestaurantAction(),
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    control,
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

  const onSubmit: SubmitHandler<z.infer<typeof createEmployeeFormSchema>> =
    useCallback(
      (data) => {
        execute({ ...data, roleId: 1 });
      },
      [execute]
    );

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
        <Button>Thêm mới quản lý</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Thêm mới quản lý</DialogTitle>
          <DialogDescription>Vui lòng nhập thông tin quản lý</DialogDescription>
        </DialogHeader>
        {isGetting ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 py-4">
              <div className="flex flex-col">
                <Label htmlFor={"fullName"} className="mb-2">
                  Họ và tên
                </Label>
                <Input
                  id={"fullName"}
                  className="col-span-3"
                  type={"text"}
                  {...register("fullName")}
                  placeholder={`Nhập họ và tên`}
                  disabled={isPending}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.fullName.message as string}
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
                  type={"text"}
                  {...register("phoneNumber")}
                  placeholder={`Nhập số điện thoại`}
                  disabled={isPending}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.phoneNumber.message as string}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor={"firstName"} className="mb-2">
                  Chọn nhà hàng
                </Label>
                <Controller
                  name="restaurantId"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn nhà hàng" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.data?.results.map((restaurant) => (
                            <SelectItem
                              key={restaurant.id}
                              value={restaurant.id}
                            >
                              {restaurant.restaurantName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.restaurantId && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                          {errors.restaurantId.message as string}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Đang xử lý..." : "Xác nhận"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddManagerDialog;
