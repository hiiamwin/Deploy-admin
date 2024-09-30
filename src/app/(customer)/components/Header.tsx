"use client";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import Cart from "./Cart";

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const controlHeader = () => {
    if (window.scrollY > lastScrollY) {
      // Khi người dùng cuộn xuống
      setShowHeader(false);
    } else {
      // Khi người dùng cuộn lên
      setShowHeader(true);
    }
    setLastScrollY(window.scrollY);
    setIsTop(window.scrollY === 0);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);
  return (
    <header
      className={`z-50 px-10 pt-2 fixed top-0 left-0 right-0 transition-transform duration-200 ease-in-out text-white ${
        showHeader ? "transform translate-y-0" : "transform -translate-y-full"
      } ${isTop ? "bg-transparent" : "bg-black bg-opacity-50"}`}
    >
      <div className="flex items-center justify-between border-b-2 pb-2">
        <div className="w-full text-center lg:text-left lg:w-auto">
          Giờ mở cửa: 7h00 - 23h00 (mỗi ngày)
        </div>
        <div className="hidden lg:block">
          {/* <Dialog>
        <DialogTrigger>Đăng nhập / Đăng ký</DialogTrigger>
        <DialogContent>
          <DialogHeader className="hidden">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Đăng nhập</TabsTrigger>
              <TabsTrigger value="register">Đăng ký</TabsTrigger>
              <TabsTrigger value="forgotPassword">
                Quên mật khẩu
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <SignIn />
            </TabsContent>
            <TabsContent value="register">
              <SignUp />
            </TabsContent>
            <TabsContent value="forgotPassword">
              <ForgotPassword />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog> */}
          <ul className="flex items-center justify-center gap-4">
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={"/profile"}>
                      <User />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Thông tin cá nhân</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <Cart />
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <LogOut />
                  </TooltipTrigger>
                  <TooltipContent>Đăng xuất</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </div>
      </div>

      <DesktopNavbar />
      <MobileNavbar />
    </header>
  );
}
export default Header;
