import { loginAction, logoutAction } from "./auth-actions";

import {
  createRestaurantAction,
  activeRestaurantAction,
  inactiveRestaurantAction,
  updateRestaurantAction,
} from "./restaurant-actions";

import {
  createWaiterAction,
  activeWaiterAction,
  inactiveWaiterAction,
} from "./employee-actions";

import {
  createDishCategoryAction,
  updateDishCategoryAction,
} from "./dishCategory-actions";

import {
  createIngredientTypeAction,
  updateIngredientTypeAction,
} from "./ingredientType-actions";

import {
  getIngredientTypesAction,
  getIngredientGeneralByIdAction,
  createIngredientGeneralAction,
  updateIngredientGeneralAction,
  activeIngredientGeneralAction,
  inActiveIngredientGeneralAction,
} from "./ingredientGeneralActions";

export {
  loginAction,
  logoutAction,
  //
  createRestaurantAction,
  activeRestaurantAction,
  inactiveRestaurantAction,
  updateRestaurantAction,
  //
  createWaiterAction,
  activeWaiterAction,
  inactiveWaiterAction,
  //
  createDishCategoryAction,
  updateDishCategoryAction,
  //
  createIngredientTypeAction,
  updateIngredientTypeAction,
  //
  getIngredientTypesAction,
  getIngredientGeneralByIdAction,
  createIngredientGeneralAction,
  updateIngredientGeneralAction,
  activeIngredientGeneralAction,
  inActiveIngredientGeneralAction,
};
