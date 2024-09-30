import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

function FoodList() {
  return (
    <div className="grid grid-cols-2 gap-8 p-4 md:grid-cols-3 lg:grid-cols-4 lg:px-40">
      <div>
        <div>
          <Link
            href={"/menu/1"}
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/6a0df908-a609-43ba-a1bd-8cf07c019ff0/bun-cha-gio-chay-jpg"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </Link>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <Link href={"/menu/1"} className="hover:underline">
              Bún chả giò chay
            </Link>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <a
            href="#"
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/6a0df908-a609-43ba-a1bd-8cf07c019ff0/bun-cha-gio-chay-jpg"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </a>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <a href="#" className="hover:underline">
              Bún chả giò chay
            </a>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <a
            href="#"
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/6a0df908-a609-43ba-a1bd-8cf07c019ff0/bun-cha-gio-chay-jpg"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </a>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <a href="#" className="hover:underline">
              Bún chả giò chay
            </a>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <a
            href="#"
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/6a0df908-a609-43ba-a1bd-8cf07c019ff0/bun-cha-gio-chay-jpg"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </a>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <a href="#" className="hover:underline">
              Bún chả giò chay
            </a>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <a
            href="#"
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/6a0df908-a609-43ba-a1bd-8cf07c019ff0/bun-cha-gio-chay-jpg"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </a>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <a href="#" className="hover:underline">
              Bún chả giò chay
            </a>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <a
            href="#"
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </a>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <a href="#" className="hover:underline">
              Cơm tấm chay
            </a>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <a
            href="#"
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </a>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <a href="#" className="hover:underline">
              Cơm tấm chay
            </a>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <a
            href="#"
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </a>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <a href="#" className="hover:underline">
              Cơm tấm chay
            </a>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <a
            href="#"
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </a>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <a href="#" className="hover:underline">
              Cơm tấm chay
            </a>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <a
            href="#"
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </a>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <a href="#" className="hover:underline">
              Cơm tấm chay
            </a>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <Link
            href={"/menu/1"}
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </Link>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <Link href={"/menu/1"} className="hover:underline">
              Cơm tấm chay
            </Link>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <a
            href="#"
            className="border border-solid border-[#e6e6e6] rounded-lg block"
          >
            <img
              src="//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
              alt="food"
              className="object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </a>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div>
            <a href="#" className="hover:underline">
              Cơm tấm chay
            </a>
            <p>45.000đ</p>
          </div>
          <Button
            size={"sm"}
            className="bg-transparent text-black border-[#CA9C5E] border-solid border hover:bg-[#fefaf6]"
          >
            Thêm <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FoodList;
