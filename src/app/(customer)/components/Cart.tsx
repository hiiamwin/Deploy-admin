import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBasket } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Cart() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return isDesktop ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Sheet>
            <SheetTrigger asChild>
              <ShoppingBasket />
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle className="text-center font-bold">
                  Giỏ hàng
                </SheetTitle>
                <SheetDescription className="text-center text-gray-500">
                  Chưa có sản phẩm nào
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-screen p-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-4">
                    <div>
                      <img
                        src="//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      {/* <Image
                        src={
                          "//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
                        }
                        alt="com-tam-chay"
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      /> */}
                    </div>
                    <div className="flex flex-col justify-center">
                      <p>Cơm tấm chay</p>
                      <p>50.000đ</p>
                      <Select defaultValue="1">
                        <SelectTrigger className="h-8 focus:outline-none focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 99 }).map((_, index) => (
                            <SelectItem value={`${index + 1}`} key={index + 1}>
                              {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline">Xóa</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-4">
                    <div>
                      {/* <Image
                        src={
                          "//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
                        }
                        alt="com-tam-chay"
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      /> */}
                      <img
                        src="//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p>Cơm tấm chay</p>
                      <p>50.000đ</p>
                      <Select defaultValue="1">
                        <SelectTrigger className="h-8 focus:outline-none focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 99 }).map((_, index) => (
                            <SelectItem value={`${index + 1}`} key={index + 1}>
                              {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline">Xóa</Button>
                  </div>
                </div>

                <div>
                  <p className="text-right">Tổng cộng: 150.000đ</p>
                </div>
              </ScrollArea>
              <SheetFooter>
                <Button className="bg-[#CA9C5E] hover:bg-[#bd9158]">
                  Đặt món
                </Button>
                <SheetClose className="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                  Đóng
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-lg font-semibold">Giỏ hàng</p>
          <p className="text-sm text-gray-500">Chưa có sản phẩm nào</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Sheet>
      <SheetTrigger>
        <p className="block py-4 text-gray-700">Giỏ hàng</p>
      </SheetTrigger>
      <SheetContent className="bg-white p-0">
        <SheetHeader>
          <SheetTitle>Giỏ hàng</SheetTitle>
          <SheetDescription className="text-center text-gray-500">
            Chưa có sản phẩm nào
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-screen p-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-4">
              <div>
                <img
                  src="//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p>Cơm tấm chay</p>
                <p>50.000đ</p>
                <Select defaultValue="1">
                  <SelectTrigger className="h-8 focus:outline-none focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 99 }).map((_, index) => (
                      <SelectItem value={`${index + 1}`} key={index + 1}>
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Button variant="outline">Xóa</Button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-4">
              <div>
                <img
                  src="//product.hstatic.net/200000567755/product/com_tam_na_bi_cham___nam_bi_cha__0d7619a4cb094613933bdb2ff214973f_1024x1024.png"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p>Cơm tấm chay</p>
                <p>50.000đ</p>
                <Select defaultValue="1">
                  <SelectTrigger className="h-8 focus:outline-none focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 99 }).map((_, index) => (
                      <SelectItem value={`${index + 1}`} key={index + 1}>
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Button variant="outline">Xóa</Button>
            </div>
          </div>

          <div>
            <p className="text-right">Tổng cộng: 150.000đ</p>
          </div>
        </ScrollArea>

        <SheetFooter>
          <Button className="bg-[#CA9C5E] hover:bg-[#bd9158]">Đặt món</Button>
          <SheetClose asChild>
            <Button variant="outline">Đóng</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
