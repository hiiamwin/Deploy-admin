"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function DetailUnitSheet({
  ingredientUnit,
  isOpenDetailSheet,
  setIsOpenDetailSheet,
}: {
  ingredientUnit: {
    ingredientUnitId: string;
    ingredientUnitParentId: string | null;
    ingredientUnitParentName: string;
    unitName: string;
    conversionFactor: number;
    createdDate: string;
  }[];
  isOpenDetailSheet: boolean;
  setIsOpenDetailSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const findBaseUnit = (
    units: {
      ingredientUnitId: string;
      ingredientUnitParentId: string | null;
      ingredientUnitParentName: string;
      unitName: string;
      conversionFactor: number;
      createdDate: string;
    }[]
  ):
    | {
        ingredientUnitId: string;
        ingredientUnitParentId: string | null;
        ingredientUnitParentName: string;
        unitName: string;
        conversionFactor: number;
        createdDate: string;
      }
    | undefined => {
    return units.find((unit) => unit.ingredientUnitParentId === null);
  };

  // Function to calculate conversion factor to base unit
  const calculateConversionToBase = (
    unit: {
      ingredientUnitId: string;
      ingredientUnitParentId: string | null;
      ingredientUnitParentName: string;
      unitName: string;
      conversionFactor: number;
      createdDate: string;
    },
    units: {
      ingredientUnitId: string;
      ingredientUnitParentId: string | null;
      ingredientUnitParentName: string;
      unitName: string;
      conversionFactor: number;
      createdDate: string;
    }[]
  ): number => {
    let factor = unit.conversionFactor;
    let currentUnit = unit;

    while (currentUnit.ingredientUnitParentId !== null) {
      const parentUnit = units.find(
        (u) => u.ingredientUnitId === currentUnit.ingredientUnitParentId
      );
      if (!parentUnit) break;
      factor *= parentUnit.conversionFactor;
      currentUnit = parentUnit;
    }

    return factor;
  };

  const baseUnit = findBaseUnit(ingredientUnit);
  console.log(baseUnit);

  return (
    // <Sheet open={isOpenDetailSheet} onOpenChange={setIsOpenDetailSheet}>
    //   <SheetContent className="bg-white sm:max-w-full">
    //     <SheetHeader>
    //       <SheetTitle>Chi tiết chuyển đổi đơn vị</SheetTitle>
    //       <SheetDescription>
    //         Liệt kê các đơn vị và hệ số chuyển đổi
    //       </SheetDescription>
    //     </SheetHeader>
    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="w-[100px]">Đơn vị</TableHead>
    //           <TableHead>Hệ số chuyển đổi</TableHead>
    //           <TableHead>Tương đương với đơn vị cơ sở</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {ingredientUnit.map((unit) => (
    //           <TableRow key={unit.ingredientUnitId}>
    //             <TableCell className="font-medium">{unit.unitName}</TableCell>
    //             <TableCell>{unit.conversionFactor}</TableCell>
    //             <TableCell>
    //               {baseUnit && unit.unitName !== baseUnit.unitName
    //                 ? `1 ${unit.unitName} = ${calculateConversionToBase(
    //                     unit,
    //                     ingredientUnit
    //                   )} ${baseUnit.unitName}`
    //                 : "Đơn vị cơ sở"}
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </SheetContent>
    // </Sheet>
    <Sheet open={isOpenDetailSheet} onOpenChange={setIsOpenDetailSheet}>
      <SheetContent className="bg-white sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle>Chi tiết chuyển đổi đơn vị</SheetTitle>
          <SheetDescription>
            Liệt kê các đơn vị và hệ số chuyển đổi
          </SheetDescription>
        </SheetHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Đơn vị</TableHead>
              <TableHead>Đơn vị chuyển đổi</TableHead>
              <TableHead>Hệ số chuyển đổi</TableHead>
              <TableHead>Tương đương</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredientUnit.map((unit) => (
              <TableRow key={unit.ingredientUnitId}>
                <TableCell className="font-medium">{unit.unitName}</TableCell>
                <TableCell>
                  {unit.ingredientUnitParentName === "Naruto"
                    ? "Đơn vị gốc"
                    : unit.ingredientUnitParentName || "Không có"}
                </TableCell>
                <TableCell>{unit.conversionFactor}</TableCell>
                <TableCell>
                  {unit.ingredientUnitParentId
                    ? `1 ${unit.unitName} = ${unit.conversionFactor} ${unit.ingredientUnitParentName}`
                    : "Đơn vị cơ sở"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SheetContent>
    </Sheet>
  );
}

export default DetailUnitSheet;
