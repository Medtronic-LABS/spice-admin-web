import * as USER_TYPES from './actionTypes';
import {
  ILoginSuccessPayload,
  ILoginFailurePayload,
  ILoginRequest,
  ILoginSuccess,
  ILoginFailure,
  ILogoutRequest,
  ILogoutSuccess,
  ILogoutFailure,
  IForgotPasswordReq,
  IForgotPasswordSuccess,
  IForgotPasswordFailure,
  IResetPasswordReq,
  IResetPasswordSuccess,
  IResetPasswordFail,
  ICreatePasswordReq,
  ICreatePasswordSuccess,
  ICreatePasswordFail,
  IGetUserNameReq,
  IGetUserNameSuccess,
  IGetUserNameFail,
  ILoginRequestPayload,
  IFetchTimezoneListSuccessPayload,
  IUser,
  IFetchUserByIdRequest,
  IFetchUserByIdSuccess,
  IFetchUserByIdFailure,
  IFetchUserByEmail,
  IFetchUserByEmailSuccess,
  IFetchUserByEmailFail,
  IUpdateUserRequest,
  IUpdateUserSuccess,
  IUpdateUserFailure,
  IFetchCountryListSuccessPayload,
  IAddToken,
  IRemoveToken,
  IFetchLockedUsersPayload,
  IFetchLockedUsersRequest,
  IFetchLockedUsersSuccess,
  IFetchLockedUsersFailure,
  IUnlockUsersRequest,
  IUnlockUsersSuccess,
  IUnlockUsersFailure,
  IChangePasswordReq,
  IChangePasswordSuccess,
  IChangePasswordFail,
  IAddUserTenantId,
  IRemoveUserTenantId,
  IFetchCultureListSuccessPayload
} from './types';

export const loginRequest = ({
  username,
  password,
  rememberMe,
  successCb,
  failureCb
}: ILoginRequestPayload): ILoginRequest => ({
  type: USER_TYPES.LOGIN_REQUEST,
  username,
  password,
  rememberMe,
  successCb,
  failureCb
});

export const loginSuccess = (payload: ILoginSuccessPayload): ILoginSuccess => ({
  type: USER_TYPES.LOGIN_SUCCESS,
  payload
});

export const loginFailure = (payload: ILoginFailurePayload): ILoginFailure => ({
  type: USER_TYPES.LOGIN_FAILURE,
  payload
});

export const addToken = (payload: string): IAddToken => ({
  type: USER_TYPES.AUTH_TOKEN,
  payload
});
export const removeToken = (): IRemoveToken => ({
  type: USER_TYPES.REMOVE_TOKEN
});

export const logoutRequest = (): ILogoutRequest => ({
  type: USER_TYPES.LOGOUT_REQUEST
});

export const logoutSuccess = (): ILogoutSuccess => ({
  type: USER_TYPES.LOGOUT_SUCCESS
});

export const addUserTenantID = (payload: string): IAddUserTenantId => ({
  type: USER_TYPES.ADD_USER_TENANT_ID,
  payload
});
export const removeUserTenantID = (): IRemoveUserTenantId => ({
  type: USER_TYPES.REMOVE_USER_TENANT_ID
});

export const logoutFailure = (): ILogoutFailure => ({
  type: USER_TYPES.LOGOUT_FAILURE
});

export const forgotPasswordRequest = ({
  email,
  successCB
}: {
  email: string;
  successCB: () => void;
}): IForgotPasswordReq => ({
  type: USER_TYPES.USER_FORGOT_PASSWORD_REQUEST,
  email,
  successCB
});

export const forgotPasswordSuccess = (): IForgotPasswordSuccess => ({
  type: USER_TYPES.USER_FORGOT_PASSWORD_SUCCESS
});

export const forgotPasswordFail = (error: any): IForgotPasswordFailure => ({
  type: USER_TYPES.USER_FORGOT_PASSWORD_FAIL,
  error
});

export const resetPassword = (data: {
  email: string;
  password: string;
  token: string;
  successCB: () => void;
  failureCb?: (error: Error) => void;
}): IResetPasswordReq => ({
  type: USER_TYPES.RESET_PASSWORD_REQUEST,
  data
});

export const resetPasswordSuccess = (): IResetPasswordSuccess => ({
  type: USER_TYPES.RESET_PASSWORD_SUCCESS
});

export const resetPasswordFail = (error: any): IResetPasswordFail => ({
  type: USER_TYPES.RESET_PASSWORD_FAIL,
  error
});

export const changePassword = (data: {
  user: string;
  password: string;
  tenantId: string;
  successCB: () => void;
  failureCb?: (error: Error) => void;
}): IChangePasswordReq => ({
  type: USER_TYPES.CHANGE_PASSWORD_REQUEST,
  data
});

export const changePasswordSuccess = (): IChangePasswordSuccess => ({
  type: USER_TYPES.CHANGE_PASSWORD_SUCCESS
});

export const changePasswordFail = (error: any): IChangePasswordFail => ({
  type: USER_TYPES.CHANGE_PASSWORD_FAIL,
  error
});

export const getUserName = (token: string, successCB: () => void): IGetUserNameReq => ({
  type: USER_TYPES.GET_USERNAME_FOR_PASSWORD_RESET,
  token,
  successCB
});

export const getUserNameSuccess = (response: {
  email: string;
  username: string;
  is_password_set: boolean;
}): IGetUserNameSuccess => ({
  type: USER_TYPES.GET_USERNAME_FOR_PASSWORD_RESET_SUCCESS,
  response
});

export const getUserNameFail = (error: any): IGetUserNameFail => ({
  type: USER_TYPES.GET_USERNAME_FOR_PASSWORD_RESET_FAIL,
  error
});

export const createPasswordRequest = (
  data: { email: string; password: string },
  id: string,
  successCB: () => void
): ICreatePasswordReq => ({
  type: USER_TYPES.CREATE_PASSWORD_REQUEST,
  data,
  id,
  successCB
});

export const createPasswordSuccess = (): ICreatePasswordSuccess => ({
  type: USER_TYPES.CREATE_PASSWORD_SUCCESS
});

export const createpasswordFail = (error: ILoginFailurePayload): ICreatePasswordFail => ({
  type: USER_TYPES.CREATE_PASSWORD_FAIL,
  error
});

export const fetchTimezoneListRequest = () => ({
  type: USER_TYPES.FETCH_TIMEZONE_LIST_REQUEST
});

export const fetchCultureListRequest = () => ({
  type: USER_TYPES.FETCH_CULTURE_LIST_REQUEST
});

export const fetchCultureListSuccess = (payload: IFetchCultureListSuccessPayload) => ({
  type: USER_TYPES.FETCH_CULTURE_LIST_SUCCESS,
  payload
});

export const fetchCultureListFailure = () => ({
  type: USER_TYPES.FETCH_CULTURE_LIST_FAILURE
});

export const fetchTimezoneListSuccess = (payload: IFetchTimezoneListSuccessPayload) => ({
  type: USER_TYPES.FETCH_TIMEZONE_LIST_SUCCESS,
  payload
});

export const fetchTimezoneListFailure = () => ({
  type: USER_TYPES.FETCH_TIMEZONE_LIST_FAILURE
});

export const sessionTimedout = (message: string) => ({
  type: USER_TYPES.SESSION_TIMEDOUT,
  message
});

export const resetStore = () => ({
  type: USER_TYPES.RESET_STORE
});

export const fetchLoggedInUser = () => ({
  type: USER_TYPES.FETCH_LOGGED_IN_USER_REQUEST
});

export const fetchLoggedInUserSuccess = (payload: IUser) => ({
  type: USER_TYPES.FETCH_LOGGED_IN_USER_SUCCESS,
  payload
});

export const fetchLoggedInUserFail = () => ({
  type: USER_TYPES.FETCH_LOGGED_IN_USER_FAILURE
});

export const fetchUserByEmail = ({
  email,
  parentOrgId,
  successCb,
  failureCb
}: Omit<IFetchUserByEmail, 'type'>): IFetchUserByEmail => ({
  type: USER_TYPES.FETCH_USER_BY_EMAIL,
  email,
  parentOrgId,
  successCb,
  failureCb
});

export const fetchUserByEmailSuccess = (): IFetchUserByEmailSuccess => ({
  type: USER_TYPES.FETCH_USER_BY_EMAIL_SUCCESS
});

export const fetchUserByEmailFail = (): IFetchUserByEmailFail => ({
  type: USER_TYPES.FETCH_USER_BY_EMAIL_FAIL
});

export const fetchUserByIdReq = ({
  payload,
  successCb,
  failureCb
}: Omit<IFetchUserByIdRequest, 'type'>): IFetchUserByIdRequest => ({
  type: USER_TYPES.FETCH_USER_BY_ID_REQUEST,
  payload,
  successCb,
  failureCb
});

export const fetchUserByIdSuccess = (
  data: Omit<IUser, 'formDataId' | 'countryId' | 'role'>
): IFetchUserByIdSuccess => ({
  type: USER_TYPES.FETCH_USER_BY_ID_SUCCESS,
  data
});

export const fetchUserByIdFailure = (): IFetchUserByIdFailure => ({
  type: USER_TYPES.FETCH_USER_BY_ID_FAILURE
});

export const updateUserRequest = ({
  payload,
  successCb,
  failureCb
}: Omit<IUpdateUserRequest, 'type'>): IUpdateUserRequest => ({
  type: USER_TYPES.UPDATE_USER_REQUEST,
  payload,
  successCb,
  failureCb
});

export const updateUserSuccess = (): IUpdateUserSuccess => ({
  type: USER_TYPES.UPDATE_USER_SUCCESS
});

export const updateUserFailure = (): IUpdateUserFailure => ({
  type: USER_TYPES.UPDATE_USER_FAILURE
});

export const fetchCountryListRequest = () => ({
  type: USER_TYPES.FETCH_COUNTRY_LIST_REQUEST
});

export const fetchCountryListSuccess = (payload: IFetchCountryListSuccessPayload) => ({
  type: USER_TYPES.FETCH_COUNTRY_LIST_SUCCESS,
  payload
});

export const fetchCountryListFailure = () => ({
  type: USER_TYPES.FETCH_COUNTRY_LIST_FAILURE
});

export const fetchLockedUsersRequest = ({
  tenantId,
  skip,
  limit,
  search,
  successCb,
  failureCb
}: {
  tenantId?: string;
  skip: number;
  limit: number | null;
  search?: string;
  successCb?: (payload: IFetchLockedUsersPayload) => void;
  failureCb?: (error: Error) => void;
}): IFetchLockedUsersRequest => ({
  type: USER_TYPES.FETCH_LOCKED_USERS_REQUEST,
  tenantId,
  skip,
  limit,
  search,
  successCb,
  failureCb
});

export const fetchLockedUsersSuccess = (payload: IFetchLockedUsersPayload): IFetchLockedUsersSuccess => ({
  type: USER_TYPES.FETCH_LOCKED_USERS_SUCCESS,
  payload
});

export const fetchLockedUsersFailure = (): IFetchLockedUsersFailure => ({
  type: USER_TYPES.FETCH_LOCKED_USERS_FAILURE
});

export const unlockUsersRequest = ({
  userId,
  successCb,
  failureCb
}: {
  userId: string;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IUnlockUsersRequest => ({
  type: USER_TYPES.UNLOCK_USERS_REQUEST,
  userId,
  successCb,
  failureCb
});

export const unlockUsersSuccess = (): IUnlockUsersSuccess => ({
  type: USER_TYPES.UNLOCK_USERS_SUCCESS
});

export const unlockUsersFailure = (): IUnlockUsersFailure => ({
  type: USER_TYPES.UNLOCK_USERS_FAILURE
});
