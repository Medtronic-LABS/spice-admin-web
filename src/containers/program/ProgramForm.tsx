import { useEffect } from 'react';
import { FormApi } from 'final-form';
import { Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../components/formFields/TextInput';
import SelectInput from '../../components/formFields/SelectInput';
import Checkbox from '../../components/formFields/Checkbox';
import {
  siteListDropdownLoadingSelector,
  siteListDropdownSelector,
  siteLoadingSelector
} from '../../store/site/selectors';
import { fetchSiteDropdownRequest } from '../../store/site/actions';
import { IProgramFormValues } from '../../store/program/types';
import { composeValidators, required, minLength, validateEntityName } from '../../utils/validation';

interface IProgramFormProps {
  form: FormApi<{ program: IProgramFormValues }>;
  tenantId: string;
  isEdit?: boolean;
}

/**
 * Form for Program Form
 * @param param0
 * @returns {React.ReactElement}
 */
const ProgramForm = (props: IProgramFormProps): React.ReactElement => {
  const { tenantId, isEdit = false } = props;

  const dispatch = useDispatch();

  const siteListDropdown = useSelector(siteListDropdownSelector);
  const siteListLoading = useSelector(siteListDropdownLoadingSelector);

  useEffect(() => {
    if (tenantId !== siteListDropdown.regionTenantId) {
      dispatch(fetchSiteDropdownRequest({ tenantId, regionTenantId: tenantId }));
    }
  }, [dispatch, tenantId, siteListDropdown.regionTenantId]);

  const siteLoading = useSelector(siteLoadingSelector);

  return (
    <div className='row gx-1dot25'>
      <div className='col-12 col-md-6'>
        <Field
          name='program.name'
          type='text'
          validate={composeValidators(required, minLength(2), validateEntityName)}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Program Name'
              disabled={isEdit}
              errorLabel='program name'
              error={(meta.touched && meta.error) || undefined}
              capitalize={true}
            />
          )}
        />
      </div>
      <div className='col-lg-6 col-6'>
        <Field
          name='program.sites'
          type='text'
          validate={required}
          render={({ input, meta }) => (
            <SelectInput
              {...(input as any)}
              label='Site'
              errorLabel='site'
              valueKey='id'
              labelKey='name'
              isMulti={true}
              isModel={isEdit}
              options={siteListDropdown.list}
              loadingOptions={siteListLoading || siteLoading}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      {isEdit && (
        <div className='col-6'>
          <Field
            name='program.active'
            type='checkbox'
            render={({ input }) => <Checkbox switchCheckbox={true} label='Status' {...input} />}
          />
        </div>
      )}
    </div>
  );
};

export default ProgramForm;
