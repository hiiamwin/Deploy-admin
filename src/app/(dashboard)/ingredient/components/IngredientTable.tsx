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
import { getIngredients } from "@/apis";
// import { MoveRight } from "lucide-react";
import IngredientMenuActions from "./IngredientMenuActions";

async function IngredientTable({ page, name }: { page: string; name: string }) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);
  const data = await getIngredients(page, name, session.accessToken as string);
  // console.log(
  //   data.results[0].ingredientUnits[data.results[0].ingredientUnits.length - 1]
  // );

  return (
    <>
      {data.results.length > 0 ? (
        <Table>
          <TableCaption className="caption-top text-2xl font-bold text-gray-700">
            Danh sách nguyên liệu
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Tên nguyên liệu</TableHead>
              <TableHead className="text-center">Loại nguyên liệu</TableHead>
              <TableHead className="text-center">Mô tả</TableHead>
              <TableHead className="text-center">Số lượng</TableHead>
              <TableHead className="text-center">Đơn vị</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((ingredient) => (
              <TableRow key={ingredient.id} className="text-center">
                <TableCell className="text-center">
                  {ingredient.ingredientName}
                </TableCell>
                <TableCell className="text-center">
                  {ingredient.ingredientType}
                </TableCell>
                <TableCell>{ingredient.ingredientDescription}</TableCell>
                <TableCell>{ingredient.amount}</TableCell>
                <TableCell className="flex items-center justify-center">
                  {/* {ingredient.ingredientUnits.reverse().map((unit, index) => {
                    if (index + 1 === ingredient.ingredientUnits.length) {
                      return `${unit.unitName}`;
                    }
                    return (
                      <span
                        className="flex items-center justify-center"
                        key={unit.ingredientUnitId}
                      >
                        {unit.unitName} <MoveRight className="mx-1" />
                      </span>
                    );
                  })} */}
                  {
                    ingredient.ingredientUnits[
                      ingredient.ingredientUnits.length - 1
                    ].unitName
                  }
                </TableCell>
                <TableCell>
                  <IngredientMenuActions item={ingredient} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Tổng cộng</TableCell>
              <TableCell>{data.totalNumberOfRecords} nguyên liệu</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy nguyên liệu nào</h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default IngredientTable;
