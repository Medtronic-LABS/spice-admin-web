import React from 'react';
import { shallow } from 'enzyme';
import ApiError from '../ApiError';

describe('ApiError', () => {
  it('should initialize correctly', () => {
    const error = {
      name: 'TestError',
      message: 'Test error message',
    };
    const statusCode = 404;

    const apiError = new ApiError(error, statusCode);

    expect(apiError.name).toBe(error.name);
    expect(apiError.message).toBe(error.message);
    expect(apiError.statusCode).toBe(statusCode);
    expect(apiError.stack).toBeDefined();
  });

  it('should default statusCode to null if not provided', () => {
    const error = {
      name: 'TestError',
      message: 'Test error message',
    };

    const apiError = new ApiError(error);

    expect(apiError.statusCode).toBeNull();
  });

  it('should render the error correctly', () => {
    const error = {
      name: 'TestError',
      message: 'Test error message',
    };
    const statusCode = 404;

    const apiError = new ApiError(error, statusCode);

    const wrapper = shallow(<div>{apiError.message}</div>);

    expect(wrapper.text()).toBe(apiError.message);
  });
});
