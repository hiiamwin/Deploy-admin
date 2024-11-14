"use client";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createRestaurantFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createRestaurantAction, getLocationsAction } from "@/actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

function AddBranchDialog() {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [addressQuery, setAddressQuery] = useState<any>({
    name: "",
    lat: 0,
    lon: 0,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [autocompleteResults, setAutocompleteResults] = useState<any>([]);
  // const [position, setPosition] = useState({ lat: 0, lon: 0 });

  const {
    data: locations,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["locations", addressQuery],
    queryFn: () => getLocationsAction({ query: addressQuery.name }),
    enabled: false,
  });
  const debouncedSearch = useDebouncedCallback((query: string) => {
    if (query.length > 2) {
      refetch();
    } else {
      setAutocompleteResults([]);
    }
  }, 500);
  useEffect(() => {
    if (locations) {
      setAutocompleteResults(locations.data);
    }
  }, [locations]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof createRestaurantFormSchema>>({
    resolver: zodResolver(createRestaurantFormSchema),
  });

  const { execute, isPending } = useAction(createRestaurantAction, {
    onSuccess: ({ data }) => {
      toast.success(data);
      reset();
      handleOpen(false);
    },
    onError: ({ error }) => {
      if (error.serverError) {
        const errorArray = JSON.parse(error.serverError);
        errorArray.forEach((error: { field: string; message: string }) => {
          setError(error.field as keyof typeof errors, {
            message: error.message,
          });
        });
      }
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createRestaurantFormSchema>> =
    useCallback(
      (data) => {
        if (addressQuery.lat === 0 || addressQuery.lon === 0) {
          setError("address", {
            message: "Vui lòng chọn địa chỉ từ danh sách",
          });

          return;
        }

        execute({
          restaurantName: data.restaurantName,
          restaurantPhone: data.restaurantPhone,
          address: addressQuery.name,
          latitude: addressQuery.lat,
          longitude: addressQuery.lon,
        });
      },
      [addressQuery.lat, addressQuery.lon, addressQuery.name, execute, setError]
    );

  const handleOpen = useCallback(
    (value: boolean) => {
      if (isPending) return;
      reset();
      setOpen(value);
    },
    [isPending, reset]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button>Thêm mới chi nhánh</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Thêm mới chi nhánh</DialogTitle>
          <DialogDescription>
            Vui lòng nhập thông tin chi nhánh
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="flex flex-col">
              <Label htmlFor={"restaurantName"} className="mb-2">
                Tên chi nhánh
              </Label>
              <Input
                id={"restaurantName"}
                className="col-span-3"
                type={"text"}
                {...register("restaurantName")}
                placeholder={`Nhập tên chi nhánh`}
                disabled={isPending}
              />
              {errors.restaurantName?.message && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.restaurantName?.message as string}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Label htmlFor={"restaurantPhone"} className="mb-2">
                Số điện thoại chi nhánh
              </Label>
              <Input
                id={"restaurantPhone"}
                className="col-span-3"
                type={"text"}
                {...register("restaurantPhone")}
                placeholder={`Nhập số điện thoại chi nhánh`}
                disabled={isPending}
              />
              {errors.restaurantPhone?.message && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.restaurantPhone?.message as string}
                </p>
              )}
            </div>
            <div className="flex flex-col relative">
              <Label htmlFor={"address"} className="mb-2">
                Địa chỉ chi nhánh
              </Label>
              <Input
                id={"address"}
                className="col-span-3"
                type={"text"}
                {...register("address")}
                placeholder={`Nhập Địa chỉ chi nhánh`}
                disabled={isPending}
                autoComplete="off"
                value={addressQuery.name}
                onChange={(e) => {
                  const query = e.target.value;
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  setAddressQuery((prev: any) => ({ ...prev, name: query }));
                  debouncedSearch(query);
                }}
              />

              {isFetching ? (
                <div>
                  <p className="text-gray-500 text-sm mt-1" role="alert">
                    Đang tìm kiếm...
                  </p>
                </div>
              ) : autocompleteResults.length > 0 ? (
                <ul className="w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-auto rounded-md shadow-lg">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {autocompleteResults.map((result: any, index: number) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setAddressQuery({
                          name: result.display_name,
                          lat: +result.lat,
                          lon: +result.lon,
                        });

                        setAutocompleteResults([]);
                      }}
                    >
                      {result.display_name}
                    </li>
                  ))}
                </ul>
              ) : null}

              {errors.address?.message && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.address?.message as string}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Đang xử lý..." : "Thêm mới chi nhánh"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBranchDialog;
