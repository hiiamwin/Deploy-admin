"use server";
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
import SideBarItem from "./SideBarItem";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/helper";

async function AdminSideBar() {
  const cookie = cookies().get("session")?.value;

  if (!cookie) redirect("/login");
  const session = await decrypt(cookie);
  const role = session.role;

  const sidebarItems = [
    {
      path: "/dashboard",
      icon: <LayoutDashboardIcon className="w-5 h-5" />,
      name: "Trang chủ",
      role: "All",
    },
    {
      path: "/restaurant?page=1",
      icon: <Home className="w-5 h-5" />,
      name: "Chi nhánh",
      role: "Administrator",
    },
    {
      path: "/table?page=1",
      icon: <UsersIcon className="w-5 h-5" />,
      name: "Bàn ăn",
      role: "Manager",
    },
    {
      path: "/customer?page=1",
      icon: <UsersIcon className="w-5 h-5" />,
      name: "Khách hàng",
      role: "All",
    },
    {
      path: "/adminDish?page=1",
      icon: <UtensilsIcon className="w-5 h-5" />,
      name: "Món ăn (admin)",
      role: "Administrator",
    },
    {
      path: "/managerDish?page=1",
      icon: <UtensilsIcon className="w-5 h-5" />,
      name: "Món ăn (manager)",
      role: "Manager",
    },
    {
      path: "/refundDish?page=1",
      icon: <UtensilsIcon className="w-5 h-5" />,
      name: "Món ăn có thể hoàn trả (manager)",
      role: "Manager",
    },
    {
      path: "/dishCategory?page=1",
      icon: <UtensilsIcon className="w-5 h-5" />,
      name: "Phân loại món ăn",
      role: "Administrator",
    },
    {
      path: "/combo?page=1",
      icon: <UtensilsIcon className="w-5 h-5" />,
      name: "Combo món ăn",
      role: "Manager",
    },
    {
      path: "/ingredientGeneral?page=1",
      icon: <LeafIcon className="w-5 h-5" />,
      name: "Nguyên liệu (admin)",
      role: "Administrator",
    },
    {
      path: "/ingredient?page=1",
      icon: <LeafIcon className="w-5 h-5" />,
      name: "Nguyên liệu (manager)",
      role: "Manager",
    },
    {
      path: "/ingredientType?page=1",
      icon: <LeafIcon className="w-5 h-5" />,
      name: "Phân loại nguyên liệu",
      role: "Administrator",
    },
    {
      path: "/ingredientUnit?page=1",
      icon: <LeafIcon className="w-5 h-5" />,
      name: "Đơn vị nguyên liệu",
      role: "Manager",
    },
    {
      path: "/staff?page=1",
      icon: <UserIcon className="w-5 h-5" />,
      name: "Nhân viên",
      role: "All",
    },
    {
      path: "/manager?page=1",
      icon: <UserIcon className="w-5 h-5" />,
      name: "Quản lý",
      role: "Administrator",
    },
    {
      path: "/staffSchedule",
      icon: <CalendarIcon className="w-5 h-5" />,
      name: "Lịch làm việc",
      role: "Manager",
    },
    {
      path: "/order?page=1",
      icon: <Soup className="w-5 h-5" />,
      name: "Đơn hàng",
      role: "All",
    },
  ];

  return (
    <div>
      <div className="p-4 text-2xl font-bold">
        {role === "Administrator" ? "Quản lý hệ thống" : "Quản lý nhà hàng"}
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            if (item.role === "All" || item.role === role) {
              return (
                <SideBarItem
                  icon={item.icon}
                  name={item.name}
                  path={item.path}
                  key={item.name}
                />
              );
            }
          })}
        </ul>
      </nav>
    </div>
  );
}

export default AdminSideBar;
