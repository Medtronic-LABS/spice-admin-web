const MOCK_DATA_CONSTANTS = {
  ID_AND_TENANT_ID_PAYLOAD: {
    tenantId: '4',
    id: '2'
  },

  FETCH_LABTEST_BY_ID_RESPONSE_PAYLOAD: {
    id: '2',
    name: 'Labtest Two',
    active: true,
    tenantId: '3',
    countryId: '4'
  },

  FETCH_LABTEST_LIST_REQUEST_PAYLOAD: {
    tenantId: '2',
    skip: 0,
    limit: 10,
    searchTerm: 'Sample',
    countryId: '3',
    paginated: true
  },

  FETCH_LABTEST_LIST_RESPONSE_PAYLOAD: [
    {
      id: '2',
      name: 'Labtest Two',
      active: true,
      tenantId: '3',
      countryId: '4'
    },
    {
      id: '2',
      name: 'Labtest Three',
      active: true,
      tenantId: '5',
      countryId: '4'
    }
  ],

  CREATE_LABTEST_REQUEST_PAYLOAD: {
    labTestResults: [
      {
        id: '1',
        isDeleted: false,
        displayOrder: 1,
        name: 'Lab Test Result One'
      }
    ],
    name: 'Lab Test One',
    active: true,
    countryId: '2',
    tenantId: '3'
  },

  UPDATE_LABTEST_REQUEST_PAYLOAD: {
    labTestResults: [
      {
        id: '1',
        isDeleted: false,
        displayOrder: 1,
        name: 'Lab Test Result One'
      }
    ],
    id: '1',
    name: 'Lab Test One',
    active: true,
    countryId: '2',
    tenantId: '3'
  },

  DELETE_LABTEST_REQUEST_PAYLOAD: {
    id: 3,
    tenantId: 8
  },

  FETCH_UNIT_LIST_RESPONSE_PAYLOAD: [
    {
      id: '1',
      name: 'mmol/L'
    },
    {
      id: '2',
      name: 'mg/dL'
    }
  ],

  FETCH_LABTEST_RESULT_RANGES_REQUEST_PAYLOAD: {
    tenantId: '1',
    labtestResultId: '3'
  },

  FETCH_LABTEST_RESULT_RANGES_RESPONSE_PAYLOAD: [
    {
      id: '1',
      displayName: 'Range One',
      unitId: 1,
      unit: 'mg/dL',
      minimumValue: 1,
      maximumValue: 100
    }
  ],

  SAVE_LABTEST_RESULT_RANGE_REQUEST_PAYLOAD: {
    tenantId: '3',
    labTestResultId: '2',
    labTestResultRanges: [
      {
        id: '1',
        displayName: 'Range One',
        unitId: {
          id: '2',
          unit: 'mg/dL'
        },
        minimumValue: 1,
        maximumValue: 100
      }
    ]
  }
};

export default MOCK_DATA_CONSTANTS;
