"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { useInView } from "react-intersection-observer";

type FetchFnType = (
  search: string,
  pageParam?: number
) => Promise<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  pageNumber: number;
  totalNumberOfPages: number;
}>;
type ReuseComboboxProps = {
  value: string;
  setValue: (value: unknown) => void;
  fetchFn: FetchFnType;
  labelKey: string;
  valueKey: string;
  buttonName: string;
  updateLabel?: string;
  setUpdateLabel?: Dispatch<SetStateAction<string | undefined>>;
};
function ReuseCombobox({
  value,
  setValue,
  fetchFn,
  labelKey,
  valueKey,
  buttonName,
  updateLabel,
  setUpdateLabel,
}: ReuseComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const { ref: inViewRef, inView } = useInView();

  const debouncedSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, 300);
  const fetchIngredientTypes = async ({ pageParam = 1 }) => {
    const data = await fetchFn(search, pageParam);
    return data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["ingredientTypes", search],
    queryFn: fetchIngredientTypes,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.pageNumber;
      const totalPages = lastPage?.totalNumberOfPages;
      if (currentPage !== undefined && totalPages !== undefined) {
        return currentPage < totalPages ? currentPage + 1 : undefined;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
    gcTime: 0,
  });

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const allOptions =
    data?.pages.flatMap((page) =>
      page?.data
        .filter((result) => result[labelKey] !== updateLabel)
        .map((result) => {
          return {
            label: result[labelKey],
            value: result[valueKey],
          };
        })
    ) || [];

  return (
    <div className="relative w-full">
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {updateLabel
          ? updateLabel
          : value
          ? allOptions.find((framework) => framework?.value === value)?.label
          : buttonName}
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
            <p className="text-center text-gray-500 text-sm py-2">Loading...</p>
          ) : (
            <ul className="max-h-60 overflow-auto py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {allOptions.map((option, index) => (
                <li
                  key={option?.value}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
                    value === option?.value
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground"
                  )}
                  onClick={() => {
                    setOpen(false);
                    setValue(option?.value ?? "");
                    if (setUpdateLabel) {
                      setUpdateLabel(option?.label ?? "");
                    }
                    setSearch("");
                  }}
                  ref={index === allOptions.length - 2 ? inViewRef : null}
                >
                  <span className="block truncate">{option?.label}</span>
                  {value === option?.value && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
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

export default ReuseCombobox;
