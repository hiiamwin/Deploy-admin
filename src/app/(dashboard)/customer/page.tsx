import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { CustomerTable } from "./components";

export const metadata: Metadata = {
  title: "Thông tin khách hàng",
  description: "Thông tin khách hàng",
};

function ManageUserPage({
  searchParams,
}: {
  searchParams?: { page?: string; name: string };
}) {
  const page = searchParams?.page || "1";
  const name = searchParams?.name || "";
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
        searchBy="name"
        placeholder="Tìm theo tên"
      />

      <Suspense
        key={page + name}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách khách hàng"
            tableName="Khách hàng"
          />
        }
      >
        <CustomerTable page={page} name={name} />
      </Suspense>
    </div>
  );
}

export default ManageUserPage;
