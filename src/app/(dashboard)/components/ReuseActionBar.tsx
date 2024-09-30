"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type ReuseActionBarProps = {
  isSearch: boolean;
  isFilter: boolean;
  searchBy: string;
  filterBy?: string;
  placeholder?: string;
  addComponent?: React.ReactNode;
};

function ReuseActionBar({
  isFilter,
  isSearch,
  searchBy,
  filterBy,
  placeholder,
  addComponent,
}: ReuseActionBarProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (e.target.value) {
        params.set(searchBy, e.target.value);
      } else {
        params.delete(searchBy);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (!filterBy) return;
    if (value === "all") {
      params.delete(filterBy);
    } else {
      params.set(filterBy, value);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center space-x-4 justify-end">
      {isSearch && (
        <Input
          type="text"
          placeholder={placeholder}
          onChange={handleSearch}
          defaultValue={searchParams.get(searchBy)?.toString()}
        />
      )}

      {isFilter && (
        <Select onValueChange={handleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
            <SelectItem value="inactive">Không hoạt động</SelectItem>
          </SelectContent>
        </Select>
      )}

      {addComponent && addComponent}
    </div>
  );
}

export default ReuseActionBar;
