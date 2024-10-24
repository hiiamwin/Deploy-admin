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
import { Button } from "@/components/ui/button";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  addIngredientInDishGeneralAction,
  getIngredientGeneralAction,
} from "@/actions";
import { Label } from "@/components/ui/label";
import { useAction } from "next-safe-action/hooks";
import SelectIngredient from "./SelectIngredient";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { addIngredientInDishGeneralSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type AddIngredientProps = {
  excludedIngredients: {
    id: string;
    name: string;
    ingredientMeasureType: string;
  }[];
  setExcludedIngredients: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        name: string;
        ingredientMeasureType: string;
      }[]
    >
  >;
  refetch: () => void;
  id: string;
};
function AddIngredient({
  excludedIngredients,
  setExcludedIngredients,
  refetch,
  id,
}: AddIngredientProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<z.infer<typeof addIngredientInDishGeneralSchema>>({
    resolver: zodResolver(addIngredientInDishGeneralSchema),
    defaultValues: {
      ingredients: [
        {
          ingredient: { id: "", name: "", ingredientMeasureType: "" },
          quantity: 0,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });
  const watchIngredients = watch("ingredients");

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

  const { execute, isPending } = useAction(addIngredientInDishGeneralAction, {
    onSuccess: () => {
      refetch();
      toast.success("Thêm nguyên liệu thành công");
      handleOpen(false);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof addIngredientInDishGeneralSchema>
  > = useCallback(
    async (data) => {
      execute({ dishGeneralId: id, ingredients: data.ingredients });
    },
    [execute, id]
  );
  const handleOpen = (value: boolean) => {
    if (isPending) return;
    reset({
      ingredients: [
        {
          ingredient: { id: "", name: "", ingredientMeasureType: "" },
          quantity: 0,
        },
      ],
    });
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4">Thêm Nguyên liệu</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Thêm nguyên liệu cho món ăn</DialogTitle>
          <DialogDescription>
            Chọn nguyên liệu cần thêm vào món ăn
          </DialogDescription>
        </DialogHeader>
        <div className="container mx-auto p-4 h-[780px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ScrollArea className=" h-[640px]">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <Label className="mb-2">Nguyên liệu {index + 1}</Label>
                  <div className="flex space-x-4 items-center">
                    <Controller
                      name={`ingredients.${index}.ingredient`}
                      control={control}
                      disabled={isPending}
                      render={({ field }) => {
                        return (
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
                              //
                              excludeIngredients={excludedIngredients}
                            />
                            {errors?.ingredients?.[index]?.ingredient?.id && (
                              <p className="text-red-500">
                                {
                                  errors.ingredients?.[index]?.ingredient?.id
                                    ?.message
                                }
                              </p>
                            )}
                          </div>
                        );
                      }}
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
                  ingredient: { id: "", name: "", ingredientMeasureType: "" },
                  quantity: 0,
                })
              }
              className="mt-4"
            >
              Thêm nguyên liệu
            </Button>
            <div className="flex justify-between mt-4">
              <Button
                type="button"
                onClick={() => handleOpen(false)}
                disabled={isPending}
              >
                Đóng
              </Button>
              <Button type="submit" disabled={isPending}>
                Xác nhận
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddIngredient;
