import { Metadata } from "next";
import { WaiterSchedule } from "./components";

export const metadata: Metadata = {
  title: "Quản lịch làm việc",
  description: "Quản lịch làm việc",
};

function ManageWaiterSchedulePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Lịch Làm Việc Nhân Viên Nhà Hàng
      </h1>
      <WaiterSchedule />
    </div>
  );
}

export default ManageWaiterSchedulePage;
