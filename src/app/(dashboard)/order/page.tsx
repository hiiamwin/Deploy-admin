import React, { Suspense } from "react";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { OrderTable } from "./components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý đơn hàng",
  description: "Quản lý đơn hàng",
};

function ManageOrderPage({
  searchParams,
}: {
  searchParams?: { page?: string; phone?: string };
}) {
  const page = searchParams?.page || "1";
  const phone = searchParams?.phone || "";

  const columns = [
    {
      header: "Tên khách hàng",
    },
    {
      header: "Số điện thoại",
    },
    {
      header: "Tổng tiền",
    },
    {
      header: "Ngày tạo",
    },
    {
      header: "Trạng thái",
    },
  ];

  return (
    <div>
      <ReuseActionBar
        isFilter={false}
        isSearch={true}
        searchBy="phone"
        filterBy="status"
        placeholder="Tìm theo số điện thoại khách hàng"
      />
      <Suspense
        key={page + phone}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách đơn hàng"
            tableName="Đơn hàng"
          />
        }
      >
        <OrderTable page={page} phone={phone} />
      </Suspense>
    </div>
  );
}

export default ManageOrderPage;
