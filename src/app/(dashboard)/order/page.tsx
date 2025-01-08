import React, { Suspense } from "react";
import { ReuseTableLoading } from "../components";
import { OrderActionBar, OrderTable } from "./components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý đơn hàng",
  description: "Quản lý đơn hàng",
};

function ManageOrderPage({
  searchParams,
}: {
  searchParams?: { page?: string; phone?: string; isAdminConfirm: boolean };
}) {
  const page = searchParams?.page || "1";
  const phone = searchParams?.phone || "";
  const isAdminConfirm = searchParams?.isAdminConfirm || "";

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
      <OrderActionBar />
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
        <OrderTable page={page} phone={phone} isAdminConfirm={isAdminConfirm} />
      </Suspense>
    </div>
  );
}

export default ManageOrderPage;
