import { getIngredientGenerals } from "@/apis";
import React from "react";
import { AdminPagination, ReuseTable } from "../../components";
import { Column, IngredientGeneral } from "@/types";
import IngredientGeneralMenuActions from "./IngredientGeneralMenuActions";

async function IngredientGeneralTable({
  page,
  IngredientGeneralName,
  accessToken,
}: {
  page: string;
  IngredientGeneralName: string;
  accessToken: string;
}) {
  const data = await getIngredientGenerals(
    page,
    IngredientGeneralName,
    accessToken
  );
  const columns: Column<IngredientGeneral>[] = [
    {
      header: "Tên nguyên liệu",
      accessorKey: "ingredientGeneralName",
    },
    {
      header: "Loại nguyên liệu",
      accessorKey: "ingredientGeneralType",
    },
    {
      header: "Đơn vị cơ sở",
      accessorKey: "ingredientMeasureType",
    },
    {
      header: "Mô tả",
      accessorKey: "ingredientGeneralDescription",
    },
    {
      header: "Trạng thái",
      accessorKey: "status",
    },
  ];
  return (
    <>
      {data?.results?.length > 0 ? (
        <ReuseTable<IngredientGeneral>
          columns={columns}
          data={data.results}
          total={data.totalNumberOfRecords}
          tableCaption="Danh sách nguyên liệu"
          tableName="Nguyên liệu"
          renderActions={(item) => <IngredientGeneralMenuActions item={item} />}
        />
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy nguyên liệu nào</h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default IngredientGeneralTable;
