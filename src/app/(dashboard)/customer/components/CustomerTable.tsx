import React from "react";
import { AdminPagination, ReuseTable } from "../../components";
import { Column, Customer } from "@/types";
import CustomerMenuActions from "./CustomerMenuActions";

function CustomerTable({}: { page: string; phone: string }) {
  const data = {
    results: [
      {
        id: "a1",
        name: "Nguyễn Văn A",
        phone: "0123456789",
        points: 100,
      },
      {
        id: "a2",
        name: "Nguyễn Văn B",
        phone: "0123456789",
        points: 200,
      },
      {
        id: "a3",
        name: "Nguyễn Văn C",
        phone: "0123456789",
        points: 300,
      },
      {
        id: "a4",
        name: "Nguyễn Văn D",
        phone: "0123456789",
        points: 400,
      },
      {
        id: "a5",
        name: "Nguyễn Văn E",
        phone: "0123456789",
        points: 500,
      },
    ],
    totalNumberOfRecords: 15,
  };
  const columns: Column<Customer>[] = [
    {
      header: "Tên người dùng",
      accessorKey: "name",
    },
    {
      header: "Số điện thoại",
      accessorKey: "phone",
    },
    {
      header: "Điểm tích lũy",
      accessorKey: "points",
    },
  ];
  return (
    <>
      {data.results.length > 0 ? (
        <ReuseTable<Customer>
          columns={columns}
          data={data.results}
          total={data.totalNumberOfRecords}
          tableName="Khách hàng"
          tableCaption="Danh sách khách hàng"
          renderActions={(item) => <CustomerMenuActions item={item} />}
        />
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy khách hàng nào</h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default CustomerTable;
