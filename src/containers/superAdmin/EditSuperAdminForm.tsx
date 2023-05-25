import { Field } from 'react-final-form';
import Radio from '../../components/formFields/Radio';
import SelectInput from '../../components/formFields/SelectInput';
import TextInput from '../../components/formFields/TextInput';
import APPCONSTANTS from '../../constants/appConstants';
import { ITimezone } from '../../store/user/types';
import {
  composeValidators,
  convertToNumber,
  normalizePhone,
  required,
  validateEmail,
  validateLastName,
  validateMobile,
  validateName
} from '../../utils/validation';

const EditSuperAdminForm = ({ timezoneList }: { timezoneList: ITimezone[] }) => {
  return (
    <div className='row'>
      <div className='col-12'>
        <Field
          name='email'
          type='text'
          validate={composeValidators(required, validateEmail)}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Email ID'
              disabled={true}
              errorLabel='email ID'
              error={(meta.touched && meta.error) || undefined}
              onChange={() => null}
            />
          )}
        />
      </div>
      <div className='col-sm-6 col-12'>
        <Field
          name='firstName'
          type='text'
          validate={composeValidators(required, validateName)}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='First Name'
              errorLabel='first name'
              maxLength={APPCONSTANTS.FIRST_NAME_LENGTH}
              capitalize={true}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className='col-sm-6 col-12'>
        <Field
          name='lastName'
          type='text'
          validate={composeValidators(required, validateLastName)}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Last Name'
              errorLabel='last name'
              maxLength={APPCONSTANTS.LAST_NAME_LENGTH}
              capitalize={true}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className='col-12'>
        <Field
          name='gender'
          render={(props) => (
            <Radio {...props} errorLabel='gender' fieldLabel='Gender' options={APPCONSTANTS.GENDER_OPTIONS} />
          )}
        />
      </div>
      {/* <div className='col-6 '>
        <Field
          name={'is_report_admin'}
          validate={required}
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
      <div className='col-sm-6 col-12'>
        <Field
          name='countryCode'
          type='text'
          validate={required}
          parse={convertToNumber}
          format={(value: string) => `+${value}`}
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
          name='phoneNumber'
          type='text'
          validate={composeValidators(required, validateMobile)}
          parse={normalizePhone}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Phone Number'
              errorLabel='phone number'
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className='col-sm-6 col-12'>
        <Field
          name='timezone'
          type='text'
          validate={required}
          render={({ input, meta }) => (
            <SelectInput
              {...(input as any)}
              label='Timezone'
              errorLabel='timezone'
              options={timezoneList}
              valueKey='id'
              labelKey='description'
              error={(meta.touched && meta.error) || undefined}
              isModel={true}
            />
          )}
        />
      </div>
    </div>
  );
};

export default EditSuperAdminForm;
