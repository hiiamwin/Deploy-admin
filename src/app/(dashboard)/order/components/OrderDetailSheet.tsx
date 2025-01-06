"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Order } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetailAction } from "@/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Loader2 } from "lucide-react";

function OrderDetailSheet({
  isOpenDetailSheet,
  setIsOpenDetailSheet,
  item,
}: {
  isOpenDetailSheet: boolean;
  setIsOpenDetailSheet: Dispatch<SetStateAction<boolean>>;
  item: Order;
}) {
  const { data, isFetching } = useQuery({
    queryKey: ["orderDetail", item.id],
    queryFn: () => getOrderDetailAction({ id: item.id }),
    enabled: isOpenDetailSheet,
    refetchOnWindowFocus: false,
  });
  const handleOpen = (value: boolean) => {
    setIsOpenDetailSheet(value);
  };
  return (
    <Sheet open={isOpenDetailSheet} onOpenChange={handleOpen}>
      <SheetContent className="bg-white sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Chi tiết đơn hàng</SheetTitle>
          <SheetDescription>
            Thanh toán bởi:{" "}
            {data?.data?.paymentEmployeeCode && data?.data?.paymentEmployeeName
              ? `${data?.data?.paymentEmployeeCode} - ${data?.data?.paymentEmployeeName}`
              : item.orderStatus === "Canceled"
              ? "Đơn bị hủy"
              : item.orderStatus !== "Finish"
              ? "Chưa thanh toán"
              : "VnPay"}
          </SheetDescription>
        </SheetHeader>
        {isFetching ? (
          <div className="w-full flex items-center justify-center ">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-120px)] pr-4">
            <div className="space-y-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Trạng thái:</span>
                <Badge variant="outline" className={`bg-green-500 text-white`}>
                  {item.orderStatus}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Thời gian đặt:</span>
                <span>
                  {format(new Date(item.createdDate), "dd/MM/yyyy HH:mm:ss")}
                </span>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Món ăn</h3>
                {data?.data?.orderDetails.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.productName || item.comboName || ""}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    )}
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.productName || item.comboName || ""}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {item.productName || item.comboName}
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {item.quantity} x {item.price.toLocaleString("vi-VN")}{" "}
                          đ
                        </span>
                        <Badge
                          variant="outline"
                          className={`bg-green-500 text-white ${
                            item.status === "Prepare"
                              ? "bg-yellow-500"
                              : item.status === "Cook"
                              ? "bg-green-500"
                              : item.status === "Service"
                              ? "bg-green-500"
                              : item.status === "Finish"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      {item.note && (
                        <p className="text-sm text-gray-500">
                          Ghi chú: {item.note}
                        </p>
                      )}
                      {item.isRefund && (
                        <p className="text-sm text-red-500">
                          Trả lại: {item.refundQuantity}
                        </p>
                      )}

                      {item.cancelEmployeeCode && item.cancelEmployeeName ? (
                        <p className="text-sm text-gray-500">
                          Hủy bởi: {item.cancelEmployeeCode} -{" "}
                          {item.cancelEmployeeName}
                        </p>
                      ) : null}

                      {item.confirmOrderEmployeeCode &&
                      item.confirmOrderEmployeeName ? (
                        <p className="text-sm text-gray-500">
                          Xác nhận bởi: {item.confirmOrderEmployeeCode} -{" "}
                          {item.confirmOrderEmployeeName}
                        </p>
                      ) : null}

                      {item.cookedEmployeeCode && item.cookedEmployeeName ? (
                        <p className="text-sm text-gray-500">
                          Nấu bởi: {item.cookedEmployeeCode} -{" "}
                          {item.cookedEmployeeName}
                        </p>
                      ) : null}

                      {item.serveEmployeeCode && item.serveEmployeeName ? (
                        <p className="text-sm text-gray-500">
                          Phục vụ bởi: {item.serveEmployeeCode} -{" "}
                          {item.serveEmployeeName}
                        </p>
                      ) : null}

                      {item.refundEmployeeCode && item.refundEmployeeName ? (
                        <p className="text-sm text-gray-500">
                          Trả lại bởi: {item.refundEmployeeCode} -{" "}
                          {item.refundEmployeeName}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Tổng tiền gốc:</span>
                <span>{item.totalPrice}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Tiền giảm giá:</span>
                <span>{item.reduceAmount}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Tổng tiền:</span>
                <span>{item.finalAmount}</span>
              </div>
              {data?.data?.feedback && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Nhận xét</h3>
                  <p className="text-gray-700">{data?.data?.feedback}</p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default OrderDetailSheet;
