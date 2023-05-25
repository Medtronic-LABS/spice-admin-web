const SITE_MOCK_DATA = {
  SITE_LIST_RESPONSE_PAYLOAD: [
    {
      id: 261,
      name: 'Hostor',
      tenantId: 372,
      operatingUnitName: 'Dar es Salaam- Sanofi',
      culture: 'English - India',
      siteLevel: 'Level 3',
      siteType: 'Clinic'
    }
  ],
  SITE_COUNTY_LIST_RESPONSE: [
    {
      id: '29',
      createdBy: 1,
      updatedBy: 1,
      createdAt: '2022-02-05T05:24:23+03:00',
      updatedAt: '2022-02-05T05:24:23+03:00',
      name: 'Dar es salaam',
      displayOrder: 170,
      countryId: 2,
      active: true,
      deleted: false
    }
  ],
  SITE_SUB_COUNTY_RESPONSE: [
    {
      id: '654',
      name: 'Temeke'
    }
  ],
  SITE_CULTURE_LIST: [
    {
      id: '1',
      name: 'English - India',
      code: 'en_IN',
      active: true,
      deleted: false
    }
  ],
  SITE_DATA_REQUEST_PAYLOAD: {
    id: '2',
    name: 'Test',
    siteType: 'Clinic',
    addressUse: 'Home',
    addressType: 'Physical',
    countyId: 29,
    subCountyId: 654,
    culture: 1,
    latitude: '1',
    longitude: '1',
    location: '',
    city: 'New Zealand, Christchurch City, Christchurch',
    siteLevel: 'Level 1',
    accountId: 2,
    parentOrganizationId: 136,
    tenantId: 136,
    operatingUnit: {
      id: 14
    },
    countryId: 2,
    cultureId: 1,
    address1: 'test',
    address2: 'test',
    postalCode: '0',
    phoneNumber: '1234567890',
    email: 'test@test.com',
    users: [
      {
        email: 'test@one.com',
        firstName: 'Test',
        lastName: 'Test',
        phoneNumber: '1234567890',
        gender: 'Male',
        username: 'test@one.com',
        countryCode: {
          id: 2,
          countryCode: '232'
        },
        country: {
          id: 2,
          countryCode: '232'
        },
        timezone: {
          id: 27,
          offset: '+03:00',
          description: '(UTC+03:00) Nairobi'
        },
        roleName: {
          value: 'NUTRITIONIST',
          label: 'Nutritionist'
        },
        redRisk: true,
        roles: [
          {
            name: 'NUTRITIONIST'
          }
        ],
        isAdded: true,
        cultureId: 1,
        culture: {
          id: 1,
          name: 'India'
        }
      }
    ]
  },
  SITE_DETAIL_REQUEST_PAYLOAD: {
    tenantId: 42,
    id: 2,
    roleId: 2
  },
  SITE_DETAIL_RESPONSE_PAYLOAD: {
    id: 2,
    name: 'Tumaini Health Center',
    email: 'TumainiHealthCenterTZSanofi@spice.mdt',
    addressType: 'Postal',
    addressUse: 'Work',
    address1: 'Usa River',
    address2: '',
    latitude: '-3.36981',
    longitude: '36.68708',
    city: {
      label: 'New Zealand, Christchurch City, Christchurch',
      value: {
        Latitude: '-3.36981',
        Longitude: '36.68708'
      }
    },
    phoneNumber: '1234567890',
    postalCode: '23301',
    siteLevel: {
      label: 'Level 1',
      value: 'Level 1'
    },
    siteType: 'Clinic',
    country: {
      id: '2',
      name: 'Tanzaniaa',
      tenantId: '207'
    },
    county: {
      id: '68',
      name: 'Arusha'
    },
    subCounty: {
      id: '311',
      name: 'Arusha'
    },
    account: {
      id: '2',
      name: 'Christian Health Associates of Tanzania',
      tenantId: '80',
      email: ''
    },
    operatingUnit: {
      id: '11',
      name: 'Arusha- Sanofi',
      tenantId: '159'
    },
    culture: {
      id: '1',
      name: 'English - India',
      tenantId: null
    },
    tenantId: '42'
  },
  SITE_USER_REQUEST_PAYLOAD: {
    tenantId: '207',
    limit: 10,
    skip: 0,
    searchTerm: '',
    userType: 'site'
  },
  SITE_SUMMARY_USER_REQUEST_PAYLOAD: {
    tenantId: '207',
    limit: 10,
    skip: 0,
    searchParams: ''
  },
  SITE_DASHBOARD_LIST_REQUEST_PAYLOAD: {
    limit: 10,
    skip: 0,
    search: ''
  },
  SITE_USER_LIST_RESPONSE_PAYLOAD: [
    {
      id: 6129,
      username: 'priscakudeba@spice.mdt',
      gender: 'Female',
      roles: [
        {
          id: 23,
          name: 'PROVIDER'
        }
      ],
      active: true,
      accountExpired: false,
      accountLocked: false,
      credentialsExpired: false,
      authorization: null,
      currentDate: 0,
      firstName: 'Prisca',
      lastName: 'Kudeba',
      middleName: null,
      subject: null,
      phoneNumber: '1234567890',
      country: {
        id: 2,
        name: 'Tanzaniaa',
        countryCode: '255',
        unitMeasurement: 'metric'
      },
      timezone: {
        id: 27,
        offset: '+03:00',
        description: '(UTC+03:00) Nairobi'
      },
      organizations: [
        {
          id: 288,
          createdBy: 1,
          updatedBy: 1,
          createdAt: '2022-03-14T14:03:44+03:00',
          updatedAt: '2022-03-14T14:03:48+03:00',
          tenantId: 159,
          formDataId: 210,
          formName: 'site',
          name: 'Bikira Maria Mama wa Huruma Health Center',
          sequence: 1119,
          parentOrganizationId: 159,
          active: true,
          deleted: false
        }
      ],
      isBlocked: false,
      countryCode: '255',
      deviceInfoId: null,
      tenantId: 288,
      isSuperUser: false
    }
  ],
  SITE_LIST_DROPDOWN: { tenantId: '2', regionTenantId: '2' },
  SITE_LIST_DROPDOWN_RESPONSE: [
    {
      id: '1',
      name: 'KKKT Mtoni Dispensary',
      tenantId: '43',
      operatingUnitName: 'Dar es Salaam- Sanofi',
      cultureName: 'English - India',
      siteLevel: 'Level 1',
      siteType: 'Clinic'
    }
  ],
  SITE_DASHBOARD_RESPONSE_PAYLOAD: {
    siteDashboardList: [
      {
        id: 82,
        name: 'SDA Hospital Obuasi',
        tenantId: 180,
        operatingUnitName: 'Ashanti Region-CHAG',
        cultureName: 'English - India',
        siteLevel: 'Level 3',
        siteType: 'Clinic',
        subCounty: ''
      }
    ],
    total: 10,
    isLoadMore: true
  },
  SITE_USER_PAYLOAD: {
    email: 'test@one.com',
    firstName: 'Test',
    lastName: 'Test',
    phoneNumber: '1234567890',
    gender: 'Male',
    username: 'test@one.com',
    country: {
      id: 2
    },
    timezone: {
      id: 7
    },
    roleName: {
      value: 'NUTRITIONIST',
      label: 'Nutritionist'
    },
    redRisk: true,
    roles: [
      {
        name: 'NUTRITIONIST'
      }
    ],
    isAdded: true,
    countryCode: '232'
  }
};

const SITE_USER_MOCK_DATA = {
  SITE_CREATE_USER_REQ_PAYLOAD: { id: '1', tenantId: '2', user: SITE_MOCK_DATA.SITE_USER_PAYLOAD },
  SITE_UPDATE_USER_REQ_PAYLOAD: SITE_MOCK_DATA.SITE_USER_PAYLOAD
};

export { SITE_MOCK_DATA, SITE_USER_MOCK_DATA };
