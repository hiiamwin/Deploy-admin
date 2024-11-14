import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActivityIcon,
  DollarSignIcon,
  ShoppingCart,
  UsersIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { CustomerChart, OrderChart, RevenueChart } from "./components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/helper";

export const metadata: Metadata = {
  title: "Trang chủ quản trị",
  description: "Trang chủ quản trị",
};

async function DashboardHomePage() {
  const cookie = cookies().get("session")?.value;

  if (!cookie) redirect("/login");
  const session = await decrypt(cookie);
  return (
    <div>
      <div className="flex flex-col gap-2 justify-center">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Tổng doanh thu
              </CardTitle>
              <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(100000000).toLocaleString("vi-VN")} đ
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Tổng đơn hàng
              </CardTitle>
              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2350</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Tổng khách hàng
              </CardTitle>
              <UsersIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,234</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Tổng số chi nhánh
              </CardTitle>
              <ActivityIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-2 ">
        <RevenueChart role={session.role as string} />
        <OrderChart role={session.role as string} />
        <CustomerChart role={session.role as string} />
      </div>
      <div className="border mt-2 grid grid-cols-2">
        <div>món ăn bán chạy</div>
        <div>combo bán chạy</div>
      </div>
    </div>
  );
}

export default DashboardHomePage;
