import React, { Suspense } from "react";
import type { Metadata } from "next";
import { AddAdminDishDialog, AdminDishTable } from "./components";
import { ReuseActionBar, ReuseTableLoading } from "../components";

export const metadata: Metadata = {
  title: "Quản lý món ăn",
  description: "Quản lý món ăn",
};

function AdminDishManagementPage({
  searchParams,
}: {
  searchParams?: { page?: string; dishGeneralName?: string; status?: string };
}) {
  const page = searchParams?.page || "1";
  const dishGeneralName = searchParams?.dishGeneralName || "";
  const status = searchParams?.status || "";
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
      header: "Trạng thái",
    },
  ];
  return (
    <div>
      <ReuseActionBar
        isFilter={true}
        isSearch={true}
        searchBy="dishGeneralName"
        filterBy="status"
        placeholder="Tìm theo tên món ăn"
        addComponent={<AddAdminDishDialog />}
      />
      <Suspense
        key={page + dishGeneralName + status}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách món ăn"
            tableName="Món ăn"
          />
        }
      >
        <AdminDishTable
          page={page}
          dishGeneralName={dishGeneralName}
          status={status}
        />
      </Suspense>
    </div>
  );
}

export default AdminDishManagementPage;
