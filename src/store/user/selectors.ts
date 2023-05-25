import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';

const getIsLoggedIn = (state: AppState) => state.user.isLoggedIn;
const getIsLoggingIn = (state: AppState) => state.user.loggingIn;
const getIsLoggingOut = (state: AppState) => state.user.loggingOut;
const getFirstName = (state: AppState) => state.user.user?.firstName;
const getLastName = (state: AppState) => state.user.user?.lastName;
const getFormDataId = (state: AppState) => state.user.user?.formDataId;
const getTenantId = (state: AppState) => state.user.user?.tenantId;
const getRole = (state: AppState) => state.user.user?.role;
const getTimezoneList = (state: AppState) => state.user.timezoneList;
const getLoading = (state: AppState) => state.user.loading;
const getInitializing = (state: AppState) => state.user.initializing;
const getShowLoader = (state: AppState) => state.user.showLoader;
const getCountryId = (state: AppState) => state.user.user?.countryId;
const getUserId = (state: AppState) => state.user.user?.userId;
const getCountryList = (state: AppState) => state.user.countryList;
const getCultureList = (state: AppState) => state.user.cultureList;
const getCultureListLoading = (state: AppState) => state.user.cultureListLoading;
const getAuthToken = (state: AppState) => state.user.token;
const getLockedUsers = (state: AppState) => state.user.lockedUsers;
const getLockedUsersCount = (state: AppState) => state.user.totalLockedUsers;

export const getIsLoggedInSelector = createSelector(getIsLoggedIn, (isLoggedIn) => isLoggedIn);

export const getIsLoggingInSelector = createSelector(getIsLoggingIn, (loggingIn) => loggingIn);

export const getIsLoggingOutSelector = createSelector(getIsLoggingOut, (loggingOut) => loggingOut);

export const firstNameSelector = createSelector(getFirstName, (firstName) => firstName);

export const lastNameSelector = createSelector(getLastName, (lastName) => lastName);

export const formDataIdSelector = createSelector(getFormDataId, (formDataId) => formDataId);

export const tenantIdSelector = createSelector(getTenantId, (tenantId) => tenantId);

export const timezoneListSelector = createSelector(getTimezoneList, (timezoneList) => timezoneList);

export const loadingSelector = createSelector(getLoading, (loading) => loading);

export const initializingSelector = createSelector(getInitializing, (initializing) => initializing);

export const roleSelector = createSelector(getRole, (role) => role);

export const showLoaderSelector = createSelector(getShowLoader, (loading) => loading);

export const countryIdSelector = createSelector(getCountryId, (countryId) => countryId);

export const userIdSelector = createSelector(getUserId, (userId) => userId);

export const cultureListSelector = createSelector(getCultureList, (cultureList) => cultureList);

export const cultureListLoadingSelector = createSelector(
  getCultureListLoading,
  (cultureListLoading) => cultureListLoading
);

export const countryListSelector = createSelector(getCountryList, (countryList) => countryList);

export const authTokenSelector = createSelector(getAuthToken, (token) => token);

export const lockedUsers = createSelector(getLockedUsers, (users) => users);

export const lockedUsersCount = createSelector(getLockedUsersCount, (total) => total);
