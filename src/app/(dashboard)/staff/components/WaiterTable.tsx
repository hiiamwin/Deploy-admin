import { getWaiters } from "@/apis";
import React from "react";
import { AdminPagination, ReusedTable } from "@/app/(dashboard)/components";
import { Column, Employee } from "@/types";
import WaiterMenuAction from "./WaiterMenuAction";

async function WaiterTable({
  page,
  fullName,
}: {
  page: string;
  fullName: string;
}) {
  // const data = await getWaiters(page, fullName);

  const data = {
    results: [
      {
        id: "a1",
        fullName: "Nguyễn Văn A",
        email: "nguyenvanA@gmail.com",
        employeeCode: "NV001",
        hireDate: "2021-10-10",
        roleName: "Waiter",
        restaurantId: "r1",
        status: 1,
        creted: "2021-10-10",
      },
      {
        id: "a2",
        fullName: "Nguyễn Văn B",
        email: "nguyenvanB@gmail.com",
        employeeCode: "NV002",
        hireDate: "2021-10-10",
        roleName: "Waiter",
        restaurantId: "r1",
        status: 2,
        creted: "2021-10-10",
      },
      {
        id: "a3",
        fullName: "Nguyễn Văn C",
        email: "nguyenvanC@gmail.com",
        employeeCode: "NV003",
        hireDate: "2021-10-10",
        roleName: "Waiter",
        restaurantId: "r1",
        status: 2,
        creted: "2021-10-10",
      },
      {
        id: "a4",
        fullName: "Nguyễn Văn D",
        email: "nguyenvanD@gmail.com",
        employeeCode: "NV004",
        hireDate: "2021-10-10",
        roleName: "Waiter",
        restaurantId: "r1",
        status: 1,
        creted: "2021-10-10",
      },
      {
        id: "a5",
        fullName: "Nguyễn Văn E",
        email: "nguyenvanE@gmail.com",
        employeeCode: "NV005",
        hireDate: "2021-10-10",
        roleName: "Waiter",
        restaurantId: "r1",
        status: 1,
        creted: "2021-10-10",
      },
    ],
    totalNumberOfRecords: 15,
  };

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
      header: "Email",
      accessorKey: "email",
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
