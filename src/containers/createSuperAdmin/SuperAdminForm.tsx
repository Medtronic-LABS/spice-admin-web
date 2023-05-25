import { FormApi } from 'final-form';
import React, { useCallback, useMemo } from 'react';
import { Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import { FieldArray } from 'react-final-form-arrays';

import TextInput from '../../components/formFields/TextInput';
import {
  composeValidators,
  convertToNumber,
  normalizePhone,
  required,
  validateLastName,
  validateMobile,
  validateName
} from '../../utils/validation';
import BinIcon from '../../assets/images/bin.svg';
import ResetIcon from '../../assets/images/reset.svg';
import Radio from '../../components/formFields/Radio';
import APPCONSTANTS from '../../constants/appConstants';
import SelectInput from '../../components/formFields/SelectInput';
import { timezoneListSelector } from '../../store/user/selectors';
import { ISuperAdminFormValues } from '../../store/superAdmin/types';
import EmailField from '../../components/formFields/EmailField';
import PlusIcon from '../../assets/images/plus_blue.svg';

interface ISuperAdminFormProps {
  form: FormApi<{ superAdmins: ISuperAdminFormValues[] }>;
}

/**
 * Form for super admin creation
 * @param param0
 * @returns {React.ReactElement}
 */
const SuperAdminForm = ({ form }: ISuperAdminFormProps): React.ReactElement => {
  const formName = 'superAdmins';
  const initialValue = useMemo<Array<Partial<ISuperAdminFormValues>>>(
    // memoizing the initial value to prevent infinite render cycles
    () => [
      {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
        // is_report_admin: APPCONSTANTS.NO
      }
    ],
    []
  );
  const timezoneList = useSelector(timezoneListSelector);
  const isFormInvalid = form?.getState()?.errors?.[formName]?.length;

  const resetAdminForm = useCallback(
    (fields, index: number) => {
      form.mutators?.resetFields?.(`${formName}[${index}]`);
      fields.update(index, { ...initialValue[0] });
    },
    [initialValue, form.mutators]
  );

  const firstChildStyle = (isFirstChild: boolean) => (isFirstChild ? '' : 'mt-1dot5');

  const formatCountryCode = (value: string) => (value ? `+${value}` : '');

  const isError = (meta: any) => (meta.touched && meta.error) || undefined;

  return (
    <>
      <FieldArray name={formName} initialValue={initialValue}>
        {({ fields }) =>
          fields.map((name, index) => {
            const isLastChild = (fields?.length || 0) === index + 1;
            const isFirstChild = !index;
            return (
              <span key={`form_${name}`}>
                <div className='pe-1dot5 position-relative '>
                  <div className='row gx-1dot25'>
                    <div className={`col-12 col-lg-6 col-md-12 ${firstChildStyle(isFirstChild)}`}>
                      <EmailField isEdit={false} name={name} formName={formName} index={index} form={form} />
                    </div>
                    <div className={`col-12 col-lg-3 col-md-6 ${firstChildStyle(isFirstChild)}`}>
                      <Field
                        name={`${name}.firstName`}
                        type='text'
                        validate={composeValidators(required, validateName)}
                        render={({ input, meta }) => (
                          <TextInput
                            {...input}
                            label='First Name'
                            errorLabel='first name'
                            maxLength={APPCONSTANTS.FIRST_NAME_LENGTH}
                            capitalize={true}
                            error={isError(meta)}
                          />
                        )}
                      />
                    </div>
                    <div className={`col-12 col-lg-3 col-md-6 ${firstChildStyle(isFirstChild)}`}>
                      <Field
                        name={`${name}.lastName`}
                        type='text'
                        validate={composeValidators(required, validateLastName)}
                        render={({ input, meta }) => (
                          <TextInput
                            {...input}
                            label='Last Name'
                            errorLabel='last name'
                            maxLength={APPCONSTANTS.LAST_NAME_LENGTH}
                            capitalize={true}
                            error={isError(meta)}
                          />
                        )}
                      />
                    </div>
                    <div className='col-12 col-md-6'>
                      <Field
                        name={`${name}.gender`}
                        render={(props) => (
                          <Radio
                            {...props}
                            errorLabel='gender'
                            fieldLabel='Gender'
                            options={APPCONSTANTS.GENDER_OPTIONS}
                          />
                        )}
                      />
                    </div>
                    {/* <div className='col-12 col-lg-3 col-md-6 '>
                      <Field
                        name={`${name}.is_report_admin`}
                        validate={required}
                        required={true}
                        render={(props) => (
                          <Radio
                            {...props}
                            errorLabel='view reports'
                            fieldLabel='Able to view reports?'
                            options={APPCONSTANTS.VIEW_REPORTS}
                          />
                        )}
                      />
                    </div> */}
                    <div className='col-lg-3 col-12 col-md-6'>
                      <Field
                        name={`${name}.countryCode`}
                        type='text'
                        validate={required}
                        parse={convertToNumber}
                        format={(value: string) => formatCountryCode(value)}
                        render={({ input, meta }) => (
                          <TextInput {...input} label='Country Code' errorLabel='country code' error={isError(meta)} />
                        )}
                      />
                    </div>
                    <div className='col-lg-3 col-12 col-md-6'>
                      <Field
                        name={`${name}.phoneNumber`}
                        type='text'
                        validate={composeValidators(required, validateMobile)}
                        parse={normalizePhone}
                        render={({ input, meta }) => (
                          <TextInput {...input} label='Phone Number' errorLabel='phone number' error={isError(meta)} />
                        )}
                      />
                    </div>
                    <div className='col-lg-3 col-12 col-md-6'>
                      <Field
                        name={`${name}.timezone`}
                        type='text'
                        validate={required}
                        render={({ input, meta }) => (
                          <SelectInput
                            {...(input as any)}
                            label='Timezone'
                            errorLabel='timezone'
                            labelKey='description'
                            valueKey='id'
                            options={timezoneList}
                            error={isError(meta)}
                          />
                        )}
                      />
                    </div>
                    <div className={`col-12 d-flex justify-content-between mt-0dot5 ${isLastChild ? '' : 'mb-2'}`}>
                      {isLastChild && (
                        <div
                          className={`theme-text lh-1dot25 pointer d-flex align-items-center ${
                            isFormInvalid ? 'not-allowed' : ''
                          }`}
                          onClick={isFormInvalid ? undefined : () => fields.push({ ...initialValue[0] })}
                        >
                          <img className='me-0dot5' src={PlusIcon} alt='' />
                          Add Another Admin
                        </div>
                      )}
                      {Number(fields?.length) > 1 && (
                        <div className='danger-text lh-1dot25 pointer' onClick={() => fields.remove(index)}>
                          <img className='me-0dot5' src={BinIcon} alt='' />
                          Remove Admin
                        </div>
                      )}
                      <div className='theme-text lh-1dot25 pointer' onClick={() => resetAdminForm(fields, index)}>
                        <img className='me-0dot5' src={ResetIcon} alt='' />
                        Reset Fields
                      </div>
                    </div>
                  </div>
                  {isLastChild ? null : <div className='divider ms-neg-1dot25 me-neg-2dot75' />}
                </div>
              </span>
            );
          })
        }
      </FieldArray>
    </>
  );
};

export default SuperAdminForm;
