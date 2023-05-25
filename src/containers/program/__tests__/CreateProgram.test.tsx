import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CreateProgram from '../CreateProgram';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
describe('CreateProgram', () => {
  let store;
  let wrapper:any;
  const props:any = {
    role: 'admin',
    countryId: '1',
    match: {
      params: {
        regionId: '1',
        tenantId: '1',
        accountId: '1',
      },
    },
    history: {
      push: jest.fn(),
    },
  };
  beforeEach(() => {
    store = mockStore({
        program:{
        loading: false,
        },
        site:{
            siteDropdownOptions:{}
        }
    }); 
    const history = createMemoryHistory({ initialEntries: ['/create-program'] });
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <CreateProgram {...props} />
        </Router>
      </Provider>
    ); 
  });

  it('should render the component without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });


  it('renders the program form', async() => {
    expect(wrapper.find('form')).toHaveLength(1);
    const cancelButton = wrapper.find('[type="submit"]');
    cancelButton.simulate('click');
    expect(cancelButton).toHaveLength(1);
    const submit = wrapper.find('[type="button"]');
     cancelButton.simulate('click');
    expect(submit).toHaveLength(1);
  });
});
