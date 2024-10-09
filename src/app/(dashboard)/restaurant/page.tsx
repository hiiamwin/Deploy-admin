import React, { Suspense } from "react";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { AddBranchDialog, BranchTable } from "./components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý chi nhánh",
  description: "Quản lý chi nhánh",
};

async function ManageBranchPage({
  searchParams,
}: {
  searchParams?: { page?: string; address?: string; restaurantStatus: string };
}) {
  const page = searchParams?.page || "1";
  const address = searchParams?.address || "";
  const restaurantStatus = searchParams?.restaurantStatus || "";

  const columns = [
    {
      header: "Mã Nhà Hàng",
    },
    {
      header: "Tên Chi Nhánh",
    },
    {
      header: "Địa chỉ",
    },
    {
      header: "Số Điện Thoại",
    },
    {
      header: "Trạng Thái",
    },
  ];
  return (
    <div>
      <ReuseActionBar
        isFilter={true}
        isSearch={true}
        searchBy="address"
        filterBy="restaurantStatus"
        placeholder="Tìm theo địa chỉ"
        addComponent={<AddBranchDialog />}
      />

      <Suspense
        key={page + address + restaurantStatus}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách nhà hàng"
            tableName="Nhà hàng"
          />
        }
      >
        <BranchTable
          page={page}
          address={address}
          restaurantStatus={restaurantStatus}
        />
      </Suspense>
    </div>
  );
}

export default ManageBranchPage;
