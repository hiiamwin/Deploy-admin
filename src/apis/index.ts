import { login, changeProfile, changePassword } from "./authApi";
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
  getEmployeeSalary,
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
  getIngredientGeneralMeasure,
  createIngredientGeneralMeasure,
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
  createVariant,
  updateDishGeneralNormalInformation,
} from "./dishgeneralApi";

import {
  getDishes,
  getDishById,
  addDish,
  activeDish,
  inactiveDish,
  changeDishPrice,
} from "./dishApi";

import {
  getCombo,
  createCombo,
  activeCombo,
  inactiveCombo,
  getDetailCombo,
} from "./comboApi";

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
  getQRCode,
} from "./scheduleApi";

import {
  getCurrentStatictis,
  getRevenueStatistic,
  getCustomerStatistic,
  getOrderStatistic,
  getRevenueRanking,
  getOrderRanking,
  getTopCombo,
  getTopDish,
  getTopRefundDish,
} from "./statictis";

import { getCustomer } from "./customerApi";

import { getOrder, getOrderDetail, confirmMoney } from "./orderApi";

export {
  login,
  changeProfile,
  changePassword,

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
  getEmployeeSalary,

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
  getIngredientGeneralMeasure,
  createIngredientGeneralMeasure,
  //
  getDishGeneral,
  getDishGeneralById,
  createDishGeneral,
  deleteIngredientInDishGeneral,
  addIngredientInDishGeneral,
  updateIngredientQuantityInDishGeneral,
  activeDishGeneral,
  inactiveDishGeneral,
  createVariant,
  updateDishGeneralNormalInformation,
  //
  getManagers,
  //
  getDishes,
  getDishById,
  addDish,
  activeDish,
  inactiveDish,
  changeDishPrice,
  //
  getCombo,
  createCombo,
  activeCombo,
  inactiveCombo,
  getDetailCombo,
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
  getQRCode,
  //
  getCurrentStatictis,
  getRevenueStatistic,
  getCustomerStatistic,
  getOrderStatistic,
  getRevenueRanking,
  getOrderRanking,
  getTopCombo,
  getTopDish,
  getTopRefundDish,
  //
  getCustomer,
  //
  getOrder,
  getOrderDetail,
  confirmMoney,
};
