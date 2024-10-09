export type IngredientGeneral = {
  id: string;
  ingredientGeneralName: string;
  ingredientGeneralType: string;
  ingredientMeasureType: string;
  ingredientGeneralDescription: string;
  status: 1;
  createdDate: string;
};
export type IngredientGeneralDetail = {
  id: string;
  ingredientGeneralName: string;
  ingredientGeneralType: string;
  ingredientGeneralTypeName: string;
  ingredientMeasureType: 1;
  ingredientGeneralDescription: string;
  status: 1;
  createdDate: string;
};

export type CreateIngredientGeneral = Omit<
  IngredientGeneral,
  | "id"
  | "ingredientMeasureType"
  | "status"
  | "createdDate"
  | "ingredientGeneralType"
> & { ingredientMeasureType: number; ingredientType: string };

export type UpdateIngredientGeneral = Omit<
  IngredientGeneral,
  "status" | "createdDate" | "ingredientMeasureType" | "ingredientGeneralType"
> & { ingredientTypeId: string };
