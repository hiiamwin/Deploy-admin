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
import { Copy, Edit, MoreHorizontal, PowerOff } from "lucide-react";
import { DishGeneral } from "@/types";
import UpdateNormalInfomationDialog from "./UpdateNormalInfomationDialog";
import UpdateDishIngredientDialog from "./UpdateDishIngredientDialog";
import InactiveDishGeneralDialog from "./InactiveDishGeneralDialog";
import ActiveDishGeneralDialog from "./ActiveDishGeneralDialog";
import DetailDishGeneralSheet from "./DetailDishGeneralSheet";
import CreateVariantDialog from "./CreateVariantDialog";

function AdminDishMenuActions({ item }: { item: DishGeneral }) {
  const [
    isOpenUpdateNormalInformationDialog,
    setIsOpenUpdateNormalInformationDialog,
  ] = useState(false);
  const [
    isOpenUpdateDishIngredientDialog,
    setIsOpenUpdateDishIngredientDialog,
  ] = useState(false);
  const [isOpenInactivateDialog, setIsOpenInactivateDialog] = useState(false);
  const [isOpenActivateDialog, setIsOpenActivateDialog] = useState(false);
  const [isOpenDetailSheet, setIsOpenDetailSheet] = useState(false);
  const [isOpenCreateVariationDialog, setIsOpenCreateVariationDialog] =
    useState(false);
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
              onClick={() => setIsOpenDetailSheet(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Chi tiết món ăn</span>
            </Button>
          </DropdownMenuItem>
          {item.status !== 3 && <DropdownMenuSeparator />}
          {item.status === 3 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => setIsOpenUpdateNormalInformationDialog(true)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Chỉnh sửa thông tin cơ bản</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {item.status === 3 && item.isRefund === false && (
            <>
              <DropdownMenuItem className="cursor-pointer">
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => setIsOpenUpdateDishIngredientDialog(true)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Chỉnh sửa công thức</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {item.status !== 3 && (
            <>
              <DropdownMenuItem className="cursor-pointer">
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => setIsOpenCreateVariationDialog(true)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Tạo ra món tương tự</span>
                </Button>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem className="cursor-pointer">
            {item.status === 1 ? (
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => setIsOpenInactivateDialog(true)}
              >
                <PowerOff className="mr-2 h-4 w-4" />
                <span>Dừng hoạt động</span>
              </Button>
            ) : (
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => setIsOpenActivateDialog(true)}
              >
                <PowerOff className="mr-2 h-4 w-4" />
                {item.status === 3 ? (
                  <span>Hoạt động</span>
                ) : (
                  <span> Hoạt động trở lại</span>
                )}
                {/* <span>Hoạt động trở lại</span> */}
              </Button>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpenUpdateNormalInformationDialog && (
        <UpdateNormalInfomationDialog
          isOpenUpdateNormalInformationDialog={
            isOpenUpdateNormalInformationDialog
          }
          setIsOpenUpdateNormalInformationDialog={
            setIsOpenUpdateNormalInformationDialog
          }
          data={item}
        />
      )}

      {isOpenUpdateDishIngredientDialog && (
        <UpdateDishIngredientDialog
          isOpenUpdateDishIngredientDialog={isOpenUpdateDishIngredientDialog}
          setIsOpenUpdateDishIngredientDialog={
            setIsOpenUpdateDishIngredientDialog
          }
          id={item.id}
        />
      )}

      {isOpenInactivateDialog && (
        <InactiveDishGeneralDialog
          id={item.id}
          isOpenInactivateDialog={isOpenInactivateDialog}
          setIsOpenInactivateDialog={setIsOpenInactivateDialog}
        />
      )}

      {isOpenActivateDialog && (
        <ActiveDishGeneralDialog
          id={item.id}
          isOpenActivateDialog={isOpenActivateDialog}
          setIsOpenActivateDialog={setIsOpenActivateDialog}
        />
      )}

      {isOpenDetailSheet && (
        <DetailDishGeneralSheet
          id={item.id}
          isOpenDetailSheet={isOpenDetailSheet}
          setIsOpenDetailSheet={setIsOpenDetailSheet}
        />
      )}

      {isOpenCreateVariationDialog && (
        <CreateVariantDialog
          id={item.id}
          isOpenCreateVariationDialog={isOpenCreateVariationDialog}
          setIsOpenCreateVariationDialog={setIsOpenCreateVariationDialog}
        />
      )}
    </>
  );
}

export default AdminDishMenuActions;
