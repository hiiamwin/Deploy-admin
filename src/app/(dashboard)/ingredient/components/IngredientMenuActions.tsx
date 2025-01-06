"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Ruler } from "lucide-react";
import { Ingredient } from "@/types";
import AddUnitDialog from "./AddUnitDialog";
import UpdateUnitDialog from "./UpdateUnitDialog";
import DetailUnitSheet from "./DetailUnitSheet";

function IngredientMenuActions({ item }: { item: Ingredient }) {
  const [isOpenAddUnitDialog, setIsOpenAddUnitDialog] = useState(false);
  const [isOpenUpdateUnitDialog, setIsOpenUpdateUnitDialog] = useState(false);
  const [isOpenDetailUnitSheet, setIsOpenDetailUnitSheet] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={"icon"}
            className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none focus-visible:ring-offset-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => setIsOpenAddUnitDialog(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Thêm đơn vị</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => setIsOpenUpdateUnitDialog(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Cập nhật đơn vị</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => setIsOpenDetailUnitSheet(true)}
            >
              <Ruler className="mr-2 h-4 w-4" />
              <span>Chi tiết đơn vị</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpenAddUnitDialog && (
        <AddUnitDialog
          isOpenAddUnitDialog={isOpenAddUnitDialog}
          setIsOpenAddUnitDialog={setIsOpenAddUnitDialog}
          item={item}
        />
      )}

      {isOpenUpdateUnitDialog && (
        <UpdateUnitDialog
          isOpenUpdateUnitDialog={isOpenUpdateUnitDialog}
          setIsOpenUpdateUnitDialog={setIsOpenUpdateUnitDialog}
          item={item}
        />
      )}

      {isOpenDetailUnitSheet && (
        <DetailUnitSheet
          ingredientUnit={item.ingredientUnits}
          isOpenDetailSheet={isOpenDetailUnitSheet}
          setIsOpenDetailSheet={setIsOpenDetailUnitSheet}
        />
      )}
    </>
  );
}

export default IngredientMenuActions;
