"use client";
import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import SelectIngredient from "./SelectIngredient";
import {
  createDishGeneralAction,
  getDishCategoriesAction,
  getIngredientGeneralAction,
} from "@/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import ImagePreview from "./ImagePreview";
import { createDishGeneralFormSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Checkbox } from "@/components/ui/checkbox";

function AddAdminDishDialog() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [excludedIngredients, setExcludedIngredients] = useState<
    {
      id: string;
      name: string;
      ingredientMeasureType: string;
    }[]
  >([]);
  const { data, isPending: isGetting } = useQuery({
    queryKey: ["dishCategories"],
    queryFn: () => getDishCategoriesAction(),
    enabled: open,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    reset,
    setValue,
    // getValues,
  } = useForm<z.infer<typeof createDishGeneralFormSchema>>({
    resolver: zodResolver(createDishGeneralFormSchema),
    defaultValues: {
      ingredients: [
        {
          ingredient: { id: "", name: "", ingredientMeasureType: "" },
          quantity: 0,
        },
      ],
      isRefundable: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const watchIngredients = watch("ingredients", []);
  const isRefundable = watch("isRefundable");

  const fetchIngredient = async (search: string, pageParam = 1) => {
    const data = await getIngredientGeneralAction({
      page: pageParam.toString(),
      ingredientGeneralName: search,
    });

    return {
      data: data?.data?.results ?? [],
      pageNumber: data?.data?.pageNumber ?? 1,
      totalNumberOfPages: data?.data?.totalNumberOfPages ?? 1,
    };
  };

  const { execute, isPending } = useAction(createDishGeneralAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      images.forEach((image) => URL.revokeObjectURL(image.url));
      setImages([]);
      setExcludedIngredients([]);
      setOpen(false);
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

  const onSubmit: SubmitHandler<z.infer<typeof createDishGeneralFormSchema>> =
    useCallback(
      (data) => {
        if (data.ingredients.length > 1000) {
          toast.error("Số lượng nguyên liệu không được vượt quá 1000");
          return;
        }

        if (images.length === 0) {
          toast.error("Vui lòng tải lên ít nhất một hình ảnh");
          return;
        }
        const formData = new FormData();
        images.forEach((image, index) => {
          formData.append(`image${index}`, image.file);
        });

        execute({ ...data, images: formData });
      },
      [execute, images]
    );

  const handleOpen = useCallback(
    (value: boolean) => {
      if (isPending) return;
      reset();
      images.forEach((image) => URL.revokeObjectURL(image.url));
      setImages([]);
      setOpen(value);
    },
    [images, isPending, reset]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button>Thêm mới món ăn</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-4xl py-2">
        <DialogHeader>
          <DialogTitle>Thêm món ăn mới</DialogTitle>
          <DialogDescription>
            Vui lòng điền thông tin chi tiết cho món ăn.
          </DialogDescription>
        </DialogHeader>
        {isGetting ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 py-4">
              <div className="flex w-full gap-4">
                <div className="flex flex-col w-1/2">
                  <Label htmlFor="adminDishName" className="mb-2">
                    Tên món ăn
                  </Label>
                  <Input
                    id="adminDishName"
                    className="col-span-3"
                    type="text"
                    placeholder="Nhập tên món ăn"
                    {...register("dishGeneralName")}
                    disabled={isPending}
                  />
                  {errors.dishGeneralName && (
                    <p className="text-red-500">
                      {errors.dishGeneralName.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-1/2">
                  <Label htmlFor="adminDishName" className="mb-2">
                    Giá
                  </Label>
                  <Input
                    id="adminDishName"
                    className="col-span-3"
                    type="number"
                    placeholder="Nhập tên món ăn"
                    defaultValue={0}
                    {...register("dishGeneralPrice", { valueAsNumber: true })}
                    disabled={isPending}
                  />
                  {errors.dishGeneralPrice && (
                    <p className="text-red-500">
                      {errors.dishGeneralPrice.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex w-full gap-4">
                <div className="flex flex-col w-1/2">
                  <Label htmlFor="adminDishName" className="mb-2">
                    Chênh lệch giá (%)
                  </Label>
                  <Input
                    defaultValue={0}
                    id="adminDishName"
                    className="col-span-3"
                    type="number"
                    placeholder="Nhập tên món ăn"
                    {...register("percentPriceDifference", {
                      valueAsNumber: true,
                    })}
                    disabled={isPending}
                  />
                  {errors.percentPriceDifference && (
                    <p className="text-red-500">
                      {errors.percentPriceDifference.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-1/2">
                  <Label htmlFor="adminDishDescription" className="mb-2">
                    Danh mục
                  </Label>
                  <Controller
                    name="categoryId"
                    control={control}
                    defaultValue=""
                    disabled={isPending}
                    render={({ field }) => (
                      <>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Danh mục" />
                          </SelectTrigger>
                          <SelectContent>
                            {data?.data?.results.map((item) => (
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
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="adminDishDescription" className="mb-2">
                  Mô tả món ăn
                </Label>
                <Textarea
                  id="adminDishDescription"
                  className="col-span-3"
                  placeholder="Nhập mô tả món ăn"
                  {...register("dishGeneralDescription")}
                  disabled={isPending}
                />
                {errors.dishGeneralDescription && (
                  <p className="text-red-500">
                    {errors.dishGeneralDescription.message}
                  </p>
                )}
              </div>

              <ImagePreview
                images={images}
                setImages={setImages}
                isPending={isPending}
              />
              <div className="flex gap-2 items-center">
                {/* <Controller
                  disabled={isPending}
                  name="isRefundable"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      disabled={isPending}
                      checked={field.value}
                      id="isRefundable"
                      onCheckedChange={(value) => {
                        field.onChange(value);
                        console.log(value);

                        if (value) {
                          setValue("ingredients", []);
                          setExcludedIngredients([]);
                        } else {
                          setValue("ingredients", [
                            {
                              ingredient: {
                                id: "",
                                name: "",
                                ingredientMeasureType: "",
                              },
                              quantity: 0,
                            },
                          ]);
                          setExcludedIngredients([]);
                        }
                      }}
                    />
                  )}
                /> */}

                <Checkbox
                  disabled={isPending}
                  name="isRefundable"
                  // checked={isRefundable}
                  id="isRefundable"
                  onCheckedChange={(value) => {
                    // field.onChange(value);
                    // console.log(value);
                    setValue("isRefundable", Boolean(value));

                    if (value) {
                      setValue("ingredients", []);
                      setExcludedIngredients([]);
                    } else {
                      setValue("ingredients", [
                        {
                          ingredient: {
                            id: "",
                            name: "",
                            ingredientMeasureType: "",
                          },
                          quantity: 0,
                        },
                      ]);
                      setExcludedIngredients([]);
                    }
                  }}
                />
                <Label htmlFor="isRefundable">Món ăn có thể trả lại</Label>
              </div>

              {!isRefundable && (
                <>
                  <ScrollArea className="max-h-56 h-56">
                    {fields.map((field, index) => (
                      <div key={field.id} className="space-y-2">
                        <Label className="mb-2">Nguyên liệu {index + 1}</Label>
                        <div className="flex space-x-4 items-center">
                          <Controller
                            name={`ingredients.${index}.ingredient`}
                            control={control}
                            disabled={isPending}
                            render={({ field }) => (
                              <div className="flex flex-col w-1/2">
                                <SelectIngredient
                                  isPending={isPending}
                                  value={field.value}
                                  fetchFn={fetchIngredient}
                                  labelKey="ingredientGeneralName"
                                  onChange={(value) => {
                                    setExcludedIngredients((pre) => {
                                      if (field.value.id) {
                                        return [
                                          ...pre.filter(
                                            (item) => item.id !== field.value.id
                                          ),
                                          {
                                            id: value.id,
                                            name: value.ingredientGeneralName,
                                            ingredientMeasureType:
                                              value.ingredientMeasureType,
                                          },
                                        ];
                                      }
                                      return [
                                        ...pre,
                                        {
                                          id: value.id,
                                          name: value.ingredientGeneralName,
                                          ingredientMeasureType:
                                            value.ingredientMeasureType,
                                        },
                                      ];
                                    });
                                    field.onChange({
                                      id: value.id,
                                      name: value.ingredientGeneralName,
                                      ingredientMeasureType:
                                        value.ingredientMeasureType,
                                    });
                                  }}
                                  excludeIngredients={excludedIngredients}
                                />
                                {errors?.ingredients?.[index]?.ingredient
                                  ?.id && (
                                  <p className="text-red-500">
                                    {
                                      errors.ingredients?.[index]?.ingredient
                                        ?.id?.message
                                    }
                                  </p>
                                )}
                              </div>
                            )}
                          />

                          <div className="flex flex-col w-1/2">
                            <Input
                              {...register(`ingredients.${index}.quantity`, {
                                valueAsNumber: true,
                              })}
                              type="number"
                              placeholder="Số lượng"
                              defaultValue={0}
                              disabled={isPending}
                            />
                            {errors?.ingredients?.[index]?.quantity && (
                              <p className="text-red-500">
                                {errors.ingredients?.[index]?.quantity?.message}
                              </p>
                            )}
                          </div>
                          {watchIngredients[index]?.ingredient
                            ?.ingredientMeasureType && (
                            <span className="ml-2">
                              {
                                watchIngredients[index].ingredient
                                  .ingredientMeasureType
                              }
                            </span>
                          )}

                          {fields.length > 1 && (
                            <Button
                              disabled={isPending}
                              type="button"
                              onClick={() => {
                                remove(index);
                                setExcludedIngredients((pre) => [
                                  ...pre.filter(
                                    (item) =>
                                      item.id !==
                                      watchIngredients[index]?.ingredient?.id
                                  ),
                                ]);
                              }}
                            >
                              Xóa
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <Button
                    disabled={isPending}
                    type="button"
                    onClick={() =>
                      append({
                        ingredient: {
                          id: "",
                          name: "",
                          ingredientMeasureType: "",
                        },
                        quantity: 0,
                      })
                    }
                  >
                    Thêm nguyên liệu
                  </Button>
                </>
              )}
            </div>
            <div className="mt-4 float-right">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Đang xử lý..." : "Thêm món ăn"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddAdminDishDialog;
