import {
  changePassword,
  checkRoles,
  createPassword,
  fetchCountryList,
  fetchCultureList,
  fetchLockedUsers,
  fetchLoggedInUser,
  fetchTimezoneList,
  fetchUserById,
  getUserByEmail,
  getUsername,
  login,
  logout,
  resetPassword,
  unlockUsers,
  updateUser,
  userForgotPassword
} from '../sagas';
import { runSaga } from 'redux-saga';
import * as userService from '../../../services/userAPI';
import CryptoJS from 'crypto-js';
import APPCONSTANTS from '../../../constants/appConstants';
import * as ACTION_TYPES from '../actionTypes';
import MOCK_DATA_CONSTANTS from '../../../tests/mockData/userDataConstants';
import { AxiosResponse } from 'axios';
import * as loginActions from '../actions';
import { encryptData } from '../../../utils/commonUtils';
import sessionStorageServices from '../../../global/sessionStorageServices';
import { roleType } from '../types';

const loginRequestMockData = MOCK_DATA_CONSTANTS.MOCK_LOGIN_REQUEST;
const loggedInUserMockData = MOCK_DATA_CONSTANTS.LOGGED_IN_USER_DATA;
const token = MOCK_DATA_CONSTANTS.MOCK_TOKEN;
const userTenantID = MOCK_DATA_CONSTANTS.MOCK_USER_TENANT_ID;
const loginSuccessResponseMockData = MOCK_DATA_CONSTANTS.MOCK_USER;
const { firstName, lastName, tenantId, organizations, id, username: email, country } = loggedInUserMockData.data.entity;
const forgotPasswordRequestMockData = { email: MOCK_DATA_CONSTANTS.MOCK_LOGIN_REQUEST.username, successCB: () => null };
const resetPasswordRequestMockData = MOCK_DATA_CONSTANTS.RESET_PASSWORD_REQUEST_MOCK_DATA;
const changePasswordRequestMockData = MOCK_DATA_CONSTANTS.CHANGE_PASSWORD_REQUEST_MOCK_DATA;
const getUsernameResponseMockData = MOCK_DATA_CONSTANTS.GET_USERNAME_RESPONSE_MOCK_DATA;
const getUsernameRequestMockData = MOCK_DATA_CONSTANTS.GET_USERNAME_REQUEST_MOCK_DATA;
const createPasswordRequestMockData = MOCK_DATA_CONSTANTS.CREATE_PASSWORD_REQUEST_MOCK_DATA;
const fetchTimezoneListResponseMockData = [MOCK_DATA_CONSTANTS.FETCH_TIMEZONE_RESPONSE_PAYLOAD];
const fetchUserByIdRequestMockData = MOCK_DATA_CONSTANTS.FETCH_USER_BY_ID_REQUEST;
const fetchUserByIdResponseMockData = MOCK_DATA_CONSTANTS.FETCH_USER_RESPONSE_PAYLOAD;
const fetchUserByIdRawResponseMockData = MOCK_DATA_CONSTANTS.FETCH_USER_BACKEND_RESPONSE;
const fetchUserByEmailRequestMockData = MOCK_DATA_CONSTANTS.FETCH_USER_BY_EMAIL_REQUEST;
const updateUserRequestMockData = MOCK_DATA_CONSTANTS.UPDATE_USER_REQUEST_PAYLOAD;
const fetchCountryListResponseMockData = [MOCK_DATA_CONSTANTS.FETCH_COUNTRY_PAYLOAD];
const fetchLockedUsersRequestMockData = MOCK_DATA_CONSTANTS.FETCH_LOCKED_USERS_REQUEST;
const fetchLockedUsersResponseMockData = [MOCK_DATA_CONSTANTS.FETCH_LOCKED_USERS_RESPONSE_PAYLOAD];
const unlockUserRequestMockData = MOCK_DATA_CONSTANTS.UNLOCK_USER_REQUEST_PAYLOAD;
const fetchCultureListResponseMockData = MOCK_DATA_CONSTANTS.FETCH_CULTURE_LIST_RESPONSE_PAYLOAD;

describe('User Login', () => {
  it('Adds user tenant id and encrypted token to store', async () => {
    const { username, password } = loginRequestMockData;
    const hmac = CryptoJS.HmacSHA512(password, process.env.REACT_APP_PASSWORD_HASH_KEY as string);
    const hashedPassword = hmac.toString(CryptoJS.enc.Hex);
    const loginUserSpy = jest.spyOn(userService, 'login').mockImplementation(() => {
      return Promise.resolve({
        headers: { authorization: token, tenantid: userTenantID }
      } as AxiosResponse);
    });
    const allRoles = MOCK_DATA_CONSTANTS.ALL_ROLES;
    const fetchLoggedInUserSpy = jest.spyOn(userService, 'fetchLoggedInUser').mockImplementation(() => {
      return Promise.resolve({
        data: {
          entity: {
            username: email,
            firstName,
            lastName,
            id,
            roles: allRoles,
            tenantId,
            country,
            organizations
          }
        }
      } as AxiosResponse);
    });
    const logoutSpy = jest.spyOn(userService, 'logout').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      login,
      {
        ...loginRequestMockData,
        type: ACTION_TYPES.LOGIN_REQUEST
      }
    ).toPromise();
    const encryptedToken = encryptData(token);
    expect(loginUserSpy).toHaveBeenCalledWith(username, hashedPassword);
    expect(fetchLoggedInUserSpy).toHaveBeenCalledWith();
    expect(dispatched).toEqual([
      loginActions.addToken(encryptedToken),
      loginActions.addUserTenantID(userTenantID),
      loginActions.loginSuccess(loginSuccessResponseMockData as any)
    ]);

    const roles = allRoles.map((role: any) => role.name);
    const filteredAdminRole: roleType | any = checkRoles(Object.values(APPCONSTANTS.ROLES), roles);
    if (!filteredAdminRole) {
      const filteredAllRoles: roleType | any = checkRoles(
        [...APPCONSTANTS.SITE_ROLE_NAMES, ...APPCONSTANTS.REPORTING_ROLE_NAMES],
        roles
      );
      if (!!filteredAllRoles) {
        expect(logoutSpy).toHaveBeenCalledWith();
      } else {
        sessionStorageServices.deleteItem(APPCONSTANTS.AUTHTOKEN);
        sessionStorageServices.deleteItem(APPCONSTANTS.USER_TENANTID);
        expect(dispatched).toEqual([loginActions.removeToken(), loginActions.removeUserTenantID()]);
      }
    }
    expect(loginUserSpy).toHaveBeenCalledTimes(1);
  });

  it('User doses not have permission to log in to admin portal', async () => {
    const { username, password } = loginRequestMockData;
    const hmac = CryptoJS.HmacSHA512(password, process.env.REACT_APP_PASSWORD_HASH_KEY as string);
    const hashedPassword = hmac.toString(CryptoJS.enc.Hex)
    const loginUserSpy = jest.spyOn(userService, 'login').mockImplementation(() => {
      return Promise.resolve({
        headers: { authorization: token, tenantid: userTenantID }
      } as AxiosResponse);
    });
    const allRoles = MOCK_DATA_CONSTANTS.NO_PERMISSION_ROLE;
    const fetchLoggedInUserSpy = jest.spyOn(userService, 'fetchLoggedInUser').mockImplementation(() => {
      return Promise.resolve({
        data: {
          entity: {
            username: email,
            firstName,
            lastName,
            id,
            roles: allRoles,
            tenantId,
            country,
            organizations
          }
        }
      } as AxiosResponse);
    });
    const logoutSpy = jest.spyOn(userService, 'logout').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const error = `You don't have permission to perform this operation.`;
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      login,
      {
        ...loginRequestMockData,
        type: ACTION_TYPES.LOGIN_REQUEST
      }
    ).toPromise();
    const encryptedToken = encryptData(token);
    expect(loginUserSpy).toHaveBeenCalledWith(username, hashedPassword);
    expect(fetchLoggedInUserSpy).toHaveBeenCalledWith();
    expect(dispatched).toEqual([
      loginActions.addToken(encryptedToken),
      loginActions.addUserTenantID(userTenantID),
      loginActions.resetStore(),
      loginActions.removeToken(),
      loginActions.logoutSuccess(),
      loginActions.loginFailure({ error })
    ]);

    const roles = allRoles.map((role: any) => role.name);
    const filteredAdminRole: roleType | any = checkRoles(Object.values(APPCONSTANTS.ROLES), roles);
    if (!filteredAdminRole) {
      const filteredAllRoles: roleType | any = checkRoles(
        [...APPCONSTANTS.SITE_ROLE_NAMES, ...APPCONSTANTS.REPORTING_ROLE_NAMES],
        roles
      );
      if (!!filteredAllRoles) {
        expect(logoutSpy).toHaveBeenCalled();
      } else {
        sessionStorageServices.deleteItem(APPCONSTANTS.AUTHTOKEN);
        sessionStorageServices.deleteItem(APPCONSTANTS.USER_TENANTID);
        expect(dispatched).toEqual([loginActions.removeToken(), loginActions.removeUserTenantID()]);
      }
    }
    expect(loginUserSpy).toHaveBeenCalledTimes(2);
  });

  it('General login Error', async () => {
    const { username, password } = loginRequestMockData;
    const hmac = CryptoJS.HmacSHA512(password, process.env.REACT_APP_PASSWORD_HASH_KEY as string);
    const hashedPassword = hmac.toString(CryptoJS.enc.Hex)
    const loginUserSpy = jest.spyOn(userService, 'login').mockImplementation(() => {
      return Promise.resolve({
        headers: { authorization: token, tenantid: userTenantID }
      } as AxiosResponse);
    });
    const allRoles = MOCK_DATA_CONSTANTS.INVALID_ROLE;
    const fetchLoggedInUserSpy = jest.spyOn(userService, 'fetchLoggedInUser').mockImplementation(() => {
      return Promise.resolve({
        data: {
          entity: {
            username: email,
            firstName,
            lastName,
            id,
            roles: allRoles,
            tenantId,
            country,
            organizations
          }
        }
      } as AxiosResponse);
    });
    const logoutSpy = jest.spyOn(userService, 'logout').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const error = 'Unable to login. Please try after sometime.';
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      login,
      {
        ...loginRequestMockData,
        type: ACTION_TYPES.LOGIN_REQUEST
      }
    ).toPromise();
    const encryptedToken = encryptData(token);
    expect(loginUserSpy).toHaveBeenCalledWith(username, hashedPassword);
    expect(fetchLoggedInUserSpy).toHaveBeenCalledWith();

    const roles = allRoles.map((role: any) => role.name);
    const filteredAdminRole: roleType | any = checkRoles(Object.values(APPCONSTANTS.ROLES), roles);
    if (!filteredAdminRole) {
      const filteredAllRoles: roleType | any = checkRoles(
        [...APPCONSTANTS.SITE_ROLE_NAMES, ...APPCONSTANTS.REPORTING_ROLE_NAMES],
        roles
      );
      if (!!filteredAllRoles) {
        expect(logoutSpy).toHaveBeenCalled();
      } else {
        sessionStorageServices.deleteItem(APPCONSTANTS.AUTHTOKEN);
        sessionStorageServices.deleteItem(APPCONSTANTS.USER_TENANTID);
        expect(dispatched).toEqual([
          loginActions.addToken(encryptedToken),
          loginActions.addUserTenantID(userTenantID),
          loginActions.removeToken(),
          loginActions.removeUserTenantID(),
          loginActions.loginFailure({ error })
        ]);
      }
    }
    expect(loginUserSpy).toHaveBeenCalledTimes(3);
  });
});

describe('User Logout', () => {
  it('Fails to logout user', async () => {
    const logoutSpy = jest.spyOn(userService, 'logout').mockImplementation(() => {
      return Promise.reject();
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      logout
    ).toPromise();
    expect(logoutSpy).toHaveBeenCalled();
    expect(dispatched).toEqual([
      loginActions.removeToken(),
      loginActions.removeUserTenantID(),
      loginActions.logoutFailure()
    ]);
  });
});

describe('Forgot Password', () => {
  it('Forgot password email sent', async () => {
    const forgotPasswordSpy = jest.spyOn(userService, 'forgotPassword').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      userForgotPassword,
      forgotPasswordRequestMockData
    ).toPromise();
    expect(forgotPasswordSpy).toHaveBeenCalledWith(forgotPasswordRequestMockData.email);
    expect(dispatched).toEqual([loginActions.forgotPasswordSuccess()]);
  });

  it('Failed to send forgot password email', async () => {
    const error = new Error('Failed to send forgot password email');
    const forgotPasswordSpy = jest.spyOn(userService, 'forgotPassword').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      userForgotPassword,
      forgotPasswordRequestMockData
    ).toPromise();
    expect(forgotPasswordSpy).toHaveBeenCalledWith(forgotPasswordRequestMockData.email);
    expect(dispatched).toEqual([loginActions.forgotPasswordFail(error)]);
  });
});

describe('Reset Password', () => {
  it('Reset Password executed Successfully', async () => {
    const { email: requestEmail, password, token: requestToken } = resetPasswordRequestMockData;
    const resetPasswordSpy = jest.spyOn(userService, 'resetPasswordReq').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      resetPassword,
      { data: resetPasswordRequestMockData, type: ACTION_TYPES.RESET_PASSWORD_REQUEST }
    ).toPromise();
    expect(resetPasswordSpy).toHaveBeenCalledWith({ email: requestEmail, password }, requestToken);
    expect(dispatched).toEqual([loginActions.resetPasswordSuccess()]);
  });

  it('Failed to execute Reset Password', async () => {
    const { email: requestEmail, password, token: requestToken } = resetPasswordRequestMockData;
    const error = new Error('Reset Password failed');
    const resetPasswordSpy = jest.spyOn(userService, 'resetPasswordReq').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      resetPassword,
      { data: resetPasswordRequestMockData, type: ACTION_TYPES.RESET_PASSWORD_REQUEST }
    ).toPromise();
    expect(resetPasswordSpy).toHaveBeenCalledWith({ email: requestEmail, password }, requestToken);
    expect(dispatched).toEqual([loginActions.resetPasswordFail(error)]);
  });
});

describe('Change Password', () => {
  it('Change Password executed Successfully', async () => {
    const { user, password } = changePasswordRequestMockData;
    const changePasswordSpy = jest.spyOn(userService, 'changePasswordReq').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      changePassword,
      { data: changePasswordRequestMockData, type: ACTION_TYPES.CHANGE_PASSWORD_REQUEST }
    ).toPromise();
    expect(changePasswordSpy).toHaveBeenCalledWith({ userId: user, newPassword: password });
    expect(dispatched).toEqual([loginActions.changePasswordSuccess()]);
  });

  it('Failed to execute Change Password', async () => {
    const error = new Error('Change Password failed');
    const { user, password } = changePasswordRequestMockData;
    const changePasswordSpy = jest.spyOn(userService, 'changePasswordReq').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      changePassword,
      { data: changePasswordRequestMockData, type: ACTION_TYPES.CHANGE_PASSWORD_REQUEST }
    ).toPromise();
    expect(changePasswordSpy).toHaveBeenCalledWith({ userId: user, newPassword: password });
    expect(dispatched).toEqual([loginActions.changePasswordFail(error)]);
  });
});

describe('Get Username', () => {
  it('Get username executed Successfully', async () => {
    const { token: requestToken, successCB } = getUsernameRequestMockData;
    const getUsernameSpy = jest.spyOn(userService, 'getUsername').mockImplementation(() => {
      return Promise.resolve({ data: { entity: getUsernameResponseMockData } } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      getUsername,
      { token, type: ACTION_TYPES.GET_USERNAME_FOR_PASSWORD_RESET, successCB }
    ).toPromise();
    const reqData = {
      username: getUsernameResponseMockData.username,
      email: getUsernameResponseMockData.username,
      is_password_set: getUsernameResponseMockData.isPasswordSet
    };
    expect(getUsernameSpy).toHaveBeenCalledWith(requestToken);
    expect(dispatched).toEqual([loginActions.getUserNameSuccess(reqData)]);
  });

  it('Failed to get username', async () => {
    const error = new Error('Failed to get username');
    const { token: requestToken, successCB } = getUsernameRequestMockData;
    const getUsernameSpy = jest.spyOn(userService, 'getUsername').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      getUsername,
      { token, type: ACTION_TYPES.GET_USERNAME_FOR_PASSWORD_RESET, successCB }
    ).toPromise();
    expect(getUsernameSpy).toHaveBeenCalledWith(requestToken);
    expect(dispatched).toEqual([loginActions.getUserNameFail(error)]);
  });
});

describe('Create Password', () => {
  it('Create Password executed Successfully', async () => {
    const { data, id: requestId } = createPasswordRequestMockData;
    const createPasswordSpy = jest.spyOn(userService, 'createPassword').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createPassword,
      { ...createPasswordRequestMockData, type: ACTION_TYPES.CREATE_PASSWORD_REQUEST }
    ).toPromise();
    expect(createPasswordSpy).toHaveBeenCalledWith(data, requestId);
    expect(dispatched).toEqual([loginActions.createPasswordSuccess()]);
  });

  it('Failed to create password', async () => {
    const error = new Error('Failed to create password');
    const { data, id: requestId } = createPasswordRequestMockData;
    const createPasswordSpy = jest.spyOn(userService, 'createPassword').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createPassword,
      { ...createPasswordRequestMockData, type: ACTION_TYPES.CREATE_PASSWORD_REQUEST }
    ).toPromise();
    expect(createPasswordSpy).toHaveBeenCalledWith(data, requestId);
    expect(dispatched).toEqual([loginActions.createpasswordFail(error.message as any)]);
  });
});

describe('Fetch Logged in user', () => {
  it('Fetches details of the user who is logged in', async () => {
    const allRoles = MOCK_DATA_CONSTANTS.ALL_ROLES;
    const fetchLoggedInUserSpy = jest.spyOn(userService, 'fetchLoggedInUser').mockImplementation(() => {
      return Promise.resolve({
        data: {
          entity: {
            username: email,
            firstName,
            lastName,
            id,
            roles: allRoles,
            tenantId,
            country,
            organizations
          }
        }
      } as AxiosResponse);
    });
    const logoutSpy = jest.spyOn(userService, 'logout').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchLoggedInUser
    ).toPromise();
    expect(fetchLoggedInUserSpy).toHaveBeenCalledWith();
    const roles = allRoles.map((role: any) => role.name);
    const filteredAdminRole: roleType | any = checkRoles(Object.values(APPCONSTANTS.ROLES), roles);
    if (!filteredAdminRole) {
      const filteredAllRoles: roleType | any = checkRoles(
        [...APPCONSTANTS.SITE_ROLE_NAMES, ...APPCONSTANTS.REPORTING_ROLE_NAMES],
        roles
      );
      if (!!filteredAllRoles) {
        expect(logoutSpy).toHaveBeenCalledWith();
      } else {
        sessionStorageServices.deleteItem(APPCONSTANTS.AUTHTOKEN);
        sessionStorageServices.deleteItem(APPCONSTANTS.USER_TENANTID);
        expect(dispatched).toEqual([loginActions.removeToken(), loginActions.removeUserTenantID()]);
      }
    }
    const payload = {
      email,
      firstName,
      lastName,
      userId: id,
      role: filteredAdminRole,
      tenantId,
      formDataId: organizations[0]?.formDataId,
      countryId: country
    };
    expect(dispatched).toEqual([loginActions.fetchLoggedInUserSuccess(payload as any)]);
  });

  it('Doesnt allow to fetch details of the user who is logged in', async () => {
    const allRoles = MOCK_DATA_CONSTANTS.NO_PERMISSION_ROLE;
    const fetchLoggedInUserSpy = jest.spyOn(userService, 'fetchLoggedInUser').mockImplementation(() => {
      return Promise.resolve({
        data: {
          entity: {
            username: email,
            firstName,
            lastName,
            id,
            roles: allRoles,
            tenantId,
            country,
            organizations
          }
        }
      } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchLoggedInUser
    ).toPromise();
    expect(fetchLoggedInUserSpy).toHaveBeenCalledWith();
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
        expect(dispatched).toEqual([loginActions.removeToken(), loginActions.removeUserTenantID()]);
      }
    }
    const payload = {
      email,
      firstName,
      lastName,
      userId: id,
      role: filteredAdminRole,
      tenantId,
      formDataId: organizations[0]?.formDataId,
      countryId: country
    };
    expect(dispatched).toEqual([loginActions.fetchLoggedInUserSuccess(payload as any)]);
  });

  it('Fetch Logged in user for user with no roles', async () => {
    const allRoles = MOCK_DATA_CONSTANTS.INVALID_ROLE;
    const fetchLoggedInUserSpy = jest.spyOn(userService, 'fetchLoggedInUser').mockImplementation(() => {
      return Promise.resolve({
        data: {
          entity: {
            username: email,
            firstName,
            lastName,
            id,
            roles: allRoles,
            tenantId,
            country,
            organizations
          }
        }
      } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchLoggedInUser
    ).toPromise();
    expect(fetchLoggedInUserSpy).toHaveBeenCalledWith();
    const roles = allRoles.map((role: any) => role.name);
    const filteredAdminRole: roleType | any = checkRoles(Object.values(APPCONSTANTS.ROLES), roles);
    if (!filteredAdminRole) {
      const filteredAllRoles: roleType | any = checkRoles(
        [...APPCONSTANTS.SITE_ROLE_NAMES, ...APPCONSTANTS.REPORTING_ROLE_NAMES],
        roles
      );
      if (!!filteredAllRoles) {
        sessionStorageServices.deleteItem(APPCONSTANTS.AUTHTOKEN);
        sessionStorageServices.deleteItem(APPCONSTANTS.USER_TENANTID);
        expect(dispatched).toEqual([loginActions.removeToken(), loginActions.removeUserTenantID()]);
      }
    }
    expect(dispatched).toEqual([
      loginActions.removeToken(),
      loginActions.removeUserTenantID(),
      loginActions.fetchLoggedInUserFail()
    ]);
  });
});

describe('Fetch Timezone List', () => {
  it('Fetches list of timezones Successfully', async () => {
    const fetchTimezoneListSpy = jest.spyOn(userService, 'fetchTimezoneList').mockImplementation(() => {
      return Promise.resolve({ data: fetchTimezoneListResponseMockData } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchTimezoneList
    ).toPromise();
    expect(fetchTimezoneListSpy).toHaveBeenCalled();
    expect(dispatched).toEqual([loginActions.fetchTimezoneListSuccess(fetchTimezoneListResponseMockData)]);
  });

  it('Fails to fetch list of timezones', async () => {
    const fetchTimezoneListSpy = jest.spyOn(userService, 'fetchTimezoneList').mockImplementation(() => {
      return Promise.reject();
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchTimezoneList
    ).toPromise();
    expect(fetchTimezoneListSpy).toHaveBeenCalled();
    expect(dispatched).toEqual([loginActions.fetchTimezoneListFailure()]);
  });
});

describe('Fetch User by id', () => {
  it('Fetches single user by id', async () => {
    const fetchUserByIdSpy = jest.spyOn(userService, 'fetchUserById').mockImplementation(() => {
      return Promise.resolve({ data: fetchUserByIdRawResponseMockData } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchUserById,
      { payload: fetchUserByIdRequestMockData, type: ACTION_TYPES.FETCH_USER_BY_ID_REQUEST }
    ).toPromise();
    expect(fetchUserByIdSpy).toHaveBeenCalledWith(fetchUserByIdRequestMockData);
    expect(dispatched).toEqual([loginActions.fetchUserByIdSuccess(fetchUserByIdResponseMockData)]);
  });

  it('Fails to fetch user by id', async () => {
    const error = new Error('Failed to fetch user');
    const fetchUserByIdSpy = jest.spyOn(userService, 'fetchUserById').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchUserById,
      { payload: fetchUserByIdRequestMockData, type: ACTION_TYPES.FETCH_USER_BY_ID_REQUEST }
    ).toPromise();
    expect(fetchUserByIdSpy).toHaveBeenCalledWith(fetchUserByIdRequestMockData);
    expect(dispatched).toEqual([loginActions.fetchUserByIdFailure()]);
  });
});

describe('Fetch User by Email', () => {
  it('Fetches single user by email', async () => {
    const fetchUserByEmailSpy = jest.spyOn(userService, 'fetchUserByEmail').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      getUserByEmail,
      {
        email: fetchUserByEmailRequestMockData.email,
        parentOrgId: fetchUserByEmailRequestMockData.parentOrgId,
        type: ACTION_TYPES.FETCH_USER_BY_EMAIL
      }
    ).toPromise();
    expect(fetchUserByEmailSpy).toHaveBeenCalledWith(
      fetchUserByEmailRequestMockData.email,
      fetchUserByEmailRequestMockData.parentOrgId
    );
    expect(dispatched).toEqual([loginActions.fetchUserByEmailSuccess()]);
  });

  it('Fails to fetch user by email', async () => {
    const fetchUserByEmailSpy = jest.spyOn(userService, 'fetchUserByEmail').mockImplementation(() => {
      return Promise.reject();
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      getUserByEmail,
      {
        email: fetchUserByEmailRequestMockData.email,
        parentOrgId: fetchUserByEmailRequestMockData.parentOrgId,
        type: ACTION_TYPES.FETCH_USER_BY_EMAIL
      }
    ).toPromise();
    expect(fetchUserByEmailSpy).toHaveBeenCalledWith(
      fetchUserByEmailRequestMockData.email,
      fetchUserByEmailRequestMockData.parentOrgId
    );
    expect(dispatched).toEqual([loginActions.fetchUserByEmailFail()]);
  });
});

describe('Update User', () => {
  it('Update a single user', async () => {
    const updateUserSpy = jest.spyOn(userService, 'updateUser').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateUser,
      {
        payload: updateUserRequestMockData,
        type: ACTION_TYPES.UPDATE_USER_REQUEST
      }
    ).toPromise();
    expect(updateUserSpy).toHaveBeenCalledWith(updateUserRequestMockData);
    expect(dispatched).toEqual([loginActions.updateUserSuccess()]);
  });

  it('Fails to update user', async () => {
    const error = new Error('Failed to update user');
    const updateUserSpy = jest.spyOn(userService, 'updateUser').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateUser,
      {
        payload: updateUserRequestMockData,
        type: ACTION_TYPES.UPDATE_USER_REQUEST
      }
    ).toPromise();
    expect(updateUserSpy).toHaveBeenCalledWith(updateUserRequestMockData);
    expect(dispatched).toEqual([loginActions.updateUserFailure()]);
  });
});

describe('Fetch Country List', () => {
  it('Fetches a list of countries', async () => {
    const fetchCountryListSpy = jest.spyOn(userService, 'fetchCountryList').mockImplementation(() => {
      return Promise.resolve({ data: { entityList: fetchCountryListResponseMockData } } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchCountryList
    ).toPromise();
    expect(fetchCountryListSpy).toHaveBeenCalledWith();
    expect(dispatched).toEqual([loginActions.fetchCountryListSuccess(fetchCountryListResponseMockData)]);
  });

  it('Failed to fetch a list of countries', async () => {
    const fetchCountryListSpy = jest.spyOn(userService, 'fetchCountryList').mockImplementation(() => {
      return Promise.reject();
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchCountryList
    ).toPromise();
    expect(fetchCountryListSpy).toHaveBeenCalledWith();
    expect(dispatched).toEqual([loginActions.fetchCountryListFailure()]);
  });
});

describe('Fetch Locked users', () => {
  it('Fetches a list of locked users', async () => {
    const fetchLockedUsersListSpy = jest.spyOn(userService, 'fetchLockedUsers').mockImplementation(() => {
      return Promise.resolve({
        data: { entityList: fetchLockedUsersResponseMockData, totalCount: 10 }
      } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchLockedUsers,
      { ...fetchLockedUsersRequestMockData, type: ACTION_TYPES.FETCH_LOCKED_USERS_REQUEST }
    ).toPromise();
    expect(fetchLockedUsersListSpy).toHaveBeenCalledWith('2', 0, null, 'Sample');
    expect(dispatched).toEqual([
      loginActions.fetchLockedUsersSuccess({ lockedUsers: fetchLockedUsersResponseMockData, totalCount: 10 })
    ]);
  });

  it('Failed to fetch list of locked users', async () => {
    const error = new Error('Failed to fetch locked users list');
    const fetchLockedUsersListSpy = jest.spyOn(userService, 'fetchLockedUsers').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchLockedUsers,
      { ...fetchLockedUsersRequestMockData, type: ACTION_TYPES.FETCH_LOCKED_USERS_REQUEST }
    ).toPromise();
    expect(fetchLockedUsersListSpy).toHaveBeenCalledWith('2', 0, null, 'Sample');
    expect(dispatched).toEqual([loginActions.fetchLockedUsersFailure()]);
  });
});

describe('Unlock a user', () => {
  it('Unlocks a user', async () => {
    const unlockUsersListSpy = jest.spyOn(userService, 'unlockUsers').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      unlockUsers,
      { ...unlockUserRequestMockData, type: ACTION_TYPES.UNLOCK_USERS_REQUEST }
    ).toPromise();
    expect(unlockUsersListSpy).toHaveBeenCalledWith(unlockUserRequestMockData.userId);
    expect(dispatched).toEqual([loginActions.unlockUsersSuccess()]);
  });

  it('Fails to unlock user', async () => {
    const error = new Error('Failed to unlock user');
    const unlockUsersListSpy = jest.spyOn(userService, 'unlockUsers').mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      unlockUsers,
      { ...unlockUserRequestMockData, type: ACTION_TYPES.UNLOCK_USERS_REQUEST }
    ).toPromise();
    expect(unlockUsersListSpy).toHaveBeenCalledWith(unlockUserRequestMockData.userId);
    expect(dispatched).toEqual([loginActions.unlockUsersFailure()]);
  });
});

describe('Fetch Culture list', () => {
  it('Fetches Culture list', async () => {
    const fetchCultureListSpy = jest.spyOn(userService, 'fetchCultureList').mockImplementation(() => {
      return Promise.resolve({
        data: { entityList: fetchCultureListResponseMockData }
      } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchCultureList
    ).toPromise();
    expect(fetchCultureListSpy).toHaveBeenCalled();
    expect(dispatched).toEqual([loginActions.fetchCultureListSuccess(fetchCultureListResponseMockData)]);
  });

  it('Fails to fetch Culture list', async () => {
    const error = new Error('Failed to fetch culture list');
    const fetchCultureListSpy = jest.spyOn(userService, 'fetchCultureList').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchCultureList
    ).toPromise();
    expect(fetchCultureListSpy).toHaveBeenCalled();
    expect(dispatched).toEqual([loginActions.fetchCultureListFailure()]);
  });
});
