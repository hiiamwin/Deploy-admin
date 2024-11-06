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
import { MoreHorizontal, PowerOff } from "lucide-react";
import { Table } from "@/types";
import InactiveTableDialog from "./InactiveTableDialog";
import ActiveTableDialog from "./ActiveTableDialog";

function TableMenuActions({ item }: { item: Table }) {
  const [isOpenInactivateDialog, setIsOpenInactivateDialog] = useState(false);
  const [isOpenActivateDialog, setIsOpenActivateDialog] = useState(false);
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
            {item.tableStatus === "Available" ? (
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => setIsOpenInactivateDialog(true)}
              >
                <PowerOff className="mr-2 h-4 w-4" />
                <span>Dừng hoạt động</span>
              </Button>
            ) : item.tableStatus === "Disable" ? (
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => setIsOpenActivateDialog(true)}
              >
                <PowerOff className="mr-2 h-4 w-4" />
                <span>Hoạt động trở lại</span>
              </Button>
            ) : null}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpenInactivateDialog && (
        <InactiveTableDialog
          id={item.id}
          isOpenInactivateDialog={isOpenInactivateDialog}
          setIsOpenInactivateDialog={setIsOpenInactivateDialog}
        />
      )}

      {isOpenActivateDialog && (
        <ActiveTableDialog
          id={item.id}
          isOpenActivateDialog={isOpenActivateDialog}
          setIsOpenActivateDialog={setIsOpenActivateDialog}
        />
      )}
    </>
  );
}

export default TableMenuActions;
