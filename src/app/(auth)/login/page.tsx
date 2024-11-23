import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UtensilsCrossed } from "lucide-react";
import { Metadata } from "next";
import { LoginForm } from "./components";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào tài khoản của bạn",
};
function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[600px] p-16">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <UtensilsCrossed className="w-6 h-6" />
            <CardTitle className="text-2xl font-bold">
              Nhà hàng Dashboard
            </CardTitle>
          </div>
          <CardDescription>Đăng nhập vào tài khoản của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
