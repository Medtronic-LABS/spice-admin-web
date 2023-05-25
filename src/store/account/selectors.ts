import { createSelector } from 'reselect';
import { AppState } from '../rootReducer';

const getLoading = (state: AppState) => state.account.loading;
const getAccounts = (state: AppState) => state.account.accounts;
const getAccount = (state: AppState) => state.account.account;
const getAccountOptions = (state: AppState) => state.account.accountOptions;
const getAccountOptionsLoading = (state: AppState) => state.account.loadingOptions;

const getAccountsCount = (state: AppState) => state.account.total;
const getAccountDashboardList = (state: AppState) => state.account.dashboardList;
const getLoadMore = (state: AppState) => state.account.loadingMore;
const getAccountAdmins = (state: AppState) => state.account.admins;
const getClinicalWorkflows = (state: AppState) => state.account.clinicalWorkflows;
const getClinicalWorkflowsCount = (state: AppState) => state.account.clinicalWorkflowsCount;

export const accountsLoadingSelector = createSelector(getLoading, (loading) => loading);

export const getAccountsSelector = createSelector(getAccounts, (accounts) => accounts);

export const accountsCountSelector = createSelector(getAccountsCount, (accountCount) => accountCount);

export const accountSelector = createSelector(getAccount, (account) => account);

export const accDashboardListSelector = createSelector(getAccountDashboardList, (dashboardList) => dashboardList);

export const accDashboardLoadingMoreSelector = createSelector(getLoadMore, (loadingMore) => loadingMore);

export const accountOptionsSelector = createSelector(getAccountOptions, (accountOptions) => accountOptions);

export const accountOptionsLoadingSelector = createSelector(
  getAccountOptionsLoading,
  (accountOptionsLoading) => accountOptionsLoading
);
export const getAccountAdminSelector = createSelector(getAccountAdmins, (admins) => admins);

export const getClinicalWorkflowSelector = createSelector(getClinicalWorkflows, (workflows) => workflows);

export const getClinicalWorkflowsCountSelector = createSelector(getClinicalWorkflowsCount, (workflows) => workflows);
