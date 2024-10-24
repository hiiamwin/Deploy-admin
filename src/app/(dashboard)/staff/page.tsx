import React, { Suspense } from "react";
import type { Metadata } from "next";
import { AddWaiterDialog, WaiterTable } from "./components";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/helper";

export const metadata: Metadata = {
  title: "Quản lý nhân viên",
  description: "Quản lý nhân viên",
};

async function ManageStaffPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    fullName?: string;
    status?: string;
  };
}) {
  const cookie = cookies().get("session")?.value;

  if (!cookie) redirect("/login");
  const session = await decrypt(cookie);
  const restaurantId = session.restaurantId;
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
        addComponent={<AddWaiterDialog restaurantId={restaurantId as string} />}
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
        <WaiterTable
          page={page}
          fullName={fullName}
          restaurantId={restaurantId as string}
          status={status}
        />
      </Suspense>
    </div>
  );
}

export default ManageStaffPage;
