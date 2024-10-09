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

function AdminSideBar() {
  const sidebarItems = [
    {
      path: "/dashboard",
      icon: <LayoutDashboardIcon className="w-5 h-5" />,
      name: "Trang chủ",
    },
    {
      path: "/restaurant?page=1",
      icon: <Home className="w-5 h-5" />,
      name: "Chi nhánh",
    },
    {
      path: "/customer?page=1",
      icon: <UsersIcon className="w-5 h-5" />,
      name: "Khách hàng",
    },
    {
      path: "/adminDish?page=1",
      icon: <UtensilsIcon className="w-5 h-5" />,
      name: "Món ăn (admin)",
    },
    {
      path: "/managerDish?page=1",
      icon: <UtensilsIcon className="w-5 h-5" />,
      name: "Món ăn (manager)",
    },
    {
      path: "/dishCategory?page=1",
      icon: <UtensilsIcon className="w-5 h-5" />,
      name: "Phân loại món ăn",
    },
    {
      path: "/combo?page=1",
      icon: <UtensilsIcon className="w-5 h-5" />,
      name: "Combo món ăn",
    },
    {
      path: "/ingredientGeneral?page=1",
      icon: <LeafIcon className="w-5 h-5" />,
      name: "Nguyên liệu (admin)",
    },
    {
      path: "/managerIngredient?page=1",
      icon: <LeafIcon className="w-5 h-5" />,
      name: "Nguyên liệu (manager)",
    },
    {
      path: "/ingredientType?page=1",
      icon: <LeafIcon className="w-5 h-5" />,
      name: "Phân loại nguyên liệu",
    },
    {
      path: "/ingredientUnit?page=1",
      icon: <LeafIcon className="w-5 h-5" />,
      name: "Đơn vị nguyên liệu",
    },
    {
      path: "/staff?page=1",
      icon: <UserIcon className="w-5 h-5" />,
      name: "Nhân viên",
    },
    {
      path: "/staffSchedule",
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
            <SideBarItem
              icon={item.icon}
              name={item.name}
              path={item.path}
              key={item.name}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default AdminSideBar;
