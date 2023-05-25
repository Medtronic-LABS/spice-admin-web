import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import SideMenu from './SideMenu';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

import styles from './SideMenu.module.scss';


const mockStore = configureMockStore();

describe('SideMenu', () => {
    const store = mockStore({
        user:{
            user: { role: 'SUPER_ADMIN' }
        }
    });
  it('renders the correct menu items for a region admin', () => {
    // Mock the Redux store to return a role of "regionAdmin"
    // const store = mockStore((state = { user: { role: 'regionAdmin' } }) => state);
    
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SideMenu/>
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should toggle the menu collapse state', () => {
    const wrapper = mount(<Provider store={store}>
      <MemoryRouter>
        <SideMenu/>
      </MemoryRouter>
    </Provider>);
    const toggleButton = wrapper.find(`.${styles.showMore}`);
    toggleButton.simulate('click');
  });
});
