import { DishGeneral } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { z } from "zod";
import { updateDishGeneralNormalInformationFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import {
  getDishCategoriesAction,
  updateDishGeneralNormalInformationAction,
} from "@/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import UpdateImage from "./UpdateImage";
import { toast } from "sonner";

type UpdateNormalInfomationDialogProps = {
  isOpenUpdateNormalInformationDialog: boolean;
  setIsOpenUpdateNormalInformationDialog: Dispatch<SetStateAction<boolean>>;
  data: DishGeneral;
};
function UpdateNormalInfomationDialog({
  data,
  isOpenUpdateNormalInformationDialog,
  setIsOpenUpdateNormalInformationDialog,
}: UpdateNormalInfomationDialogProps) {
  const [images, setImages] = React.useState<
    { file: File | null; url: string }[]
  >(data.images.map((img) => ({ file: null, url: img.url })));

  const { data: category, isPending: isGetting } = useQuery({
    queryKey: ["dishCategories"],
    queryFn: () => getDishCategoriesAction(),
    enabled: isOpenUpdateNormalInformationDialog,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setError,
  } = useForm<z.infer<typeof updateDishGeneralNormalInformationFormSchema>>({
    resolver: zodResolver(updateDishGeneralNormalInformationFormSchema),
    defaultValues: {
      dishGeneralName: data.dishGeneralName,
      dishGeneralDescription: data.dishGeneralDescription,
      price: data.dishGeneralPrice,
      percentagePriceDifference: data.percentagePriceDifference,
      categoryId: data.categoryId,
    },
  });

  const { execute, isPending } = useAction(
    updateDishGeneralNormalInformationAction,
    {
      onSuccess: ({ data }) => {
        console.log(data);
        toast.success("Cập nhật thông tin món ăn thành công");
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
        } else {
          toast.error("Cập nhật thông tin món ăn thất bại");
        }
      },
    }
  );

  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpenUpdateNormalInformationDialog(value);
  };

  const onSubmit: SubmitHandler<
    z.infer<typeof updateDishGeneralNormalInformationFormSchema>
  > = async (dataForm) => {
    console.log(dataForm);
    if (images.length === 0) {
      setError("root", {
        message: "Vui lòng chọn ít nhất 1 hình ảnh",
      });
      return;
    }
    const formData = new FormData();
    images.forEach((image, index) => {
      if (image.file) {
        formData.append(`image${index}`, image.file);
        URL.revokeObjectURL(image.url);
      }
    });

    execute({
      id: data.id,
      dishGeneralName: dataForm.dishGeneralName,
      dishGeneralDescription: dataForm.dishGeneralDescription,
      price: dataForm.price,
      categoryId: dataForm.categoryId,
      percentPriceDifference: dataForm.percentagePriceDifference,
      imageUrl: images.filter((img) => img.file === null).map((img) => img.url),
      images: formData,
    });
  };

  return (
    <Dialog
      open={isOpenUpdateNormalInformationDialog}
      onOpenChange={handleOpen}
    >
      <DialogContent className="bg-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>Thay đổi thông tin cơ bản của món ăn</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {isGetting ? (
          <div className="w-full flex items-center justify-center ">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 py-4">
              <div className="flex flex-col">
                <Label htmlFor={"dishGeneralName"} className="mb-2">
                  Tên món ăn
                </Label>
                <Input
                  id={"dishGeneralName"}
                  className="col-span-3"
                  type={"text"}
                  placeholder={`Nhập tên món ăn`}
                  disabled={isPending}
                  {...register("dishGeneralName")}
                />
                {errors.dishGeneralName?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.dishGeneralName?.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor={"dishGeneralDescription"} className="mb-2">
                  Mô tả
                </Label>
                <Textarea
                  id="dishGeneralDescription"
                  className="col-span-3"
                  placeholder="Nhập mô tả món ăn"
                  disabled={isPending}
                  {...register("dishGeneralDescription")}
                />
                {errors.dishGeneralDescription?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.dishGeneralDescription?.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor={"price"} className="mb-2">
                  Giá
                </Label>
                <Input
                  id={"price"}
                  className="col-span-3"
                  type={"text"}
                  placeholder={`Nhập giá món ăn`}
                  disabled={isPending}
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.price?.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor={"percentagePriceDifference"} className="mb-2">
                  Chênh lệch giá
                </Label>
                <Input
                  id={"percentagePriceDifference"}
                  className="col-span-3"
                  type={"text"}
                  placeholder={`Nhập chênh lệch giá món ăn`}
                  disabled={isPending}
                  {...register("percentagePriceDifference", {
                    valueAsNumber: true,
                  })}
                />
                {errors.percentagePriceDifference?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.percentagePriceDifference?.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="adminDishDescription" className="mb-2">
                  Danh mục
                </Label>
                <Controller
                  name="categoryId"
                  control={control}
                  disabled={isPending}
                  render={({ field }) => {
                    return (
                      <>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Danh mục" />
                          </SelectTrigger>
                          <SelectContent>
                            {category?.data?.results.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.categoryName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.categoryId && (
                          <p className="text-red-500">
                            {errors.categoryId.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor={"percentagePriceDifference"} className="mb-2">
                  Hình ảnh
                </Label>
                <UpdateImage
                  images={images}
                  setImages={setImages}
                  isPending={isPending}
                />
                {errors.root?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.root?.message as string}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Đang xử lý..." : "xác nhận"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default UpdateNormalInfomationDialog;
