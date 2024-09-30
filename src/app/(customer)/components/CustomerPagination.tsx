import Link from "next/link";
import React from "react";

function CustomerPagination({
  totalPage = 5,
  category,
  currentPage,
  path,
}: {
  totalPage: number;
  currentPage: string;
  category: string;
  path: string;
}) {
  return (
    <div>
      <ul className="flex my-8 items-center justify-center">
        {Array.from({ length: totalPage }, (_, index) => (
          <li key={index + 1}>
            <Link
              scroll={false}
              href={`${path}?category=${category}&page=${index + 1}`}
              className={`border border-solid border-[#e6e6e6] rounded-lg block px-4 py-2 mx-1 ${
                currentPage === (index + 1).toString()
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

export default CustomerPagination;
