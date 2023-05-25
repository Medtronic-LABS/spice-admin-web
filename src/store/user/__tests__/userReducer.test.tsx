import userReducer from '../reducer';
import * as USERTYPES from '../actionTypes';

describe('userReducer', () => {
  it('should handle LOGIN_REQUEST', () => {
    const initialState:any = {
      loggingIn: false
    };
    const action:any = {
      type: USERTYPES.LOGIN_REQUEST
    };
    const expectedState = {
      loggingIn: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const initialState:any = {
      loggingIn: true,
      isLoggedIn: false,
      user: {}
    };
    const action:any = {
      type: USERTYPES.LOGIN_SUCCESS,
      payload: { userId: '123', firstName: 'John', lastName: 'Doe', email: 'john@example.com' }
    };
    const expectedState = {
      loggingIn: false,
      isLoggedIn: true,
      error:null,
      user: {
        userId: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      }
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_FAILURE', () => {
    const initialState:any = {
      loggingIn: true,
      isLoggedIn: true,
      user: { userId: '123', firstName: 'John', lastName: 'Doe', email: 'john@example.com' }
    };
    const action:any = {
      type: USERTYPES.LOGIN_FAILURE,
      payload: { error: 'Login failed' }
    };
    const expectedState = {
      loggingIn: false,
      isLoggedIn: false,
      user: {
        email: '',
        firstName: '',
        lastName: '',
        userId: '',
        role: 'SUPER_ADMIN',
        tenantId: '',
        formDataId: '',
        countryId: ''
      },
      error: 'Login failed'
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGOUT_REQUEST', () => {
    const initialState:any = {
      loggingOut: false
    };
    const action:any = {
      type: USERTYPES.LOGOUT_REQUEST
    };
    const expectedState = {
      loggingOut: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const initialState:any = {
      isLoggedIn: true,
      loggingOut: true
    };
    const action:any = {
      type: USERTYPES.LOGOUT_SUCCESS
    };
    const expectedState = {
      isLoggedIn: false,
      loggingOut: false
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGOUT_FAILURE', () => {
    const initialState:any = {
      isLoggedIn: true,
      loggingOut: true
    };
    const action:any = {
      type: USERTYPES.LOGOUT_FAILURE
    };
    const expectedState = {
      isLoggedIn: false,
      loggingOut: false
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_TIMEZONE_LIST_SUCCESS', () => {
    const initialState:any = {
      timezoneList: []
    };
    const action:any = {
      type: USERTYPES.FETCH_TIMEZONE_LIST_SUCCESS,
      payload: ['Timezone 1', 'Timezone 2']
    };
    const expectedState = {
      timezoneList: ['Timezone 1', 'Timezone 2']
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_COUNTRY_LIST_SUCCESS', () => {
    const initialState:any = {
      countryList: []
    };
    const action:any = {
      type: USERTYPES.FETCH_COUNTRY_LIST_SUCCESS,
      payload: ['Country 1', 'Country 2']
    };
    const expectedState = {
      countryList: ['Country 1', 'Country 2']
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_CULTURE_LIST_SUCCESS', () => {
    const initialState:any = {
      cultureListLoading: true,
      cultureList: []
    };
    const action:any = {
      type: USERTYPES.FETCH_CULTURE_LIST_SUCCESS,
      payload: ['Culture 1', 'Culture 2']
    };
    const expectedState = {
      cultureListLoading: false,
      cultureList: ['Culture 1', 'Culture 2']
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_LOGGED_IN_USER_REQUEST', () => {
    const initialState:any = {
      initializing: false
    };
    const action:any = {
      type: USERTYPES.FETCH_LOGGED_IN_USER_REQUEST
    };
    const expectedState = {
      initializing: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_LOGGED_IN_USER_SUCCESS', () => {
    const initialState:any = {
      initializing: true,
      user: {}
    };
    const action:any = {
      type: USERTYPES.FETCH_LOGGED_IN_USER_SUCCESS,
      payload: { email: 'test@example.com', firstName: 'John', lastName: 'Doe' }
    };
    const expectedState = {
      initializing: false,
      user: { email: 'test@example.com', firstName: 'John', lastName: 'Doe' }
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_LOGGED_IN_USER_FAILURE', () => {
    const initialState:any = {
      initializing: true
    };
    const action:any = {
      type: USERTYPES.FETCH_LOGGED_IN_USER_FAILURE
    };
    const expectedState = {
      initializing: false
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle loading actions', () => {
    const initialState:any = {
      loading: false
    };
    const loadingActions = [
      USERTYPES.USER_FORGOT_PASSWORD_REQUEST,
      USERTYPES.RESET_PASSWORD_REQUEST,
      USERTYPES.CHANGE_PASSWORD_REQUEST,
      USERTYPES.GET_USERNAME_FOR_PASSWORD_RESET,
      USERTYPES.CREATE_PASSWORD_REQUEST,
      USERTYPES.FETCH_USER_BY_ID_REQUEST,
      USERTYPES.FETCH_LOCKED_USERS_REQUEST,
      USERTYPES.UNLOCK_USERS_REQUEST
    ];
    loadingActions.forEach((actionType) => {
      const action:any = { type: actionType };
      const expectedState = { loading: true };
      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  it('should handle FETCH_LOCKED_USERS_SUCCESS', () => {
    const initialState:any = {
      loading: true,
      lockedUsers: [],
      totalLockedUsers: 0
    };
    const action:any = {
      type: USERTYPES.FETCH_LOCKED_USERS_SUCCESS,
      payload: {
        lockedUsers: [
          { id: 1, username: 'user1' },
          { id: 2, username: 'user2' }
        ],
        totalCount: 2
      }
    };
    const expectedState = {
      loading: false,
      lockedUsers: [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' }
      ],
      totalLockedUsers: 2
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  const failureActions = [
    USERTYPES.USER_FORGOT_PASSWORD_FAIL,
    USERTYPES.UNLOCK_USERS_FAILURE,
    USERTYPES.RESET_PASSWORD_FAIL,
    USERTYPES.CHANGE_PASSWORD_FAIL,
    USERTYPES.CREATE_PASSWORD_FAIL,
    USERTYPES.FETCH_USER_BY_ID_FAILURE,
    USERTYPES.FETCH_LOCKED_USERS_FAILURE,
    USERTYPES.GET_USERNAME_FOR_PASSWORD_RESET_FAIL
  ];
  failureActions.forEach((actionType) => {
    it(`should handle ${actionType}`, () => {
      const initialState:any = {
        loading: true
      };
      const action:any = { type: actionType };
      const expectedState = { loading: false };
      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  const successActions = [
    USERTYPES.USER_FORGOT_PASSWORD_SUCCESS,
    USERTYPES.UNLOCK_USERS_SUCCESS,
    USERTYPES.RESET_PASSWORD_SUCCESS,
    USERTYPES.CHANGE_PASSWORD_SUCCESS,
    USERTYPES.CREATE_PASSWORD_SUCCESS
  ];
  successActions.forEach((actionType) => {
    it(`should handle ${actionType}`, () => {
      const initialState:any = {
        loading: true
      };
      const action:any = { type: actionType };
      const expectedState = { loading: false };
      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  it('should handle FETCH_USER_BY_ID_SUCCESS when userId matches', () => {
    const initialState:any = {
      loading: true,
      user: {
        userId: 'user1',
        email: 'user1@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }
    };
    const action:any = {
      type: USERTYPES.FETCH_USER_BY_ID_SUCCESS,
      data: {
        userId: 'user1',
        email: 'user1@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin'
      }
    };
    const expectedState = {
      loading: false,
      user: {
        userId: 'user1',
        email: 'user1@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin'
      }
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_USER_BY_ID_SUCCESS when userId does not match', () => {
    const initialState:any = {
      loading: true,
      user: {
        userId: 'user1',
        email: 'user1@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }
    };
    const action:any = {
      type: USERTYPES.FETCH_USER_BY_ID_SUCCESS,
      data: {
        userId: 'user2',
        email: 'user2@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'admin'
      }
    };
    const expectedState = {
      loading: false,
      user: {
        userId: 'user1',
        email: 'user1@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_USERNAME_FOR_PASSWORD_RESET_SUCCESS', () => {
    const initialState:any = {
      loading: true
    };
    const action:any = {
      type: USERTYPES.GET_USERNAME_FOR_PASSWORD_RESET_SUCCESS,
      response: {
        email: 'user1@example.com',
        is_password_set: true
      }
    };
    const expectedState = {
      loading: false,
      email: 'user1@example.com',
      isPasswordSet: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SESSION_TIMEDOUT', () => {
    const initialState:any = {
      isLoggedIn: true,
      errorMessage: null
    };
    const action:any = {
      type: USERTYPES.SESSION_TIMEDOUT,
      message: 'Session has timed out'
    };
    const expectedState = {
      isLoggedIn: false,
      errorMessage: 'Session has timed out'
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_USER_BY_EMAIL', () => {
    const initialState:any = {
      showLoader: false
    };
    const action:any = { type: USERTYPES.FETCH_USER_BY_EMAIL };
    const expectedState = {
      showLoader: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  const fetchUserByEmailActions = [
    USERTYPES.FETCH_USER_BY_EMAIL_SUCCESS,
    USERTYPES.FETCH_USER_BY_EMAIL_FAIL
  ];
  fetchUserByEmailActions.forEach((actionType) => {
    it(`should handle ${actionType}`, () => {
      const initialState:any = {
        showLoader: true
      };
      const action:any = { type: actionType };
      const expectedState = { showLoader: false };
      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
    });

    it('should handle AUTH_TOKEN', () => {
        const initialState:any = {
          token: ''
        };
        const action:any = {
          type: USERTYPES.AUTH_TOKEN,
          payload: 'abcd1234'
        };
        const expectedState = {
          token: 'abcd1234'
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
      });
    
      it('should handle REMOVE_TOKEN', () => {
        const initialState:any = {
          token: 'abcd1234'
        };
        const action:any = {
          type: USERTYPES.REMOVE_TOKEN
        };
        const expectedState = {
          token: ''
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
      });

      it('should handle ADD_USER_TENANT_ID', () => {
        const initialState:any = {
          userTenantId: ''
        };
        const action:any = {
          type: USERTYPES.ADD_USER_TENANT_ID,
          payload: 'tenant1'
        };
        const expectedState = {
          userTenantId: 'tenant1'
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
      });
    
      it('should handle REMOVE_USER_TENANT_ID', () => {
        const initialState:any = {
          userTenantId: 'tenant1'
        };
        const action:any = {
          type: USERTYPES.REMOVE_USER_TENANT_ID
        };
        const expectedState = {
          userTenantId: ''
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
      });

      it('should handle FETCH_CULTURE_LIST_REQUEST', () => {
        const initialState:any = {
          cultureListLoading: false
        };
        const action:any = {
          type: USERTYPES.FETCH_CULTURE_LIST_REQUEST
        };
        const expectedState = {
          cultureListLoading: true
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
      });
});
