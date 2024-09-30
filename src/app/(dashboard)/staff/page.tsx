import React, { Suspense } from "react";
import type { Metadata } from "next";
import { AddWaiterDialog, WaiterTable } from "./components";
import { ReuseActionBar, ReuseTableLoading } from "../components";

export const metadata: Metadata = {
  title: "Quản lý nhân viên",
  description: "Quản lý nhân viên",
};

function ManageStaffPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    fullName?: string;
    status?: string;
  };
}) {
  const page = searchParams?.page || "1";
  const fullName = searchParams?.fullName || "";
  const status = searchParams?.status || "";

  const columns = [
    {
      header: "Mã nhân viên",
    },
    {
      header: "Họ và tên",
    },
    {
      header: "Email",
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
        searchBy="fullName"
        placeholder="Tìm theo tên nhân viên"
        addComponent={<AddWaiterDialog />}
      />

      <Suspense
        key={page + fullName + status}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách nhân viên"
            tableName="Nhân viên"
          />
        }
      >
        <WaiterTable page={page} fullName={fullName} />
      </Suspense>
    </div>
  );
}

export default ManageStaffPage;
