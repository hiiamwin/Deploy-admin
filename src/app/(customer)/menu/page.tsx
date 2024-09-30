import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { CustomerPagination, FoodList } from "@/app/(customer)/components";

function MenuPage({
  searchParams,
}: {
  searchParams: { category: string; page: string };
}) {
  const category = searchParams.category;

  return (
    <div>
      <div className="overflow-x-auto">
        <ul className="flex my-4 lg:gap-8 justify-center items-center lg:my-8 min-w-max ">
          <li>
            <Button
              asChild
              className={`bg-transparent text-black hover:bg-transparent text-lg ${
                category === "khaiVi" &&
                "border-solid border-2 border-[#CA9C5E]"
              }`}
            >
              <Link href={"/menu?category=khaiVi&page=1"}>Khai Vị</Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              className={`bg-transparent text-black hover:bg-transparent text-lg ${
                category === "monChinh" &&
                "border-solid border-2 border-[#CA9C5E]"
              }`}
            >
              <Link href={"/menu?category=monChinh&page=1"}>Món Chính</Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              className={`bg-transparent text-black hover:bg-transparent text-lg ${
                category === "trangMieng" &&
                "border-solid border-2 border-[#CA9C5E]"
              }`}
            >
              <Link href={"/menu?category=trangMieng&page=1"}>Tráng Miệng</Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              className={`bg-transparent text-black hover:bg-transparent text-lg ${
                category === "doUong" &&
                "border-solid border-2 border-[#CA9C5E]"
              }`}
            >
              <Link href={"/menu?category=doUong&page=1"}>Đồ Uống</Link>
            </Button>
          </li>
        </ul>
      </div>
      <FoodList />
      <CustomerPagination
        totalPage={5}
        category={category}
        currentPage={searchParams.page}
        path="/menu"
      />
      {/* <FoodList />
      <Pagination totalPage={5} /> */}
    </div>
  );
}

export default MenuPage;
