const ERRORS = {
  NETWORK_ERROR: {
    message: 'There is an issue with the connection. Please try after sometime.',
    name: 'Network Error'
  },
  REQUEST_FAIL: {
    message: 'Something went wrong.Please try again',
    name: 'Request Fail'
  },
  SERVER_CONFLICT: {
    message: 'Unexpected server conflict.',
    name: 'Server Error'
  },
  SERVER_ERROR: {
    message: 'Unexpected server error.',
    name: 'Server Error'
  },
  USER_NOT_FOUND: {
    message: 'User not found.',
    name: 'USER_NOT_FOUND'
  },
  NOT_AUTHENTICATED: {
    name: 'Login failed'
  },
  UNAUTHORIZED: {
    message: `You don't have permission to perform this operation.`,
    name: 'Unauthorized'
  }
};

export default ERRORS;
