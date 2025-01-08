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

function OrderActionBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (e.target.value) {
        params.set("phone", e.target.value);
      } else {
        params.delete("phone");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value === "all") {
      params.delete("isAdminConfirm");
    } else {
      params.set("isAdminConfirm", value);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center space-x-4 justify-end">
      <Input
        type="text"
        placeholder={"Tìm theo số điện thoại khách hàng"}
        onChange={handleSearch}
        defaultValue={searchParams.get("phone")?.toString()}
      />

      <Select onValueChange={handleFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tất cả" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="true">Đã xác nhận thanh toán</SelectItem>
          <SelectItem value="false">Chưa xác nhận thanh toán</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default OrderActionBar;
