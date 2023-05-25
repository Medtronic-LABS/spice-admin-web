import { ISelectOption } from '../../components/formFields/SelectInput';
import APPCONSTANTS from '../../constants/appConstants';
import ApiError from '../../global/ApiError';
import * as USER_TYPES from './actionTypes';

export type roleType = typeof APPCONSTANTS.ROLES[keyof typeof APPCONSTANTS.ROLES];
export interface IUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: roleType;
  tenantId: string;
  formDataId: string;
  countryId: any;
}

export interface IUserDetail {
  id?: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  gender: string;
  phoneNumber: string;
  timezone: ITimezone;
  isAdded?: boolean;
  redRisk?: boolean;
  isUpdated?: boolean;
  roleName?: string | ISelectOption;
  countryCode?: string;
}

export interface IUpdateUserDetail extends Omit<IUserDetail, 'timezone'> {
  timezone: string;
  cultureId?: number;
}

export interface IEditUserDetail extends IUserDetail {
  country?: ICountry;
}

export interface ICountry {
  id?: string;
  countryCode?: string;
  name?: string;
}

export interface IUserState {
  isLoggedIn: boolean;
  loggingIn: boolean;
  loggingOut: boolean;
  user: IUser;
  error: string | null;
  loading: boolean;
  cultureListLoading?: boolean;
  initializing: boolean;
  isPasswordSet: boolean;
  email: string;
  timezoneList: ITimezone[];
  errorMessage: string;
  showLoader: boolean;
  countryList: ICountryCode[];
  token: string;
  lockedUsers?: ILockedUsers[];
  totalLockedUsers?: number;
  userTenantId: string;
  cultureList?: ICulture[];
}

export type ILoginSuccessPayload = IUser;

export interface ILoginFailurePayload {
  error: string;
}

export interface ILoginRequestPayload {
  username: string;
  password: string;
  rememberMe: boolean;
  successCb?: (payload: ILoginSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}

export interface ITimezone {
  id: string;
  description?: string;
}

export interface ICountryCode {
  id: string;
  countryCode: string;
}

export interface ICulture {
  id: number;
  name: string;
}

export type IFetchTimezoneListSuccessPayload = ITimezone[];

export type IFetchCountryListSuccessPayload = ICountryCode[];

export type IFetchCultureListSuccessPayload = ICulture[];

export interface ILoginRequest {
  type: typeof USER_TYPES.LOGIN_REQUEST;
  username: string;
  password: string;
  rememberMe: boolean;
  successCb?: (payload: ILoginSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}

export interface ILoginSuccess {
  type: typeof USER_TYPES.LOGIN_SUCCESS;
  payload: ILoginSuccessPayload;
}

export interface ILoginFailure {
  type: typeof USER_TYPES.LOGIN_FAILURE;
  payload: ILoginFailurePayload;
}

export interface IAddToken {
  type: typeof USER_TYPES.AUTH_TOKEN;
  payload: string;
}
export interface IRemoveToken {
  type: typeof USER_TYPES.REMOVE_TOKEN;
}
export interface IAddUserTenantId {
  type: typeof USER_TYPES.ADD_USER_TENANT_ID;
  payload: string;
}
export interface IRemoveUserTenantId {
  type: typeof USER_TYPES.REMOVE_USER_TENANT_ID;
}
export interface ILogoutRequest {
  type: typeof USER_TYPES.LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  type: typeof USER_TYPES.LOGOUT_SUCCESS;
}

export interface ILogoutFailure {
  type: typeof USER_TYPES.LOGOUT_FAILURE;
}

export interface IForgotPasswordReq {
  type: typeof USER_TYPES.USER_FORGOT_PASSWORD_REQUEST;
  email: string;
  successCB: () => void;
}

export interface IForgotPasswordSuccess {
  type: typeof USER_TYPES.USER_FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailure {
  type: typeof USER_TYPES.USER_FORGOT_PASSWORD_FAIL;
  error: any;
}

export interface IResetPasswordReq {
  type: typeof USER_TYPES.RESET_PASSWORD_REQUEST;
  data: {
    email: string;
    password: string;
    token: string;
    successCB: () => void;
    failureCb?: (error: Error) => void;
  };
}

export interface IResetPasswordSuccess {
  type: typeof USER_TYPES.RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFail {
  type: typeof USER_TYPES.RESET_PASSWORD_FAIL;
  error: any;
}

export interface IChangePasswordReq {
  type: typeof USER_TYPES.CHANGE_PASSWORD_REQUEST;
  data: {
    user: string;
    password: string;
    tenantId: string;
    successCB: () => void;
    failureCb?: (error: Error) => void;
  };
}

export interface IChangePasswordSuccess {
  type: typeof USER_TYPES.CHANGE_PASSWORD_SUCCESS;
}

export interface IChangePasswordFail {
  type: typeof USER_TYPES.CHANGE_PASSWORD_FAIL;
  error: any;
}

export interface ICreatePasswordReq {
  type: typeof USER_TYPES.CREATE_PASSWORD_REQUEST;
  data: { email: string; password: string };
  id: string;
  successCB: () => void;
}

export interface ICreatePasswordSuccess {
  type: typeof USER_TYPES.CREATE_PASSWORD_SUCCESS;
}

export interface ICreatePasswordFail {
  type: typeof USER_TYPES.CREATE_PASSWORD_FAIL;
  error: any;
}

export interface IGetUserNameReq {
  type: typeof USER_TYPES.GET_USERNAME_FOR_PASSWORD_RESET;
  token: string;
  successCB: () => void;
}

export interface IGetUserNameSuccess {
  type: typeof USER_TYPES.GET_USERNAME_FOR_PASSWORD_RESET_SUCCESS;
  response: { email: string; username: string; is_password_set: boolean };
}

export interface IGetUserNameFail {
  type: typeof USER_TYPES.GET_USERNAME_FOR_PASSWORD_RESET_FAIL;
  error: any;
}

export interface IFetchTimezoneListRequest {
  type: typeof USER_TYPES.FETCH_TIMEZONE_LIST_REQUEST;
}

export interface IFetchTimezoneListSuccess {
  type: typeof USER_TYPES.FETCH_TIMEZONE_LIST_SUCCESS;
  payload: IFetchTimezoneListSuccessPayload;
}

export interface IFetchTimezoneListFailure {
  type: typeof USER_TYPES.FETCH_TIMEZONE_LIST_FAILURE;
}

export interface IFetchLoggedInUserRequest {
  type: typeof USER_TYPES.FETCH_LOGGED_IN_USER_REQUEST;
}

export interface IFetchLoggedInUserSuccess {
  type: typeof USER_TYPES.FETCH_LOGGED_IN_USER_SUCCESS;
  payload: IUser;
}

export interface IFetchLoggedInUserFailure {
  type: typeof USER_TYPES.FETCH_LOGGED_IN_USER_FAILURE;
}

export interface ISessionTimeout {
  type: typeof USER_TYPES.SESSION_TIMEDOUT;
  message: string;
}

export interface IResetStore {
  type: typeof USER_TYPES.RESET_STORE;
}

export interface IFetchUserByEmail {
  type: typeof USER_TYPES.FETCH_USER_BY_EMAIL;
  email: string;
  parentOrgId?: string;
  successCb?: (data: IUser) => void;
  failureCb?: (error: ApiError) => void;
}

export interface IFetchUserByEmailSuccess {
  type: typeof USER_TYPES.FETCH_USER_BY_EMAIL_SUCCESS;
}

export interface IFetchUserByEmailFail {
  type: typeof USER_TYPES.FETCH_USER_BY_EMAIL_FAIL;
}

export interface IFetchUserByIdRequest {
  type: typeof USER_TYPES.FETCH_USER_BY_ID_REQUEST;
  payload: { id: string };
  successCb?: (payload: IEditUserDetail) => void;
  failureCb?: (e: Error) => void;
}

export interface IFetchUserByIdSuccess {
  type: typeof USER_TYPES.FETCH_USER_BY_ID_SUCCESS;
  data: Omit<IUser, 'formDataId' | 'countryId' | 'role'>;
}

export interface IFetchUserByIdFailure {
  type: typeof USER_TYPES.FETCH_USER_BY_ID_FAILURE;
}

export interface IUpdateUserRequest {
  type: typeof USER_TYPES.UPDATE_USER_REQUEST;
  payload: IEditUserDetail;
  successCb?: () => void;
  failureCb?: (e: Error) => void;
}

export interface IUpdateUserSuccess {
  type: typeof USER_TYPES.UPDATE_USER_SUCCESS;
}

export interface IUpdateUserFailure {
  type: typeof USER_TYPES.UPDATE_USER_FAILURE;
}

export interface IFetchCultureListRequest {
  type: typeof USER_TYPES.FETCH_CULTURE_LIST_REQUEST;
}

export interface IFetchCultureListSuccess {
  type: typeof USER_TYPES.FETCH_CULTURE_LIST_SUCCESS;
  payload: IFetchCultureListSuccessPayload;
}

export interface IFetchCultureListFailure {
  type: typeof USER_TYPES.FETCH_CULTURE_LIST_FAILURE;
}

export interface IFetchCountryListRequest {
  type: typeof USER_TYPES.FETCH_COUNTRY_LIST_REQUEST;
}

export interface IFetchCountryListSuccess {
  type: typeof USER_TYPES.FETCH_COUNTRY_LIST_SUCCESS;
  payload: IFetchCountryListSuccessPayload;
}

export interface IFetchCountryListFailure {
  type: typeof USER_TYPES.FETCH_COUNTRY_LIST_FAILURE;
}

export interface ILockedUsers {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IFetchLockedUsersPayload {
  lockedUsers: ILockedUsers[];
  totalCount: number;
}

export interface IFetchLockedUsersRequest {
  type: typeof USER_TYPES.FETCH_LOCKED_USERS_REQUEST;
  skip: number;
  limit: number | null;
  tenantId?: string;
  search?: string;
  successCb?: (payload: IFetchLockedUsersPayload) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchLockedUsersSuccess {
  type: typeof USER_TYPES.FETCH_LOCKED_USERS_SUCCESS;
  payload: IFetchLockedUsersPayload;
}

export interface IFetchLockedUsersFailure {
  type: typeof USER_TYPES.FETCH_LOCKED_USERS_FAILURE;
}

export interface IUnlockUsersRequest {
  type: typeof USER_TYPES.UNLOCK_USERS_REQUEST;
  userId: string;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IUnlockUsersSuccess {
  type: typeof USER_TYPES.UNLOCK_USERS_SUCCESS;
}

export interface IUnlockUsersFailure {
  type: typeof USER_TYPES.UNLOCK_USERS_FAILURE;
}

export type UserActions =
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailure
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailure
  | IForgotPasswordReq
  | IForgotPasswordSuccess
  | IForgotPasswordFailure
  | IResetPasswordReq
  | IResetPasswordSuccess
  | IResetPasswordFail
  | IChangePasswordReq
  | IChangePasswordSuccess
  | IChangePasswordFail
  | ICreatePasswordReq
  | ICreatePasswordSuccess
  | ICreatePasswordFail
  | IGetUserNameReq
  | IGetUserNameSuccess
  | IGetUserNameFail
  | IFetchTimezoneListRequest
  | IFetchTimezoneListSuccess
  | IFetchTimezoneListFailure
  | IFetchLoggedInUserRequest
  | IFetchLoggedInUserSuccess
  | IFetchLoggedInUserFailure
  | ISessionTimeout
  | IResetStore
  | IFetchUserByEmail
  | IFetchUserByEmailSuccess
  | IFetchUserByEmailFail
  | IFetchUserByIdRequest
  | IFetchUserByIdSuccess
  | IFetchUserByIdFailure
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailure
  | IFetchCultureListRequest
  | IFetchCultureListSuccess
  | IFetchCultureListFailure
  | IFetchCountryListRequest
  | IFetchCountryListSuccess
  | IFetchCountryListFailure
  | IAddToken
  | IRemoveToken
  | IAddUserTenantId
  | IRemoveUserTenantId
  | IFetchLockedUsersRequest
  | IFetchLockedUsersSuccess
  | IFetchLockedUsersFailure
  | IUnlockUsersRequest
  | IUnlockUsersSuccess
  | IUnlockUsersFailure;
