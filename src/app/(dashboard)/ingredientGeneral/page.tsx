import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import {
  AddIngredientGeneralDialog,
  IngredientGeneralTable,
} from "./components";
import { decrypt } from "@/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quản lý nguyên liệu",
  description: "Quản lý nguyên liệu",
};

async function AdminManageIngredientPage({
  searchParams,
}: {
  searchParams?: { page?: string; IngredientGeneralName?: string };
}) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) redirect("/login");
  const session = await decrypt(cookie);
  const page = searchParams?.page || "1";
  const IngredientGeneralName = searchParams?.IngredientGeneralName || "";
  const columns = [
    {
      header: "Tên nguyên liệu",
    },
    {
      header: "Loại nguyên liệu",
    },
    {
      header: "Đơn vị cơ sở",
    },
    {
      header: "Mô tả",
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
        searchBy="IngredientGeneralName"
        placeholder="Tìm theo tên danh mục"
        addComponent={<AddIngredientGeneralDialog />}
      />
      <Suspense
        key={page + IngredientGeneralName}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách Danh mục món ăn"
            tableName="Danh mục món ăn"
          />
        }
      >
        <IngredientGeneralTable
          page={page}
          IngredientGeneralName={IngredientGeneralName}
          accessToken={session.accessToken as string}
        />
      </Suspense>
    </div>
  );
}

export default AdminManageIngredientPage;
