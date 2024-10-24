"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useAction } from "next-safe-action/hooks";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  downloadRefundDishFileAction,
  uploadRefundDishFileAction,
} from "@/actions";

function AddRefundDishDialog() {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { execute: executeDownload, isPending: isDownloading } = useAction(
    downloadRefundDishFileAction,
    {
      onSuccess: ({ data }) => {
        if (data) {
          const blob = new Blob(
            [Uint8Array.from(atob(data), (c) => c.charCodeAt(0))],
            {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }
          );
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "rfdish.xlsx");
          document.body.appendChild(link);
          link.click();
          if (link.parentNode) {
            link.parentNode.removeChild(link);
          }
          window.URL.revokeObjectURL(url);
        } else {
          toast.error("Data is undefined");
        }
      },
      onError: () => {
        toast.error("Có lỗi xảy ra");
      },
    }
  );

  const { execute: executeUpload, isPending: isUploading } = useAction(
    uploadRefundDishFileAction,
    {
      onSuccess: ({ data }) => {
        toast.success(data);
        setOpen(false);
      },
      onError: () => {
        toast.error("Có lỗi xảy ra");
      },
    }
  );

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    executeUpload({ file: formData });
  };
  const handleOpen = (value: boolean) => {
    if (isDownloading || isUploading) return;
    setOpen(value);
  };
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button>Thêm số lượng món ăn có thể hoàn trả</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Thêm số lượng món ăn có thể hoàn trả</DialogTitle>
          <DialogDescription>
            Vui lòng tải xuống file mẫu và nhập vào file số lượng món ăn có thể
            hoàn trả
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="flex flex-col">
              <Label htmlFor={"ingredientFile"} className="mb-2">
                Nhập file
              </Label>
              <Input
                id={"ingredientFile"}
                className="col-span-3"
                type={"file"}
                disabled={isDownloading || isUploading}
                accept=".xlsx"
                {...register("file", {
                  validate: (value) => {
                    if (value.length === 0) {
                      return "Vui lòng chọn file"; // or any validation logic that returns a boolean or string
                    }

                    if (value[0].name.split(".")[1] !== "xlsx") {
                      return "Vui lòng chọn file có đuôi là xlsx";
                    }
                  },
                })}
              />
              {errors.file?.message && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.file?.message as string}
                </p>
              )}
            </div>
          </div>
          <div>
            Vui lòng tải file mẫu {""}
            <Button
              type="button"
              variant={"link"}
              className="p-0 text-lg font-bold"
              onClick={() => executeDownload()}
              disabled={isDownloading || isUploading}
            >
              tại đây
            </Button>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isDownloading || isUploading}>
              Xác nhận
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddRefundDishDialog;
