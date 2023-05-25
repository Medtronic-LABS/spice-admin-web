import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import OperatingUnitForm from '../OperatingUnitForm';
import { Form } from 'react-final-form';

const mockStore = configureMockStore();
const store = mockStore({
  account: {
    accountOptionsLoading: false,
    accountOptions: [],
    accountsLoading: false,
    account: null,
  },
  user: {
    role: 'SUPER_ADMIN',
  },
});

const initialValues = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345"
    },
    phoneNumber: "555-555-5555"
  }
  

describe('OperatingUnitForm', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
        <Form onSubmit={()=>{}} initialValues={initialValues} render={() => <OperatingUnitForm />}/>
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders OperatingUnitForm without errors', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders OperatingUnitForm with Operating Unit Name field', () => {
    const input = wrapper.find('input[name="name"]');
    expect(input).toHaveLength(1);
  });
});
