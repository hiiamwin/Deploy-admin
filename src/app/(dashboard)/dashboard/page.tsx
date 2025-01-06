import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActivityIcon,
  DollarSignIcon,
  MinusIcon,
  ShoppingCart,
  TrendingDownIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import type { Metadata } from "next";
import {
  CustomerChart,
  OrderChart,
  OrderRanking,
  RevenueChart,
  RevenueRanking,
  TopCombo,
  TopDish,
  TopRefundDish,
} from "./components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/helper";
import { getCurrentStatictis } from "@/apis";

export const metadata: Metadata = {
  title: "Trang chủ quản trị",
  description: "Trang chủ quản trị",
};

async function DashboardHomePage() {
  const cookie = cookies().get("session")?.value;

  if (!cookie) redirect("/login");
  const session = await decrypt(cookie);

  const data = await getCurrentStatictis(session.accessToken as string);

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Tổng doanh thu trong tháng
              </CardTitle>
              <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.revenueStatistic.totalRevenue.toLocaleString("vi-VN")} đ
              </div>
              <div
                className={`flex items-center mt-1 text-sm ${
                  data.revenueStatistic.percentageAfterLastMonth > 0
                    ? "text-green-600"
                    : data.revenueStatistic.percentageAfterLastMonth < 0
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {data.revenueStatistic.percentageAfterLastMonth > 0 ? (
                  <TrendingUpIcon className="w-4 h-4 mr-1" />
                ) : data.revenueStatistic.percentageAfterLastMonth < 0 ? (
                  <TrendingDownIcon className="w-4 h-4 mr-1" />
                ) : (
                  <MinusIcon className="w-4 h-4 mr-1" />
                )}
                <span>{data.revenueStatistic.percentageAfterLastMonth}%</span>
                <span className="ml-1 text-muted-foreground">
                  so với tháng trước
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Tổng đơn hàng trong tháng
              </CardTitle>
              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.orderStatistic.totalOrder.toLocaleString("vi-VN")} đơn
                hàng
              </div>
              <div
                className={`flex items-center mt-1 text-sm ${
                  data.orderStatistic.percentageAfterLastMonth > 0
                    ? "text-green-600"
                    : data.orderStatistic.percentageAfterLastMonth < 0
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {data.orderStatistic.percentageAfterLastMonth > 0 ? (
                  <TrendingUpIcon className="w-4 h-4 mr-1" />
                ) : data.orderStatistic.percentageAfterLastMonth < 0 ? (
                  <TrendingDownIcon className="w-4 h-4 mr-1" />
                ) : (
                  <MinusIcon className="w-4 h-4 mr-1" />
                )}
                <span>{data.orderStatistic.percentageAfterLastMonth}%</span>
                <span className="ml-1 text-muted-foreground">
                  so với tháng trước
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Tổng khách hàng trong tháng
              </CardTitle>
              <UsersIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.customerStatistic.totalCustomer.toLocaleString("vi-VN")}{" "}
                khách hàng
              </div>
              <div
                className={`flex items-center mt-1 text-sm ${
                  data.customerStatistic.percentageAfterLastMonth > 0
                    ? "text-green-600"
                    : data.customerStatistic.percentageAfterLastMonth < 0
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {data.customerStatistic.percentageAfterLastMonth > 0 ? (
                  <TrendingUpIcon className="w-4 h-4 mr-1" />
                ) : data.customerStatistic.percentageAfterLastMonth < 0 ? (
                  <TrendingDownIcon className="w-4 h-4 mr-1" />
                ) : (
                  <MinusIcon className="w-4 h-4 mr-1" />
                )}
                <span>{data.customerStatistic.percentageAfterLastMonth}%</span>
                <span className="ml-1 text-muted-foreground">
                  so với tháng trước
                </span>
              </div>
            </CardContent>
          </Card>
          {session.role === "Administrator" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Tổng số chi nhánh
                </CardTitle>
                <ActivityIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.totalBranches} chi nhánh
                </div>
              </CardContent>
            </Card>
          )}
          {session.role === "Manager" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Tổng số nhân viên
                </CardTitle>
                <UsersIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.totalEmployees} nhân viên
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      {/*  */}
      <RevenueChart role={session.role as string} />
      <div className="mt-2 flex gap-2">
        <OrderChart role={session.role as string} />
        <CustomerChart role={session.role as string} />
      </div>
      {/*  */}
      {session.role === "Administrator" && (
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <RevenueRanking />
          <OrderRanking />
        </div>
      )}

      {session.role === "Manager" && (
        <div className="grid gap-2 md:grid-cols-3 mt-4">
          <TopDish restaurantId={session.restaurantId as string} />
          <TopRefundDish restaurantId={session.restaurantId as string} />
          <TopCombo restaurantId={session.restaurantId as string} />
        </div>
      )}
    </div>
  );
}

export default DashboardHomePage;
