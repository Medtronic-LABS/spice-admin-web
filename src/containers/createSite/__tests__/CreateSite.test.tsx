import React from 'react';
import { mount } from 'enzyme';
import CreateSite from '../CreateSite';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import APPCONSTANTS from '../../../constants/appConstants';
import { Form } from 'react-final-form';


const mockStore = configureMockStore();

describe('CreateSite', () => {
  const store = mockStore({
    site:{
        loading: false
    },
    user: {
        user:{
            countryId: 1,
            role: APPCONSTANTS.ROLES.SUPER_ADMIN
        },
      timezoneList: [
        {
          id:1
        },
        {
          id: 2
        }
    ],            
    countryList: [
      {id:1,
       countryCode: '91'
      },
      {
          id: 2,
          countryCode: '232'
      }
  ]
    },
    account: {
        account: {
            id: '1',
            clinicalWorkflow:[1],
            users: [
              {
                id: '1',
                firstName: 'acc',
                lastName: 'admin',
                email: 'accadmin@spice.mdt',
                phoneNumber: '1234567890',
                username: 'accadmin@spice.mdt',
                gender: 'Male',
                countryCode: '233',
                timezone: '1',
                country: { countryCode: '232', id: '1' }
              }
            ],
            name: 'AccountOne',
            maxNoOfUsers: '22',
            tenantId: '1'
          },
        accountOptions:[
            {
                name: 'accOne',
                id: '1',
                tenantId: '1'
              }
        ]
        ,
        loadingOptions: true
    },
    operatingUnit:{
        dropdownOUList:[{
            id: '1',
            tenantId: '2',
            name: 'OU One',
            email: 'ou@spice.mdt',
            county: '1',
            account: { name: 'accOne' }
          }],
          dropdownOUListLoading: false,
          loading: false,
          operatingUnitDetail:{
            id: '1',
            name: 'OU One',
            tenantId: '1',
            account: { id: '1', name: 'accOne' },
            county: { id: '1', name: 'County' }
          }
    }
  });
  const defaultProps: any = {
    match: {
      params: {
        tenantId: '1',
      },
    },
  };

  it('renders the component', () => {
    const wrapper = mount(
        <Provider store={store}>
        <Router>
          <CreateSite {...defaultProps} />
        </Router>
        </Provider>);
    expect(wrapper.find('FormContainer')).toHaveLength(2);
  });

  it('submits the form', () => {
    const mockDispatch = jest.fn();
    jest.mock('react-redux', () => ({
      useDispatch: () => mockDispatch,
      useSelector: () => jest.fn(),
    }));

    const wrapper = mount(
        <Provider store={store}>
        <Router>
        <Form onSubmit={() => {}}>
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
          <CreateSite {...defaultProps} />
          </form>
    )}
  </Form>
        </Router>
        </Provider>);
    wrapper.simulate('submit', { preventDefault: () => {} });
    const onSubmit:any = wrapper.find('ReactFinalForm').at(0).prop('onSubmit');

    onSubmit({ site: {}, users: [] });

    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });

  it('cancels the form', () => {
    const mockPush = jest.fn();
    const mockHistory = { push: mockPush } as any;
    jest.mock('react-router-dom', () => ({ useHistory: () => mockHistory }));

    const wrapper = mount(
        <Provider store={store}>
        <Router>
          <CreateSite {...defaultProps} />
        </Router>
        </Provider>); 
    wrapper.find('FormContainer').at(0).simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(0);
  });

  
});
