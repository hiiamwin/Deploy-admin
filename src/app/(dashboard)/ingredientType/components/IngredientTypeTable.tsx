import { getIngredientTypes } from "@/apis";
import { Column, IngredientType } from "@/types";
import React from "react";
import { AdminPagination, ReuseTable } from "../../components";
import IngredientTypeMenuActions from "./IngredientTypeMenuActions";

async function IngredientTypeTable({
  page,
  ingredientTypeName,
}: {
  page: string;
  ingredientTypeName: string;
}) {
  const data = await getIngredientTypes(page, ingredientTypeName);
  const columns: Column<IngredientType>[] = [
    {
      header: "Tên Loại Nguyên Liệu",
      accessorKey: "ingredientTypeName",
    },
    {
      header: "Mô tả",
      accessorKey: "ingredientTypeDescription",
    },
  ];
  return (
    <>
      {data?.results?.length > 0 ? (
        <ReuseTable<IngredientType>
          columns={columns}
          data={data.results}
          total={data.totalNumberOfRecords}
          tableCaption="Danh sách danh mục nguyên liệu"
          tableName="Danh mục nguyên liệu"
          renderActions={(item) => <IngredientTypeMenuActions item={item} />}
        />
      ) : (
        <h2 className="text-center mt-10">
          Không tìm thấy loại nguyên liệu nào
        </h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default IngredientTypeTable;
