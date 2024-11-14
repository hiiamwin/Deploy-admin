export type Restaurant = {
  id: string;
  restaurantName: string;
  address: string;
  restaurantPhone: string;
  restaurantCode: string;
  restaurantStatus: number;
  createdDate: string;
};

export type CreateRestaurant = Omit<
  Restaurant,
  "id" | "restaurantCode" | "restaurantStatus" | "createdDate"
> & {
  latitude: number;
  longitude: number;
};
export type UpdateRestaurant = Omit<
  Restaurant,
  "id" | "restaurantCode" | "createdDate" | "address" | "restaurantStatus"
>;
