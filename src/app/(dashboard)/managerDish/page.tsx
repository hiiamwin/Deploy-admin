import React, { Suspense } from "react";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { AddDishdialog, DIshTable } from "./components";
import { cookies } from "next/headers";
import { decrypt } from "@/helper";

async function ManagerDishManagementPage({
  searchParams,
}: {
  searchParams?: { page?: string; dishName?: string; status: string };
}) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);
  const restaurantId = session.restaurantId;

  const page = searchParams?.page || "1";
  const dishName = searchParams?.dishName || "";
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
        searchBy="dishName"
        filterBy=""
        placeholder="Tìm theo tên món ăn"
        addComponent={<AddDishdialog />}
      />
      <Suspense
        key={page + dishName + status}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách món ăn"
            tableName="Món ăn"
          />
        }
      >
        <DIshTable
          page={page}
          name={dishName}
          restaurantId={restaurantId as string}
          status={status}
        />
      </Suspense>
    </div>
  );
}

export default ManagerDishManagementPage;
