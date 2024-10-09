"use client";
import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createRestaurantFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createRestaurantAction } from "@/actions";
import { toast } from "sonner";
import { ReuseAddDiaglog } from "@/app/(dashboard)/components";

function AddBranchDialog() {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof createRestaurantFormSchema>>({
    resolver: zodResolver(createRestaurantFormSchema),
  });

  const { execute, isPending } = useAction(createRestaurantAction, {
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

  const onSubmit: SubmitHandler<z.infer<typeof createRestaurantFormSchema>> =
    useCallback(
      (data) => {
        execute(data);
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

  const inputs = [
    { name: "restaurantName", label: "Tên chi nhánh", type: "text" },
    { name: "address", label: "Địa chỉ chi nhánh", type: "text" },
    { name: "restaurantPhone", label: "Số điện thoại chi nhánh", type: "text" },
  ];
  return (
    <ReuseAddDiaglog
      Inputs={inputs}
      addButtonTitle="Thêm mới chi nhánh"
      dialogTitle="Thêm mới chi nhánh"
      dialogDescription="Vui lòng nhập thông tin chi nhánh"
      isPending={isPending}
      errors={errors}
      register={register}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      open={open}
      handleOpen={handleOpen}
    />
  );
}

export default AddBranchDialog;
