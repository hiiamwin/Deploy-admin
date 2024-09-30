import React from "react";
import about1 from "@/assets/about1.jpg";
import about2 from "@/assets/about2.jpg";
import Image from "next/image";

function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl font-bold mb-6">Câu Chuyện Của Chúng Tôi</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <p className="text-lg mb-4">
              Tại [Tên Nhà Hàng], chúng tôi tin tưởng vào việc nuôi dưỡng cơ thể
              và tâm hồn bằng các món ăn thuần chay tươi ngon, đầy hương vị. Cam
              kết của chúng tôi đối với sự bền vững và nguyên liệu lành mạnh là
              cốt lõi của mọi thứ chúng tôi làm.
            </p>
            <p className="text-lg">
              [Tên Nhà Hàng] được thành lập vào năm [Năm] bởi [Tên Người Sáng
              Lập], người đã lấy cảm hứng từ niềm đam mê sống lành mạnh và mong
              muốn tạo ra tác động tích cực đến cộng đồng. Kể từ đó, chúng tôi
              đã dành tâm huyết để cung cấp các bữa ăn ngon và bổ dưỡng mà ai
              cũng có thể thưởng thức.
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
            <Image
              src={about2}
              alt="Hình ảnh của nhà hàng"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6">
            <Image
              src={about1}
              alt="Món ăn thuần chay"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Triết Lý Của Chúng Tôi</h2>
            <p className="text-lg mb-4">
              Giá trị cốt lõi của chúng tôi tập trung vào sự bền vững, sức khỏe,
              và cộng đồng. Chúng tôi tin rằng việc ăn uống thuần chay có thể
              thay đổi cuộc sống và bảo vệ hành tinh.
            </p>
            <p className="text-lg mb-4">
              Chúng tôi hợp tác với các nông dân địa phương để mang đến cho bạn
              những sản phẩm tươi ngon theo mùa, đảm bảo rằng mỗi món ăn đều
              lành mạnh và ngon miệng. Thực đơn của chúng tôi được chăm chút tỉ
              mỉ, chỉ sử dụng nguyên liệu hữu cơ và có nguồn gốc đạo đức.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {/* <section className="bg-green-500 text-white py-16 text-center">
    <h2 className="text-3xl font-bold mb-6">
      Tham Gia Cùng Chúng Tôi Tại [Tên Nhà Hàng]
    </h2>
    <p className="text-lg mb-4">
      Theo dõi chúng tôi trên mạng xã hội, đăng ký nhận bản tin, hoặc ghé
      thăm chúng tôi trực tiếp. Chúng tôi rất mong được phục vụ bạn!
    </p>
    <button className="bg-white text-green-500 px-6 py-3 rounded-full font-semibold">
      Đặt Chỗ Ngay
    </button>
  </section> */}

      {/* Footer Section */}
    </div>
  );
}

export default AboutPage;
