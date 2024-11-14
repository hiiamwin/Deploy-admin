"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  FieldErrors,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface Input {
  name: string;
  label: string;
  type: string;
}

interface ReuseAddDialogProps<T extends FieldValues> {
  addButtonTitle: string;
  dialogTitle: string;
  dialogDescription: string;
  Inputs: Input[];
  isPending: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  onSubmit: SubmitHandler<T>;
  handleSubmit: UseFormHandleSubmit<T, undefined>;
  open: boolean;
  handleOpen: (value: boolean) => void;
}

function ReuseAddDiaglog<T extends FieldValues>({
  addButtonTitle,
  dialogDescription,
  dialogTitle,
  Inputs,
  isPending,
  errors,
  register,
  onSubmit,
  handleSubmit,
  open,
  handleOpen,
}: ReuseAddDialogProps<T>) {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button>{addButtonTitle}</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            {Inputs.map((input) =>
              input.type === "hidden" ? (
                <Input
                  key={input.name}
                  type={input.type}
                  {...register(input.name as Path<T>)}
                  hidden
                />
              ) : (
                <div className="flex flex-col" key={input.name}>
                  <Label htmlFor={input.name} className="mb-2">
                    {input.label}
                  </Label>
                  <Input
                    id={input.name}
                    className="col-span-3"
                    type={input.type}
                    {...register(input.name as Path<T>)}
                    placeholder={`Nhập ${input.label}`}
                    disabled={isPending}
                  />
                  {errors[input.name]?.message && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors[input.name]?.message as string}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Đang xử lý..." : addButtonTitle}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ReuseAddDiaglog;
