"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Restaurant } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { updateRestaurantAction } from "@/actions";
import { toast } from "sonner";
import { z } from "zod";
import { updateRestaurantFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReuseUpdateDialog } from "@/app/(dashboard)/components";

function UpdateBranchDialog({
  isOpenUpdateDialog,
  setIsOpenUpdateDialog,
  data,
}: {
  isOpenUpdateDialog: boolean;
  setIsOpenUpdateDialog: Dispatch<SetStateAction<boolean>>;
  data: Restaurant;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof updateRestaurantFormSchema>>({
    resolver: zodResolver(updateRestaurantFormSchema),
    defaultValues: {
      id: data.id,
      restaurantName: data.restaurantName,
      address: data.address,
      restaurantPhone: data.restaurantPhone,
    },
  });

  const { execute, isPending } = useAction(updateRestaurantAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      setIsOpenUpdateDialog(false);
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

  const onSubmit: SubmitHandler<z.infer<typeof updateRestaurantFormSchema>> = (
    data
  ) => {
    execute(data);
  };

  const inputs = [
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
    {
      name: "restaurantName",
      label: "Tên chi nhánh",
      type: "text",
    },
    {
      name: "address",
      label: "Địa chỉ chi nhánh",
      type: "text",
    },
    {
      name: "restaurantPhone",
      label: "Số điện thoại chi nhánh",
      type: "text",
    },
  ];

  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpenUpdateDialog(value);
  };

  return (
    <ReuseUpdateDialog
      Inputs={inputs}
      dialogTitle="Cập nhật nhà hàng"
      dialogDescription="Vui lòng nhập thông tin cập nhật."
      isPending={isPending}
      isOpenUpdateDialog={isOpenUpdateDialog}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      onSubmit={onSubmit}
      handleOpen={handleOpen}
      updateButtonTitle="Cập nhật nhà hàng"
    />
  );
}

export default UpdateBranchDialog;
