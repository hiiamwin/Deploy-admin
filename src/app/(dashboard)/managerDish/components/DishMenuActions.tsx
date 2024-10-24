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
import { Edit, MoreHorizontal, PowerOff } from "lucide-react";
import { Dish } from "@/types";
import DishDetailSheet from "./DishDetailSheet";
import InactiveDishDialog from "./InactiveDishDialog";
import ActiveDishDialog from "./ActiveDishDialog";

function DishMenuActions({ item }: { item: Dish }) {
  const [isOpenInactivateDialog, setIsOpenInactivateDialog] = useState(false);
  const [isOpenActivateDialog, setIsOpenActivateDialog] = useState(false);
  const [isOpenDetailSheet, setIsOpenDetailSheet] = useState(false);
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

          <DropdownMenuSeparator />
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
                <span>Hoạt động trở lại</span>
              </Button>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpenInactivateDialog && (
        <InactiveDishDialog
          id={item.id}
          isOpenInactivateDialog={isOpenInactivateDialog}
          setIsOpenInactivateDialog={setIsOpenInactivateDialog}
        />
      )}

      {isOpenActivateDialog && (
        <ActiveDishDialog
          id={item.id}
          isOpenActivateDialog={isOpenActivateDialog}
          setIsOpenActivateDialog={setIsOpenActivateDialog}
        />
      )}

      {isOpenDetailSheet && (
        <DishDetailSheet
          id={item.id}
          isOpenDetailSheet={isOpenDetailSheet}
          setIsOpenDetailSheet={setIsOpenDetailSheet}
        />
      )}
    </>
  );
}

export default DishMenuActions;
