import React from 'react';
import { Field } from 'react-final-form';
import SelectInput from '../../components/formFields/SelectInput';

import TextInput from '../../components/formFields/TextInput';
import {
  composeValidators,
  convertToNumber,
  required,
  validateText,
  minLength,
  validateCountryCode
} from '../../utils/validation';

export const unitMeasurementOptions = [
  { label: 'Metric System', value: 'metric' },
  { label: 'Imperial System', value: 'imperial' }
];

/**
 * Renders the fields for region form
 * @returns {React.ReactElement}
 */
const RegionForm = ({ isEdit = false }): React.ReactElement => {
  return (
    <div className='row gx-1dot25'>
      <div className='col-sm-6 col-12'>
        <Field
          name='region.name'
          type='text'
          validate={composeValidators(required, validateText, minLength(2))}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Region Name'
              errorLabel='region name'
              capitalize={true}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className='col-sm-6 col-12'>
        <Field
          name='region.countryCode'
          type='text'
          validate={composeValidators(required, validateCountryCode)}
          parse={convertToNumber}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Country Code'
              errorLabel='country code'
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className='col-sm-6 col-12'>
        <Field
          name='region.unitMeasurement'
          type='text'
          render={({ input, meta }) => {
            const selectedUnit = unitMeasurementOptions.find((units) => units.value === input.value);
            const calculateValue = (value: any) => {
              if (!value) {
                return unitMeasurementOptions[0];
              } else if (typeof value === 'string') {
                return selectedUnit;
              } else {
                return value;
              }
            };
            return (
              <SelectInput
                {...(input as any)}
                required={false}
                label='Unit Measurement'
                errorLabel='unit measurement'
                isModel={true}
                disabled={isEdit}
                value={calculateValue(input.value)}
                options={unitMeasurementOptions}
                loadingOptions={false}
                error={(meta.touched && meta.error) || undefined}
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export default RegionForm;
