import { getWaiters } from "@/apis";
import React from "react";
import { AdminPagination, ReusedTable } from "@/app/(dashboard)/components";
import { Column, Employee } from "@/types";
import WaiterMenuAction from "./WaiterMenuAction";

async function WaiterTable({
  page,
  fullName,
  status,
  restaurantId,
}: {
  page: string;
  fullName: string;
  status: string;
  restaurantId: string;
}) {
  const data = await getWaiters(page, fullName, restaurantId, status);

  const columns: Column<Employee>[] = [
    {
      header: "Mã nhân viên",
      accessorKey: "employeeCode",
    },
    {
      header: "Họ và tên",
      accessorKey: "fullName",
    },
    {
      header: "Số điện thoại",
      accessorKey: "phoneNumber",
    },
    {
      header: "Trạng thái",
      accessorKey: "status",
    },
  ];
  return (
    <>
      {data.results.length > 0 ? (
        <ReusedTable
          data={data.results}
          columns={columns}
          tableCaption="Danh sách nhân viên"
          tableName="Nhân viên"
          total={data.totalNumberOfRecords}
          renderActions={(item) => <WaiterMenuAction item={item} />}
        />
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy nhân viên nào</h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default WaiterTable;
