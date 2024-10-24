import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getDishGeneralByIdAction } from "@/actions";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

function DetailDishGeneralSheet({
  id,
  isOpenDetailSheet,
  setIsOpenDetailSheet,
}: {
  id: string;
  isOpenDetailSheet: boolean;
  setIsOpenDetailSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, isPending } = useQuery({
    queryKey: ["getDishGeneralById", id],
    queryFn: () => getDishGeneralByIdAction({ id }),
    enabled: isOpenDetailSheet,
    refetchOnWindowFocus: false,
  });

  return (
    <Sheet open={isOpenDetailSheet} onOpenChange={setIsOpenDetailSheet}>
      <SheetContent className="bg-white sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Thông tin chi tiết món ăn
          </SheetTitle>
          <SheetDescription>Thông tin chi tiết của món ăn</SheetDescription>
        </SheetHeader>
        {isPending ? (
          <div className="flex items-center justify-center h-[calc(100vh-120px)]">
            <Loader2 className="animate-spin w-8 h-8 text-primary" />
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-120px)] pr-4">
            <div className="space-y-6 mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">
                  {data?.data?.dishGeneralName}
                </h2>
                <p className="text-lg font-semibold text-green-600">
                  {data?.data?.dishGeneralPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Hình ảnh
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {data?.data?.images.slice(0, 3).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-md overflow-hidden"
                    >
                      <Image
                        src={image.url}
                        alt={`${data.data?.dishGeneralName} - Ảnh ${index + 1}`}
                        fill={true}
                        sizes="100%"
                        className="transition-transform object-cover duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Mô tả
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {data?.data?.dishGeneralDescription}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  Công thức
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {data?.data?.getIngredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-100 rounded-md p-3"
                    >
                      <span className="text-primary font-medium">
                        {ingredient.ingredientGeneralName}
                      </span>
                      <span className="text-gray-600">
                        {ingredient.ingredientGeneralQuantity}{" "}
                        {ingredient.ingredientMeasureName}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default DetailDishGeneralSheet;
