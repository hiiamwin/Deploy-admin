import { getWaiters } from "@/apis";
import React from "react";
import { AdminPagination } from "@/app/(dashboard)/components";
import { Column, Employee } from "@/types";
import WaiterMenuAction from "./WaiterMenuAction";
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
        // <ReusedTable
        //   data={data.results.filter((item) => item.roleName !== "Manager")}
        //   columns={columns}
        //   tableCaption="Danh sách nhân viên"
        //   tableName="Nhân viên"
        //   total={data.totalNumberOfRecords}
        //   renderActions={(item) => <WaiterMenuAction item={item} />}
        // />

        <Table>
          <TableCaption className="caption-top text-2xl font-bold text-gray-700">
            Danh sách nhân viên
          </TableCaption>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.header} className="text-left">
                  {col.header}
                </TableHead>
              ))}
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results
              .filter((item) => item.roleName !== "Manager")
              .map((item) => (
                <TableRow key={item.id}>
                  {columns.map((col) => (
                    <TableCell key={col.header} className="text-left">
                      {String(item[col.accessorKey]) === "1" ? (
                        <span className="flex items-center gap-2">
                          Đang hoạt động
                          <span
                            className={`inline-block w-3 h-3 rounded-full bg-green-500`}
                          />
                        </span>
                      ) : String(item[col.accessorKey]) === "2" ? (
                        <span className="flex items-center gap-2">
                          Không hoạt động
                          <span
                            className={`inline-block w-3 h-3 rounded-full bg-red-500`}
                          />
                        </span>
                      ) : (
                        String(item[col.accessorKey])
                      )}
                    </TableCell>
                  ))}
                  {item.roleName !== "HeadChef" && (
                    <TableCell>
                      <WaiterMenuAction item={item} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length}>Tổng cộng</TableCell>
              <TableCell>{data.totalNumberOfRecords - 1} Nhân viên</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy nhân viên nào</h2>
      )}

      <AdminPagination
        totalPage={Math.ceil((data.totalNumberOfRecords - 1) / 5)}
      />
    </>
  );
}

export default WaiterTable;
