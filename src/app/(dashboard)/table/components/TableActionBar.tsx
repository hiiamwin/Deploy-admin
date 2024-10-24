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
import AddTableDialog from "./AddTableDialog";

function TableActionBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (e.target.value) {
        params.set("tableNumber", e.target.value);
      } else {
        params.delete("tableNumber");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );
  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    // if (!filterBy) return;
    if (value === "all") {
      params.delete("tableStatus");
    } else {
      params.set("tableStatus", value);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center space-x-4 justify-end">
      <Input
        type="text"
        placeholder={"Nhập số bàn để tìm kiếm"}
        onChange={handleSearch}
        defaultValue={searchParams.get("tableNumber")?.toString()}
      />

      <Select onValueChange={handleFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tất cả" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="1">Đang nhàn rỗi</SelectItem>
          <SelectItem value="2">Không có khách</SelectItem>
          <SelectItem value="3">Vô hiệu hóa</SelectItem>
        </SelectContent>
      </Select>

      <AddTableDialog />
    </div>
  );
}

export default TableActionBar;
