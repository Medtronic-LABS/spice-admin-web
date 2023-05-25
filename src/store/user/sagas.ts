import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as userActions from './actions';
import { IActionProps } from '../../typings/global';
import * as USERTYPES from './actionTypes';
import {
  IFetchUserByIdRequest,
  IFetchUserByEmail,
  ILoginRequest,
  IUser,
  IUpdateUserRequest,
  roleType,
  IFetchLockedUsersRequest,
  IUnlockUsersRequest
} from './types';
import * as userService from '../../services/userAPI';
import APPCONSTANTS from '../../constants/appConstants';
import sessionStorageServices from '../../global/sessionStorageServices';
import localStorageServices from '../../global/localStorageServices';
import { encryptData } from '../../utils/commonUtils';
import { success, error } from '../../utils/toastCenter';
import ApiError from '../../global/ApiError';
import ERRORS from '../../constants/errors';
import CryptoJS from 'crypto-js';

export const checkRoles = (rolesArray: string[] = [], roles: string[] = []) =>
  roles.length && rolesArray.find((role) => roles.includes(role));

/*
  Worker Saga: Fired on LOGIN_REQUEST action
*/
export function* login({ username, password, rememberMe, successCb, failureCb }: ILoginRequest): SagaIterator {
  try {
    const hmac = CryptoJS.HmacSHA512(password, process.env.REACT_APP_PASSWORD_HASH_KEY as string);
    const hashedPassword = hmac.toString(CryptoJS.enc.Hex);
    const {
      headers: { authorization: token, tenantid: userTenantID }
    } = yield call(userService.login, username, hashedPassword);
    const encryptedToken = encryptData(token);
    sessionStorageServices.setItem(APPCONSTANTS.APP_VERSION, null);
    sessionStorageServices.setItem(APPCONSTANTS.AUTHTOKEN, encryptedToken);
    sessionStorageServices.setItem('iLi', true);
    sessionStorageServices.setItem(APPCONSTANTS.USER_TENANTID, userTenantID);
    yield put(userActions.addToken(encryptedToken));
    yield put(userActions.addUserTenantID(userTenantID));
    const {
      data: {
        entity: {
          username: email,
          firstName,
          lastName,
          id: userId,
          roles: allRoles,
          tenantId,
          country: countryId,
          organizations
        }
      }
    } = yield call(userService.fetchLoggedInUser);
    sessionStorageServices.setItem(APPCONSTANTS.USER_TENANTID, tenantId);
    sessionStorageServices.setItem(APPCONSTANTS.COUNTRY_TENANT_ID, countryId?.tenantId);
    const roles = allRoles.map((role: any) => role.name);
    const filteredAdminRole: roleType | any = checkRoles(Object.values(APPCONSTANTS.ROLES), roles);
    if (!filteredAdminRole) {
      const filteredAllRoles: roleType | any = checkRoles(
        [...APPCONSTANTS.SITE_ROLE_NAMES, ...APPCONSTANTS.REPORTING_ROLE_NAMES],
        roles
      );
      if (!!filteredAllRoles) {
        yield call(logout);
        throw new Error(ERRORS.UNAUTHORIZED.message);
      } else {
        sessionStorageServices.deleteItem(APPCONSTANTS.AUTHTOKEN);
        sessionStorageServices.deleteItem(APPCONSTANTS.USER_TENANTID);
        yield put(userActions.removeToken());
        yield put(userActions.removeUserTenantID());
        throw new Error(APPCONSTANTS.LOGIN_GENERAL_ERROR);
      }
    }
    sessionStorageServices.setItem(APPCONSTANTS.TENANT_ID, tenantId);
    updateRememberMe(username, password, rememberMe);
    const payload: IUser = {
      email,
      firstName,
      lastName,
      userId,
      role: filteredAdminRole,
      tenantId,
      formDataId: organizations[0]?.formDataId,
      countryId
    };
    successCb?.(payload);
    yield put(userActions.loginSuccess(payload));
  } catch (e: any) {
    failureCb?.(e);
    yield put(userActions.loginFailure({ error: e.message }));
  }
}

/*
  Worker Saga: Fired on LOGOUT_REQUEST action
*/
export function* logout(): SagaIterator {
  const token = sessionStorageServices.getItem(APPCONSTANTS.AUTHTOKEN);
  try {
    yield call(userService.logout, token);
    sessionStorageServices.clearAllItem();
    yield put(userActions.resetStore());
    yield put(userActions.removeToken());
    yield put(userActions.logoutSuccess());
  } catch (e) {
    sessionStorageServices.deleteItem(APPCONSTANTS.AUTHTOKEN);
    sessionStorageServices.deleteItem(APPCONSTANTS.USER_TENANTID);
    yield put(userActions.removeToken());
    yield put(userActions.removeUserTenantID());
    yield put(userActions.logoutFailure());
  }
}

function updateRememberMe(username: string, password: string, rememberMe: boolean) {
  try {
    if (rememberMe) {
      localStorageServices.setItems([
        { key: APPCONSTANTS.USERNAME, value: username },
        { key: APPCONSTANTS.PASSWORD, value: encryptData(password) },
        { key: APPCONSTANTS.REMEMBER_ME, value: rememberMe }
      ]);
    } else {
      localStorageServices.deleteItems([APPCONSTANTS.USERNAME, APPCONSTANTS.PASSWORD, APPCONSTANTS.REMEMBER_ME]);
    }
  } catch (e) {
    console.error('Error occured', e);
  }
}

/*
  Worker Saga: Fired on USER_FORGOT_PASSWORD_REQUEST action
*/
export function* userForgotPassword(action: any) {
  const { email, successCB } = action;
  try {
    yield call(userService.forgotPassword, email.toLowerCase());
    yield put(userActions.forgotPasswordSuccess());
    success(APPCONSTANTS.SUCCESS, APPCONSTANTS.PASSWORD_RESET_EMAIL_SENT_MESSAGE);
    successCB();
  } catch (e: any) {
    error(APPCONSTANTS.ALERT, e.message);
    yield put(userActions.forgotPasswordFail(e));
  }
}

/*
  Worker Saga: Fired on RESET_PASSWORD_REQUEST action
*/
export function* resetPassword(action: IActionProps) {
  const { email, password, token, successCB, failureCb } = action.data;
  try {
    yield call(userService.resetPasswordReq, { email, password }, token);
    yield put(userActions.resetPasswordSuccess());
    success(APPCONSTANTS.SUCCESS, APPCONSTANTS.PASSWORD_SET_SUCCESS);
    successCB();
  } catch (e: any) {
    failureCb?.(e);
    yield put(userActions.resetPasswordFail(e));
    const message = e?.message || APPCONSTANTS.PASSWORD_SET_FAILED;
    error(APPCONSTANTS.ALERT, message);
  }
}

/*
  Worker Saga: Fired on CHANGE_PASSWORD_REQUEST action
*/
export function* changePassword(action: IActionProps) {
  const { user, password, tenantId, successCB, failureCb } = action.data;
  try {
    yield call(userService.changePasswordReq, { userId: user, newPassword: password, tenantId });
    yield put(userActions.changePasswordSuccess());
    successCB();
  } catch (e: any) {
    failureCb?.(e);
    yield put(userActions.changePasswordFail(e));
  }
}

/*
  Worker Saga: Fired on GET_USERNAME_FOR_PASSWORD_RESET action
*/
export function* getUsername(action: IActionProps): SagaIterator {
  const { token, successCB } = action;
  try {
    const {
      data: { entity }
    } = yield call(userService.getUsername, token);
    const reqData = {
      username: entity.username,
      email: entity.username,
      is_password_set: entity.isPasswordSet
    };
    yield put(userActions.getUserNameSuccess(reqData));
    successCB();
  } catch (e) {
    yield put(userActions.getUserNameFail(e));
  }
}

/*
  Worker Saga: Fired on CREATE_PASSWORD_REQUEST action
*/
export function* createPassword(action: IActionProps) {
  const { data, id, successCB } = action;
  try {
    yield call(userService.createPassword, data, id);
    yield put(userActions.createPasswordSuccess());
    success(APPCONSTANTS.SUCCESS, APPCONSTANTS.PASSWORD_SET_SUCCESS);
    successCB();
  } catch (e: any) {
    yield put(userActions.createpasswordFail(e.message));
    error(APPCONSTANTS.ALERT, APPCONSTANTS.PASSWORD_SET_FAILED);
  }
}

/*
  Worker Saga: Fired on FETCH_TIMEZONE_LIST_REQUEST action
*/
export function* fetchTimezoneList(): SagaIterator {
  try {
    const { data: timezoneList } = yield call(userService.fetchTimezoneList);
    yield put(userActions.fetchTimezoneListSuccess(timezoneList));
  } catch (e) {
    yield put(userActions.fetchTimezoneListFailure());
  }
}

/*
  Worker Saga: Fired on FETCH_LOGGED_IN_USER_REQUEST action
*/
export function* fetchLoggedInUser(): SagaIterator {
  try {
    const {
      data: {
        entity: {
          username: email,
          firstName,
          lastName,
          id: userId,
          roles: allRoles,
          tenantId,
          country: countryId,
          organizations
        }
      }
    } = yield call(userService.fetchLoggedInUser);
    if (tenantId) {
      sessionStorageServices.setItem(APPCONSTANTS.USER_TENANTID, tenantId);
    }
    if (countryId?.tenantId) {
      sessionStorageServices.setItem(APPCONSTANTS.COUNTRY_TENANT_ID, countryId?.tenantId);
    }
    const roles = allRoles.map((role: any) => role.name);
    const filteredAdminRole: roleType | any = checkRoles(Object.values(APPCONSTANTS.ROLES), roles);
    if (!filteredAdminRole) {
      const filteredAllRoles: roleType | any = checkRoles(
        [...APPCONSTANTS.SITE_ROLE_NAMES, ...APPCONSTANTS.REPORTING_ROLE_NAMES],
        roles
      );
      if (!filteredAllRoles) {
        sessionStorageServices.deleteItem(APPCONSTANTS.AUTHTOKEN);
        sessionStorageServices.deleteItem(APPCONSTANTS.USER_TENANTID);
        yield put(userActions.removeToken());
        yield put(userActions.removeUserTenantID());
        throw new Error(APPCONSTANTS.LOGIN_GENERAL_ERROR);
      }
    }
    const payload: IUser = {
      email,
      firstName,
      lastName,
      userId,
      role: filteredAdminRole,
      tenantId,
      formDataId: organizations[0]?.formDataId,
      countryId
    };
    yield put(userActions.fetchLoggedInUserSuccess(payload));
  } catch (e) {
    yield put(userActions.fetchLoggedInUserFail());
  }
}

/*
  Worker Saga: Fired on FETCH_USER_BY_EMAIL action
*/
export function* getUserByEmail({ email, parentOrgId, successCb, failureCb }: IFetchUserByEmail): SagaIterator {
  try {
    const { data } = yield call(userService.fetchUserByEmail, email, parentOrgId);
    successCb?.(data);
    yield put(userActions.fetchUserByEmailSuccess());
  } catch (e) {
    if (e instanceof ApiError) {
      failureCb?.(e);
    }
    yield put(userActions.fetchUserByEmailFail());
  }
}

/*
  Worker Saga: Fired on FETCH_USER_BY_ID_REQUEST action
*/
export function* fetchUserById(action: IFetchUserByIdRequest): SagaIterator {
  try {
    const { data } = yield call(userService.fetchUserById, action.payload);
    data.roleName = data.defaultRoleName;
    action.successCb?.(data);
    const { username: email, firstName, lastName, id: userId, tenantId } = data;
    const payload: Omit<IUser, 'formDataId' | 'countryId' | 'role'> = {
      email,
      firstName,
      lastName,
      userId,
      tenantId
    };
    yield put(userActions.fetchUserByIdSuccess(payload));
  } catch (e) {
    if (e instanceof Error) {
      action.failureCb?.(e);
    }
    yield put(userActions.fetchUserByIdFailure());
  }
}

/*
  Worker Saga: Fired on UPDATE_USER_REQUEST action
*/
export function* updateUser(action: IUpdateUserRequest): SagaIterator {
  try {
    yield call(userService.updateUser, action.payload);
    action.successCb?.();
    yield put(userActions.updateUserSuccess());
  } catch (e) {
    if (e instanceof Error) {
      action.failureCb?.(e);
    }
    yield put(userActions.updateUserFailure());
  }
}

/*
  Worker Saga: Fired on FETCH_CULTURE_LIST_REQUEST action
*/
export function* fetchCultureList(): SagaIterator {
  try {
    const {
      data: { entityList: cultureList }
    } = yield call(userService.fetchCultureList);
    yield put(userActions.fetchCultureListSuccess(cultureList || []));
  } catch (e) {
    yield put(userActions.fetchCultureListFailure());
  }
}

/*
  Worker Saga: Fired on FETCH_COUNTRY_LIST_REQUEST action
*/
export function* fetchCountryList(): SagaIterator {
  try {
    const {
      data: { entityList: countryList }
    } = yield call(userService.fetchCountryList);
    yield put(userActions.fetchCountryListSuccess(countryList || []));
  } catch (e) {
    yield put(userActions.fetchCountryListFailure());
  }
}

/*
  Worker Saga: Fired on FETCH_LOCKED_USERS_REQUEST action
*/
export function* fetchLockedUsers({
  tenantId,
  skip,
  limit,
  search,
  successCb,
  failureCb
}: IFetchLockedUsersRequest): SagaIterator {
  try {
    const {
      data: { entityList: lockedUsers, totalCount }
    } = yield call(userService.fetchLockedUsers as any, tenantId, skip, limit, search);
    successCb?.(lockedUsers || []);
    yield put(userActions.fetchLockedUsersSuccess({ lockedUsers: lockedUsers || [], totalCount }));
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(userActions.fetchLockedUsersFailure());
    }
  }
}

/*
  Worker Saga: Fired on UNLOCK_USERS_REQUEST action
*/
export function* unlockUsers({ userId, successCb, failureCb }: IUnlockUsersRequest): SagaIterator {
  try {
    yield call(userService.unlockUsers as any, userId);
    successCb?.();
    yield put(userActions.unlockUsersSuccess());
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(userActions.unlockUsersFailure());
    }
  }
}

/*
  Starts worker saga on latest dispatched `LOGIN_REQUEST` action.
  Allows concurrent increments.
*/
function* userSaga() {
  yield all([takeLatest(USERTYPES.LOGIN_REQUEST, login)]);
  yield all([takeLatest(USERTYPES.LOGOUT_REQUEST, logout)]);
  yield all([takeLatest(USERTYPES.USER_FORGOT_PASSWORD_REQUEST, userForgotPassword)]);
  yield all([takeLatest(USERTYPES.RESET_PASSWORD_REQUEST, resetPassword)]);
  yield all([takeLatest(USERTYPES.CHANGE_PASSWORD_REQUEST, changePassword)]);
  yield all([takeLatest(USERTYPES.GET_USERNAME_FOR_PASSWORD_RESET, getUsername)]);
  yield all([takeLatest(USERTYPES.CREATE_PASSWORD_REQUEST, createPassword)]);
  yield all([takeLatest(USERTYPES.FETCH_TIMEZONE_LIST_REQUEST, fetchTimezoneList)]);
  yield all([takeLatest(USERTYPES.FETCH_CULTURE_LIST_REQUEST, fetchCultureList)]);
  yield takeLatest(USERTYPES.FETCH_LOGGED_IN_USER_REQUEST, fetchLoggedInUser);
  yield all([takeLatest(USERTYPES.FETCH_USER_BY_EMAIL, getUserByEmail)]);
  yield all([takeLatest(USERTYPES.FETCH_USER_BY_ID_REQUEST, fetchUserById)]);
  yield all([takeLatest(USERTYPES.UPDATE_USER_REQUEST, updateUser)]);
  yield all([takeLatest(USERTYPES.FETCH_COUNTRY_LIST_REQUEST, fetchCountryList)]);
  yield all([takeLatest(USERTYPES.FETCH_LOCKED_USERS_REQUEST, fetchLockedUsers)]);
  yield all([takeLatest(USERTYPES.UNLOCK_USERS_REQUEST, unlockUsers)]);
}

export default userSaga;
