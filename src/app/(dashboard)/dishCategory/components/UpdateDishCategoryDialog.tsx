"use client";
import React, { Dispatch, SetStateAction } from "react";
import { ReuseUpdateDialog } from "../../components";
import { DishCategory } from "@/types";
import { updateDishCategoryFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { z } from "zod";
import { updateDishCategoryAction } from "@/actions";

function UpdateDishCategoryDialog({
  isOpenUpdateDialog,
  setIsOpenUpdateDialog,
  data,
}: {
  isOpenUpdateDialog: boolean;
  setIsOpenUpdateDialog: Dispatch<SetStateAction<boolean>>;
  data: DishCategory;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof updateDishCategoryFormSchema>>({
    resolver: zodResolver(updateDishCategoryFormSchema),
    defaultValues: {
      id: data.id,
      categoryName: data.categoryName,
    },
  });

  const { execute, isPending } = useAction(updateDishCategoryAction, {
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
  const onSubmit: SubmitHandler<
    z.infer<typeof updateDishCategoryFormSchema>
  > = (data) => {
    execute(data);
  };

  const inputs = [
    {
      name: "categoryName",
      label: "Tên danh mục",
      type: "text",
    },
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
  ];

  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpenUpdateDialog(value);
  };
  return (
    <ReuseUpdateDialog
      Inputs={inputs}
      dialogTitle="Cập nhật danh mục món ăn"
      dialogDescription="Vui lòng nhập thông tin cập nhật."
      isPending={isPending}
      isOpenUpdateDialog={isOpenUpdateDialog}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      onSubmit={onSubmit}
      handleOpen={handleOpen}
      updateButtonTitle="Cập nhật danh mục"
    />
  );
}

export default UpdateDishCategoryDialog;
