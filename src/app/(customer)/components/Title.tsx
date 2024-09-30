"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import mainBg from "@/assets/mainbg.jpg";

function Title() {
  const pathname = usePathname();

  if (pathname === "/") {
    return;
  }

  return (
    <div className="relative h-[40vh] bg-main-bg bg-no-repeat bg-black bg-opacity-50 bg-blend-overlay text-white flex justify-center items-end">
      <h1 className="mb-12 text-4xl font-bold">
        {pathname === "/menu"
          ? "Thực Đơn"
          : pathname === "/feedback"
          ? "Đánh Giá"
          : pathname === "/about"
          ? "Giới Thiệu"
          : pathname === "/profile"
          ? "Thông Tin Cá Nhân"
          : "Chi Tiết Món Ăn"}
      </h1>
      <Image
        alt="Main background"
        src={mainBg}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="object-cover -z-10"
      />
    </div>
  );
}

export default Title;
