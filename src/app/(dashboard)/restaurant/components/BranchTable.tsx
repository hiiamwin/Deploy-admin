import { AdminPagination, ReuseTable } from "@/app/(dashboard)/components";
import { getRestaurants } from "@/apis";
import RestaurantMenuActions from "./RestaurantMenuActions";
import { Column, Restaurant } from "@/types";
import { format } from "date-fns";

async function BranchTable({
  page,
  address,
  restaurantStatus,
}: {
  page: string;
  address: string;
  restaurantStatus: string;
}) {
  const data = await getRestaurants(page, address, restaurantStatus);

  const columns: Column<Restaurant>[] = [
    {
      header: "Tên Chi Nhánh",
      accessorKey: "restaurantName",
    },
    {
      header: "Địa chỉ",
      accessorKey: "address",
    },
    {
      header: "Số Điện Thoại",
      accessorKey: "restaurantPhone",
    },
    {
      header: "Ngày tạo",
      accessorKey: "createdDate",
    },
    {
      header: "Trạng Thái",
      accessorKey: "restaurantStatus",
    },
  ];
  return (
    <>
      {data.results.length > 0 ? (
        <ReuseTable<Restaurant>
          columns={columns}
          data={data.results.map((item) => {
            return {
              ...item,
              createdDate: format(new Date(item.createdDate), "dd/MM/yyyy"),
            };
          })}
          total={data.totalNumberOfRecords}
          tableName="Nhà hàng"
          tableCaption="Danh sách nhà hàng"
          renderActions={(item) => <RestaurantMenuActions item={item} />}
        />
      ) : (
        <h2 className="text-center mt-10">Không tìm thấy nhà hàng nào</h2>
      )}

      <AdminPagination totalPage={Math.ceil(data.totalNumberOfRecords / 5)} />
    </>
  );
}

export default BranchTable;
