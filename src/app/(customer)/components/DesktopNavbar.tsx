import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";

function DesktopNavbar() {
  return (
    <div>
      <ul className=" hidden lg:flex lg:items-center lg:justify-evenly lg:p-4">
        <li>
          <Link href={"/"}>Trang chủ</Link>
        </li>
        <li>
          <Link href={"/about"}>Giới Thiệu</Link>
        </li>
        <li>
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={120}
            placeholder="blur"
          />
        </li>
        <li>
          <Link href={"/menu?category=khaiVi"}>Thực Đơn</Link>
        </li>
        <li>
          <Link href={"/feedback"}>Đánh giá</Link>
        </li>
      </ul>
    </div>
  );
}

export default DesktopNavbar;
