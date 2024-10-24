"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateIngredientQuantity from "./UpdateIngredientQuantity";
import AddIngredient from "./AddIngredient";
import { useQuery } from "@tanstack/react-query";
import { getDishGeneralByIdAction } from "@/actions";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteIngredientDialog from "./DeleteIngredientDialog";

type UpdateDishIngredientDialogProps = {
  isOpenUpdateDishIngredientDialog: boolean;
  setIsOpenUpdateDishIngredientDialog: (value: boolean) => void;
  id: string;
};
function UpdateDishIngredientDialog({
  isOpenUpdateDishIngredientDialog,
  setIsOpenUpdateDishIngredientDialog,
  id,
}: UpdateDishIngredientDialogProps) {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["dishGeneralDetail", { id }],
    queryFn: () => getDishGeneralByIdAction({ id }),
    staleTime: 0,
    gcTime: 0,
    enabled: isOpenUpdateDishIngredientDialog,
    refetchOnWindowFocus: false,
  });
  const [selectedIngredients, setSelectedIngredients] = useState<
    {
      ingredientGeneralId: string;
      ingredientGeneralName: string;
      ingredientGeneralQuantity: number;
      ingredientMeasureName: string;
    }[]
  >([]);
  const [excludedIngredients, setExcludedIngredients] = useState<
    {
      id: string;
      name: string;
      ingredientMeasureType: string;
    }[]
  >([]);
  useEffect(() => {
    if (data?.data?.getIngredients) {
      setExcludedIngredients(
        data?.data?.getIngredients.map((item) => ({
          id: item.ingredientGeneralId,
          name: item.ingredientGeneralName,
          ingredientMeasureType: item.ingredientMeasureName,
        }))
      );
    }
  }, [data]);

  const handleOpen = useCallback(
    (value: boolean) => {
      setIsOpenUpdateDishIngredientDialog(value);
    },
    [setIsOpenUpdateDishIngredientDialog]
  );
  return (
    <>
      <Dialog open={isOpenUpdateDishIngredientDialog} onOpenChange={handleOpen}>
        <DialogContent className="sm:max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa nguyên liệu</DialogTitle>
            <DialogDescription>
              Nhập thông tin nguyên liệu cần chỉnh sửa
            </DialogDescription>
          </DialogHeader>
          {isPending ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <div className="container mx-auto p-4">
              <h3 className="text-2xl font-bold text-gray-700 text-center">
                Nguyên liệu đang có trong món ăn
              </h3>
              <div>
                <div className="grid grid-cols-4 border-b p-4 text-[#737373] hover:bg-[#f5f5f580] text-sm">
                  <div>Tên nguyên liệu</div>
                  <div>Số lượng</div>
                  <div>Đơn vị</div>
                  <div></div>
                </div>
                <ScrollArea className="h-[580px]">
                  {data?.data?.getIngredients.map((ingredient) => (
                    <div
                      className="grid grid-cols-4 border-b p-4 hover:bg-[#f5f5f580] text-sm"
                      key={ingredient.ingredientGeneralId}
                    >
                      <div>{ingredient.ingredientGeneralName}</div>
                      <div>{ingredient.ingredientGeneralQuantity}</div>
                      <div>{ingredient.ingredientMeasureName}</div>
                      <div>
                        <Checkbox
                          checked={selectedIngredients.some(
                            (selectedIngredient) =>
                              selectedIngredient.ingredientGeneralId ===
                              ingredient.ingredientGeneralId
                          )}
                          onCheckedChange={(value) => {
                            if (value) {
                              setSelectedIngredients([
                                ...selectedIngredients,
                                {
                                  ingredientGeneralId:
                                    ingredient.ingredientGeneralId,
                                  ingredientGeneralName:
                                    ingredient.ingredientGeneralName,
                                  ingredientGeneralQuantity:
                                    ingredient.ingredientGeneralQuantity,
                                  ingredientMeasureName:
                                    ingredient.ingredientMeasureName,
                                },
                              ]);
                            } else {
                              setSelectedIngredients(
                                selectedIngredients.filter(
                                  (selectedIngredient) =>
                                    selectedIngredient.ingredientGeneralId !==
                                    ingredient.ingredientGeneralId
                                )
                              );
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex gap-2 float-right">
                  <AddIngredient
                    excludedIngredients={excludedIngredients}
                    setExcludedIngredients={setExcludedIngredients}
                    refetch={refetch}
                    id={id}
                  />
                  {selectedIngredients.length > 0 ? (
                    <UpdateIngredientQuantity
                      id={id}
                      refetch={refetch}
                      ingredients={selectedIngredients}
                      setSelectIngredients={setSelectedIngredients}
                    />
                  ) : (
                    <Button className="mt-4" disabled={true}>
                      Cập nhật số lượng nguyên liệu
                    </Button>
                  )}
                  {selectedIngredients.length > 0 ? (
                    <DeleteIngredientDialog
                      id={id}
                      refetch={refetch}
                      selectedIngredients={selectedIngredients}
                      setSelectedIngredients={setSelectedIngredients}
                    />
                  ) : (
                    <Button className="mt-4" disabled={true}>
                      Xóa nguyên liệu
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateDishIngredientDialog;
