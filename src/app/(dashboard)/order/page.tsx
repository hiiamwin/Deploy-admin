import React, { Suspense } from "react";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { OrderTable } from "./components";

function ManageOrderPage({
  searchParams,
}: {
  searchParams?: { page?: string; phone?: string; status: string };
}) {
  const page = searchParams?.page || "1";
  const phone = searchParams?.phone || "";
  const status = searchParams?.status || "";
  const orderStatus = [
    {
      value: 1,
      label: "Đã xác nhận",
    },
    {
      value: 2,
      label: "Đang chờ xác nhận",
    },
    {
      value: 3,
      label: "Đã hủy",
    },
  ];

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
        isFilter={true}
        isSearch={true}
        searchBy="phone"
        filterBy="status"
        placeholder="Tìm theo số điện thoại khách hàng"
      />
      <Suspense
        key={page + phone + status}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách đơn hàng"
            tableName="Đơn hàng"
          />
        }
      >
        <OrderTable page={page} phone={phone} status={status} />
      </Suspense>
    </div>
  );
}

export default ManageOrderPage;
