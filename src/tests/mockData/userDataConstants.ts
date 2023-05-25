const MOCK_DATA_CONSTANTS = {
  MOCK_LOGIN_REQUEST: {
    username: 'testuser@email.com',
    password: process.env.REACT_APP_PASSWORD_HASH_KEY || '',
    rememberMe: true
  },
  MOCK_TOKEN: '4',
  MOCK_USER_TENANT_ID: '3',
  MOCK_USER: {
    email: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    userId: '1',
    role: 'SUPER_USER',
    tenantId: '1',
    formDataId: 1,
    countryId: '1'
  },
  LOGGED_IN_USER_DATA: {
    data: {
      entity: {
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        id: '1',
        roles: [{ name: 'HRIO' }],
        tenantId: '1',
        country: '1',
        organizations: [{ formDataId: 1 }]
      }
    }
  },

  ALL_ROLES: [{ name: 'SUPER_USER' }],
  NO_PERMISSION_ROLE: [{ name: 'HRIO' }],
  INVALID_ROLE: [{ name: 'TEACHER' }],

  RESET_PASSWORD_REQUEST_MOCK_DATA: {
    email: 'test@email.com',
    password: process.env.REACT_APP_PASSWORD_HASH_KEY,
    token: '4',
    successCB: () => null,
    failureCb: () => null
  },
  CHANGE_PASSWORD_REQUEST_MOCK_DATA: {
    user: 'test@email.com',
    password: process.env.REACT_APP_PASSWORD_HASH_KEY,
    successCB: () => null,
    failureCb: () => null
  },
  GET_USERNAME_RESPONSE_MOCK_DATA: {
    username: 'test@email.com',
    isPasswordSet: true
  },
  GET_USERNAME_REQUEST_MOCK_DATA: {
    token: '4',
    successCB: () => null
  },
  CREATE_PASSWORD_REQUEST_MOCK_DATA: {
    data: {
      email: 'test@email.com',
      password: process.env.REACT_APP_PASSWORD_HASH_KEY
    },
    id: '3',
    successCB: () => null
  },
  FETCH_TIMEZONE_RESPONSE_PAYLOAD: {
    id: '+5',
    description: 'GMT'
  },
  FETCH_USER_BY_ID_REQUEST: {
    id: '4'
  },
  FETCH_USER_RESPONSE_PAYLOAD: {
    userId: '2',
    email: 'test@email.com',
    firstName: 'Test',
    lastName: 'Name',
    tenantId: '3'
  },
  FETCH_USER_BACKEND_RESPONSE: {
    id: '2',
    username: 'test@email.com',
    roles: [
      {
        id: 23,
        name: 'PROVIDER'
      }
    ],
    firstName: 'Test',
    lastName: 'Name',
    tenantId: '3'
  },
  FETCH_USER_BY_EMAIL_REQUEST: {
    email: 'test@email.com',
    parentOrgId: '2'
  },
  UPDATE_USER_REQUEST_PAYLOAD: {
    id: '2',
    firstName: 'Test',
    lastName: 'Name',
    username: 'test@email.com',
    email: 'test@email.com',
    gender: 'Male',
    phoneNumber: '1234567890',
    timezone: {
      id: '+5',
      description: 'GMT'
    },
    isAdded: true,
    redRisk: false,
    isUpdated: false,
    roleName: 'HRIO',
    countryCode: '91',
    country: {
      id: '2',
      countryCode: '91',
      name: 'India'
    }
  },
  FETCH_COUNTRY_PAYLOAD: {
    id: '2',
    countryCode: '91'
  },
  FETCH_LOCKED_USERS_REQUEST: {
    skip: 0,
    limit: null,
    tenantId: '2',
    search: 'Sample'
  },
  FETCH_LOCKED_USERS_RESPONSE_PAYLOAD: {
    id: '2',
    firstName: 'Test',
    lastName: 'Name',
    email: 'test@email.com'
  },
  UNLOCK_USER_REQUEST_PAYLOAD: {
    userId: '4'
  },
  FETCH_CULTURE_LIST_RESPONSE_PAYLOAD: [
    {
      id: 1,
      name: 'English - India'
    },
    {
      id: 2,
      name: 'Bengali - Bangladesh'
    }
  ]
};

export default MOCK_DATA_CONSTANTS;
