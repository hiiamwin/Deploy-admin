import React, { Suspense } from "react";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { AddIngredientTypeDialog, IngredientTypeTable } from "./components";

function ManageIngredientTypePage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    IngredientTypeName: string;
  };
}) {
  const page = searchParams?.page || "1";
  const ingredientTypeName = searchParams?.IngredientTypeName || "";
  const columns = [
    {
      header: "Tên Loại Nguyên Liệu",
    },
  ];
  return (
    <div>
      <ReuseActionBar
        isFilter={false}
        isSearch={true}
        searchBy="IngredientTypeName"
        placeholder="Tìm theo tên loại nguyên liệu"
        addComponent={<AddIngredientTypeDialog />}
      />
      <Suspense
        key={page + ingredientTypeName}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách loại nguyên liệu"
            tableName="loại nguyên liệu"
          />
        }
      >
        <IngredientTypeTable
          page={page}
          ingredientTypeName={ingredientTypeName}
        />
      </Suspense>
    </div>
  );
}

export default ManageIngredientTypePage;
