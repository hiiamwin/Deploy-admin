import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { CustomerTable } from "./components";

export const metadata: Metadata = {
  title: "Quản lý người dùng",
  description: "Quản lý người dùng",
};

function ManageUserPage({
  searchParams,
}: {
  searchParams?: { page?: string; phone: string };
}) {
  const page = searchParams?.page || "1";
  const phone = searchParams?.phone || "";
  const columns = [
    {
      header: "Tên người dùng",
    },
    {
      header: "Số điện thoại",
    },
    {
      header: "Điểm tích lũy",
    },
  ];
  return (
    <div>
      <ReuseActionBar
        isFilter={false}
        isSearch={true}
        searchBy="phone"
        placeholder="Tìm theo số điện thoại"
      />

      <Suspense
        key={page + phone}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách khách hàng"
            tableName="Khách hàng"
          />
        }
      >
        <CustomerTable page={page} phone={phone} />
      </Suspense>
    </div>
  );
}

export default ManageUserPage;
