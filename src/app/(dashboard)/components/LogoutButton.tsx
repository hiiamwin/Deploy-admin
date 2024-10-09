"use client";
import { logoutAction } from "@/actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";

function LogoutButton() {
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={() => logoutAction()}>
      Đăng xuất
    </DropdownMenuItem>
  );
}

export default LogoutButton;
