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
  createEmployee,
  activeEmployee,
  inactiveEmployee,
  getManagers,
} from "./employeeApi";

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

import {
  getDishGeneral,
  getDishGeneralById,
  createDishGeneral,
  deleteIngredientInDishGeneral,
  addIngredientInDishGeneral,
  updateIngredientQuantityInDishGeneral,
  activeDishGeneral,
  inactiveDishGeneral,
} from "./dishgeneralApi";

import {
  getDishes,
  getDishById,
  addDish,
  activeDish,
  inactiveDish,
} from "./dishApi";

import { getCombo, createCombo, activeCombo, inactiveCombo } from "./comboApi";

import { getLocations } from "./locationApi";

import {
  getIngredients,
  downloadIngredientFile,
  uploadIngredientFile,
  createIngredientUnit,
  updateIngredientUnit,
} from "./ingredientApi";

import {
  getRefundDish,
  downloadRefundDishFile,
  uploadRefundDishFile,
} from "./refundDishApi";

import { getTables, createTable, activeTable, inactiveTable } from "./tableApi";

import {
  getWeeklyShiftCount,
  getUnassignedEmployees,
  registerSchedule,
  getEmployeeInShiftAtDate,
  unregisterSchedule,
} from "./scheduleApi";

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
  createEmployee,
  activeEmployee,
  inactiveEmployee,
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
  //
  getDishGeneral,
  getDishGeneralById,
  createDishGeneral,
  deleteIngredientInDishGeneral,
  addIngredientInDishGeneral,
  updateIngredientQuantityInDishGeneral,
  activeDishGeneral,
  inactiveDishGeneral,
  //
  getManagers,
  //
  getDishes,
  getDishById,
  addDish,
  activeDish,
  inactiveDish,
  //
  getCombo,
  createCombo,
  activeCombo,
  inactiveCombo,
  //
  getIngredients,
  downloadIngredientFile,
  uploadIngredientFile,
  createIngredientUnit,
  updateIngredientUnit,
  //
  getRefundDish,
  downloadRefundDishFile,
  uploadRefundDishFile,
  //
  getTables,
  createTable,
  activeTable,
  inactiveTable,
  //
  getLocations,
  //
  getWeeklyShiftCount,
  getUnassignedEmployees,
  registerSchedule,
  getEmployeeInShiftAtDate,
  unregisterSchedule,
};
