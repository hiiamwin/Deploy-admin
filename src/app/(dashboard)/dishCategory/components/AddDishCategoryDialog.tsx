"use client";
import { createDishCategoryFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ReuseAddDiaglog } from "../../components";
import { useAction } from "next-safe-action/hooks";
import { createDishCategoryAction } from "@/actions";

function AddDishCategoryDialog() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof createDishCategoryFormSchema>>({
    resolver: zodResolver(createDishCategoryFormSchema),
  });
  const { execute, isPending } = useAction(createDishCategoryAction, {
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

  const onSubmit: SubmitHandler<z.infer<typeof createDishCategoryFormSchema>> =
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
    {
      name: "categoryName",
      label: "Tên danh mục",
      type: "text",
    },
  ];
  return (
    <ReuseAddDiaglog
      Inputs={inputs}
      addButtonTitle="Thêm mới danh mục"
      dialogTitle="Thêm mới danh mục"
      dialogDescription="Vui lòng nhập thông tin danh mục"
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

export default AddDishCategoryDialog;
