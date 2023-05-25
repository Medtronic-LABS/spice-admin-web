import React from 'react';
import { Field } from 'react-final-form';
import { FormApi } from 'final-form';

import TextInput from '../../components/formFields/TextInput';
import { composeValidators, required, validateEntityName } from '../../utils/validation';
import { ILabTestFormValues } from '../../store/labTest/types';
import Checkbox from '../../components/formFields/Checkbox';

interface ILabTestFormProps {
  form: FormApi<ILabTestFormValues>;
  isEdit: boolean;
  isValid: boolean;
}

/**
 * Renders the field for Lab test detail
 * @returns {React.ReactElement}
 */
function LabTestForm({ isEdit }: ILabTestFormProps): React.ReactElement {
  return (
    <>
      <div className='row gx-1dot25 pe-lg-3 pb-lg-0'>
        <div className='col-md-6 col-12'>
          <Field
            name='name'
            type='text'
            validate={composeValidators(required, validateEntityName)}
            render={({ input, meta }) => (
              <TextInput
                {...input}
                disabled={isEdit}
                label='Lab Test Name'
                errorLabel='lab test name'
                capitalize={true}
                error={(meta.touched && meta.error) || undefined}
              />
            )}
          />
        </div>
        <div className='col-lg-3 col-md-6 col-12'>
          <Field
            name='active'
            type='checkbox'
            render={({ input }) => <Checkbox switchCheckbox={true} label='Status' disabled={!isEdit} {...input} />}
          />
        </div>
      </div>
    </>
  );
}

export default LabTestForm;
