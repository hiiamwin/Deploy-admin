export type Ingredient = {
  id: string;
  restaurantId: string;
  ingredientName: string;
  ingredientType: string;
  ingredientDescription: string;
  amount: number;
  createdDate: string;
  ingredientUnits: {
    ingredientUnitId: string;
    ingredientUnitParentId: string | null;
    ingredientUnitParentName: string;
    unitName: string;
    conversionFactor: number;
    createdDate: string;
  }[];
};
