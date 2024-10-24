"use client";
import { createComboAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { createComboFormSchema } from "@/schemas";
import { Dish } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import React, { Dispatch, useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type AddComboDialogProps = {
  handleOpenPrevDialog: (value: boolean) => void;
  selectedDishes: Dish[];
  setSelectedDishes: Dispatch<React.SetStateAction<Dish[]>>;
};
function AddComboDialog({
  handleOpenPrevDialog,
  selectedDishes,
  setSelectedDishes,
}: AddComboDialogProps) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<{ file: File; url: string }>();
  const [totalPrice, setTotalPrice] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
    setError,
    clearErrors,
  } = useForm<z.infer<typeof createComboFormSchema>>({
    resolver: zodResolver(createComboFormSchema),
    defaultValues: {
      productInCombos: selectedDishes.map((dish) => ({
        productId: dish.id,
        quantity: 1,
      })),
    },
  });

  const { execute, isPending } = useAction(createComboAction, {
    onSuccess: ({ data }) => {
      // reset();
      // handleOpenPrevDialog(false);
      // console.log(data);
      toast.success(data);
      reset();
      handleOpen(false);
      handleOpenPrevDialog(false);
      setSelectedDishes([]);
      setTotalPrice(0);
      setImage(undefined);
    },
    onError: ({ error }) => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createComboFormSchema>> = async (
    data
  ) => {
    if (Number(data.price) > totalPrice) {
      setError("price", {
        type: "manual",
        message: "Giá combo không thể lớn hơn tổng giá các món",
      });
      return;
    }

    if (!image) {
      setError("thumbnail", {
        type: "manual",
        message: "Vui lòng chọn ảnh cho combo",
      });
      return;
    }
    const formData = new FormData();
    formData.append("thumbnail", image.file);

    execute({ ...data, isActive: false, thumbnail: formData });
  };

  const handleOpen = (value: boolean) => {
    if (isPending) return;
    reset({
      productInCombos: selectedDishes.map((dish) => ({
        productId: dish.id,
        quantity: 1,
      })),
    });
    setImage(undefined);
    setTotalPrice(0);
    setOpen(value);
  };

  const handlePreviewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      setImage({ file, url: URL.createObjectURL(file) });
    }
  };

  const watchProductInCombos = useWatch({
    control,
    name: "productInCombos",
  });
  const calculateTotalPrice = useCallback(() => {
    const total = selectedDishes.reduce((acc, dish, index) => {
      const quantity = watchProductInCombos[index]?.quantity || 1;
      return acc + Number(dish.price) * quantity;
    }, 0);
    setTotalPrice(total);
  }, [selectedDishes, watchProductInCombos]);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice]);

  const watchPrice = watch("price");

  useEffect(() => {
    if (Number(watchPrice) > totalPrice) {
      setError("price", {
        type: "manual",
        message: "Giá combo không thể lớn hơn tổng giá các món",
      });
    } else {
      clearErrors("price");
    }
  }, [watchPrice, totalPrice, setError, clearErrors]);

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogTrigger asChild>
          <Button>Thêm mới combo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-6xl bg-white">
          <DialogHeader>
            <DialogTitle>Thêm mới combo</DialogTitle>
            <DialogDescription>
              Vui lòng chọn các món ăn cho combo
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 py-2">
              <div className="flex flex-col">
                <Label htmlFor={`comboName`} className="mb-2">
                  Tên combo
                </Label>
                <Input
                  id={`comboName`}
                  className="col-span-3"
                  type={"text"}
                  {...register("comboName")}
                  placeholder={`Nhập tên combo`}
                  disabled={isPending}
                />
                {errors.comboName?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.comboName.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor={`comboDescription`} className="mb-2">
                  Mô tả
                </Label>
                <Textarea
                  id="comboDescription"
                  placeholder="Nhập mô tả"
                  {...register("comboDescription")}
                />
                {errors.comboDescription?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.comboDescription.message as string}
                  </p>
                )}
              </div>
              <div>
                <Label>Hình ảnh combo</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {image && (
                    <div className="relative">
                      <Image
                        src={image.url}
                        alt={`Uploaded image`}
                        width={128}
                        height={128}
                        className="w-32 h-32 object-cover rounded-md aspect-square"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(image.url);
                          setImage(undefined);
                        }}
                        className="absolute -top-2 -right-2 rounded-full"
                        size={"icon"}
                        aria-label={`Remove image`}
                        disabled={isPending}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  )}

                  {!image && (
                    <Label className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isPending}
                        onChange={handlePreviewImage}
                      />
                      <span className="text-gray-500 text-3xl">+</span>
                    </Label>
                  )}
                </div>

                {errors.thumbnail?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.thumbnail.message as string}
                  </p>
                )}
              </div>
              <div>
                <div className="text-center grid grid-cols-6 border-b p-4 text-[#737373] hover:bg-[#f5f5f580] text-sm">
                  <div>Ảnh</div>
                  <div>Tên món ăn</div>
                  <div>Giá</div>
                  <div>Phần trăm chênh lệch giá</div>
                  <div>Phân loại</div>
                  <div>Số lượng</div>
                </div>
                <ScrollArea className="h-[240px]">
                  {selectedDishes?.map((dish, index) => (
                    <div
                      className="text-center grid grid-cols-6 border-b p-4 hover:bg-[#f5f5f580] text-sm"
                      key={dish?.id}
                    >
                      <div className="m-auto">
                        <Image
                          src={dish?.images[0]?.url as string}
                          alt={dish?.dishName as string}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="my-auto">{dish?.dishName}</div>
                      <div className="my-auto">{dish?.price}</div>
                      <div className="my-auto">
                        {dish?.percentagePriceDifference}
                      </div>
                      <div className="my-auto">{dish?.categoryName}</div>
                      <div className="my-auto">
                        <Input
                          type="number"
                          defaultValue={1}
                          className="w-16"
                          {...register(`productInCombos.${index}.quantity`, {
                            valueAsNumber: true,
                          })}
                          onChange={(e) => {
                            register(
                              `productInCombos.${index}.quantity`
                            ).onChange(e);
                            calculateTotalPrice();
                          }}
                        />
                        {errors.productInCombos?.[index]?.quantity?.message && (
                          <p className="text-red-500 text-sm mt-1" role="alert">
                            {
                              errors.productInCombos?.[index]?.quantity
                                ?.message as string
                            }
                          </p>
                        )}
                        <Input
                          type="hidden"
                          defaultValue={dish.id}
                          {...register(`productInCombos.${index}.productId`)}
                        />
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <Label>Giá tối đa: {totalPrice}</Label>
              <div className="flex flex-col">
                <Label htmlFor={`comboPrice`} className="mb-2">
                  Giá Combo
                </Label>
                <Input
                  defaultValue={0}
                  id={`comboPrice`}
                  className="col-span-3"
                  type={"number"}
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                  placeholder={`Nhập giá combo`}
                  disabled={isPending}
                />
                {errors.price?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.price?.message as string}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              {/* onClick={() => handleAddNewDish()} */}
              {selectedDishes.length > 0 && (
                <Button disabled={isPending}>Thêm món ăn</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddComboDialog;
