import React from "react";
import { AdminPagination } from "../../components";
// import OrderMenuActions from "./OrderMenuActions";
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
import { getOrder } from "@/apis";
import { decrypt } from "@/helper";
import { cookies } from "next/headers";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import OrderMenuActions from "./OrderMenuActions";

async function OrderTable({ page, phone }: { page: string; phone: string }) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);
  const data = await getOrder(page, phone, session.accessToken as string);

  return (
    <>
      {data.results.length > 0 ? (
        <Table>
          <TableCaption className="caption-top text-2xl font-bold text-gray-700">
            Danh sách đơn hàng
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Tên khách hàng</TableHead>
              <TableHead className="text-center">Số điện thoại</TableHead>
              <TableHead className="text-center">Bàn số</TableHead>
              <TableHead className="text-center">Tổng tiền</TableHead>
              <TableHead className="text-center">Ngày tạo</TableHead>
              <TableHead className="text-center">
                Phương thức thanh toán
              </TableHead>
              <TableHead className="text-center">Xác nhận thanh toán</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((order) => (
              <TableRow key={order.id} className="text-center">
                <TableCell className="text-center">
                  {order.customerName}
                </TableCell>
                <TableCell className="text-center">
                  {order.phoneNumber || "Không có"}
                </TableCell>
                <TableCell className="text-center">
                  {order.tableNumber}
                </TableCell>
                <TableCell className="text-center">
                  {order.orderStatus === "Canceled"
                    ? order.totalPrice.toLocaleString("vi-VN")
                    : order.finalAmount.toLocaleString("vi-VN")}{" "}
                  đ
                </TableCell>
                <TableCell className="text-center">
                  {format(new Date(order.createdDate), "dd/MM/yyyy", {
                    locale: vi,
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {order.paymentMethods === "Cash"
                    ? "Tiền mặt"
                    : order.paymentMethods === "VNPay"
                    ? "VnPay"
                    : "Chưa thanh toán"}
                </TableCell>
                <TableCell className="text-center">
                  {order.orderStatus === "Canceled"
                    ? "Đơn bị hủy"
                    : order.isAdminConfirm
                    ? "Đã xác nhận"
                    : "Chưa xác nhận"}
                </TableCell>
                <TableCell>
                  {order.orderStatus === "Prepare" ? (
                    <div className="text-center">
                      Đang chờ xác nhận
                      <span
                        className={`inline-block w-3 h-3 rounded-full bg-yellow-500 ml-2`}
                      />
                    </div>
                  ) : order.orderStatus === "Cook" ? (
                    <div className="text-center">
                      Đang nấu
                      <span
                        className={`inline-block w-3 h-3 rounded-full bg-green-500 ml-2`}
                      />
                    </div>
                  ) : order.orderStatus === "Service" ? (
                    <div className="text-center">
                      Đã phục vụ
                      <span
                        className={`inline-block w-3 h-3 rounded-full bg-green-500 ml-2`}
                      />
                    </div>
                  ) : order.orderStatus === "Payment" ? (
                    <div className="text-center">
                      Đang thanh toán
                      <span
                        className={`inline-block w-3 h-3 rounded-full bg-green-500 ml-2`}
                      />
                    </div>
                  ) : order.orderStatus === "Finish" ? (
                    <div className="text-center">
                      Hoàn tất
                      <span
                        className={`inline-block w-3 h-3 rounded-full bg-green-500 ml-2`}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      Hủy
                      <span
                        className={`inline-block w-3 h-3 rounded-full bg-red-500 ml-2`}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <OrderMenuActions item={order} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8}>Tổng cộng</TableCell>
              <TableCell>{data.totalNumberOfRecords} đơn hàng</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy đơn hàng nào</h2>
      )}
      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default OrderTable;
