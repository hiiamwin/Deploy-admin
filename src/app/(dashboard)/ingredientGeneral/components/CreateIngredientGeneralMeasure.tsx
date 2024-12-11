/* eslint-disable @typescript-eslint/no-unused-vars */
import { createIngredientGeneralMeasureAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAction } from "next-safe-action/hooks";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CreateIngredientGeneralMeasure({
  refetch,
  setIsCreatingMeasure,
}: {
  refetch: () => void;
  setIsCreatingMeasure: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();
  const { execute, isPending } = useAction(
    createIngredientGeneralMeasureAction,
    {
      onSuccess: () => {
        refetch();
        reset();
        setIsCreatingMeasure(false);
        toast.success("Thêm đơn vị thành công");
      },
      onError: ({ error }) => {
        if (error.serverError) {
          setError("ingredientMeasureName", {
            message: JSON.parse(error.serverError)[0].message,
          });
          setIsCreatingMeasure(false);
        }
        setIsCreatingMeasure(false);

        // toast.error("Có lỗi xảy ra");
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setIsCreatingMeasure(true);
    execute(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>Đơn vị</Label>
      <Input
        {...register("ingredientMeasureName", {
          validate: (value) => value.trim() !== "" || "Vui lòng nhập đơn vị",
        })}
        required
      />
      {errors.ingredientMeasureName && (
        <p className="text-red-500 text-sm">
          {errors.ingredientMeasureName?.message?.toString()}
        </p>
      )}
      <Button type="submit" className="float-right mt-2" disabled={isPending}>
        Thêm
      </Button>
    </form>
  );
}

export default CreateIngredientGeneralMeasure;
