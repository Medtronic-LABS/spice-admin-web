import { createSelector } from 'reselect';
import { AppState } from '../rootReducer';

const getSite = (state: AppState) => state.site.site;
const getLoading = (state: AppState) => state.site.loading;
const getTotal = (state: AppState) => state.site.total;
const getSiteListDetails = (state: AppState) => state.site.siteList;
const getSiteUserList = (state: AppState) => state.site.siteUserList;
const getSiteCountyDropdown = (state: AppState) => state.site.countyList;
const getSubCountyDropdown = (state: AppState) => state.site.subCountyList;
const getCultureDropdown = (state: AppState) => state.site.cultureList;
const getSiteCountyDropdownLoading = (state: AppState) => state.site.countyDropdownLoading;
const getSubCountyDropdownLoading = (state: AppState) => state.site.subCountyDropdownLoading;
const getCultureDropdownLoading = (state: AppState) => state.site.cultureListLoading;
const getLoadingMore = (state: AppState) => state.site.loadingMore;
const getSiteDashboardList = (state: AppState) => state.site.siteDashboardList;
const getSiteListDropdown = (state: AppState) => state.site.siteDropdownOptions;
const getSiteListDropdownLoading = (state: AppState) => state.site.siteDropdownLoading;

export const siteSelector = createSelector(getSite, (site) => site);
export const siteLoadingSelector = createSelector(getLoading, (loading) => loading);
export const siteListTotalSelector = createSelector(getTotal, (total) => total);
export const siteListSelector = createSelector(getSiteListDetails, (siteList) => siteList);
export const siteUserListSelector = createSelector(getSiteUserList, (siteUserList) => siteUserList);
export const siteCountyDropdownSelector = createSelector(getSiteCountyDropdown, (countyList) => countyList);
export const subCountyDropdownSelector = createSelector(getSubCountyDropdown, (subCountyList) => subCountyList);
export const cultureDropdownSelector = createSelector(getCultureDropdown, (cultureList) => cultureList);
export const siteCountyDropdownLoadingSelector = createSelector(getSiteCountyDropdownLoading, (loading) => loading);
export const subCountyDropdownLoadingSelector = createSelector(getSubCountyDropdownLoading, (loading) => loading);
export const cultureDropdownLoadingSelector = createSelector(getCultureDropdownLoading, (loading) => loading);
export const siteDashboardListSelector = createSelector(getSiteDashboardList, (siteDashboardList) => siteDashboardList);
export const siteLoadingMoreSelector = createSelector(getLoadingMore, (loadingMore) => loadingMore);
export const siteListDropdownSelector = createSelector(getSiteListDropdown, (siteListDropdown) => siteListDropdown);
export const siteListDropdownLoadingSelector = createSelector(
  getSiteListDropdownLoading,
  (siteListDropdownLoading) => siteListDropdownLoading
);
