import axios from 'axios';
import {
  IAccountPayload,
  IAccountInfo,
  IAccountAdmin,
  IAccountDeactivate,
  IFetchAccounts,
  IAccountWorkflowModuleReqPayload,
  IDeleteAccountWorkflowModuleReqPayload,
  IFetchClinicalWorkflowReqPayload,
  IFetchAccountOptionsPayload
} from '../store/account/types';

export const fetchAccounts = (
  tenantId: number,
  isActive: boolean,
  skip: number,
  limit: number | null,
  search?: string
) =>
  axios({
    method: 'POST',
    url: '/admin-service/account/account-list',
    data: {
      tenantId,
      skip,
      limit,
      is_active: isActive,
      searchTerm: search || ''
    }
  });

export const fetchDeactivatedAccounts = (
  skip: number,
  limit: number | null,
  sort: string,
  search?: string,
  tenantId?: string
) =>
  axios({
    method: 'POST',
    url: '/admin-service/account/deactivate-list',
    data: {
      skip,
      limit,
      sort,
      ...(search ? { searchTerm: search } : {}),
      tenantId,
      isPaginated: true
    }
  });

export const createAccount = (data: IAccountPayload) =>
  axios({
    method: 'POST',
    url: '/user-service/organization/create-account',
    data
  });

export const fetchAccountDetails = (data: { tenantId: number; id: number }) =>
  axios({
    method: 'POST',
    url: '/admin-service/account/details',
    data
  });

export const fetchDashboardAccounts = (data: { skip: number; limit: number; tenantId: string; searchTerm: string }) =>
  axios({
    method: 'POST',
    url: '/admin-service/account/list',
    data
  });

export const updateAccount = (data: IAccountInfo) =>
  axios({
    method: 'PUT',
    url: '/admin-service/account/update',
    data
  });

export const createAccountAdmin = (data: IAccountAdmin) =>
  axios({
    url: '/admin-service/account/user-add',
    method: 'POST',
    data
  });

export const updateAccountAdmin = (data: IAccountAdmin) =>
  axios({
    url: '/admin-service/account/user-update',
    method: 'PUT',
    data
  });

export const deleteAccountAdmin = (data: { tenantId: string | number; id: string | number }) =>
  axios({
    url: '/admin-service/account/user-remove',
    method: 'DELETE',
    data
  });

export const activateAccount = (data: { tenantId: number }) =>
  axios({
    url: '/admin-service/account/activate',
    method: 'PUT',
    data
  });

export const deactivateAccount = (data: IAccountDeactivate) =>
  axios({
    url: '/admin-service/account/deactivate',
    method: 'PUT',
    data
  });

export const fetchAccountOptions = (data: IFetchAccountOptionsPayload) =>
  axios({
    method: 'POST',
    url: '/admin-service/account/account-list',
    data
  });

export const fetchAccountAdmins = (data: IFetchAccounts) =>
  axios({
    method: 'POST',
    url: '/user-service/user/admin-users',
    data
  });

export const fetchClinicalWorkflows = (data: IFetchClinicalWorkflowReqPayload) =>
  axios({
    method: 'POST',
    url: '/admin-service/clinical-workflow/list',
    data
  });

export const createAccountWorkflowModule = (data: IAccountWorkflowModuleReqPayload) =>
  axios({
    method: 'POST',
    url: '/admin-service/clinical-workflow/create',
    data
  });

export const updateAccountWorkflowModule = (data: IAccountWorkflowModuleReqPayload) =>
  axios({
    method: 'PUT',
    url: '/admin-service/clinical-workflow/update',
    data
  });

export const deleteAccountWorkflowModule = (data: IDeleteAccountWorkflowModuleReqPayload) =>
  axios({
    method: 'PUT',
    url: '/admin-service/clinical-workflow/remove',
    data
  });
