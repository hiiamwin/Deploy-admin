"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal } from "lucide-react";
import UpdateIngedientTypeDialog from "./UpdateIngedientTypeDialog";
import { IngredientType } from "@/types";

function IngredientTypeMenuActions({ item }: { item: IngredientType }) {
  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);

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
              onClick={() => setIsOpenUpdateDialog(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Chỉnh sửa</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpenUpdateDialog && (
        <UpdateIngedientTypeDialog
          isOpenUpdateDialog={isOpenUpdateDialog}
          setIsOpenUpdateDialog={setIsOpenUpdateDialog}
          data={item}
        />
      )}
    </>
  );
}

export default IngredientTypeMenuActions;
