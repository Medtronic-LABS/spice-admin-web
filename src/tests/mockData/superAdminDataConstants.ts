const MOCK_DATA_CONSTANTS = {
  FETCH_SUPER_ADMINS_REQUEST_PAYLOAD: {
    pageNo: 1,
    limit: null,
    search: 'Sample'
  },

  SUPER_ADMINS_RESPONSE_PAYLOAD: {
    id: '4',
    name: 'Super Admin Four',
    email: 'superAdmin@email.com',
    view_reports: false
  },

  SUPER_ADMIN_PAYLOAD: {
    id: '2',
    firstName: 'Super Admin',
    lastName: 'Two',
    email: 'superAdmin@email.com',
    phoneNumber: '1234567890',
    username: 'superAdmin@email.com',
    gender: 'Female',
    timezone: { id: '3' },
    country: '4',
    roles: { default: ['PROVIDER', 'HRIO'] },
    is_super_admin: true,
    countryCode: '91'
  },

  DELETE_SUPER_ADMIN_RESPONSE_PAYLOAD: {
    id: '3',
    isDeleted: true
  }
};

export default MOCK_DATA_CONSTANTS;
