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
import { Employee } from "@/types";
import InactiveManagerDialog from "./InactiveManagerDialog";
import ActiveManagerDialog from "./ActiveManagerDialog";

function ManagerMenuActions({ item }: { item: Employee }) {
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
        <InactiveManagerDialog
          id={item.id}
          isOpenInactivateDialog={isOpenInactivateDialog}
          setIsOpenInactivateDialog={setIsOpenInactivateDialog}
        />
      )}

      {isOpenActivateDialog && (
        <ActiveManagerDialog
          id={item.id}
          isOpenActivateDialog={isOpenActivateDialog}
          setIsOpenActivateDialog={setIsOpenActivateDialog}
        />
      )}
    </>
  );
}

export default ManagerMenuActions;
