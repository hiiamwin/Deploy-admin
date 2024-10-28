import { DishGeneral } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { useAction } from "next-safe-action/hooks";

type UpdateNormalInfomationDialogProps = {
  isOpenUpdateNormalInformationDialog: boolean;
  setIsOpenUpdateNormalInformationDialog: Dispatch<SetStateAction<boolean>>;
  data: DishGeneral;
};
function UpdateNormalInfomationDialog({}: // isOpenUpdateNormalInformationDialog,
// setIsOpenUpdateNormalInformationDialog,
// data,
UpdateNormalInfomationDialogProps) {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setError,
  //   reset,
  // } = useForm();
  // const { execute, isPending } = useAction();
  // const handleOpen = (value: boolean) => {
  //   setIsOpenUpdateNormalInformationDialog(value);
  // };

  return (
    // <Dialog
    //   open={isOpenUpdateNormalInformationDialog}
    //   onOpenChange={handleOpen}
    // >
    //   <DialogContent className="sm:max-w-[425px] bg-white">
    //     <DialogHeader>
    //       <DialogTitle>Chỉnh sửa thông tin món ăn</DialogTitle>
    //       <DialogDescription>Nhập thông tin cần chỉnh sửa</DialogDescription>
    //     </DialogHeader>
    //     <form>
    //       <div className="space-y-4 py-4">
    //         <div className="flex w-full gap-4">
    //           <div className="flex flex-col w-1/2">
    //             <Label htmlFor="adminDishName" className="mb-2">
    //               Tên món ăn
    //             </Label>
    //             <Input
    //               id="adminDishName"
    //               className="col-span-3"
    //               type="text"
    //               placeholder="Nhập tên món ăn"
    //               {...register("dishGeneralName")}
    //               disabled={isPending}
    //             />
    //             {errors.dishGeneralName && (
    //               <p className="text-red-500">
    //                 {errors.dishGeneralName.message}
    //               </p>
    //             )}
    //           </div>
    //           <div className="flex flex-col w-1/2">
    //             <Label htmlFor="adminDishName" className="mb-2">
    //               Giá
    //             </Label>
    //             <Input
    //               id="adminDishName"
    //               className="col-span-3"
    //               type="number"
    //               placeholder="Nhập tên món ăn"
    //               defaultValue={0}
    //               {...register("dishGeneralPrice", { valueAsNumber: true })}
    //               disabled={isPending}
    //             />
    //             {errors.dishGeneralPrice && (
    //               <p className="text-red-500">
    //                 {errors.dishGeneralPrice.message}
    //               </p>
    //             )}
    //           </div>
    //         </div>
    //         <div className="flex w-full gap-4">
    //           <div className="flex flex-col w-1/2">
    //             <Label htmlFor="adminDishName" className="mb-2">
    //               Độ lệch Giá
    //             </Label>
    //             <Input
    //               defaultValue={0}
    //               id="adminDishName"
    //               className="col-span-3"
    //               type="number"
    //               placeholder="Nhập tên món ăn"
    //               {...register("percentPriceDifference", {
    //                 valueAsNumber: true,
    //               })}
    //               disabled={isPending}
    //             />
    //             {errors.percentPriceDifference && (
    //               <p className="text-red-500">
    //                 {errors.percentPriceDifference.message}
    //               </p>
    //             )}
    //           </div>
    //           <div className="flex flex-col w-1/2">
    //             <Label htmlFor="adminDishDescription" className="mb-2">
    //               Danh mục
    //             </Label>
    //             <Controller
    //               name="categoryId"
    //               control={control}
    //               defaultValue=""
    //               disabled={isPending}
    //               render={({ field }) => (
    //                 <>
    //                   <Select
    //                     disabled={isPending}
    //                     onValueChange={field.onChange}
    //                     value={field.value}
    //                   >
    //                     <SelectTrigger className="w-full">
    //                       <SelectValue placeholder="Danh mục" />
    //                     </SelectTrigger>
    //                     <SelectContent>
    //                       {data?.data?.results.map((item) => (
    //                         <SelectItem key={item.id} value={item.id}>
    //                           {item.categoryName}
    //                         </SelectItem>
    //                       ))}
    //                     </SelectContent>
    //                   </Select>
    //                   {errors.categoryId && (
    //                     <p className="text-red-500">
    //                       {errors.categoryId.message}
    //                     </p>
    //                   )}
    //                 </>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="flex flex-col">
    //           <Label htmlFor="adminDishDescription" className="mb-2">
    //             Mô tả món ăn
    //           </Label>
    //           <Textarea
    //             id="adminDishDescription"
    //             className="col-span-3"
    //             placeholder="Nhập mô tả món ăn"
    //             {...register("dishGeneralDescription")}
    //             disabled={isPending}
    //           />
    //           {errors.dishGeneralDescription && (
    //             <p className="text-red-500">
    //               {errors.dishGeneralDescription.message}
    //             </p>
    //           )}
    //         </div>

    //         {/* <ImagePreview
    //           images={images}
    //           setImages={setImages}
    //           isPending={isPending}
    //         /> */}
    //       </div>
    //       <DialogFooter>
    //         <Button type="submit">
    //           {/* {isPending ? "Đang xử lý..." : updateButtonTitle} */}
    //           Cập nhật thông tin món ăn
    //         </Button>
    //       </DialogFooter>
    //     </form>
    //   </DialogContent>
    // </Dialog>
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateNormalInfomationDialog;
