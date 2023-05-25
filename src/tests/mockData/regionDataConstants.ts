const MOCK_DATA_CONSTANTS = {
  ID_AND_TENANT_ID_REQUEST_PAYLOAD: {
    id: '1',
    tenantId: '4'
  },

  DEACTIVATE_REGION_REQUEST_PAYLOAD: {
    tenantId: '5'
  },

  FETCH_REGION_DETAIL_REQUEST_WITH_SEARCH_PAYLOAD: {
    tenantId: '3',
    searchTerm: 'Sample',
    userType: 'country'
  },

  FETCH_REGION_ADMINS_RESPONSE_PAYLOAD: [
    {
      id: '4',
      email: 'user@email.com',
      username: 'user@email.com',
      firstName: 'User',
      lastName: 'Name',
      phoneNumber: 1234567890,
      timezone: { id: '5' },
      gender: 'Male',
      tenantId: '5',
      country: '2',
      countryCode: '823'
    }
  ],

  FETCH_REGION_DETAIL_RESPONSE_PAYLOAD: {
    id: '2',
    users: [
      {
        id: '4',
        email: 'user@email.com',
        username: 'user@email.com',
        firstName: 'User',
        lastName: 'Name',
        phoneNumber: 1234567890,
        timezone: { id: '5' },
        gender: 'Male',
        tenantId: '5',
        country: '2',
        countryCode: '823'
      }
    ],
    name: 'Region Two',
    countryCode: '3',
    unitMeasurement: 'imperial',
    tenantId: '8'
  },

  FETCH_REGION_LIST_REQUEST_PAYLOAD: {
    skip: 0,
    limit: null,
    search: 'Sample',
    isLoadMore: false
  },

  REGION_PAYLOAD: {
    id: '2',
    name: 'Region Two',
    applicationName: 'Application',
    accountsCount: 5,
    ouCount: 20,
    siteCount: 55,
    tenantId: '3'
  },

  CREATE_REGION_REQUEST_PAYLOAD: {
    name: 'Bangladesh',
    countryCode: '880',
    unitMeasurement: 'metric',
    users: [
      {
        email: 'admin@spice.mdt',
        firstName: 'Bangladesh',
        lastName: 'Admin',
        phoneNumber: '1234567890',
        gender: 'Male',
        username: 'admin@spice.mdt',
        countryCode: '880',
        timezone: {
          id: 34
        }
      }
    ]
  },

  UPDATE_REGION_REQUEST_PAYLOAD: {
    id: '2',
    name: 'Region Two',
    countryCode: '880',
    unitMeasurement: 'metric'
  },

  CREATE_REGION_ADMIN_REQUEST_PAYLOAD: {
    id: '4',
    email: 'user@email.com',
    username: 'user@email.com',
    firstName: 'User',
    lastName: 'Name',
    phoneNumber: 1234567890,
    gender: 'Male',
    tenantId: '5',
    countryCode: '823',
    timezone: { id: 2 },
    country: { id: 5 }
  }
};

export default MOCK_DATA_CONSTANTS;
