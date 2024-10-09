import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
  description: "Lấy lại mật khẩu của bạn",
};
function ForgotPasswordPage() {
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
          <CardDescription>Đặt lại mật khẩu của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-2">
              <Label htmlFor="reset-email">Mã nhân viên</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Nhập mã nhân viên của bạn"
                required
              />
            </div>
            <Button className="w-full mt-4" type="submit">
              Đặt lại mật khẩu
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="w-full" asChild>
            <Link href="/login">Quay lại đăng nhập?</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ForgotPasswordPage;
