import React from "react";
import { AdminPagination, ReuseTable } from "../../components";
import { Column, Customer } from "@/types";
// import CustomerMenuActions from "./CustomerMenuActions";
import { getCustomer } from "@/apis";
import { decrypt } from "@/helper";
import { cookies } from "next/headers";

async function CustomerTable({ page, name }: { page: string; name: string }) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);
  const data = await getCustomer(page, session.accessToken as string, name);

  const columns: Column<Customer>[] = [
    {
      header: "Tên người dùng",
      accessorKey: "fullName",
    },
    {
      header: "Số điện thoại",
      accessorKey: "phoneNumber",
    },
    {
      header: "Điểm tích lũy",
      accessorKey: "point",
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
          // renderActions={(item) => <CustomerMenuActions item={item} />}
        />
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy khách hàng nào</h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default CustomerTable;
