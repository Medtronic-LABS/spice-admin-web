import axios, { AxiosResponse } from 'axios';

import ApiError from './ApiError';
import ERRORS from '../constants/errors';
import APPCONSTANTS from '../constants/appConstants';
import { fetchLoggedInUser, resetStore, sessionTimedout } from '../store/user/actions';
import { decryptData } from '../utils/commonUtils';
import sessionStorageServices from './sessionStorageServices';

const responseStatusReturn = (response: AxiosResponse, store: any) => {
  const { status } = response;
  if (status > 205 && status !== 201) {
    switch (status) {
      case 500:
      case 502:
        throw new ApiError(ERRORS.SERVER_ERROR, 500);
      case 403:
        throw new ApiError(ERRORS.UNAUTHORIZED, 403);
      case 404:
        throw new ApiError(ERRORS.SERVER_ERROR, 404);
      case 401:
        if (response.config.url === '/auth-service/session') {
          throw new ApiError({ name: APPCONSTANTS.LOGIN_FAILED_TITLE, message: response.data.message }, 401);
        } else {
          store.dispatch(sessionTimedout(response.data.message || APPCONSTANTS.SESSION_EXPIRED));
          store.dispatch(resetStore());
          throw new ApiError({ name: APPCONSTANTS.ERROR, message: APPCONSTANTS.SESSION_EXPIRED }, 401);
        }
      case 409:
        if (response.config.url === '/admin-service/clinical-workflow/create') {
          throw new ApiError({ name: APPCONSTANTS.OOPS, message: response.data.message }, 409);
        } else {
          throw new ApiError({ ...response.data, name: APPCONSTANTS.OOPS }, 409);
        }
      case 406:
        throw new ApiError({ ...response.data, name: APPCONSTANTS.OOPS }, 406);
      case 400:
        throw new ApiError({ ...response.data, name: APPCONSTANTS.OOPS }, 400);
      case 432:
        throw new ApiError({ ...response.data, name: APPCONSTANTS.OOPS }, 432);
      case 408:
        throw new ApiError({ ...response.data, name: APPCONSTANTS.OOPS }, 408);
      default:
        throw new ApiError(response);
    }
  } else {
    return response;
  }
};

export const setupInterceptors = (store: any) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.client = 'spice web';
  axios.defaults.validateStatus = () => true;

  axios.interceptors.request.use(
    (request: any) => {
      const token = store.getState().user.token;
      const tenantId = store.getState().user.userTenantId;
      request.headers.Authorization = token ? decryptData(token) : '';
      request.headers.tenantId = tenantId || sessionStorageServices.getItem(APPCONSTANTS.USER_TENANTID) || '';
      request.headers['App-Version'] = sessionStorageServices.getItem(APPCONSTANTS.APP_VERSION);
      return request;
    },
    (error: any) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => responseStatusReturn(response, store),
    () => {
      throw new ApiError(ERRORS.NETWORK_ERROR);
    }
  );

  // get logged in user while refresh
  if (store.getState().user.token) {
    store.dispatch(fetchLoggedInUser());
  }
};
