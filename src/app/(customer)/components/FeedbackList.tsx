import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function FeedbackList() {
  return (
    <div className="mt-4 flex flex-col mx-4 lg:mx-40">
      <div className="mb-4 p-4 border rounded-lg w-full">
        <div className="flex items-center gap-4 mb-2">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Alice Johnson</h3>
            <p className="text-sm text-muted-foreground">2023-06-15</p>
          </div>
          <div className="ml-auto flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < 5 ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p>
          Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon
          nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở
          Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở
          aaaaaaaaaaaaa Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng
          dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon
        </p>
      </div>
      <div className="mb-4 p-4 border rounded-lg w-full">
        <div className="flex items-center gap-4 mb-2">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Alice Johnson</h3>
            <p className="text-sm text-muted-foreground">2023-06-15</p>
          </div>
          <div className="ml-auto flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < 5 ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p>
          Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon
          nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở
          Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở
          aaaaaaaaaaaaa Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng
          dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon
        </p>
      </div>
      <div className="mb-4 p-4 border rounded-lg w-full">
        <div className="flex items-center gap-4 mb-2">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Alice Johnson</h3>
            <p className="text-sm text-muted-foreground">2023-06-15</p>
          </div>
          <div className="ml-auto flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < 5 ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p>
          Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon
          nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở
          Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở
          aaaaaaaaaaaaa Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng
          dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon
        </p>
      </div>
      <div className="mb-4 p-4 border rounded-lg w-full">
        <div className="flex items-center gap-4 mb-2">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Alice Johnson</h3>
            <p className="text-sm text-muted-foreground">2023-06-15</p>
          </div>
          <div className="ml-auto flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < 5 ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p>Đồ ăn ngon</p>
      </div>
      <div className="mb-4 p-4 border rounded-lg w-full">
        <div className="flex items-center gap-4 mb-2">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Alice Johnson</h3>
            <p className="text-sm text-muted-foreground">2023-06-15</p>
          </div>
          <div className="ml-auto flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < 5 ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p>
          Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon
          nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở
          Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở
          aaaaaaaaaaaaa Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng
          dở Đồ ăn ngon nhưng dở Đồ ăn ngon nhưng dở Đồ ăn ngon
        </p>
      </div>
    </div>
  );
}

export default FeedbackList;
