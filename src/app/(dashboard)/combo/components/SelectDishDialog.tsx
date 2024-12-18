"use client";
import { getDishCategoriesAction, getDishesAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDebouncedCallback } from "use-debounce";
import AddComboDialog from "./AddComboDialog";
import { Dish } from "@/types";

function SelectDishDialog() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);
  const { ref: inViewRef, inView } = useInView();

  const debouncedSearch = useDebouncedCallback((value) => {
    if (value.trim() !== search) {
      setSearch(value);
    }
  }, 300);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching: isPending,
  } = useInfiniteQuery({
    queryKey: ["getDishes", search],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
      const data = await getDishesAction({
        page: pageParam.toString(),
        name: search,
        category: selectedCategory === "all" ? "" : selectedCategory,
      });
      return {
        pageNumber: data?.data?.pageNumber,
        totalNumberOfPages: data?.data?.totalNumberOfPages,
        data: data?.data?.results,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.pageNumber as number;
      const totalPages = lastPage?.totalNumberOfPages as number;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    gcTime: 0,
    enabled: open,
  });

  const { data: category, isPending: isFectchingCategory } = useQuery({
    queryKey: ["getDishCategories"],
    queryFn: async () => {
      const data = await getDishCategoriesAction();
      return data?.data;
    },
    refetchOnWindowFocus: false,
    gcTime: 0,
    enabled: open,
  });

  useEffect(() => {
    if ((open && search) || selectedCategory) {
      refetch();
    }
  }, [open, refetch, search, selectedCategory]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (open) {
      setSearch("");
      refetch();
    }
  }, [open, refetch]);

  const allDishes = data?.pages.flatMap((page) => page.data);

  const handleOpen = (value: boolean) => {
    setSelectedDishes([]);
    setOpen(value);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogTrigger asChild>
          <Button>Thêm mới combo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-6xl bg-white">
          <DialogHeader>
            <DialogTitle>Thêm mới combo</DialogTitle>
            <DialogDescription>
              Vui lòng chọn các món ăn cho combo
            </DialogDescription>
          </DialogHeader>

          <div className="container mx-auto p-4">
            <h3 className="text-2xl font-bold text-gray-700 text-center">
              Các món ăn đang có trong hệ thống
            </h3>
            <div className="flex items-center justify-end my-2 gap-2">
              <Input
                className="w-1/2"
                type="text"
                placeholder="Tìm món ăn theo tên"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
              {isFectchingCategory ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : (
                <Select
                  onValueChange={(value) => {
                    if (value === "all") {
                      setSelectedCategory(value);
                    } else {
                      setSelectedCategory(value);
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Phân loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {category?.results.map((item) => (
                      <SelectItem key={item.id} value={item.categoryName}>
                        {item.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div>
              <div className="text-center grid grid-cols-6 border-b p-4 text-[#737373] hover:bg-[#f5f5f580] text-sm">
                <div>Ảnh</div>
                <div>Tên món ăn</div>
                <div>Giá</div>
                <div>Phần trăm chênh lệch giá</div>
                <div>Phân loại</div>
                <div></div>
              </div>
              {isPending ? (
                <ScrollArea className="h-[580px]">
                  <div className="text-center grid grid-cols-6 border-b p-4 hover:bg-[#f5f5f580] text-sm">
                    <div className="m-auto">
                      <Skeleton className="h-20 w-20 rounded-md" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-4 rounded-sm" />
                    </div>
                  </div>
                  <div className="text-center grid grid-cols-6 border-b p-4 hover:bg-[#f5f5f580] text-sm">
                    <div className="m-auto">
                      <Skeleton className="h-20 w-20 rounded-md" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-4 rounded-sm" />
                    </div>
                  </div>
                  <div className="text-center grid grid-cols-6 border-b p-4 hover:bg-[#f5f5f580] text-sm">
                    <div className="m-auto">
                      <Skeleton className="h-20 w-20 rounded-md" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-4 rounded-sm" />
                    </div>
                  </div>
                  <div className="text-center grid grid-cols-6 border-b p-4 hover:bg-[#f5f5f580] text-sm">
                    <div className="m-auto">
                      <Skeleton className="h-20 w-20 rounded-md" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-4 rounded-sm" />
                    </div>
                  </div>
                  <div className="text-center grid grid-cols-6 border-b p-4 hover:bg-[#f5f5f580] text-sm">
                    <div className="m-auto">
                      <Skeleton className="h-20 w-20 rounded-md" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="my-auto">
                      <Skeleton className="h-4 w-4 rounded-sm" />
                    </div>
                  </div>
                </ScrollArea>
              ) : (
                <ScrollArea className="h-[580px]">
                  {allDishes?.map((dish, index) => (
                    <div
                      className="text-center grid grid-cols-6 border-b p-4 hover:bg-[#f5f5f580] text-sm"
                      key={dish?.id}
                      ref={index === allDishes.length - 1 ? inViewRef : null}
                    >
                      <div className="m-auto">
                        <Image
                          src={dish?.images[0]?.url as string}
                          alt={dish?.dishName as string}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="my-auto">{dish?.dishName}</div>
                      <div className="my-auto">{dish?.price}</div>
                      <div className="my-auto">
                        {dish?.percentagePriceDifference}
                      </div>
                      <div className="my-auto">{dish?.categoryName}</div>
                      <div className="my-auto">
                        <Checkbox
                          checked={selectedDishes.some(
                            (selectedDish) => selectedDish.id === dish?.id
                          )}
                          onCheckedChange={(value) => {
                            if (value) {
                              setSelectedDishes([
                                ...selectedDishes,
                                dish as Dish,
                              ]);
                            } else {
                              setSelectedDishes((prev) => {
                                return prev.filter(
                                  (selectedDish) => selectedDish.id !== dish?.id
                                );
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {isFetchingNextPage && (
                    <div className="flex items-center justify-center">
                      <Loader2 className="animate-spin" />
                    </div>
                  )}
                </ScrollArea>
              )}
            </div>
          </div>
          <DialogFooter>
            {selectedDishes.length > 1 && (
              <AddComboDialog
                handleOpenPrevDialog={handleOpen}
                selectedDishes={selectedDishes}
                setSelectedDishes={setSelectedDishes}
              />
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SelectDishDialog;
