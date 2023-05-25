import MEDICATION_MOCK_DATA from '../../tests/mockData/medicationDataConstants';

const PROGRAM_MOCK_DATA = {
  PROGRAM_LIST: [
    {
      id: '3',
      name: 'Afya Imara NCD Program- Sanofi',
      tenantId: '207',
      createdAt: '2022-12-22T17:06:34+00:00',
      active: true
    }
  ],
  PROGRAM_LIST_REQUEST_PAYLOAD: {
    tenantId: '207',
    country: '2',
    limit: 10,
    skip: 0,
    searchTerm: ''
  },
  PROGRAM_CREATE_REQUEST_PAYLOAD: {
    name: 'Test',
    tenantId: '207',
    sites: [255],
    country: '2'
  },
  PROGRAM_UPDATE_REQUEST_PAYLOAD: {
    id: '2',
    tenantId: '207',
    deletedSites: ['224'],
    sites: [255],
    active: true
  },
  PROGRAM_TI_ID_PAYLOAD: MEDICATION_MOCK_DATA.MEDICATION_TI_ID,
  PROGRAM_DETAIL_RESPONSE_PAYLOAD: {
    id: '3',
    name: 'Afya Imara NCD Program- Sanofi',
    country: {
      id: '2'
    },
    tenantId: '207',
    sites: [
      {
        id: '45',
        name: 'ST. FRANCIS TURIANI HOSPITAL'
      }
    ],
    deletedSites: ['3'],
    active: true
  }
};

export default PROGRAM_MOCK_DATA;
