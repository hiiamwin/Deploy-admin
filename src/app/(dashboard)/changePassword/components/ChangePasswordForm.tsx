/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { changeProfileAction } from "@/actions";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

function ChangePasswordForm() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();
  const { execute, isPending } = useAction(changeProfileAction, {
    onSuccess: ({ data }) => {
      console.log(data);

      toast.success("Cập nhật mật khẩu thành công");
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
  const onSubmit = (data: any) => {
    if (data.oldPassword === data.newPassword) {
      toast.error("Mật khẩu mới không được trùng với mật khẩu cũ");
      return;
    }
    execute(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10">
      <div className="space-y-4 py-4">
        <div className="flex flex-col">
          <Label htmlFor={"oldPassword"} className="mb-2">
            Mật khẩu cũ
          </Label>
          <div className="relative">
            <Input
              id={"oldPassword"}
              className="col-span-3"
              type={showOldPassword ? "text" : "password"}
              placeholder={`Nhập mật khẩu cũ`}
              disabled={isPending}
              {...register("oldPassword", {
                required: "Không được để trống",
              })}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowOldPassword(!showOldPassword)}
              disabled={isPending}
            >
              {showOldPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
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
          <div className="relative">
            <Input
              id={"newPassword"}
              className="col-span-3"
              type={showNewPassword ? "text" : "password"}
              placeholder={`Nhập mật khẩu mới`}
              disabled={isPending}
              {...register("newPassword", {
                required: "Không được để trống",
              })}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowNewPassword(!showNewPassword)}
              disabled={isPending}
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

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
          <div className="relative">
            <Input
              id={"confirmPassword"}
              className="col-span-3"
              type={showConfirmPassword ? "text" : "password"}
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
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isPending}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
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
