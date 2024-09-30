export type Restaurant = {
  id: string;
  restaurantName: string;
  address: string;
  restaurantPhone: string;
  restaurantCode: string;
  restaurantStatus: number;
  created: string;
};

export type CreateAndUpdateRestaurant = Omit<
  Restaurant,
  "id" | "restaurantCode" | "restaurantStatus" | "created"
>;
