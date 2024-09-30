"use client";
import React from "react";
import {
  Home,
  LayoutDashboardIcon,
  UtensilsIcon,
  UsersIcon,
  LeafIcon,
  UserIcon,
  CalendarIcon,
  Soup,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminSideBar() {
  const pathName = usePathname();
  const sidebarItems = [
    {
      path: "/dashboard",
      icon: <LayoutDashboardIcon className="w-5 h-5" />,
      name: "Trang chủ",
    },
    {
      path: "/branch?page=1",
      icon: <Home className="w-5 h-5" />,
      name: "Chi nhánh",
    },
    {
      path: "/user?page=1",
      icon: <UsersIcon className="w-5 h-5" />,
      name: "Người dùng",
    },
    {
      path: "/product?page=1",
      icon: <UtensilsIcon className="w-5 h-5" />,
      name: "Món ăn",
    },
    {
      path: "/ingredient?page=1",
      icon: <LeafIcon className="w-5 h-5" />,
      name: "Nguyên liệu",
    },
    {
      path: "/staff?page=1",
      icon: <UserIcon className="w-5 h-5" />,
      name: "Nhân viên",
    },
    {
      path: "/staffSchedule?page=1",
      icon: <CalendarIcon className="w-5 h-5" />,
      name: "Lịch làm việc",
    },
    {
      path: "/order?page=1",
      icon: <Soup className="w-5 h-5" />,
      name: "Đơn hàng",
    },
  ];

  return (
    <div>
      <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                  pathName === item.path.split("?")[0]
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default AdminSideBar;
