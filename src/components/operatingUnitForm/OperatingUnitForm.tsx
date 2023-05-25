import React, { useEffect } from 'react';
import { FormApi } from 'final-form';
import { Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import SelectInput from '../formFields/SelectInput';
import TextInput from '../formFields/TextInput';
import { fetchAccountDetailReq, fetchAccountOptionsRequest } from '../../store/account/actions';
import {
  accountOptionsLoadingSelector,
  accountOptionsSelector,
  accountSelector,
  accountsLoadingSelector
} from '../../store/account/selectors';
import { composeValidators, required, validateEntityName } from '../../utils/validation';
import { roleSelector } from '../../store/user/selectors';
import APPCONSTANTS from '../../constants/appConstants';

export interface IOperatingUnitFormProps {
  nestingKey?: string;
  isEdit?: boolean;
  form?: FormApi<any>;
}

/**
 * Renders the fields for operatingUnit form
 * @returns {React.ReactElement}
 */
const OperatingUnitForm = ({ nestingKey, isEdit = false, form }: IOperatingUnitFormProps): React.ReactElement => {
  const dispatch = useDispatch();
  const accountOptions = useSelector(accountOptionsSelector);
  const accountOptionsLoading = useSelector(accountOptionsLoadingSelector);
  const { regionId, accountId, tenantId } = useParams<{ regionId?: string; accountId?: string; tenantId: string }>();
  useEffect(() => {
    if (regionId && tenantId && !isEdit) {
      dispatch(fetchAccountOptionsRequest(tenantId));
    }
  }, [dispatch, regionId, tenantId, isEdit]);

  // Logic for account autoselecting when the route is createOuByAccount
  // route is createOuByAccount, if isEdit = false and the route contains accountId param
  const account = useSelector(accountSelector);
  const accountLoading = useSelector(accountsLoadingSelector);
  const role = useSelector(roleSelector);
  const { ROLES } = APPCONSTANTS;
  const showAccountField = ROLES.SUPER_ADMIN === role || ROLES.SUPER_USER === role || ROLES.REGION_ADMIN === role;
  useEffect(() => {
    if (showAccountField && !isEdit && accountId && account?.id !== accountId) {
      dispatch(
        fetchAccountDetailReq({
          tenantId,
          id: accountId
        })
      );
    }
  }, [account?.id, accountId, dispatch, isEdit, showAccountField, tenantId]);

  useEffect(() => {
    if (!isEdit && accountId) {
      const { values: formValues = {} } = form?.getState?.() || {};
      let accountsFormValue = '';
      if (nestingKey) {
        accountsFormValue = (nestingKey.split('.').reduce((a, b: string) => a[b], formValues) || {}).accounts;
      } else {
        accountsFormValue = formValues.accounts;
      }
      if (!accountsFormValue && account?.id.toString() === accountId) {
        form?.change(`${nestingKey ? nestingKey + '.' : ''}account`, account);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, form, isEdit, nestingKey]);

  const nestingKeyName = `${nestingKey ? nestingKey + '.' : ''}name`;
  const nestingKeyAccount = `${nestingKey ? nestingKey + '.' : ''}account`;

  return (
    <div className='row gx-1dot25'>
      <div className='col-12 col-md-6'>
        <Field
          name={nestingKeyName}
          type='text'
          validate={composeValidators(required, validateEntityName)}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Operating Unit Name'
              errorLabel='operating unit name'
              capitalize={true}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      {showAccountField && (
        <div className='col-12 col-md-6'>
          <Field
            name={nestingKeyAccount}
            type='text'
            validate={required}
            render={({ input, meta }) => (
              <SelectInput
                {...(input as any)}
                disabled={Boolean(accountId || isEdit)}
                options={accountId || isEdit ? [] : accountOptions || []}
                loadingOptions={accountOptionsLoading || accountLoading}
                labelKey='name'
                valueKey='id'
                label='Account'
                errorLabel='account'
                error={(meta.touched && meta.error) || undefined}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default OperatingUnitForm;
