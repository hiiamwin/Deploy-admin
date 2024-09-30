"use client";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Input {
  name: string;
  label: string;
  type: string;
}

interface ReuseUpdateDialogProps<T extends FieldValues> {
  updateButtonTitle: string;
  dialogTitle: string;
  dialogDescription: string;
  Inputs: Input[];
  isPending: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  onSubmit: SubmitHandler<T>;
  handleSubmit: UseFormHandleSubmit<T, undefined>;
  isOpenUpdateDialog: boolean;
  handleOpen: (value: boolean) => void;
}
function ReuseUpdateDialog<T extends FieldValues>({
  dialogTitle,
  dialogDescription,
  Inputs,
  isPending,
  isOpenUpdateDialog,
  handleSubmit,
  register,
  errors,
  onSubmit,
  updateButtonTitle,
  handleOpen,
}: ReuseUpdateDialogProps<T>) {
  return (
    <Dialog open={isOpenUpdateDialog} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            {Inputs.map((input) => {
              if (input.type === "hidden") {
                return (
                  <Input
                    type="hidden"
                    {...register(input.name as Path<T>)}
                    key={input.name}
                  />
                );
              }
              return (
                <div key={input.name} className="flex flex-col">
                  <Label htmlFor={input.name} className="mb-2">
                    {input.label}
                  </Label>
                  <Input
                    id={input.name}
                    className="col-span-3"
                    type={input.type}
                    placeholder={`Nhập ${input.label}`}
                    {...register(input.name as Path<T>)}
                    disabled={isPending}
                  />
                  {errors[input.name] && (
                    <span className="text-red-500">
                      {errors[input.name]?.message?.toString()}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Đang xử lý..." : updateButtonTitle}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ReuseUpdateDialog;
