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
import { getCombo } from "@/apis";
import ComboMenuActions from "./ComboMenuActions";
import { decrypt } from "@/helper";
import { cookies } from "next/headers";

async function ComboTable({
  page,
  name,
  status,
  token,
}: {
  page: string;
  name: string;
  status: string;
  token: string;
}) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);
  const restaurantId = session.restaurantId;
  const data = await getCombo(
    page,
    name,
    status,
    token,
    restaurantId as string
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
              <TableHead className="text-center">Tên combo</TableHead>
              <TableHead className="text-center">Giá bán</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((combo) => (
              <TableRow key={combo.id} className="text-center">
                <TableCell className="flex items-center gap-4 w-24 text-center">
                  <Image
                    width={64}
                    height={64}
                    src={combo.comboThumbnail}
                    alt={combo.comboName}
                    className="w-16 h-16 object-cover rounded "
                  />
                </TableCell>
                <TableCell className="text-center">{combo.comboName}</TableCell>
                <TableCell className="text-center">
                  {combo.comboPrice}
                </TableCell>
                <TableCell>
                  {combo.status === 1 ? (
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
                <TableCell>
                  <ComboMenuActions item={combo} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Tổng cộng</TableCell>
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
export default ComboTable;
