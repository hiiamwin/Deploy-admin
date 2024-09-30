"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

function AdminPagination({ totalPage }: { totalPage: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <div>
      <ul className="flex my-8 items-center justify-center">
        {Array.from({ length: totalPage }, (_, index) => (
          <li key={index + 1}>
            <Link
              scroll={false}
              href={createPageURL(index + 1)}
              className={`border border-solid border-[#e6e6e6] rounded-lg block px-4 py-2 mx-1 ${
                currentPage === index + 1
                  ? "bg-[#CA9C5E] text-white"
                  : "text-black"
              }`}
            >
              {index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPagination;
