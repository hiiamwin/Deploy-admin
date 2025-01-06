import { Ingredient } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { updateIngredientUnitAction } from "@/actions";
import { toast } from "sonner";
import { z } from "zod";
import { updateUnitSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

function UpdateUnitDialog({
  item,
  isOpenUpdateUnitDialog,
  setIsOpenUpdateUnitDialog,
}: {
  item: Ingredient;
  isOpenUpdateUnitDialog: boolean;
  setIsOpenUpdateUnitDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    reset,
  } = useForm<z.infer<typeof updateUnitSchema>>({
    resolver: zodResolver(updateUnitSchema),
  });
  const unitName = useWatch({ control, name: "unitName" });
  const { execute, isPending } = useAction(updateIngredientUnitAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
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
      }
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof updateUnitSchema>> = (data) => {
    execute(data);
  };
  const handleOpen = (value: boolean) => {
    if (isPending) return;
    reset();
    setIsOpenUpdateUnitDialog(value);
  };

  return (
    <Dialog open={isOpenUpdateUnitDialog} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Cập nhật đơn vị</DialogTitle>
          <DialogDescription>
            Nhập thông tin đơn vị cần cập nhật
          </DialogDescription>
          {item.ingredientUnits.filter((u) => {
            if (
              u.ingredientUnitParentId !== null &&
              u.unitName !== "kg" &&
              u.unitName !== "l"
            ) {
              return u;
            }
          }).length > 0 ? (
            <>
              <RadioGroup
                disabled={isPending}
                className="flex gap-4 items-center flex-wrap"
                onValueChange={(value) => {
                  const unit = item.ingredientUnits.find(
                    (unit) => unit.ingredientUnitId === value
                  );
                  setValue("unitName", unit?.unitName as string);
                  setValue(
                    "conversionFactor",
                    unit?.conversionFactor as number
                  );
                  setValue(
                    "ingredientUnitParentName",
                    unit?.ingredientUnitParentName as string
                  );
                  setValue("id", unit?.ingredientUnitId as string);
                }}
              >
                {item.ingredientUnits
                  .filter(
                    (u) =>
                      u.ingredientUnitParentId !== null &&
                      u.unitName !== "kg" &&
                      u.unitName !== "l"
                  )
                  .map((unit) => (
                    <div
                      className="flex items-center space-x-2 justify-center"
                      key={unit.ingredientUnitId}
                    >
                      <RadioGroupItem
                        value={unit.ingredientUnitId}
                        id={unit.ingredientUnitId}
                      />
                      <Label htmlFor={unit.ingredientUnitId}>
                        {unit.unitName}
                      </Label>
                    </div>
                  ))}
              </RadioGroup>
              {unitName && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4 py-4">
                    <div className="flex flex-col">
                      <Label htmlFor={"unitName"} className="mb-2">
                        Tên đơn vị
                      </Label>
                      <Input
                        id={"unitName"}
                        className="col-span-3"
                        type={"text"}
                        {...register("unitName")}
                        placeholder={`Nhập tên đơn vị`}
                        disabled={isPending}
                      />
                      {errors.unitName?.message && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                          {errors.unitName.message as string}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor={"conversionFactor"} className="mb-2">
                        Hệ số chuyển đổi
                      </Label>
                      <Input
                        id={"conversionFactor"}
                        className="col-span-3"
                        type={"number"}
                        {...register("conversionFactor", {
                          valueAsNumber: true,
                        })}
                        placeholder={`Nhập hệ số chuyển đổi`}
                        disabled={isPending}
                      />
                      {errors.conversionFactor?.message && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                          {errors.conversionFactor.message as string}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <Label
                        htmlFor={"ingredientUnitParentName"}
                        className="mb-2"
                      >
                        Đơn vị chuyển đổi
                      </Label>
                      <Input
                        id={"ingredientUnitParentName"}
                        className="col-span-3"
                        type={"text"}
                        disabled={true}
                        readOnly={true}
                        {...register("ingredientUnitParentName")}
                      />

                      <Input
                        // value={item.id}
                        className="col-span-3"
                        type={"hidden"}
                        {...register("id")}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isPending}>
                      {/* {isPending ? "Đang xử lý..." : addButtonTitle} */}
                      Cập nhật đơn vị
                    </Button>
                  </DialogFooter>
                </form>
              )}

              {/* )} */}
            </>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Ngoại trừ đơn vị cơ sở nguyên liệu này vẫn chưa được thiết lập đơn
              vị
            </p>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateUnitDialog;
