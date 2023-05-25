import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';

const getLoading = (state: AppState) => state.superAdmin.loading;
const getSuperAdmins = (state: AppState) => state.superAdmin.superAdmins;
const getSuperAdminsCount = (state: AppState) => state.superAdmin.total;

export const superAdminsLoadingSelector = createSelector(getLoading, (loading) => loading);

export const superAdminsSelector = createSelector(getSuperAdmins, (superAdmins) => superAdmins);

export const superAdminsCountSelector = createSelector(
  getSuperAdminsCount,
  (superAdminListCount) => superAdminListCount
);
