export type DishGeneral = {
  id: string;
  categoryId: string;
  dishGeneralName: string;
  dishGeneralPrice: number;
  dishGeneralDescription: string;
  status: number;
  categoryName: string;
  createdDate: string;
  updateTime: string;
  isRefund: boolean;
  percentagePriceDifference: number;
  images: [
    {
      dishGeneralImageId: string;
      url: string;
    },
    {
      dishGeneralImageId: string;
      url: string;
    },
    {
      dishGeneralImageId: string;
      url: string;
    }
  ];
};

export type DishGeneralDetail = {
  id: string;
  dishGeneralName: string;
  dishGeneralDescription: string;
  createdDate: string;
  updateDated: string;
  getIngredients: [
    {
      ingredientGeneralId: string;
      ingredientGeneralName: string;
      ingredientGeneralQuantity: number;
      ingredientMeasureName: string;
      createdDate: string;
    }
  ];
  images: [
    {
      dishGeneralImageId: string;
      url: string;
    }
  ];
  dishGeneralPrice: number;
  percentagePriceDifference: number;
};

export type CreateDishGeneral = {
  dishGeneralName: string;
  dishGeneralPrice: number;
  dishGeneralDescription: string;
  categoryId: string;
  isRefund: boolean;
  ingredients: {
    ingredientId: string;
    quantity: number;
  }[];
  percentPriceDifference: number;
  images: string[];
};
