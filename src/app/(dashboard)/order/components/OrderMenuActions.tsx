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
import { ClipboardList, HandCoins, MoreHorizontal } from "lucide-react";
import { Order } from "@/types";
import OrderDetailSheet from "./OrderDetailSheet";
import ConfirmMoneyDialog from "./ConfirmMoneyDialog";

function OrderMenuActions({ item }: { item: Order }) {
  const [isOpenDetailSheet, setIsOpenDetailSheet] = useState(false);
  const [isOpenConfimDialog, setIsOpenConfimDialog] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
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
              <ClipboardList className="mr-2 h-4 w-4" />
              <span>Chi tiết đơn hàng</span>
            </Button>
          </DropdownMenuItem>

          {!item.isAdminConfirm &&
            item.orderStatus !== "Canceled" &&
            item.orderStatus === "Finish" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => setIsOpenConfimDialog(true)}
                  >
                    <HandCoins className="mr-2 h-4 w-4" />
                    <span>Đã nhận được tiền</span>
                  </Button>
                </DropdownMenuItem>
              </>
            )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpenDetailSheet && (
        <OrderDetailSheet
          item={item}
          isOpenDetailSheet={isOpenDetailSheet}
          setIsOpenDetailSheet={setIsOpenDetailSheet}
        />
      )}

      {isOpenConfimDialog && (
        <ConfirmMoneyDialog
          id={item.id}
          isOpenConfimDialog={isOpenConfimDialog}
          setIsOpenConfimDialog={setIsOpenConfimDialog}
        />
      )}
    </>
  );
}

export default OrderMenuActions;
