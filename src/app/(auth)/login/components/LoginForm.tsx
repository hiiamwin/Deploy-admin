"use client";
import { loginAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const { execute, isPending } = useAction(loginAction, {
    onSuccess: () => {
      toast.success("Đăng nhập thành công");
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

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = useCallback(
    (data) => {
      execute(data);
    },
    [execute]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="code">Mã nhân viên</Label>
        <Input
          id="code"
          type="text"
          placeholder="Nhập mã nhân viên của bạn"
          required
          {...register("code")}
          disabled={isPending}
        />
        {errors.code && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {errors.code.message}
          </p>
        )}
      </div>

      <div className="space-y-2 mt-2">
        <Label htmlFor="password">Mật khẩu</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Nhập mật khẩu của bạn"
            {...register("password")}
            disabled={isPending}
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isPending}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button className="w-full mt-4" type="submit" disabled={isPending}>
        Đăng nhập
      </Button>
    </form>
  );
}

export default LoginForm;
