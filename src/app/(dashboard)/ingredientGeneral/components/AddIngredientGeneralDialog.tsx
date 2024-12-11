"use client";
import React, { useCallback, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  createIngredientGeneralAction,
  getIngredientGeneralMeasureAction,
  getIngredientTypesAction,
} from "@/actions";
import { ReuseCombobox } from "../../components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CreateIngredientGeneralFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateIngredientGeneralMeasure from "./CreateIngredientGeneralMeasure";

function AddIngredientGeneralDialog() {
  const [open, setOpen] = useState(false);
  const [isCreatingMeasure, setIsCreatingMeasure] = useState(false);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["ingredientMeasure"],
    queryFn: () => getIngredientGeneralMeasureAction(),
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    control,
  } = useForm<z.infer<typeof CreateIngredientGeneralFormSchema>>({
    resolver: zodResolver(CreateIngredientGeneralFormSchema),
  });
  const { execute, isPending } = useAction(createIngredientGeneralAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      reset();
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

  const onSubmit: SubmitHandler<
    z.infer<typeof CreateIngredientGeneralFormSchema>
  > = useCallback(
    (data) => {
      const newIngredientGeneral = {
        ingredientGeneralName: data.ingredientGeneralName,
        ingredientGeneralDescription: data.ingredientGeneralDescription,
        ingredientType: data.ingredientGeneralType,
        ingredientMeasureType: data.ingredientMeasureType,
      };

      execute(newIngredientGeneral);
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
      setOpen(value);
    },
    [isPending, reset]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button>Thêm mới nguyên liệu</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Thêm mới nguyên liệu</DialogTitle>
          <DialogDescription>
            Điền thông tin nguyên liệu vào biểu mẫu dưới đây.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="createIngredientGeneral">
          <TabsList className="w-full">
            <TabsTrigger
              className="w-1/2 data-[state=active]:bg-black data-[state=active]:text-white"
              value="createIngredientGeneral"
              disabled={isPending || isFetching || isCreatingMeasure}
            >
              Tạo mới nguyên liệu
            </TabsTrigger>
            <TabsTrigger
              className="w-1/2 data-[state=active]:bg-black data-[state=active]:text-white"
              value="createIngredientGeneralMeasure"
              disabled={isPending || isFetching || isCreatingMeasure}
            >
              Tạo mới đơn vị cơ sở
            </TabsTrigger>
          </TabsList>
          <TabsContent value="createIngredientGeneral">
            {isFetching ? (
              <div className="flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Label
                      htmlFor="ingredientGeneralDescription"
                      className="mb-2"
                    >
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
                      name="ingredientGeneralType"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <ReuseCombobox
                            fetchFn={fetchIngredientTypes}
                            value={field.value}
                            setValue={field.onChange}
                            labelKey="ingredientTypeName"
                            valueKey="id"
                            buttonName="Chọn loại nguyên liệu"
                          />
                          {errors.ingredientGeneralType && (
                            <p
                              className="text-red-500 text-sm mt-1"
                              role="alert"
                            >
                              {errors.ingredientGeneralType?.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label className="mb-2">Đơn vị cơ sở</Label>
                    <Controller
                      name="ingredientMeasureType"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Chọn đơn vị cơ sở" />
                            </SelectTrigger>
                            <SelectContent>
                              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                              {data?.data?.map((item: any) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.ingredientMeasureName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.ingredientMeasureType?.message && (
                            <p
                              className="text-red-500 text-sm mt-1"
                              role="alert"
                            >
                              {errors.ingredientMeasureType?.message as string}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Đang xử lý..." : "Thêm mới nguyên liệu"}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </TabsContent>
          <TabsContent value="createIngredientGeneralMeasure">
            <CreateIngredientGeneralMeasure
              refetch={refetch}
              setIsCreatingMeasure={setIsCreatingMeasure}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default AddIngredientGeneralDialog;
