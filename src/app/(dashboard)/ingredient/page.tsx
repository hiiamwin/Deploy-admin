import React, { Suspense } from "react";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { AddIngerdientDialog, IngredientTable } from "./components";

function ManageIngredientPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    ingredientName?: string;
  };
}) {
  const page = searchParams?.page || "1";
  const ingredientName = searchParams?.ingredientName || "";
  const columns = [
    {
      header: "Tên nguyên liệu",
    },
    {
      header: "Loại nguyên liệu",
    },
    {
      header: "Số lượng",
    },
    {
      header: "Đơn vị cơ sở",
    },

    {
      header: "Mô tả",
    },
  ];
  return (
    <div>
      <ReuseActionBar
        isSearch={true}
        searchBy={"ingredientName"}
        isFilter={false}
        placeholder="Tìm theo tên nguyên liệu"
        addComponent={<AddIngerdientDialog />}
      />
      <Suspense
        key={page + ingredientName}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Nguyên liệu"
            tableName="Nguyên liệu"
          />
        }
      >
        <IngredientTable page={page} name={ingredientName} />
      </Suspense>
    </div>
  );
}

export default ManageIngredientPage;
