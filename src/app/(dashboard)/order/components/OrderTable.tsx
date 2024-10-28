import React from "react";
import { AdminPagination, ReuseTable } from "../../components";
import { Column, Order } from "@/types";
// import OrderMenuActions from "./OrderMenuActions";

function OrderTable({}: // page,
// phone,
// status,
{
  page: string;
  phone: string;
  status: string;
}) {
  const data = {
    results: [
      {
        id: "o1",
        customerName: "Nguyen Van A",
        phone: "0123456789",
        total: 100000,
        createdAt: "2021-09-01",
        status: 1,
      },
      {
        id: "o2",
        customerName: "Nguyen Van B",
        phone: "0123456789",
        total: 200000,
        createdAt: "2021-09-01",
        status: 2,
      },
      {
        id: "o3",
        customerName: "Nguyen Van C",
        phone: "0123456789",
        total: 300000,
        createdAt: "2021-09-01",
        status: 1,
      },
      {
        id: "o4",
        customerName: "Nguyen Van D",
        phone: "0123456789",
        total: 400000,
        createdAt: "2021-09-01",
        status: 1,
      },
      {
        id: "o5",
        customerName: "Nguyen Van E",
        phone: "0123456789",
        total: 500000,
        createdAt: "2021-09-01",
        status: 2,
      },
    ],
    totalNumberOfRecords: 15,
  };

  const columns: Column<Order>[] = [
    {
      header: "Tên khách hàng",
      accessorKey: "customerName",
    },
    {
      header: "Số điện thoại",
      accessorKey: "phone",
    },
    {
      header: "Tổng tiền",
      accessorKey: "total",
    },
    {
      header: "Ngày tạo",
      accessorKey: "createdAt",
    },
    {
      header: "Trạng thái",
      accessorKey: "status",
    },
  ];
  return (
    <>
      {data.results.length > 0 ? (
        <ReuseTable<Order>
          columns={columns}
          data={data.results}
          total={data.totalNumberOfRecords}
          tableName="Nhà hàng"
          tableCaption="Danh sách nhà hàng"
          // renderActions={(item) => <OrderMenuActions item={item} />}
        />
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy nhà hàng nào</h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default OrderTable;
