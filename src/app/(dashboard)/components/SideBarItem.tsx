"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SideBarItemProps = {
  path: string;
  icon: React.ReactNode;
  name: string;
};
function SideBarItem({ icon, name, path }: SideBarItemProps) {
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
          pathName === path.split("?")[0] ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        {icon}
        {name}
      </Link>
    </li>
  );
}

export default SideBarItem;
