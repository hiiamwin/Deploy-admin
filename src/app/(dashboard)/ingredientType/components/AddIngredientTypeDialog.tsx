"use client";
import React, { useCallback, useState } from "react";
import { ReuseAddDiaglog } from "../../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIngredientTypeFormSchema } from "@/schemas";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { createIngredientTypeAction } from "@/actions";

function AddIngredientTypeDialog() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof createIngredientTypeFormSchema>>({
    resolver: zodResolver(createIngredientTypeFormSchema),
  });
  const { execute, isPending } = useAction(createIngredientTypeAction, {
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

  const onSubmit: SubmitHandler<
    z.infer<typeof createIngredientTypeFormSchema>
  > = useCallback(
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
      name: "ingredientTypeName",
      label: "Tên loại nguyên liệu",
      type: "text",
    },
    {
      name: "ingredientTypeDescription",
      label: "Mô tả",
      type: "text",
    },
  ];
  return (
    <ReuseAddDiaglog
      Inputs={inputs}
      addButtonTitle="Thêm mới loại nguyên liệu"
      dialogTitle="Thêm mới loại nguyên liệu"
      dialogDescription="Vui lòng nhập thông tin loại nguyên liệu"
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

export default AddIngredientTypeDialog;
