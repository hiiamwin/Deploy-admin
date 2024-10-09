"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
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
import {
  updateIngredientGeneralAction,
  getIngredientGeneralByIdAction,
  getIngredientTypesAction,
} from "@/actions";
import { ReuseCombobox } from "../../components";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { UpdateIngredientGeneralSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { IngredientGeneral } from "@/types";
import { useQuery } from "@tanstack/react-query";

function UpdateIngredientGeneralDialog({
  isOpenUpdateDialog,
  setIsOpenUpdateDialog,
  data,
}: {
  isOpenUpdateDialog: boolean;
  setIsOpenUpdateDialog: Dispatch<SetStateAction<boolean>>;
  data: IngredientGeneral;
}) {
  const [updateLabel, setUpdateLabel] = useState<string | undefined>(undefined);

  const { data: ingredientGeneralDetail, isPending: isGetting } = useQuery({
    queryKey: ["ingredientGeneral", data.id],
    queryFn: () => getIngredientGeneralByIdAction({ id: data.id }),
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    control,
  } = useForm<z.infer<typeof UpdateIngredientGeneralSchema>>({
    resolver: zodResolver(UpdateIngredientGeneralSchema),
    defaultValues: {
      ingredientGeneralName: "",
      ingredientGeneralDescription: "",
      ingredientTypeId: "",
    },
  });

  useEffect(() => {
    if (ingredientGeneralDetail?.data) {
      reset({
        id: ingredientGeneralDetail?.data?.id,
        ingredientGeneralName:
          ingredientGeneralDetail?.data?.ingredientGeneralName,
        ingredientGeneralDescription:
          ingredientGeneralDetail?.data?.ingredientGeneralDescription,
        ingredientTypeId: ingredientGeneralDetail?.data?.ingredientGeneralType,
      });
      setUpdateLabel(ingredientGeneralDetail?.data?.ingredientGeneralTypeName);
    }
  }, [ingredientGeneralDetail, reset]);

  const { execute, isPending } = useAction(updateIngredientGeneralAction, {
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

  const onSubmit: SubmitHandler<z.infer<typeof UpdateIngredientGeneralSchema>> =
    useCallback(
      (data) => {
        // console.log(data);

        // const newIngredientGeneral = {
        //   ...data,
        //   ingredientType,
        //   ingredientMeasureType: +unit,
        // };
        execute(data);
      },
      [execute]
    );

  const fetchIngredientTypes = async (search: string, pageParam = 1) => {
    const data = await getIngredientTypesAction({
      page: pageParam.toString(),
      ingredientTypeName: search,
    });
    return {
      data: data?.data?.results ?? [], // Mảng dữ liệu bạn cần
      pageNumber: data?.data?.pageNumber ?? 1, // Số trang hiện tại
      totalNumberOfPages: data?.data?.totalNumberOfPages ?? 1, // Tổng số trang
    };
  };
  const handleOpen = useCallback(
    (value: boolean) => {
      if (isPending) return;
      reset();
      setIsOpenUpdateDialog(value);
    },
    [isPending, reset, setIsOpenUpdateDialog]
  );
  return (
    <Dialog open={isOpenUpdateDialog} onOpenChange={handleOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Cập nhật nguyên liệu</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin nguyên liệu vào biểu mẫu dưới đây.
          </DialogDescription>
        </DialogHeader>
        {isGetting ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("id")} type="hidden" />
            <div className="space-y-4 py-4">
              <div className="flex flex-col">
                <Label htmlFor="ingredientGeneralName" className="mb-2">
                  Tên nguyên liệu
                </Label>
                <Input
                  id="ingredientGeneralName"
                  className="col-span-3"
                  type="text"
                  placeholder="Nhập tên nguyên liệu"
                  {...register("ingredientGeneralName")}
                />
                {errors.ingredientGeneralName?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.ingredientGeneralName?.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="ingredientGeneralDescription" className="mb-2">
                  Mô tả nguyên liệu
                </Label>
                <Input
                  id="ingredientGeneralDescription"
                  className="col-span-3"
                  type="text"
                  placeholder="Nhập mô tả nguyên liệu"
                  {...register("ingredientGeneralDescription")}
                />
                {errors.ingredientGeneralDescription?.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.ingredientGeneralDescription?.message as string}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label className="mb-2">Loại nguyên liệu</Label>
                <Controller
                  name="ingredientTypeId"
                  control={control}
                  render={({ field }) => {
                    return (
                      <>
                        <ReuseCombobox
                          fetchFn={fetchIngredientTypes}
                          value={field.value}
                          setValue={field.onChange}
                          labelKey="ingredientTypeName"
                          valueKey="id"
                          buttonName="Chọn loại nguyên liệu"
                          updateLabel={updateLabel}
                          setUpdateLabel={setUpdateLabel}
                        />
                        {errors.ingredientTypeId && (
                          <p className="text-red-500 text-sm mt-1" role="alert">
                            {errors.ingredientTypeId?.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                Cập nhật nguyên liệu
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default UpdateIngredientGeneralDialog;
