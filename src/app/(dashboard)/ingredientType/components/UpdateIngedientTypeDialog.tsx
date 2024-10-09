"use client";
import { IngredientType } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { ReuseUpdateDialog } from "../../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateIngredientTypeFormSchema } from "@/schemas";
import { updateIngredientTypeAction } from "@/actions";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

function UpdateIngedientTypeDialog({
  isOpenUpdateDialog,
  setIsOpenUpdateDialog,
  data,
}: {
  isOpenUpdateDialog: boolean;
  setIsOpenUpdateDialog: Dispatch<SetStateAction<boolean>>;
  data: IngredientType;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof updateIngredientTypeFormSchema>>({
    resolver: zodResolver(updateIngredientTypeFormSchema),
    defaultValues: {
      id: data.id,
      ingredientTypeName: data.ingredientTypeName,
      ingredientTypeDescription: data.ingredientTypeDescription,
    },
  });
  const { execute, isPending } = useAction(updateIngredientTypeAction, {
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
    z.infer<typeof updateIngredientTypeFormSchema>
  > = (data) => {
    execute(data);
  };

  const inputs = [
    {
      name: "ingredientTypeName",
      label: "Tên loại nguyên liệu",
      type: "text",
    },
    {
      name: "ingredientTypeDescription",
      label: "Mô tả",
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
      dialogTitle="Cập nhật loại nguyên liệu"
      dialogDescription="Vui lòng nhập thông tin cập nhật."
      isPending={isPending}
      isOpenUpdateDialog={isOpenUpdateDialog}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      onSubmit={onSubmit}
      handleOpen={handleOpen}
      updateButtonTitle="Cập nhật loại nguyên liệu"
    />
  );
}

export default UpdateIngedientTypeDialog;
