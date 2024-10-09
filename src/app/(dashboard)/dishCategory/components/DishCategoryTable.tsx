import { getDishCategory } from "@/apis";
import { Column, DishCategory } from "@/types";
import React from "react";
import { AdminPagination, ReuseTable } from "../../components";
import DishCategoryMenuActions from "./DishCategoryMenuActions";

async function DishCategoryTable({
  page,
  CategoryName,
}: {
  page: string;
  CategoryName: string;
}) {
  const data = await getDishCategory(page, CategoryName);
  const columns: Column<DishCategory>[] = [
    {
      header: "Tên Danh Mục",
      accessorKey: "categoryName",
    },
  ];
  return (
    <>
      {data?.results?.length > 0 ? (
        <ReuseTable<DishCategory>
          columns={columns}
          data={data.results}
          total={data.totalNumberOfRecords}
          tableCaption="Danh sách danh mục món ăn"
          tableName="Danh mục món ăn"
          renderActions={(item) => <DishCategoryMenuActions item={item} />}
        />
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy nhà hàng nào</h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default DishCategoryTable;
