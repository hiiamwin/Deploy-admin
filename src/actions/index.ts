import { loginAction, logoutAction, changeProfileAction } from "./auth-actions";

import {
  createRestaurantAction,
  activeRestaurantAction,
  inactiveRestaurantAction,
  updateRestaurantAction,
} from "./restaurant-actions";

import {
  createEmployeeAction,
  activeEmployeeAction,
  inactiveEmployeeAction,
  getRestaurantAction,
  getEmployeeSalaryAction,
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
  getIngredientGeneralMeasureAction,
  createIngredientGeneralMeasureAction,
} from "./ingredientGeneralActions";

import {
  getDishGeneralAction,
  getDishByIdAction,
  addDishAction,
  activeDishAction,
  inactiveDishAction,
  changeDishPriceAction,
} from "./dishAction";

import {
  getIngredientGeneralAction,
  getDishCategoriesAction,
  createDishGeneralAction,
  getDishGeneralByIdAction,
  deleteIngredientInDishGeneralAction,
  addIngredientInDishGeneralAction,
  updateIngredientQuantityInDishGeneralAction,
  activeDishGeneralAction,
  inactiveDishGeneralAction,
  createVariantAction,
  updateDishGeneralNormalInformationAction,
} from "./dishGeneralAction";

import {
  getDishesAction,
  createComboAction,
  activeComboAction,
  inactiveComboAction,
  getDetailComboAction,
} from "./comboActions";

import {
  downloadIngredientFileAction,
  uploadIngredientFileAction,
  createIngredientUnitAction,
  updateIngredientUnitAction,
} from "./ingedientActions";

import {
  downloadRefundDishFileAction,
  uploadRefundDishFileAction,
} from "./refundDishActions";

import {
  createTableAction,
  activeTableAction,
  inactiveTableAction,
} from "./tableAction";

import { getLocationsAction } from "./locationActions";

import {
  getWeeklyShiftCountAction,
  getUnassignedEmployeesAction,
  registerScheduleAction,
  getEmployeeInShiftAtDateAction,
  unregisterScheduleAction,
  getQRCodeAction,
} from "./scheduleActions";

import {
  getRevenueStatisticAction,
  getCustomerStatisticAction,
  getOrderStatisticAction,
  getRevenueRankingAction,
  getOrderRankingAction,
  getTopComboAction,
  getTopDishAction,
  getTopRefundDishAction,
} from "./statictisActions";

import { confirmMoneyAction, getOrderDetailAction } from "./OrderActions";

export {
  loginAction,
  logoutAction,
  changeProfileAction,
  //
  createRestaurantAction,
  activeRestaurantAction,
  inactiveRestaurantAction,
  updateRestaurantAction,
  //
  createEmployeeAction,
  activeEmployeeAction,
  inactiveEmployeeAction,
  getRestaurantAction,
  getEmployeeSalaryAction,
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
  getIngredientGeneralMeasureAction,
  createIngredientGeneralMeasureAction,
  //
  getIngredientGeneralAction,
  getDishCategoriesAction,
  createDishGeneralAction,
  getDishGeneralByIdAction,
  deleteIngredientInDishGeneralAction,
  addIngredientInDishGeneralAction,
  updateIngredientQuantityInDishGeneralAction,
  activeDishGeneralAction,
  inactiveDishGeneralAction,
  createVariantAction,
  updateDishGeneralNormalInformationAction,
  //
  getDishGeneralAction,
  getDishByIdAction,
  addDishAction,
  activeDishAction,
  inactiveDishAction,
  changeDishPriceAction,
  //
  getDishesAction,
  createComboAction,
  activeComboAction,
  inactiveComboAction,
  getDetailComboAction,
  //
  downloadIngredientFileAction,
  uploadIngredientFileAction,
  createIngredientUnitAction,
  updateIngredientUnitAction,
  //
  downloadRefundDishFileAction,
  uploadRefundDishFileAction,
  //
  createTableAction,
  activeTableAction,
  inactiveTableAction,
  //
  getLocationsAction,
  //
  getWeeklyShiftCountAction,
  getUnassignedEmployeesAction,
  registerScheduleAction,
  getEmployeeInShiftAtDateAction,
  unregisterScheduleAction,
  getQRCodeAction,
  //
  getRevenueStatisticAction,
  getCustomerStatisticAction,
  getOrderStatisticAction,
  getRevenueRankingAction,
  getOrderRankingAction,
  getTopComboAction,
  getTopDishAction,
  getTopRefundDishAction,
  //
  confirmMoneyAction,
  getOrderDetailAction,
};
