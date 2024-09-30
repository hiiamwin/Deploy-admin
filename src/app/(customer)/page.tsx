import { Button } from "@/components/ui/button";
import Image from "next/image";
import banhmi from "@/assets/banhmi.jpg";
import customer from "@/assets/customer.jpg";
import homeBg from "@/assets/homebg.jpg";
import orangeBg from "@/assets/orange.jpeg";
import timeBg from "@/assets/timebg.jpeg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white">
      <div className="relative w-full h-screen bg-home-bg bg-cover bg-opacity-50 bg-blend-overlay bg-black flex items-center justify-center flex-col gap-2 lg:gap-4 text-center p-4">
        <h1 className="text-4xl lg:text-7xl font-bold">
          Ẩm thực chay ngon mỗi ngày
        </h1>
        <p className="font-semibold ">
          Chào mừng bạn đến với Chuỗi nhà hàng CHAY 365
        </p>
        <Image
          src={
            "https://www.cssigniter.com/demos/carbone/wp-content/uploads/sites/9/2021/01/divider.svg"
          }
          alt="divider"
          className="object-cover"
          width={84}
          height={6}
        />

        <p>
          Chi nhánh 1: Chay 365 Quận 1 – 26 Đặng Thị Nhu, Phường Nguyễn Thái
          Bình
        </p>
        <p>
          Chi nhánh 2: Chay 365 Quận 1 – 26 Đặng Thị Nhu, Phường Nguyễn Thái
          Bình
        </p>
        <p>Tel: 028 22222 365 – Hotline: 0928 339 339</p>
        <Image
          src={
            "https://www.cssigniter.com/demos/carbone/wp-content/uploads/sites/9/2021/01/divider.svg"
          }
          alt="divider"
          className="object-cover"
          width={84}
          height={6}
        />
        <ul className="flex gap-20">
          <li className="border-solid border-[#CA9C5E] border-y-2 text-lg font-normal px-8 py-5">
            <Link href="/menu?category=khaiVi">THỰC ĐƠN</Link>
          </li>
          <li className="border-solid border-[#CA9C5E] border-y-2 text-lg font-normal px-8 py-5">
            <Link href="/feedback">ĐÁNH GIÁ</Link>
          </li>
        </ul>

        <Image
          alt="Home background"
          src={homeBg}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          className="object-cover -z-10"
        />
      </div>

      <div className="grid text-black py-24 grid-cols-1 px-10 lg:grid-cols-2 lg:gap-8 lg:px-40 ">
        <div className="flex flex-col gap-2">
          <p>Đến với CHAY 365 ngay hôm nay</p>
          <h2 className="text-3xl font-semibold">
            Để Tận Hưởng Các Món Chay Ngon – Ngon Đến Vô Tận
          </h2>
          <div>
            <Image
              src={
                "https://www.cssigniter.com/demos/carbone/wp-content/uploads/sites/9/2021/01/divider.svg"
              }
              alt="divider"
              className="object-cover my-8"
              width={84}
              height={6}
            />
          </div>
          <p className="mb-4 lg:mb-0">
            Những thực khách ăn chay chú trọng nhiều đến chất lượng món ăn hơn
            là để ý giá thành. Tại CHAY 365, chúng tôi không quan tâm đến chuyện
            giá cả nguyên liệu, chỉ chuyên tâm tìm hiểu cặn kẽ nguồn gốc xuất
            xứ, thành phần có trong từng nguyên liệu, nhằm bảo đảm tất cả tuyệt
            đối an toàn và tất nhiên phải thật sự ngon và rất ngon
          </p>
        </div>
        <div>
          <Image
            src={banhmi}
            alt="Bánh mì chay"
            className="object-cover"
            placeholder="blur"
          />
        </div>
      </div>

      <div className=" relative bg-orange-bg w-full h-[92vh] bg-cover bg-no-repeat bg-opacity-50 bg-blend-overlay bg-black flex items-center justify-center flex-col gap-2 text-center">
        <h2 className="text-6xl font-bold mb-2">Thức Uống Thơm Ngon</h2>
        <p className="text-lg font-medium">Luôn Tươi Mới & Thanh Khiết</p>
        <div>
          <Image
            src={
              "https://www.cssigniter.com/demos/carbone/wp-content/uploads/sites/9/2021/01/divider.svg"
            }
            alt="divider"
            className="object-cover my-8"
            width={84}
            height={6}
          />
        </div>
        <Button variant={"outline"} className="bg-transparent" asChild>
          <a href="#"> Xem Thêm Menu</a>
        </Button>

        <Image
          alt="Orange background"
          src={orangeBg}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          className="object-cover -z-10"
        />
      </div>

      <div className="grid text-black grid-cols-1 py-24 px-10 lg:px-40 lg:grid-cols-2 lg:gap-8 ">
        <div className="mb-4 lg:mb-0">
          <Image
            src={customer}
            alt="Khách hàng"
            className="object-cover"
            placeholder="blur"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>CHAY 365 Háo Hức Chờ Đợi Để Phục Vụ Bạn Cùng</p>
          <h2 className="text-3xl font-bold">Bạn Bè & Gia Đình Bạn</h2>
          <div>
            <Image
              src={
                "https://www.cssigniter.com/demos/carbone/wp-content/uploads/sites/9/2021/01/divider.svg"
              }
              alt="divider"
              className="object-cover my-8"
              width={84}
              height={6}
            />
          </div>
          <p className="mb-4 lg:mb-0">
            Ăn chay đang trở thành xu hướng mới của lối sống hiện đại. Theo ước
            tính, thế giới đang có khoảng 900 triệu người ăn chay. Riêng Việt
            Nam, con số này vào khoảng 10 triệu. Người ta chọn ăn chay vì có lợi
            cho sức khỏe, hoặc do bắt nguồn từ lòng từ bi với động vật, hoặc
            mong muốn thực hành tu tâm để có một cuộc sống thanh tịnh và an yên.
            Dù lý do nào, trong quá trình ăn chay của mỗi người đều hướng đến
            mục đích sống tốt đẹp…
          </p>
          <Button
            variant={"outline"}
            className="bg-transparent border-solid border-black"
            asChild
          >
            <a href="#" className="inline-block w-fit">
              Xem thêm về Chay 365
            </a>
          </Button>
        </div>
      </div>

      <div className="relative bg-time-bg w-full h-[92vh] bg-cover bg-no-repeat bg-opacity-50 bg-blend-overlay bg-black flex items-center justify-center flex-col gap-2 text-center">
        <h2 className="text-6xl font-bold mb-2">Open Hours</h2>
        <p className="text-lg font-medium">7am – 11pm mỗi ngày</p>
        <div>
          <Image
            src={
              "https://www.cssigniter.com/demos/carbone/wp-content/uploads/sites/9/2021/01/divider.svg"
            }
            alt="divider"
            className="object-cover my-8"
            width={84}
            height={6}
          />
        </div>
        <Button variant={"outline"} className="bg-transparent" asChild>
          <a href="#"> Đặt Bàn Ngay</a>
        </Button>

        <Image
          alt="Time background"
          src={timeBg}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          className="object-cover -z-10"
        />
      </div>
    </div>
  );
}
