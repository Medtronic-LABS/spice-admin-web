import React from 'react';
import { mount } from 'enzyme';
import FormContainer from './FormContainer';

describe('FormContainer', () => {

  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(
      <FormContainer label="Form Label" icon="test-icon.png">
       <div className="test-child" />
    </FormContainer>
    )
  });
  
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the header tag with the correct text', () => {
    const header = wrapper.find('header');
    expect(header.text()).toEqual('Form Label');
    expect(wrapper.find('header')).toHaveLength(1);

  });

  it('renders an icon when provided', () => {
    const img = wrapper.find('img');
    expect(wrapper.find('img')).toHaveLength(1);
    expect(img.prop('src')).toEqual('test-icon.png');
  });

  it('renders a label when provided', () => {
    const label = 'Form Label';
    const bTag = wrapper.find('b');
    expect(bTag.text()).toEqual(label);
    expect(wrapper.find('b')).toHaveLength(1);
  });

  it('renders a className when provided',()=>{
    expect(wrapper.find('.test-child')).toHaveLength(1);
    expect(wrapper.find('.test-child').exists()).toBe(true);
  })
});
