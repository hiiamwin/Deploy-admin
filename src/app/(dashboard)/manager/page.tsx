import { Metadata } from "next";
import React, { Suspense } from "react";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { ManagerTable } from "./components";
import dynamic from "next/dynamic";
const AddManagerDialog = dynamic(
  () => import("./components/AddManagerDialog"),
  { ssr: false, loading: () => <p>Loading...</p> }
);

export const metadata: Metadata = {
  title: "Quản lý nhà hàng trưởng",
  description: "Quản lý nhà hàng trưởng",
};
function ManageMangerPage({
  searchParams,
}: {
  searchParams?: { page?: string; fullName?: string; status?: string };
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
      header: "Số điện thoại",
    },
    {
      header: "Nhà hàng trực thuộc",
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
        addComponent={<AddManagerDialog />}
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
        <ManagerTable page={page} fullName={fullName} status={status} />
      </Suspense>
    </div>
  );
}

export default ManageMangerPage;
