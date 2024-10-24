import React, { Suspense } from "react";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { AddRefundDishDialog, RefundDishTable } from "./components";

function ManageRefundDishPage({
  searchParams,
}: {
  searchParams?: { page?: string; dishName?: string };
}) {
  const page = searchParams?.page || "1";
  const dishName = searchParams?.dishName || "";
  const status = "";
  const columns = [
    {
      header: "Hình ảnh",
    },
    {
      header: "Tên món ăn",
    },
    {
      header: "Giá",
    },
    {
      header: "Phần trăm chêch lệch giá",
    },
    {
      header: "Phân loại",
    },
    {
      header: "Số lượng",
    },
  ];

  return (
    <div>
      <ReuseActionBar
        isFilter={false}
        isSearch={true}
        searchBy="dishName"
        placeholder="Tìm theo tên món ăn"
        addComponent={<AddRefundDishDialog />}
      />
      <Suspense
        key={page + dishName}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách món ăn có thể hoàn trả"
            tableName="Món ăn"
          />
        }
      >
        <RefundDishTable page={page} name={dishName} status={status} />
      </Suspense>
    </div>
  );
}

export default ManageRefundDishPage;
