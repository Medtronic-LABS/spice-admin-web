import React from 'react';
import { Field } from 'react-final-form';
import APPCONSTANTS from '../../constants/appConstants';
import SelectInput from '../formFields/SelectInput';
import TextAreaInput from '../formFields/TextAreaInput';
import InfoIcon from '../../assets/images/Info-blue.svg';
import { composeValidators, required } from '../../utils/validation';

interface IDeactivationProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formName: string;
  error?: string;
  errorLabel?: string;
}

const Deactivation = ({ formName }: IDeactivationProps) => {
  return (
    <div className='row gx-1dot25'>
      <div className='col-sm-6 col-12'>
        <Field
          name='status'
          type='text'
          validate={composeValidators(required)}
          render={({ input, meta }) => (
            <SelectInput
              {...(input as any)}
              label='Reason'
              errorLabel='reason'
              options={APPCONSTANTS.DEACTIVATE_REASON}
              error={(meta.touched && meta.error) || undefined}
              isModel={true}
            />
          )}
        />
      </div>
      <div className='col-12'>
        <Field
          name='reason'
          type='text'
          render={({ input, meta }) => (
            <TextAreaInput
              {...input}
              label='Describe the reason in detail'
              error={(meta.touched && meta.error) || undefined}
              rows={3}
            />
          )}
        />
      </div>
      <div className='d-inline-flex'>
        <span className='pe-0dot75'>
          <img src={InfoIcon} alt='info-icon' />
        </span>
        <span className='deactivateInfo'>
          Deactivating the {formName} will no longer let the {formName} admin and their subordinates access the{' '}
          {formName} and its data but you can reactivate the {formName} anytime back from the profile menu.{' '}
        </span>
      </div>
    </div>
  );
};

export default Deactivation;
