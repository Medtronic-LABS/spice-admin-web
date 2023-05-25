import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'react-final-form';
import Deactivation from './Deactivation';
import { MemoryRouter } from 'react-router';

describe('<Deactivation />', () => {
  const props = {
    formName: 'testForm',
  };
  let wrapper:any;

  beforeEach(() => {
    wrapper = mount( <MemoryRouter>
      <Form onSubmit={() => {}}>
        {() => <Deactivation {...props} />}
      </Form>
    </MemoryRouter>);
  });

  it('renders the Deactivation component', () => {
    expect(wrapper.find(Deactivation)).toHaveLength(1);
  });

  it('renders the SelectInput component with the correct props', () => {
    const selectInput = wrapper.find('SelectInput');
    expect(selectInput).toHaveLength(1);
    expect(selectInput.prop('label')).toEqual('Reason');
    expect(selectInput.prop('errorLabel')).toEqual('reason');
    expect(selectInput.prop('options')).toEqual([
      { label: 'Unable to pay', value: 'Unable to pay' },
      { label: 'Contract expired', value: 'Contract expired' },
      { label: 'Site closure', value: 'Site closure' },
      { label: 'Inactive site', value: 'Inactive site' },
      { label: 'Other', value: 'Other' }
    ]);
    expect(selectInput.prop('isModel')).toBe(true);
  });

  it('renders the TextAreaInput component with the correct props', () => {
    const textAreaInput = wrapper.find('TextAreaInput');
    expect(textAreaInput).toHaveLength(1);
    expect(textAreaInput.prop('label')).toEqual('Describe the reason in detail');
    expect(textAreaInput.prop('rows')).toEqual(3);
  });

  it('renders the deactivation info message', () => {
    const deactivationInfo = wrapper.find('.deactivateInfo');
    expect(deactivationInfo.text()).toContain('Deactivating the testForm will no longer let the testForm admin and their subordinates access the testForm and its data but you can reactivate the testForm anytime back from the profile menu. ');
  });
});
