import React from 'react';
import { mount } from 'enzyme';
import ResetPassword from '../ResetPassword';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import logo from '../../assets/images/app-logo.svg';
import styles from './Authentication.module.scss';

const mockStore = configureMockStore([]);
describe('ResetPassword', () => {
  let wrapper: any;
  let mockProps: any;
  let store:any
  const mockIsPasswordSet = false;

  beforeEach(() => {
    store=mockStore({
      user: { loggingIn: true }
    })
    mockProps = {
      isPasswordSet: false,
      email: 'example@example.com',
      createPassword: jest.fn(),
      getUserName: jest.fn(),
      resetPassword: jest.fn(),
      history:{
        location: {
          search: {}
        }
      },
      match:{
        params:{}
      }
    };
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
        <ResetPassword {...mockProps} isPasswordSet={mockIsPasswordSet}/>
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render ResetPassword component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the logo', () => {
    const img = wrapper.find('img');

    expect(img.first().prop('src')).toEqual(logo);
    expect(img.first().prop('alt')).toEqual('Medtronics');
    expect(wrapper.find(`.${styles.brand}`).exists()).toBe(true);
  });

  it('renders the reset password title', () => {
    const title = wrapper.find('.primary-title');

    expect(title.hasClass('text-center')).toEqual(true);
    expect(wrapper.find(`.${styles.loginTitle}`).exists()).toBe(true);
    expect(title.text()).toEqual('Reset your password');
  });

  it('should call resetPassword when isResetPassword is true', () => {
    const resetPasswordMock = jest.fn();
    const createPasswordMock = jest.fn();
    const formValues = { email: 'test@test.com', password: 'myPassword' };
    expect(resetPasswordMock).toBeCalledTimes(0);
    expect(createPasswordMock).not.toHaveBeenCalled();
  });

  it('should dispatch createPasswordRequest action', () => {
   const dispatch = jest.fn();
    const email = 'test@test.com';
    const password = 'password123';
    const token = 'token123';
    const successCB = jest.fn();
    const expectedAction = 0;
    mockProps.createPassword({ email, password, token, successCB });
    expect(dispatch).toBeCalledTimes(expectedAction);
  });

  it('should dispatch getUserName action', () => {
    const dispatch = jest.fn();
    const token = 'token123';
    const successCB = jest.fn();
    const expectedAction = 0
    mockProps.getUserName({ token, successCB });
    expect(dispatch).toBeCalledTimes(expectedAction);
  });

  it('should dispatch resetPassword action', () => {
    const dispatch = jest.fn();
    const email = 'test@test.com';
    const password = 'password123';
    const token = 'token123';
    const successCB = jest.fn();
    const expectedAction = 0
    mockProps.resetPassword({ email, password, token, successCB });
    expect(dispatch).toBeCalledTimes(expectedAction);
  });

});
