/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { changeProfileAction } from "@/actions";
import { toast } from "sonner";

function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { execute, isPending } = useAction(changeProfileAction, {
    onSuccess: ({ data }) => {
      console.log(data);

      toast.success("Cập nhật mật khẩu thành công");
    },
    onError: ({ error }) => {
      console.log(error);

      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });
  const onSubmit = (data: any) => {
    execute(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10">
      <div className="space-y-4 py-4">
        <div className="flex flex-col">
          <Label htmlFor={"oldPassword"} className="mb-2">
            Mật khẩu cũ
          </Label>
          <Input
            id={"oldPassword"}
            className="col-span-3"
            type={"text"}
            placeholder={`Nhập mật khẩu cũ`}
            disabled={isPending}
            {...register("oldPassword", {
              required: "Không được để trống",
            })}
          />
          {errors.oldPassword?.message && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.oldPassword?.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor={"newPassword"} className="mb-2">
            Mật khẩu mới
          </Label>
          <Input
            id={"newPassword"}
            className="col-span-3"
            type={"text"}
            placeholder={`Nhập mật khẩu mới`}
            disabled={isPending}
            {...register("newPassword", {
              required: "Không được để trống",
            })}
          />
          {errors.newPassword?.message && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.newPassword?.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor={"confirmPassword"} className="mb-2">
            Xác nhận mật khẩu mới
          </Label>
          <Input
            id={"confirmPassword"}
            className="col-span-3"
            type={"text"}
            placeholder={`Nhập lại mật khẩu mới`}
            disabled={isPending}
            {...register("confirmPassword", {
              validate: {
                matchesNewPassword: (value) =>
                  value === watch("newPassword") ||
                  "Mật khẩu xác nhận không khớp",
              },
            })}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.confirmPassword?.message as string}
            </p>
          )}
        </div>
      </div>
      <Button type="submit" disabled={isPending} className="float-right">
        {isPending ? "Đang xử lý..." : "Câp nhật"}
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
