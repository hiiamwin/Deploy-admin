export type Dish = {
  id: string;
  dishName: string;
  quantity: number;
  price: string;
  percentagePriceDifference: 0;
  dishDescription: string;
  createdDate: string;
  images: [
    {
      dishGeneralImageId: string;
      url: string;
    }
  ];
  categoryName: string;
  type: string;
  status: number;
};

export type DishDetail = Omit<Dish, "type" | "images"> & {
  ingredients: [
    {
      ingredientId: string;
      ingredientName: string;
      ingredientQuantity: string;
      ingredientMeasureName: string;
      ingredientType: string;
    }
  ];
  images: [string];
};
