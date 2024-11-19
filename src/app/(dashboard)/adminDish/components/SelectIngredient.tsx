"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronsUpDown, Loader2, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDebouncedCallback } from "use-debounce";

type FetchFnType = (
  search: string,
  pageParam?: number
) => Promise<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  pageNumber: number;
  totalNumberOfPages: number;
}>;

type SelectIngredientProps = {
  fetchFn: FetchFnType;
  labelKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  excludeIngredients: any[];
  isPending?: boolean;
};

function SelectIngredient({
  fetchFn,
  labelKey,
  onChange,
  value,
  excludeIngredients,
  isPending: _isPending,
}: SelectIngredientProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref: inViewRef, inView } = useInView();
  const debouncedSearch = useDebouncedCallback((value) => {
    if (value.trim() !== search) {
      setSearch(value);
    }
  }, 300);

  const fetchIngredient = async ({ pageParam = 1 }) => {
    const data = await fetchFn(search, pageParam);
    return data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching: isPending,
  } = useInfiniteQuery({
    queryKey: ["ingredient", search],
    queryFn: fetchIngredient,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.pageNumber;
      const totalPages = lastPage?.totalNumberOfPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    // staleTime: 5 * 60 * 1000,
    gcTime: 0,
  });

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (open && search) {
      refetch();
    }
  }, [search, refetch, open]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const allOptions =
    data?.pages.flatMap((page) =>
      page?.data
        .filter(
          (result) =>
            !excludeIngredients.some((excluded) => excluded.id === result.id)
        )
        .map((result) => ({
          label: result[labelKey],
          value: result,
        }))
    ) || [];

  return (
    <div className="relative w-full">
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between"
        onClick={() => setOpen(!open)}
        disabled={_isPending}
      >
        {value.name ? (
          <span className="flex-grow text-left">{value.name}</span>
        ) : (
          <span className="flex-grow text-left text-muted-foreground">
            Hãy chọn nguyên liệu
          </span>
        )}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg animate-in fade-in-0 zoom-in-95">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              ref={inputRef}
              className="w-full rounded-t-md border-b px-3 py-2 pl-10 text-sm leading-5 text-gray-900 focus:outline-none"
              placeholder="Tìm kiếm..."
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          {isPending ? (
            <div className="w-full flex items-center justify-center p-80">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : (
            <ul className="max-h-60 overflow-auto py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {allOptions.map((option, index) => (
                <li
                  key={option.label}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
                    "hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => {
                    setOpen(false);
                    onChange(option.value);
                  }}
                  ref={index === allOptions.length - 2 ? inViewRef : null}
                >
                  <span className="block truncate">{option.label}</span>
                </li>
              ))}

              {isFetchingNextPage && (
                <li className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="ml-2">Đang tải...</span>
                  </div>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SelectIngredient;
