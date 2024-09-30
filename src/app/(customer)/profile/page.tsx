"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CreditCard,
  EyeIcon,
  EyeOffIcon,
  Mail,
  Phone,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

function ProfilePage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container mx-auto px-4 py-6 lg:py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Thông tin tài khoản
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center space-x-4">
              <CreditCard className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Điểm tích lũy
                </p>
                <p className="text-3xl font-bold text-primary">1000</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Họ và Tên
                </p>
                <p className="font-medium">Antony 2008</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="font-medium">email@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Tên Đăng Nhập
                </p>
                <p className="font-medium">Antony 2008</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Số điện thoại
                </p>
                <p className="font-medium">0374125874</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Mật khẩu
                </p>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">
                    {passwordVisible ? "goatAtony" : "••••••••"}
                  </p>
                  <button
                    onClick={togglePasswordVisibility}
                    className="text-muted-foreground"
                  >
                    {passwordVisible ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-[#CA9C5E] hover:bg-[#bd9158]">
                Cập nhật thông tin
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cập nhật thông tin tài khoản</DialogTitle>
                <DialogDescription>
                  Thực hiện thay đổi cho hồ sơ của bạn ở đây. Nhấp vào lưu khi
                  bạn xong.
                </DialogDescription>
              </DialogHeader>
              <form className="flex flex-col gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-realName" className="text-right">
                    Họ và Tên
                  </Label>
                  <Input
                    id="edit-realName"
                    name="realName"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-username" className="text-right">
                    Tên đăng nhập
                  </Label>
                  <Input
                    id="edit-username"
                    name="username"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-password" className="text-right">
                    Mật khẩu
                  </Label>
                  <Input
                    type="password"
                    id="edit-password"
                    name="password"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rePassword" className="text-right">
                    Nhập lại Mật khẩu
                  </Label>
                  <Input
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-phone" className="text-right">
                    Số điện thoại
                  </Label>
                  <Input id="edit-phone" name="phone" className="col-span-3" />
                </div>
                <Button className="w-full bg-[#CA9C5E] hover:bg-[#bd9158]">
                  Lưu thay đổi
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProfilePage;
