import { getManagers } from "@/apis";
import React from "react";
import { AdminPagination, ReuseTable } from "../../components";
import { Column, Employee } from "@/types";
import ManagerMenuActions from "./ManagerMenuActions";

async function ManagerTable({
  page,
  fullName,
  status,
}: {
  page: string;
  fullName: string;
  status: string;
}) {
  const data = await getManagers(page, fullName, status);

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
      header: "Nhà hàng trực thuộc",
      accessorKey: "restaurantName",
    },
    {
      header: "Trạng thái",
      accessorKey: "status",
    },
  ];
  return (
    <>
      {data.results.length > 0 ? (
        <ReuseTable<Employee>
          columns={columns}
          data={data.results}
          total={data.totalNumberOfRecords}
          tableName="Nhà hàng"
          tableCaption="Danh sách nhà hàng"
          renderActions={(item) => <ManagerMenuActions item={item} />}
        />
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy quản lý nào</h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default ManagerTable;
