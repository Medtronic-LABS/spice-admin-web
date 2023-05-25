const MOCK_DATA_CONSTANTS = {
  FETCH_OPERATING_UNIT_DETAILS_REQUEST_PAYLOAD_WITH_SEARCH: {
    tenantId: '4',
    searchTerm: 'Admin',
    userType: 'operatingunit'
  },

  ID_AND_TENANT_ID_REQUEST_PAYLOAD: {
    id: '1',
    tenantId: '4'
  },

  FETCH_OPERATING_UNIT_ADMINS_RESPONSE_PAYLOAD: [
    {
      id: '2',
      tenantId: '3',
      firstName: 'Admin',
      lastName: 'Lname',
      email: 'admin@email.com',
      gender: 'Male',
      countryCode: '+91',
      phoneNumber: '1234567890',
      username: 'username@email.com',
      timezone: {
        id: '+4',
        descriptionn: 'Timezone'
      },
      country: '2',
      model_org_Name: 'OrgName',
      organizationName: 'OrgName',
      organizations: [
        {
          id: '1',
          name: 'Organization One'
        }
      ]
    }
  ],

  FETCH_OPERATING_UNIT_DETAIL_RESPONSE_PAYLOAD: {
    id: '2',
    name: 'Operating Unit Two',
    tenantId: '4',
    account: { id: '1', name: 'Account One', tenantId: '7' },
    county: { id: '5', name: 'County Five' },
    users: [
      {
        id: '2',
        tenantId: '3',
        firstName: 'Admin',
        lastName: 'Lname',
        email: 'admin@email.com',
        gender: 'Male',
        countryCode: '+91',
        phoneNumber: '1234567890',
        username: 'username@email.com',
        timezone: {
          id: '+4',
          descriptionn: 'Timezone'
        },
        country: '2',
        model_org_Name: 'OrgName',
        organizationName: 'OrgName'
      }
    ]
  },

  UPDATE_OPERATING_UNIT_REQUEST_PAYLOAD: {
    id: '2',
    name: 'Operating Unit Two',
    account: { id: 2 },
    countryId: 5,
    tenantId: '7'
  },

  FETCH_DASHBOARD_OPERATING_UNITS_REQUEST_PAYLOAD: {
    isLoadMore: false,
    skip: 0,
    limit: null,
    search: 'Sample'
  },

  FETCH_DASHBOARD_OPERATING_UNITS_RESPONSE_PAYLOAD: [
    {
      id: '1',
      name: 'Operating Unit One',
      siteCount: 45,
      groupCount: 3,
      tenantId: '7'
    }
  ],

  FETCH_OPERATING_UNIT_LIST_REQUEST_PAYLOAD: {
    tenantId: '1',
    skip: 0,
    limit: null,
    search: 'Sample'
  },

  FETCH_OPERATING_UNIT_LIST_RESPONSE_PAYLOAD: [
    {
      id: '1',
      tenantId: '2',
      name: 'Operating Unit One',
      email: 'ou@email.com',
      county: '5',
      account: { name: 'Account One' }
    }
  ],

  CREATE_OPERATING_UNIT_REQUEST_PAYLOAD: {
    id: '2',
    name: 'Operating Unit Two',
    account: { id: 2 },
    countryId: 6,
    parentOrganizationId: 9,
    tenantId: '3',
    users: [
      {
        id: '4',
        email: 'user@email.com',
        username: 'user@email.com',
        firstName: 'User',
        lastName: 'Name',
        phoneNumber: '1234567890',
        timezone: { id: 5 },
        gender: 'Male',
        tenantId: '5',
        country: { id: 2 },
        countryCode: '823'
      }
    ]
  },

  FETCH_OPERATING_UNIT_BY_ID_REQUEST_PAYLOAD: {
    id: 60,
    name: 'Hablot Manos',
    tenantId: 360,
    users: [
      {
        id: 6538,
        username: 'davidboon@spice.mdt',
        firstName: 'David',
        lastName: 'Bonn',
        gender: 'male',
        country: {
          id: 3,
          name: 'Ghana',
          countryCode: '233',
          unitMeasurement: 'metric'
        },
        countryCode: '1',
        phoneNumber: '1234567890',
        timezone: {
          id: 2,
          offset: '-08:00',
          description: '(UTC-08:00) Baja California'
        }
      }
    ],
    account: {
      id: 15,
      name: 'St. Annes Medical Center',
      tenantId: 248
    }
  },

  FETCH_OPERATING_UNIT_DROPDOWN_LIST_REQUEST_PAYLOAD: {
    tenantId: '4'
  },

  FETCH_OPERATING_UNIT_DROPDOWN_LIST_RESPONSE_PAYLOAD: {
    total: 10,
    operatingUnitList: [
      {
        id: '1',
        tenantId: '2',
        name: 'Operating Unit One',
        email: 'ou@email.com',
        county: '5',
        account: { name: 'Account One' }
      }
    ],
    limit: null
  },

  OPERATING_UNIT_ADMIN_REQUEST_PAYLOAD: {
    id: '4',
    email: 'user@email.com',
    username: 'user@email.com',
    firstName: 'User',
    lastName: 'Name',
    phoneNumber: '1234567890',
    timezone: { id: 5 },
    gender: 'Male',
    tenantId: '5',
    country: { id: 2 },
    countryCode: '823'
  }
};

export default MOCK_DATA_CONSTANTS;
