"use client";
import Link from "next/link";
import { type ReactNode, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

function AdminPagination({ totalPage }: { totalPage: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageURL = (pageNumber: number | string): string => {
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
                currentPage === index + 1 ? "bg-black text-white" : "text-black"
              }`}
            >
              {index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    // <Pagination>
    //   <PaginationContent>
    //     <PaginationItem>
    //       <PaginationPrevious href="#" />
    //     </PaginationItem>
    //     {Array.from({ length: totalPage }, (_, index) => (
    //       <PaginationItem key={index + 1}>
    //         <PaginationLink
    //           href={createPageURL(index + 1)}
    //           isActive={currentPage === index + 1}
    //         >
    //           {index + 1}
    //         </PaginationLink>
    //       </PaginationItem>
    //     ))}
    //     {/* <PaginationItem>
    //       <PaginationLink href="#">1</PaginationLink>
    //     </PaginationItem> */}
    //     <PaginationItem>
    //       <PaginationEllipsis />
    //     </PaginationItem>
    //     <PaginationItem>
    //       <PaginationNext href="#" />
    //     </PaginationItem>
    //   </PaginationContent>
    // </Pagination>
  );
}

export default AdminPagination;
