import { createSelector } from 'reselect';
import { AppState } from '../rootReducer';

const getOperatingUnitDashboardList = (state: AppState) => state.operatingUnit.operatingUnitDashboardList;
const getOperatingUnitList = (state: AppState) => state.operatingUnit.operatingUnitList;
const getOperatingUnitCount = (state: AppState) => state.operatingUnit.total;
const getOperatingUnitListCount = (state: AppState) => state.operatingUnit.listTotal;
const getOperatingUnitLoading = (state: AppState) => state.operatingUnit.loading;
const getOperatingUnitLoadingMore = (state: AppState) => state.operatingUnit.loadingMore;
const getOperatingUnitDetail = (state: AppState) => state.operatingUnit.operatingUnitDetail;
const getOuAdmins = (state: AppState) => state.operatingUnit.admins;
const getOperatingUnitAdminList = (state: AppState) => state.operatingUnit.operatingUnitAdmins;
const getOperatingUnitForDropdown = (state: AppState) => state.operatingUnit.dropdownOUList;
const getOperatingUnitDropdownLoading = (state: AppState) => state.operatingUnit.dropdownOUListLoading;

export const operatingUnitDashboardListSelector = createSelector(
  getOperatingUnitDashboardList,
  (operatingUnitDashboardList) => operatingUnitDashboardList
);

export const operatingUnitListSelector = createSelector(getOperatingUnitList, (operatingUnitList) => operatingUnitList);

export const operatingUnitCountSelector = createSelector(
  getOperatingUnitCount,
  (operatingUnitCount) => operatingUnitCount
);
export const operatingUnitListCountSelector = createSelector(
  getOperatingUnitListCount,
  (operatingUnitListCount) => operatingUnitListCount
);

export const operatingUnitLoadingSelector = createSelector(
  getOperatingUnitLoading,
  (operatingUnitLoading) => operatingUnitLoading
);

export const operatingUnitLoadingMoreSelector = createSelector(
  getOperatingUnitLoadingMore,
  (operatingUnitLoadingMore) => operatingUnitLoadingMore
);

export const getOperatingUnitDetailSelector = createSelector(getOperatingUnitDetail, (detail) => detail);

export const getOuAdminsSelector = createSelector(getOuAdmins, (ouAdmins) => ouAdmins);
export const operatingUnitAdminListSelector = createSelector(
  getOperatingUnitAdminList,
  (operatingUnitAdminList) => operatingUnitAdminList
);
export const operatingUnitDropdownSelector = createSelector(
  getOperatingUnitForDropdown,
  (operatingUnitDropdown) => operatingUnitDropdown
);
export const operatingUnitDropdownLoadingSelector = createSelector(
  getOperatingUnitDropdownLoading,
  (operatingUnitDropdownLoading) => operatingUnitDropdownLoading
);
