import React, { Suspense } from "react";
import { ReuseTableLoading } from "../components";
import { TableActionBar, TableTable } from "./components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý bàn ăn",
  description: "Quản lý bàn ăn",
};
function ManageTablePage({
  searchParams,
}: {
  searchParams?: { page?: string; tableStatus?: string; tableNumber?: string };
}) {
  const page = searchParams?.page || "1";
  const tableStatus = searchParams?.tableStatus || "";
  const tableNumber = searchParams?.tableNumber || "";

  const columns = [
    {
      header: "Số Bàn",
    },
    {
      header: "Trạng Thái",
    },
  ];
  return (
    <div>
      <TableActionBar />
      <Suspense
        key={page + tableStatus + tableNumber}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách bàn trong nhà hàng"
            tableName="Bàn"
          />
        }
      >
        <TableTable
          page={page}
          tableNumber={tableNumber}
          tableStatus={tableStatus}
        />
      </Suspense>
    </div>
  );
}

export default ManageTablePage;
