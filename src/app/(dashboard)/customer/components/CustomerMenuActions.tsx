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
import { ClipboardList, MoreHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    date: "2023-05-01",
    total: 150000,
    items: [
      { name: "Phở bò", quantity: 1, price: 50000 },
      { name: "Nước chanh", quantity: 2, price: 25000 },
    ],
  },
  {
    id: 2,
    date: "2023-05-15",
    total: 200000,
    items: [
      { name: "Bún chả", quantity: 1, price: 60000 },
      { name: "Coca Cola", quantity: 2, price: 20000 },
    ],
  },
];

function CustomerMenuActions() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
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
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSheetOpen(true)}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                <span>Lịch sử đặt đơn</span>
              </Button>
            </DropdownMenuItem>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] bg-white">
            <SheetHeader>
              <SheetTitle>Lịch sử đặt đơn - </SheetTitle>
              <SheetDescription>
                {/* Tên khách hàng: {item.name} - Số điện thoại: {item.phone} */}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                {mockOrders.map((order) => (
                  <AccordionItem value={`order-${order.id}`} key={order.id}>
                    <AccordionTrigger className="hover:no-underline">
                      Đơn hàng #{order.id} - {order.date}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p className="font-semibold">
                          Tổng tiền: {order.total.toLocaleString()} VND
                        </p>
                        <ul className="space-y-1">
                          {order.items.map((item, index) => (
                            <li key={index} className="flex justify-between">
                              <span>
                                {item.name} x{item.quantity}
                              </span>
                              <span>
                                {(item.price * item.quantity).toLocaleString()}{" "}
                                VND
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomerMenuActions;
