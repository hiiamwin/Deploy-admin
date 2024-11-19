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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { logoutAction } from "@/actions";
import Link from "next/link";

function HeaderDropdownMenu({
  fullName,
  role,
}: {
  fullName: string;
  role: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isPending } = useAction(logoutAction);
  const handleOpen = (value: boolean) => {
    if (isPending) return;
    setIsOpen(value);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="ml-2">
            {`${fullName} (${role})`}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Link href={"/dashboardProfile"}>Thông tin cá nhân</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Link href={"/changePassword"}>Thay đổi mật khẩu</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleOpen(true)}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Bạn có chắc muốn đăng xuất?</DialogTitle>
              <DialogDescription>
                Bạn sẽ bị đăng xuất khỏi hệ thống.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-between items-center">
              <Button disabled={isPending} onClick={() => handleOpen(false)}>
                Hủy
              </Button>
              <Button disabled={isPending} onClick={() => execute()}>
                Xác nhận
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default HeaderDropdownMenu;
