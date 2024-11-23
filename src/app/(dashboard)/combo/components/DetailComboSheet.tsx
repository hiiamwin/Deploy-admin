/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getDetailComboAction } from "@/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DetailComboSheet({
  id,
  isOpenDetailSheet,
  setIsOpenDetailSheet,
}: {
  id: string;
  isOpenDetailSheet: boolean;
  setIsOpenDetailSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const { data, isPending } = useQuery({
    queryKey: ["getComboDetail", { id }],
    queryFn: () => getDetailComboAction({ id }),
    refetchOnWindowFocus: false,
  });

  return (
    <Sheet open={isOpenDetailSheet} onOpenChange={setIsOpenDetailSheet}>
      <SheetContent className="bg-white sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Thông tin chi tiết combo
          </SheetTitle>
          <SheetDescription>Thông tin chi tiết của combo</SheetDescription>
        </SheetHeader>
        {isPending ? (
          <div className="flex items-center justify-center h-[calc(100vh-120px)]">
            <Loader2 className="animate-spin w-8 h-8 text-primary" />
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-120px)] pr-4">
            {data?.data && (
              <div className="space-y-6">
                <Card className="mb-6 hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                      <div className="relative w-full md:w-56 h-56 rounded-xl overflow-hidden group">
                        <Image
                          src={data?.data.comboThumbnail}
                          alt={data?.data.comboName}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-xl transform group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold tracking-tight mb-2 text-primary">
                            {data?.data.comboName}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {data?.data.comboDescription}
                          </p>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex flex-wrap items-center gap-4 justify-between">
                          <div className="flex items-center gap-2">
                            {data?.data.dishComboResponses.length} món
                          </div>
                          <p className="text-2xl font-bold text-primary">
                            {data?.data.price.toLocaleString("vi-VN")}
                            <span className="text-base font-normal ml-1">
                              đ
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Separator />
                <Accordion type="single" collapsible className="w-full">
                  {data.data.dishComboResponses.map((dish: any, index: any) => (
                    <AccordionItem key={dish.dishId} value={`item-${index}`}>
                      <AccordionTrigger>
                        <div className="flex justify-between w-full">
                          <span>{dish.dishName}</span>
                          <span className="text-sm text-gray-500">
                            {dish.price.toLocaleString("vi-VN")} đ x{" "}
                            {dish.dishQuantity}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Card>
                          <CardHeader>
                            <CardTitle>{dish.dishName}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500 mb-4">
                              {dish.dishDescription}
                            </p>
                            <div className="grid grid-cols-3 gap-4">
                              {dish.dishImages.map(
                                (image: any, imgIndex: any) => (
                                  <Image
                                    key={imgIndex}
                                    src={image}
                                    alt={`${dish.dishName} - Image ${
                                      imgIndex + 1
                                    }`}
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                  />
                                )
                              )}
                            </div>
                            <Separator className="my-4" />
                            <h4 className="font-semibold mb-2">Nguyên liệu:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {dish.getIngredients.map((ingredient: any) => (
                                <li key={ingredient.ingredientId}>
                                  {ingredient.ingredientName} -{" "}
                                  {ingredient.ingredientQuantity}{" "}
                                  {ingredient.ingredientMeasureName}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default DetailComboSheet;
