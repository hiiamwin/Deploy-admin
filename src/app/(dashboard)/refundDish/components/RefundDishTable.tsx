import React from "react";
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
import Image from "next/image";
import { cookies } from "next/headers";
import { decrypt } from "@/helper";
import { getRefundDish } from "@/apis";

async function RefundDishTable({
  page,
  name,
  status,
}: {
  page: string;
  name: string;
  status: string;
}) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);
  const restaurantId = session.restaurantId;
  const accessToken = session.accessToken;
  const data = await getRefundDish(
    page,
    name,
    restaurantId as string,
    status,
    "5",
    accessToken as string
  );
  return (
    <>
      {data.results.length > 0 ? (
        <Table>
          <TableCaption className="caption-top text-2xl font-bold text-gray-700">
            Danh sách món ăn
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Hình ảnh</TableHead>
              <TableHead className="text-center">Tên món ăn</TableHead>
              <TableHead className="text-center">Giá gốc</TableHead>
              <TableHead className="text-center">
                Phần trăm chêch lệch giá
              </TableHead>
              <TableHead className="text-center">Phân loại</TableHead>
              <TableHead className="text-center">Số lượng</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((dish) => (
              <TableRow key={dish.id} className="text-center">
                <TableCell className="flex items-center gap-4 w-32 text-center">
                  {dish.images.map((image, index) => (
                    <Image
                      key={index}
                      width={64}
                      height={64}
                      src={image.url}
                      alt={dish.dishName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </TableCell>
                <TableCell className="text-center">{dish.dishName}</TableCell>
                <TableCell className="text-center">{dish.price}</TableCell>
                <TableCell className="text-center">
                  {dish.percentagePriceDifference}%
                </TableCell>
                <TableCell className="text-center">
                  {dish.categoryName}
                </TableCell>
                <TableCell>{dish.quantity}</TableCell>
                <TableCell>
                  {dish.status === 1 ? (
                    <div className="text-center">
                      Đang hoạt động
                      <span
                        className={`inline-block w-3 h-3 rounded-full bg-green-500 ml-2`}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      không hoạt động
                      <span
                        className={`inline-block w-3 h-3 rounded-full bg-red-500 ml-2`}
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Tổng cộng</TableCell>
              <TableCell>{data.totalNumberOfRecords} món ăn</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy món ăn nào</h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default RefundDishTable;
