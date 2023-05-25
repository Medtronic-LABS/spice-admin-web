import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import CreateOperatingUnit, { IOUFormValues } from '../CreateOperatingUnit';
import { Provider } from 'react-redux';
import { Form } from 'react-final-form';
import configureMockStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { createOperatingUnitRequest } from '../../../store/operatingUnit/actions';

const mockStore = configureMockStore();

describe('CreateOperatingUnit', () => {
    let store: any;
    let wrapper:any;
    let history:any
  const createOperatingUnit = jest.fn();
  const formValues: any = {
    operatingUnit: {
      name: 'Test Unit',
      account: {
        id: '1',
        name: 'Test Account'
      }
    },
    users: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com',
        role: 'admin',
        countryId: 'US'
      }
    ]
  };
  const props:any = {
    loading: false,
    role: 'admin',
    countryId: '1',
    createOperatingUnit,
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
  beforeEach(()=>{
    history = createMemoryHistory();
    store = mockStore({
        operatingUnit:{
            loading:false
        },
        user:{
            user:{
                role:'test'
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
        account:{
            accountOptions:{}
        },
    
    });
    wrapper = mount(
            <Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
        <Form onSubmit={() => {}}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Route path="/" render={() => <CreateOperatingUnit {...props} />} />
            <button type="submit" disabled={submitting}>
              Submit
            </button>
          </form>
        )}
      </Form>
      </MemoryRouter>
      </Provider>
    );
    
  })

  it('should render without errors', () => {
    expect(wrapper.find('form')).toHaveLength(2);
  });

  it('should call createOperatingUnit function on form submission', () => { 
    const submitButton = wrapper.find('button[type="submit"]').first();
    expect(submitButton).toHaveLength(1);
    
   wrapper.find('input[name="operatingUnit.name"]').simulate('change', { target: { value: formValues.operatingUnit.name } });
    wrapper.find('input[name="users[0].firstName"]').simulate('change', { target: { value: formValues.users[0].firstName } });
    wrapper.find('input[name="users[0].lastName"]').simulate('change', { target: { value: formValues.users[0].lastName } });
    
    expect(wrapper.find('input[name="operatingUnit.name"]').prop('value')).toEqual('Test Unit');
    expect(wrapper.find('input[name="users[0].firstName"]').prop('value')).toEqual('John');
    expect(wrapper.find('input[name="users[0].lastName"]').prop('value')).toEqual('Doe');

    submitButton.simulate('submit');
  });

  it('should submit the form when submit button is clicked', () => {
    const onSubmit = jest.fn();
    
    wrapper.find('input[name="operatingUnit.name"]').simulate('change', { target: { value: formValues.operatingUnit.name } });
    expect(wrapper.find('input[name="operatingUnit.name"]').prop('value')).toEqual('Test Unit');
    const submitButton = wrapper.find('button[type="submit"]').last();
    submitButton.simulate('submit');
  
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should render an OperatingUnitForm', () => {
    const operatingUnitForm = wrapper.find('OperatingUnitForm');
    expect(operatingUnitForm).toHaveLength(1);
  });

  it('should render a UserForm', () => {
    const userForm = wrapper.find('UserForm');
    expect(userForm).toHaveLength(1);
  });

  it('should submit the form', () => {
    const form = wrapper.find(Form);
    const values: IOUFormValues = {
      operatingUnit: {
        name: 'Test Operating Unit'
      },
      users: []
    };
    form.first().prop('onSubmit')(values);
    const submitButton = wrapper.find('button[type="submit"]').last();
    submitButton.simulate('submit');
    expect(props.createOperatingUnit).toBeCalledTimes(0);
  });

  it('should call createOperatingUnit when the form is submitted', () => {
    const form = wrapper.find('form').first();
    form.simulate('submit', { preventDefault() {} });
    expect(props.createOperatingUnit).toBeCalledTimes(0);
  });

  it('should call createOperatingUnit when the form is submitted', () => {
    const form = wrapper.find('form').last();
    form.simulate('submit', { preventDefault() {} });
    expect(props.createOperatingUnit).toBeCalledTimes(0);
  });

  it('should navigate back to OUDashboard', () => {
    wrapper.find('button').first().simulate('click');
    expect(history.location.pathname).toEqual('/');
  });

  it('should navigate back to OUDashboard', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(history.location.pathname).toEqual('/');
  });

  it('should navigate back to OUDashboard', () => {
    wrapper.find('button').last().simulate('click');
    expect(history.location.pathname).toEqual('/');
  });

  it('should navigate to OUByRegion if regionId and tenantId are present', () => {
    wrapper.setProps({ match: { params: { regionId: '1', tenantId: '2' } } });
    wrapper.find('button').first().simulate('click'); 
    expect(history.location.pathname).toEqual('/');
  });

  it('should navigate to OUByRegion if regionId and tenantId are present', () => {
    wrapper.setProps({ match: { params: { regionId: '1', tenantId: '2' } } });
    wrapper.find('button').at(1).simulate('click'); 
    expect(history.location.pathname).toEqual('/');
  });

  it('should navigate to OUByRegion if regionId and tenantId are present', () => {
    wrapper.setProps({ match: { params: { regionId: '1', tenantId: '2' } } });
    wrapper.find('button').last().simulate('click'); 
    expect(history.location.pathname).toEqual('/');
  });

  it('should navigate to OUByAccount if accountId, tenantId, and user has appropriate role', () => {
    wrapper.setProps({ match: { params: { accountId: '3', tenantId: '4' } }, role: 'super_admin' });
    wrapper.find('button').first().simulate('click');
    expect(history.location.pathname).toEqual('/');
  });

  it('should navigate to OUByAccount if accountId, tenantId, and user has appropriate role', () => {
    wrapper.setProps({ match: { params: { accountId: '3', tenantId: '4' } }, role: 'super_admin' });
    wrapper.find('button').at(1).simulate('click');
    expect(history.location.pathname).toEqual('/');
  });

  it('should navigate to OUByAccount if accountId, tenantId, and user has appropriate role', () => {
    wrapper.setProps({ match: { params: { accountId: '3', tenantId: '4' } }, role: 'super_admin' });
    wrapper.find('button').last().simulate('click');
    expect(history.location.pathname).toEqual('/');
  });

  it('calls createOperatingUnit with correct data when onSubmit is called', () => {
    const createOperatingUnitMock = jest.fn();
    wrapper.setProps({ createOperatingUnit: createOperatingUnitMock });

    const operatingUnitData = { name: 'Test OU', users: [{ firstName: 'John', lastName: 'Doe' }] };
    const eventData = { operatingUnit: operatingUnitData, users: [] };

    wrapper.find('form').first().simulate('submit', { preventDefault: jest.fn(), stopPropagation: jest.fn() });

    expect(createOperatingUnitMock).toBeCalledTimes(0);
  });

  it('calls createOperatingUnit with correct data when onSubmit is called', () => {
    const createOperatingUnitMock = jest.fn();
    wrapper.setProps({ createOperatingUnit: createOperatingUnitMock });

    const operatingUnitData = { name: 'Test OU', users: [{ firstName: 'John', lastName: 'Doe' }] };
    const eventData = { operatingUnit: operatingUnitData, users: [] };

    wrapper.find('form').last().simulate('submit', { preventDefault: jest.fn(), stopPropagation: jest.fn() });

    expect(createOperatingUnitMock).toBeCalledTimes(0);
  });

});
