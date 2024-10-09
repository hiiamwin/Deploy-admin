import { login } from "./authApi";
//
import {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  activeRestaurant,
  inActiveRestaurant,
} from "./restaurantApi";

import {
  getWaiters,
  createWaiter,
  activeWaiter,
  inactiveWaiter,
} from "./waiterApi";

import {
  getDishCategory,
  createDishCategory,
  updateDishCategory,
} from "./dishCategoryApi";

import {
  getIngredientTypes,
  createIngredientType,
  updateIngredientType,
} from "./ingredientTypeApi";

import {
  getIngredientGenerals,
  createIngredientGeneral,
  updateIngredientGeneral,
  getIngredientGeneralById,
  activeIngredientGeneral,
  inActiveIngredientGeneral,
} from "./ingredientGeneralApi";

export {
  login,

  // restaurant
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  activeRestaurant,
  inActiveRestaurant,
  // waiter
  getWaiters,
  createWaiter,
  activeWaiter,
  inactiveWaiter,
  //
  getDishCategory,
  createDishCategory,
  updateDishCategory,
  //
  getIngredientTypes,
  createIngredientType,
  updateIngredientType,
  //
  getIngredientGenerals,
  createIngredientGeneral,
  updateIngredientGeneral,
  getIngredientGeneralById,
  activeIngredientGeneral,
  inActiveIngredientGeneral,
};
