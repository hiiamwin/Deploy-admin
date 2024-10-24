import React, { Suspense } from "react";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { ComboTable, SelectDishDialog } from "./components";
import { cookies } from "next/headers";
import { decrypt } from "@/helper";

async function MangeComboPage({
  searchParams,
}: {
  searchParams?: { page?: string; comboName?: string; comboStatus: string };
}) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);

  const page = searchParams?.page || "1";
  const comboName = searchParams?.comboName || "";
  const comboStatus = searchParams?.comboStatus || "";

  const columns = [
    {
      header: "Hình ảnh",
    },
    {
      header: "Tên combo",
    },
    {
      header: "Giá bán",
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
        searchBy="comboName"
        filterBy="comboStatus"
        placeholder="Tìm theo tên combo"
        addComponent={<SelectDishDialog />}
      />

      <Suspense
        key={page + comboName + comboStatus}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách combo"
            tableName="Combo"
          />
        }
      >
        <ComboTable
          page={page}
          name={comboName}
          status={comboStatus}
          token={session.accessToken as string}
        />
      </Suspense>
    </div>
  );
}

export default MangeComboPage;
