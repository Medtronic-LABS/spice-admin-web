import React from 'react';
import { mount } from 'enzyme';
import RegionForm, { unitMeasurementOptions } from './RegionForm';
import { Field, Form } from 'react-final-form';
import TextInput from '../../components/formFields/TextInput';
import SelectInput from '../../components/formFields/SelectInput';

describe('RegionForm', () => {
let wrapper:any
const mockProps = {
  isEdit: false
};

  beforeEach(() => {
    wrapper = mount(
      <Form onSubmit={() => {}}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RegionForm {...mockProps} />
          <button type='submit'>Submit</button>
        </form>
      )}
    </Form>
    );
  });
  it('renders region name input field', () => {
    const nameInput = wrapper.find('[name="region.name"]');
    expect(nameInput).toHaveLength(3);
  });

  it('renders country code input field', () => {
    const countryCodeInput = wrapper.find('[name="region.countryCode"]');
    expect(countryCodeInput).toHaveLength(3);
  });

  it('renders unit measurement select field', () => {
    const unitMeasurementSelect = wrapper.find('[name="region.unitMeasurement"]');
    expect(unitMeasurementSelect).toHaveLength(5);
  });

  it('should render region form with all required fields', () => {
    expect(wrapper.find('form')).toHaveLength(1);

    // Name field
    const nameField = wrapper.find(Field).at(0);
    expect(nameField.prop('name')).toBe('region.name');
    expect(nameField.prop('validate')).toHaveLength(2);
    expect(nameField.prop('render')).toBeInstanceOf(Function);
    expect(wrapper.find(TextInput).at(0).prop('label')).toBe('Region Name');

    // Country code field
    const countryCodeField = wrapper.find(Field).at(1);
    expect(countryCodeField.prop('name')).toBe('region.countryCode');
    expect(countryCodeField.prop('validate')).toHaveLength(2);
    expect(countryCodeField.prop('parse')).toBeInstanceOf(Function);
    expect(countryCodeField.prop('render')).toBeInstanceOf(Function);
    expect(wrapper.find(TextInput).at(1).prop('label')).toBe('Country Code');

    // Unit measurement field
    const unitMeasurementField = wrapper.find(Field).at(2);
    expect(unitMeasurementField.prop('name')).toBe('region.unitMeasurement');
    expect(unitMeasurementField.prop('render')).toBeInstanceOf(Function);
    expect(wrapper.find(SelectInput).at(0).prop('label')).toBe('Unit Measurement');
    expect(wrapper.find(SelectInput).at(0).prop('options')).toEqual(unitMeasurementOptions);
  });
});
