"use client";
import React, { useCallback, useState } from "react";
import { ReuseAddDiaglog } from "@/app/(dashboard)/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { createWaiterAction } from "@/actions";
import { toast } from "sonner";
import { z } from "zod";
import { createEmployeeFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

function AddWaiterDialog() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof createEmployeeFormSchema>>({
    resolver: zodResolver(createEmployeeFormSchema),
  });

  const { execute, isPending } = useAction(createWaiterAction, {
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
    execute(data);
  };

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
      name: "lastName",
      label: "Tên",
      type: "text",
    },
    {
      name: "firstName",
      label: "Họ",
      type: "text",
    },
    {
      name: "address",
      label: "Địa chỉ",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
  ];
  return (
    <ReuseAddDiaglog
      Inputs={inputs}
      addButtonTitle="Thêm mới nhân viên"
      dialogTitle="Thêm mới nhân viên"
      dialogDescription="Vui lòng nhập thông tin nhân viên"
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

export default AddWaiterDialog;
