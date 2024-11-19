export type IngredientGeneral = {
  id: string;
  ingredientGeneralName: string;
  ingredientGeneralType: string;
  ingredientMeasureType: string;
  ingredientGeneralDescription: string;
  ingredientTypeId: string;
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
  | "ingredientTypeId"
  | "id"
  | "ingredientMeasureType"
  | "status"
  | "createdDate"
  | "ingredientGeneralType"
> & { ingredientMeasureId: string; ingredientType: string };

export type UpdateIngredientGeneral = Omit<
  IngredientGeneral,
  "status" | "createdDate" | "ingredientMeasureType" | "ingredientGeneralType"
> & { ingredientTypeId: string };
