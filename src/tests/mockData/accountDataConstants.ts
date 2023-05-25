const MOCK_DATA_CONSTANTS = {
  FETCH_ACTIVE_ACCOUNTS_REQUEST_PAYLOAD: {
    isActive: true,
    tenantId: '5',
    skip: 0,
    limit: 10,
    search: 'Sample'
  },

  FETCH_INACTIVE_ACCOUNTS_REQUEST_PAYLOAD: {
    tenantId: '3',
    skip: 0,
    limit: 10,
    search: 'Sample'
  },

  FETCH_ACCOUNTS_RESPONSE_PAYLOAD: {
    id: '3',
    users: [
      {
        id: '4946',
        username: 'novoaccountadmin@spice.mdt',
        email: 'novoaccountadmin@spice.mdt',
        firstName: 'Novo',
        lastName: 'Novo',
        gender: 'Male',
        countryCode: '254',
        phoneNumber: '1234567890',
        timezone: '',
        country: {
          id: '4',
          countryCode: '254'
        }
      }
    ],
    name: 'Sample Account',
    maxNoOfUsers: '100',
    tenantId: '3',
    country: {
      countryCode: '233',
      tenantId: '4',
      id: '6'
    }
  },

  FETCH_DASHBOARD_ACCOUNTS_PAYLOAD: {
    skip: 0,
    limit: 10,
    searchTerm: 'Sample',
    tenantId: '4'
  },

  DASHBOARD_ACCOUNTS_RESPONSE_PAYLOAD: [
    {
      id: '1',
      name: 'Account One',
      ouCount: 3,
      siteCount: 10,
      tenantId: '5'
    },
    {
      id: '2',
      name: 'Account Two',
      ouCount: 13,
      siteCount: 20,
      tenantId: '6'
    }
  ],

  ACTIVATE_ACCOUNT_PAYLOAD: {
    tenantId: 4
  },

  DEACTIVATE_ACCOUNT_PAYLOAD: {
    tenantId: 3,
    status: 'Inactive',
    reason: 'Not active anymore'
  },

  FETCH_ACCOUNT_OPTIONS_REQUEST_PAYLOAD: {
    tenantId: '2',
    skip: 0,
    limit: null,
    searchTerm: ''
  },

  FETCH_ACCOUNT_OPTIONS_RESPONSE_PAYLOAD: [
    {
      name: 'Account option one',
      id: '1',
      tenantId: '5'
    },
    {
      name: 'Account option two',
      id: '2',
      tenantId: '6'
    }
  ],

  CREATE_ACCOUNT_PAYLOAD: {
    name: 'Account Test',
    maxNoOfUsers: 100,
    clinicalWorkflow: [2, 4],
    customizedWorkflow: [],
    countryId: 3,
    parentOrganizationId: 290,
    tenantId: 290,
    users: [
      {
        email: 'testaccount@admin.com',
        firstName: 'TestAccount',
        lastName: 'Admin',
        phoneNumber: '1234567890',
        gender: 'Male',
        username: 'testaccount@admin.com',
        country: '3',
        timezone: {
          id: 2
        }
      }
    ]
  },

  ACCOUNT_WORLFOW_PAYLOAD: {
    name: 'Account Workflow sample',
    viewScreens: ['ViewScreen 1', 'ViewScreen 2'],
    countryId: '2',
    tenantId: '4',
    id: '2'
  },

  DELETE_ACCOUNT_WORLFOW_PAYLOAD: {
    tenantId: '4',
    id: '2'
  },

  FETCH_CLINICAL_WORKFLOWS_REQUEST_PAYLOAD: {
    countryId: '2',
    limit: 10,
    skip: 0,
    searchTerm: 'Clinical'
  },

  FETCH_CLINICAL_WORKFLOWS_RESPONSE_PAYLOAD: [
    {
      id: '1',
      name: 'Clinical Worlfow One',
      isActive: true,
      default: true,
      isDeleted: false,
      coreType: 'Sample',
      workflowId: '4',
      moduleType: 'clinical',
      country: '2',
      tenantId: '3',
      viewScreens: ['View Screen One', 'View Screen Two']
    },
    {
      id: '1',
      name: 'Clinical Worlfow Two',
      isActive: true,
      default: true,
      isDeleted: false,
      coreType: 'Sample',
      workflowId: '2',
      moduleType: 'clinical',
      country: '1',
      tenantId: '4',
      viewScreens: ['View Screen One', 'View Screen Two']
    }
  ],

  UPDATE_ACCOUNT_PAYLOAD: {
    id: '1',
    name: 'Account Dummy',
    maxNoOfUsers: '100',
    tenantId: '4'
  },

  DEFAULT_REQUEST_PAYLOAD: {
    tenantId: 1,
    id: 1
  },
  SEARCH_ACCOUNT_ADMIN_REQUEST_PAYLOAD: {
    tenantId: 80,
    searchTerm: 'of',
    userType: 'account'
  },
  ACCOUNT_ADMIN_LIST_REQUEST_PAYLOAD: {
    tenantId: '80',
    searchTerm: 'of',
    skip: 0,
    limit: 10,
    userType: 'account'
  },
  ACCOUNT_DETAIL_RESPONSE_PAYLOAD: {
    id: '1',
    name: 'Novo Kenya',
    maxNoOfUsers: '100',
    tenantId: '2',
    users: [
      {
        id: '4946',
        username: 'novoaccountadmin@spice.mdt',
        email: 'novoaccountadmin@spice.mdt',
        firstName: 'Novo',
        lastName: 'Novo',
        gender: 'Male',
        countryCode: '254',
        phoneNumber: '1234567890',
        organizationName: 'test',
        timezone: '' ? '' : { id: '1', description: 'test' },
        country: {
          id: '4',
          countryCode: '254'
        }
      }
    ]
  },

  ACCOUNT_ADMIN: {
    id: '2',
    firstName: 'Account',
    lastName: 'Admin',
    email: 'accountadmin@email.com',
    phoneNumber: '1234567890',
    username: 'accountadmin@email.com',
    gender: 'male',
    countryCode: '231',
    timezone: '23',
    country: { countryCode: '231', id: '4' },
    tenantId: '4'
  }
};

export default MOCK_DATA_CONSTANTS;
