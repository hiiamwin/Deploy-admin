"use server";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";
import { decrypt } from "@/helper";

async function AdminHeader() {
  const cookie = cookies().get("session")?.value;

  if (!cookie) return null;
  const session = await decrypt(cookie);
  const role = session.role;
  const fullName = session.fullName;
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* <h1 className="text-2xl font-semibold">Dashboard</h1> */}
        <div></div>
        <div className="flex items-center">
          {/* <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button> */}
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
                Thông tin cá nhân
              </DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
