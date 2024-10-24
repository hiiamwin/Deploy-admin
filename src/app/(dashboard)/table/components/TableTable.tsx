import React from "react";
import { decrypt } from "@/helper";
import { cookies } from "next/headers";
import { AdminPagination } from "../../components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTables } from "@/apis";
async function TableTable({
  page,
  tableNumber,
  tableStatus,
}: {
  page: string;
  tableNumber: string;
  tableStatus: string;
}) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);
  const data = await getTables(
    page,
    tableNumber,
    tableStatus,
    session.accessToken as string
  );
  return (
    <>
      {data.results.length > 0 ? (
        <Table>
          <TableCaption className="caption-top text-2xl font-bold text-gray-700">
            Danh sách bàn
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Số bàn</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((table) => (
              <TableRow key={table.id} className="text-center">
                <TableCell className="text-center">
                  {table.tableNumber}
                </TableCell>
                <TableCell>
                  {table.tableStatus === "Free" ? (
                    <span>
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      Đang nhàn rỗi
                    </span>
                  ) : table.tableStatus === "Working" ? (
                    <span>
                      <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                      Đang phục vụ
                    </span>
                  ) : (
                    <span>
                      <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      Vô hiệu hóa
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Tổng cộng</TableCell>
              <TableCell>{data.totalNumberOfRecords} bàn</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy bàn nào</h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default TableTable;
