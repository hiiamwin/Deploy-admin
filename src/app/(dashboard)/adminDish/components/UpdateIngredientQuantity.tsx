"use client";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { updateIngredientQuantityInDishGeneralAction } from "@/actions";
import { toast } from "sonner";

type UpdateIngredientQuantityProps = {
  ingredients: {
    ingredientGeneralId: string;
    ingredientGeneralName: string;
    ingredientGeneralQuantity: number;
    ingredientMeasureName: string;
  }[];
  refetch: () => void;
  id: string;
  setSelectIngredients: Dispatch<
    SetStateAction<
      {
        ingredientGeneralId: string;
        ingredientGeneralName: string;
        ingredientGeneralQuantity: number;
        ingredientMeasureName: string;
      }[]
    >
  >;
};
interface IngredientFormData {
  [key: string]: number;
}
function UpdateIngredientQuantity({
  ingredients,
  refetch,
  id,
  setSelectIngredients,
}: UpdateIngredientQuantityProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { execute, isPending } = useAction(
    updateIngredientQuantityInDishGeneralAction,
    {
      onSuccess: () => {
        refetch();
        setSelectIngredients([]);
        handleOpen(false);
        toast.success("Cập nhật số lượng nguyên liệu thành công");
      },
      onError: () => {},
    }
  );
  const onsubmit: SubmitHandler<IngredientFormData> = (data) => {
    const updateIngredient = Object.entries(data).map(([key, value]) => ({
      ingredientGeneralId: key.replace("ingredientGeneralQuantity", ""),
      quantity: value,
    }));

    execute({ updateIngredient, id });
  };

  const handleOpen = useCallback(
    (value: boolean) => {
      if (isPending) return;
      reset();
      setOpen(value);
    },
    [isPending, reset]
  );
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4">Cập nhật số lượng nguyên liệu</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Cập nhật số lượng nguyên liệu đang có trong món ăn
          </DialogTitle>
          <DialogDescription>
            Nhập số lượng nguyên liệu cần cập nhật
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="container mx-auto p-4">
            <h3 className="text-2xl font-bold text-gray-700 text-center">
              Nguyên liệu đang có trong món ăn
            </h3>
            <div>
              <div className="grid grid-cols-3 border-b p-4 text-[#737373] hover:bg-[#f5f5f580] text-sm ">
                <div>Tên nguyên liệu</div>
                <div>Số lượng</div>
                <div>Đơn vị</div>
              </div>
              <ScrollArea className="h-[580px]">
                {ingredients.map((ingredient) => (
                  <div key={ingredient.ingredientGeneralId}>
                    <div className="grid grid-cols-3 border-b p-4 hover:bg-[#f5f5f580] text-sm items-center">
                      <div>{ingredient.ingredientGeneralName}</div>
                      <div>
                        <Input
                          defaultValue={ingredient.ingredientGeneralQuantity}
                          type="number"
                          className="h-6 w-4/5"
                          {...register(
                            `ingredientGeneralQuantity${ingredient.ingredientGeneralId}`,
                            {
                              validate: (value) => {
                                if (value <= 0) {
                                  return "Số lượng phải lớn hơn 0";
                                }
                                if (
                                  value === ingredient.ingredientGeneralQuantity
                                ) {
                                  return "Số lượng không thay đổi";
                                }
                                return true;
                              },
                              valueAsNumber: true,
                            }
                          )}
                        />
                      </div>
                      <div>{ingredient.ingredientMeasureName}</div>
                    </div>
                    {errors[
                      `ingredientGeneralQuantity${ingredient.ingredientGeneralId}`
                    ] && (
                      <p className="text-red-500 text-xs mt-1 text-center">
                        {String(
                          errors[
                            `ingredientGeneralQuantity${ingredient.ingredientGeneralId}`
                          ]?.message
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </ScrollArea>
              <div className="flex gap-2 justify-between">
                <Button
                  type="button"
                  className="mt-4"
                  onClick={() => handleOpen(false)}
                  disabled={isPending}
                >
                  Đóng
                </Button>
                <Button disabled={isPending} type="submit" className="mt-4">
                  Xác nhận
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateIngredientQuantity;
