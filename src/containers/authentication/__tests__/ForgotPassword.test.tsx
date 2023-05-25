import React from 'react';
import { mount } from 'enzyme';
import ForgotPassword from '../ForgotPassword';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { History } from 'history';
import { PUBLIC_ROUTES } from '../../../constants/route';
import styles from './Authentication.module.scss';

const mockStore = configureMockStore([]);
const mockForgotPassword = jest.fn()

describe('ForgotPassword component', () => {
  let wrapper: any;
  let store: any;
  const history: History = {} as any;
  const props: any = {
    forgotPassword: mockForgotPassword,
    history
  };

  beforeEach(() => {
    store = mockStore({
      user: { loggingIn: false }
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ForgotPassword {...props} />
        </MemoryRouter>
      </Provider>
    )
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the email input tag', () => {
    expect(wrapper.find('input[name="email"]').exists()).toBe(true);
  })

  it('should render the submit button', () => {
    expect(wrapper.find('[type="submit"]').exists()).toBe(true);
  })

  it('should render the logo', () => {
    const logo = wrapper.find('img');
    expect(logo).toHaveLength(1);
  });
  it('should display the brand', () => {
    const initials = wrapper.find(`.${styles.brand}`);
    expect(initials.exists()).toBe(true);
    expect(initials).toHaveLength(3);
  });


  it('should call forgotPassword function once when form is submitted', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(mockForgotPassword).toHaveBeenCalledTimes(0);
  });

  it('should render the "Go to login page" link', () => {
    const link = wrapper.find(`a[href="${PUBLIC_ROUTES.login}"]`);
    expect(link.text()).toEqual('Go to login page');
  });
});
