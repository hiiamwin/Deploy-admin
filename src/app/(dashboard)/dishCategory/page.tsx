import React, { Suspense } from "react";
import { ReuseActionBar, ReuseTableLoading } from "../components";
import { AddDishCategoryDialog, DishCategoryTable } from "./components";

function ManageDishCategoryPage({
  searchParams,
}: {
  searchParams?: { page?: string; CategoryName: string };
}) {
  const page = searchParams?.page || "1";
  const CategoryName = searchParams?.CategoryName || "";
  const columns = [
    {
      header: "Tên Danh Mục",
    },
  ];
  return (
    <div>
      <ReuseActionBar
        isFilter={false}
        isSearch={true}
        searchBy="CategoryName"
        placeholder="Tìm theo tên danh mục"
        addComponent={<AddDishCategoryDialog />}
      />
      <Suspense
        key={page + CategoryName}
        fallback={
          <ReuseTableLoading
            columns={columns}
            tableCaption="Danh sách Danh mục món ăn"
            tableName="Danh mục món ăn"
          />
        }
      >
        <DishCategoryTable page={page} CategoryName={CategoryName} />
      </Suspense>
    </div>
  );
}

export default ManageDishCategoryPage;
