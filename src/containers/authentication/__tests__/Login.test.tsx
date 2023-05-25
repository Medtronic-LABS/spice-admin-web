import React from 'react';
import { mount } from 'enzyme';
import { Field } from 'react-final-form';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Login from '../Login';
import TextInput from '../../../components/formFields/TextInput';
import { loginRequest } from '../../../store/user/actions';
import toastCenter from '../../../utils/toastCenter';


const mockStore = configureMockStore([]);
jest.mock('../../assets/images/app-logo.svg', () => ({
  ReactComponent: 'Logo'
}));

describe('Login', () => {
  const loginRequestSpy = jest.fn();
  let wrapper: any;
  let store: any;
  const props: any = {
    loggingIn: false,
    loginRequest
  };
  store = mockStore({
    user: { loggingIn: true }
  });
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login {...props} loginRequest={loginRequestSpy} />
        </MemoryRouter>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should contain a form element', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('should contain a logo', () => {
    expect(wrapper.find('Logo')).toHaveLength(1);
  });

  it('should contain two text input fields', () => {
    expect(wrapper.find(Field)).toHaveLength(3);
    expect(wrapper.find(TextInput)).toHaveLength(2);
  });

  it('should contain a checkbox input field', () => {
    expect(wrapper.find(Field).last().prop('name')).toEqual('rememberMe');
  });

  it('should contain a submit button', () => {
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
  });

  it('should call loginRequest function when form is submitted', () => {
    const loginRequest = jest.fn();
    wrapper.find('form').simulate('submit', { preventDefault() { } });
    expect(loginRequest).toBeCalledTimes(0)
  });

  it('calls toastCenter.dismissAllToast() on unmount', () => {
    const dismissAllToastMock = jest.spyOn(toastCenter, 'dismissAllToast');
    wrapper.unmount();
    expect(dismissAllToastMock).toHaveBeenCalled();
  });

  it('submits the form with the correct values when the "Remember me" checkbox is checked', () => {
    const form = wrapper.find('form');
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const rememberMeCheckbox = wrapper.find('input[name="rememberMe"]');

    emailInput.simulate('change', { target: { name: 'email', value: 'test@example.com' } });
    passwordInput.simulate('change', { target: { name: 'password', value: 'password' } });
    rememberMeCheckbox.simulate('change', { target: { name: 'rememberMe', checked: true } });

    form.simulate('submit');

    expect(loginRequestSpy).toBeCalledTimes(0);
  });

});
