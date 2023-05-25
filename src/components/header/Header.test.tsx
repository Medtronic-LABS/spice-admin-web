import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import styles from './Header.module.scss';
import LogoutIcon from '../../assets/images/power-switch.svg';

const mockStore = configureMockStore();
const store = mockStore({
 user:{ user: {
    firstName: 'John',
    lastName: 'Doe',
    role: 'admin',
  }
}
});
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  </Provider>
);
describe('Header component', () => {
  it('should render the Link', () => {
    const link = wrapper.find('Link');
    expect(link).toHaveLength(1);
  });

  it('should render the logo', () => {
    const logo = wrapper.find('img');
    expect(logo).toHaveLength(3);
  });
  it('should display the name', () => {
    const initials = wrapper.find(`.${styles.name}`);
    expect(initials.exists()).toBe(true);
    expect(initials).toHaveLength(10);
  });

  it('should display the user name', () => {
    const name = wrapper.find(`.${styles.userOptions}`);
    expect(name.exists()).toBe(true);
    expect(name).toHaveLength(10);
  });

  it('should display the user logo', () => {
    const name = wrapper.find(`.${styles.userLogo}`);
    expect(name.exists()).toBe(true);
    expect(name).toHaveLength(10);
  });

  it('should display the user role', () => {
    const initials = wrapper.find(`.${styles.userLogo}`).first().text();
    expect(initials).toEqual('JDJohn DoeLogout');
  });

  it('should render the Logout icon', () => {
    const icon = wrapper.find('img[src="' + LogoutIcon + '"]');
    expect(icon).toHaveLength(3);
  });

  it('should display the text "Logout"', () => {
    const text = wrapper.find('.dropdown-item').text();
    expect(text).toBe('Logout');
  });

  it('should dispatch the logoutRequest action when clicked', () => {
    wrapper.find('.dropdown-item').simulate('click');
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'LOGOUT_REQUEST' }]);
  });
});
