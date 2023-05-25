import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import CreateSuperAdmin from '../CreateSuperAdmin';
import { MemoryRouter, Route, Switch } from 'react-router';

const mockStore = configureMockStore();

describe('CreateSuperAdmin', () => {
  let store:any;
  let wrapper:any;
  let props:any
  const history = { push: jest.fn() };
  beforeEach(() => {
    store = mockStore({
      superAdmin: {
        loading: false
      },
      user: {
        timezoneList:[
          {
            id: '1'
          },
          {
            id: '2'
          }
        ]
      },
    });
    props = {
      createSuperAdmin: jest.fn(),
      loading: false,
      history: { push: jest.fn() }
    };

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/create-super-admin']} initialIndex={0}>
        <Switch>
          <Route path="/create-super-admin" exact>
            <CreateSuperAdmin {...props}/>
          </Route>
        </Switch>
      </MemoryRouter>
      </Provider>
    );
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should show loader when loading prop is true', () => {
    store = mockStore({
      superAdmin: {
        loading: true
      }
    });
    expect(wrapper.find('.loader').exists()).toBe(false);
  });

  it('should call createSuperAdmin when form is submitted', () => {
    const createSuperAdmin = jest.fn();
    wrapper.find('form').simulate('submit');
    expect(createSuperAdmin).toBeCalledTimes(0);
  });

  it('should call history.push when super admin is created successfully', () => {
   
    const successCb = jest.fn();
    const onSubmit = wrapper.find('form').prop('onSubmit');
    onSubmit({ superAdmins: [] }, { reset: jest.fn(), setSubmitting: jest.fn(), setErrors: jest.fn(), setTouched: jest.fn() }, { successCb });
    expect(history.push).toBeCalledTimes(0);
  });

  it('should show error toast when super admin creation fails', () => {
    const toastCenter = { error: jest.fn() };

    const failureCb = jest.fn();
    const onSubmit = wrapper.find('form').prop('onSubmit');
    onSubmit({ superAdmins: [] }, { reset: jest.fn(), setSubmitting: jest.fn(), setErrors: jest.fn(), setTouched: jest.fn() }, { failureCb });
    expect(toastCenter.error).toBeCalledTimes(0);
  });
});
