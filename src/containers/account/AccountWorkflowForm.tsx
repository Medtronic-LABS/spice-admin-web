import { FormApi } from 'final-form';
import { Field } from 'react-final-form';
import Checkbox from '../../components/formFields/Checkbox';
import styles from './AccountWorkflowForm.module.scss';
import TextInput from '../../components/formFields/TextInput';
import { composeValidators, required, minLength, convertToCaptilize } from '../../utils/validation';

const viewScreens = [
  { name: 'Screening', _id: 'Screening' },
  { name: 'Enrollment', _id: 'Enrollment' },
  { name: 'Assessment', _id: 'Assessment' }
];

/**
 * Form for Account workflow Details
 * @param param0
 * @returns {React.ReactElement}
 */
const AccountWorkflowForm = ({
  isEdit = false,
  form
}: {
  isEdit: boolean;
  form: FormApi | undefined;
}): React.ReactElement => {
  const viewScreenError = required(form?.getState().values.viewScreens);
  const viewScreenTouched = form?.getState().touched?.viewScreens;
  return (
    <div className='row gx-1dot25'>
      <div className='col-12 col-md-6'>
        <Field
          name='name'
          type='text'
          validate={composeValidators(required, minLength(2))}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Account Workflow Name'
              errorLabel='account workflow name'
              disabled={isEdit}
              capitalize={true}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className='col-12 col-md-6'>
        <div className='mb-0dot5 input-field-label'>
          View Screens
          <span className='input-asterisk'>*</span>
        </div>
        <div className='row'>
          {viewScreens.map((forms) => {
            return (
              <div key={forms.name} className='col-sm-6 col-12'>
                <Field
                  name={'viewScreens'}
                  key={forms.name}
                  validate={composeValidators(required)}
                  type='checkbox'
                  value={forms._id}
                  render={({ input }) => <Checkbox label={convertToCaptilize(forms.name)} {...input} />}
                />
              </div>
            );
          })}
          {viewScreenTouched && viewScreenError && <p className={styles.error}>Please select a View Screen</p>}
        </div>
      </div>
    </div>
  );
};

export default AccountWorkflowForm;
