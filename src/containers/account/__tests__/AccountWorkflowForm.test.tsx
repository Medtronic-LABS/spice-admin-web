import React from 'react';
import { mount } from 'enzyme';
import AccountWorkflowForm from '../AccountWorkflowForm';
import { MemoryRouter } from 'react-router-dom';
import { Form } from 'react-final-form';

describe('AccountWorkflowForm', () => {
    let wrapper:any
  const props:any = {
    isEdit: false,
    form: {
      getState: jest.fn(() => ({
        values: {
          viewScreens: []
        },
        touched: {
          viewScreens: true
        }
      }))
    }
  };
  beforeEach(() => {
    wrapper = mount(
        <MemoryRouter>
        <Form onSubmit={() => {}}>
        {() => <AccountWorkflowForm {...props} />}
      </Form>
        </MemoryRouter>
    );
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the name input tag', () => {
    expect(wrapper.find('input[name="name"]').exists()).toBe(true);
  })
});
