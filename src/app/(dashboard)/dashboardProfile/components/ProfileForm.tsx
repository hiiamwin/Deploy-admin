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

function ProfileForm({
  fullName,
  phoneNumber,
}: {
  fullName: string;
  phoneNumber: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { fullName, phoneNumber },
  });
  const { execute, isPending } = useAction(changeProfileAction, {
    onSuccess: ({ data }) => {
      console.log(data);

      toast.success("Cập nhật thông tin thành công");
    },
    onError: ({ error }) => {
      console.log(error);

      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });
  const onSubmit = (data: any) => {
    if (data.fullName === fullName && data.phoneNumber === phoneNumber) {
      toast.error("Thông tin không thay đổi");
      return;
    }
    execute(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10">
      <div className="space-y-4 py-4">
        <div className="flex flex-col">
          <Label htmlFor={"fullName"} className="mb-2">
            Họ và tên
          </Label>
          <Input
            id={"fullName"}
            className="col-span-3"
            type={"text"}
            placeholder={`Nhập họ và tên`}
            disabled={isPending}
            {...register("fullName", {
              validate: {
                notEmpty: (value) =>
                  value.trim().length > 0 || "Không được để trống",
                noNumbers: (value) =>
                  !/\d/.test(value) || "Họ và tên không được phép có số",
              },
            })}
          />
          {errors.fullName?.message && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.fullName?.message as string}
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
            placeholder={`Nhập số điện thoại`}
            disabled={isPending}
            {...register("phoneNumber", {
              validate: {
                isVietnamesePhoneNumber: (value) =>
                  /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/.test(
                    value
                  ) || "Số điện thoại không hợp lệ",
              },
            })}
          />
          {errors.phoneNumber?.message && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.phoneNumber?.message as string}
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

export default ProfileForm;
