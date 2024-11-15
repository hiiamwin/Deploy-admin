import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function ScheduleSkeleton() {
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100">
                <Skeleton className="h-6 w-24" />
              </th>
              {Array.from({ length: 7 }).map((_, index) => (
                <th key={index} className="border p-2 bg-gray-100 text-center">
                  <Skeleton className="h-6 w-16 mx-auto" />
                  <Skeleton className="h-4 w-12 mx-auto mt-1" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, shiftIndex) => (
              <tr key={shiftIndex}>
                <td className="border p-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-32 mt-1" />
                </td>
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <td key={dayIndex} className="border p-2">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-8 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleSkeleton;
