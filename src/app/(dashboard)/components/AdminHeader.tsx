"use server";

import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/helper";
import HeaderDropdownMenu from "./HeaderDropdownMenu";

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
          <HeaderDropdownMenu
            fullName={fullName as string}
            role={role as string}
          />
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
