import { FormApi } from 'final-form';
import { Field } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { OnChange } from 'react-final-form-listeners';
import { FieldArray } from 'react-final-form-arrays';

import TextInput from '../../components/formFields/TextInput';
import {
  composeValidators,
  required,
  validateEmail,
  minLength,
  validateMobile,
  normalizePhone,
  validateCheckbox
} from '../../utils/validation';
import SelectInput, { AsyncSelectInput, ISelectOption } from '../../components/formFields/SelectInput';
import APPCONSTANTS from '../../constants/appConstants';

import {
  siteCountyDropdownSelector,
  siteCountyDropdownLoadingSelector,
  cultureDropdownSelector,
  cultureDropdownLoadingSelector,
  subCountyDropdownSelector,
  subCountyDropdownLoadingSelector
} from '../../store/site/selectors';
import {
  fetchSiteCountyDropdownRequest,
  clearDropdownValues,
  fetchCultureDropdownRequest,
  fetchSubCountyDropdownRequest
} from '../../store/site/actions';
import {
  operatingUnitDropdownSelector,
  operatingUnitDropdownLoadingSelector,
  getOperatingUnitDetailSelector,
  operatingUnitLoadingSelector
} from '../../store/operatingUnit/selectors';
import { fetchOperatingUnitDropdownRequest, fetchOperatingUnitDetail } from '../../store/operatingUnit/actions';
import { ISiteDropdownList, ICreateSiteFormValues, ISiteCountyList } from '../../store/site/types';
import { useParams } from 'react-router-dom';
import { accountOptionsLoadingSelector, accountOptionsSelector, accountSelector } from '../../store/account/selectors';
import { fetchAccountDetailReq, fetchAccountOptionsRequest } from '../../store/account/actions';
import { countryIdSelector, roleSelector } from '../../store/user/selectors';
import CheckboxGroup from '../../components/formFields/CheckboxGroup';
import { getCoordinates, listCities } from '../../services/siteAPI';
import sessionStorageServices from '../../global/sessionStorageServices';

interface IAddUserFormProps {
  form: FormApi<ICreateSiteFormValues>;
  tenantId: string;
  isEdit?: boolean;
}

interface IMatchParams {
  regionId?: string;
  OUId?: string;
  accountId?: string;
}

/**
 * Form for Site Details
 * @param param0
 * @returns {React.ReactElement}
 */
const SiteDetailsForm = ({ form, tenantId, isEdit = false }: IAddUserFormProps & IMatchParams): React.ReactElement => {
  const dispatch = useDispatch();

  const { accountId, OUId } = useParams<IMatchParams>();

  const accountList = useSelector(accountOptionsSelector);
  const operatingUnitList = useSelector(operatingUnitDropdownSelector);
  const stateList = useSelector(siteCountyDropdownSelector);
  const districtList = useSelector(subCountyDropdownSelector);
  const cultureList = useSelector(cultureDropdownSelector);
  const stateListLoading = useSelector(siteCountyDropdownLoadingSelector);
  const districtListLoading = useSelector(subCountyDropdownLoadingSelector);
  const accountListLoading = useSelector(accountOptionsLoadingSelector);
  const operatingUnitListLoading = useSelector(operatingUnitDropdownLoadingSelector);
  const cultureListLoading = useSelector(cultureDropdownLoadingSelector);
  const cityOptions = useRef<ISelectOption[]>([]);
  const countryId = useSelector(countryIdSelector);

  useEffect(() => {
    if (!(accountId || OUId) && !isEdit) {
      dispatch(fetchAccountOptionsRequest(tenantId));
    }
    dispatch(
      fetchSiteCountyDropdownRequest({
        countryId: countryId?.id || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID)
      })
    );
    dispatch(fetchCultureDropdownRequest());
    if (accountId && !OUId) {
      dispatch(fetchOperatingUnitDropdownRequest({ tenantId }));
    }
    return () => {
      dispatch(clearDropdownValues());
    };
  }, [dispatch, tenantId, accountId, OUId, isEdit, countryId]);

  useEffect(() => {
    const { values: formValues = {} } = form?.getState?.() || {};
    if ((formValues as any)?.site?.county?.id) {
      dispatch(fetchSubCountyDropdownRequest({ countyId: (formValues as any).site.county.id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Logic for ou and account autoselecting when the route is createSiteByOu
  // route is createSiteByOu, if isEdit = false and the route contains OUId param
  const role = useSelector(roleSelector);
  const { ROLES } = APPCONSTANTS;
  const showAccountField = ROLES.SUPER_ADMIN === role || ROLES.SUPER_USER === role || ROLES.REGION_ADMIN === role;
  const showOUField = showAccountField || ROLES.ACCOUNT_ADMIN === role;
  const operatingUnit = useSelector(getOperatingUnitDetailSelector);
  const operatingUnitLoading = useSelector(operatingUnitLoadingSelector);
  useEffect(() => {
    if (!isEdit && OUId && Number(operatingUnit?.id) !== Number(OUId)) {
      dispatch(
        fetchOperatingUnitDetail({
          tenantId,
          id: OUId
        })
      );
    }

    if (!isEdit && OUId) {
      const { values: formValues = {} } = form?.getState?.() || {};
      const accountsFormValue = (formValues as any)?.site?.operatingunit;
      if (!accountsFormValue && Number(operatingUnit?.id) === Number(OUId)) {
        form?.change('site.account' as any, operatingUnit.account);
        form?.change('site.operatingUnit' as any, operatingUnit);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OUId, form, isEdit, operatingUnit.id]);

  // Logic for account autoselecting when the route is createSiteByAccount
  // route is createSiteByAccount, if isEdit = false and the route contains accountId param
  const account = useSelector(accountSelector);
  useEffect(() => {
    if (!isEdit && accountId && account?.id !== accountId) {
      dispatch(
        fetchAccountDetailReq({
          tenantId,
          id: accountId
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isEdit && accountId) {
    const { values: formValues = {} } = form?.getState?.() || {};
    const accountsFormValue = (formValues as any)?.site?.accounts;
    if (!accountsFormValue && Number(account?.id) === Number(accountId)) {
      form?.change('site.account' as any, account);
    }
  }

  const loadSubCounty = (value: ISiteCountyList, input: any) => {
    input.onChange(value);
    form.change('site.subCounty' as keyof ICreateSiteFormValues, undefined);
    if (value?.id) {
      dispatch(fetchSubCountyDropdownRequest({ countyId: value.id }));
    }
  };

  /**
   * It gets the city from API and list the options
   * @param searchStr it denotes the search text
   */
  const loadCities = async (searchStr: string) => {
    if (searchStr) {
      try {
        const response = await listCities(searchStr);
        cityOptions.current = response.data;
        return response.data;
      } catch (error) {
        console.error('Unable to fetch cities', error);
        return [];
      }
    }
    return [];
  };
  

  /**
   * Gets the coordinates of selected city option.
   * @param option Selected city option
   */
  const handleCityChange = async (option: { label: string; value: string }) => {
    if (option) {
      try {
        const response = await getCoordinates(option.value);
        option.value = response.data.value;
      } catch (error) {
        console.error('Unable to fetch coordinates', error);
      }
    }
  };
  

  const columnStyle = `${isEdit ? 'col-sm-6 col-md-4' : 'col-sm-6'} col-12`;

  return (
    <div className='row gx-1dot25'>
      <div className={columnStyle}>
        <Field
          name='site.name'
          type='text'
          validate={composeValidators(required, minLength(2))}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Site Name'
              errorLabel='site name'
              capitalize={true}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className={columnStyle}>
        <Field
          name='site.siteType'
          type='text'
          validate={required}
          render={({ input, meta }) => (
            <SelectInput
              {...(input as any)}
              label='Site Type'
              errorLabel='type'
              options={APPCONSTANTS.SITE_TYPE}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      {showAccountField && (
        <div className={columnStyle}>
          <Field
            name='site.account'
            type='text'
            validate={required}
            render={({ input, meta }) => (
              <SelectInput
                {...(input as any)}
                label='Account'
                errorLabel='account'
                valueKey={isEdit ? 'id' : 'tenantId'}
                labelKey='name'
                disabled={isEdit || accountId || OUId}
                options={accountList || []}
                loadingOptions={accountListLoading}
                error={(meta.touched && meta.error) || undefined}
              />
            )}
          />
          <OnChange name='site.account'>
            {(value: ISiteDropdownList) => {
              try {
                if (value?.tenantId) {
                  dispatch(fetchOperatingUnitDropdownRequest({ tenantId: value.tenantId }));
                }
                form.change('site.operatingUnit' as keyof ICreateSiteFormValues, undefined);
              } catch (e) {
                if (e instanceof Error) {
                  console.error(e);
                }
              }
            }}
          </OnChange>
        </div>
      )}
      {showOUField && (
        <div className={`${showAccountField ? 'col-sm-6' : ''} ${columnStyle}`}>
          <Field
            name='site.operatingUnit'
            type='text'
            validate={required}
            render={({ input, meta }) => (
              <SelectInput
                {...(input as any)}
                label='Operating Unit'
                errorLabel='operating unit'
                valueKey={isEdit ? 'id' : 'tenantId'}
                labelKey='name'
                disabled={isEdit || OUId}
                options={operatingUnitList}
                loadingOptions={operatingUnitListLoading || operatingUnitLoading}
                error={(meta.touched && meta.error) || undefined}
              />
            )}
          />
        </div>
      )}
      <div className={columnStyle}>
        <Field
          name='site.email'
          type='text'
          validate={validateEmail}
          parse={(value: string) => value}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Email ID'
              required={false}
              errorLabel='email ID'
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className={columnStyle}>
        <Field
          name='site.phoneNumber'
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
      <div className={columnStyle}>
        <FieldArray
          name='site.addressType'
          type='checkbox'
          validate={validateCheckbox}
          render={({ fields, meta }) => (
            <CheckboxGroup
              fieldLabel='Address Type'
              required={true}
              errorLabel='address type'
              fields={fields}
              options={APPCONSTANTS.ADDRESS_TYPE}
              meta={meta}
            />
          )}
        />
      </div>
      <div className={columnStyle}>
        <Field
          name='site.addressUse'
          type='text'
          validate={required}
          render={({ input, meta }) => (
            <SelectInput
              {...(input as any)}
              label='Address Use'
              errorLabel='address use'
              options={APPCONSTANTS.ADDRESS_USE}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className={`${isEdit ? 'col-sm-6 col-md-4' : ''} col-12`}>
        <Field
          name='site.address1'
          type='text'
          validate={required}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              required={true}
              label='Address 1'
              errorLabel='address 1'
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className={`${isEdit ? 'col-sm-6 col-md-4' : ''} col-12`}>
        <Field
          name='site.address2'
          type='text'
          parse={(address: string) => address}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Address 2'
              required={false}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className={columnStyle}>
        <Field
          name='site.county'
          type='text'
          validate={required}
          render={({ input, meta }) => (
            <SelectInput
              {...(input as any)}
              label='State'
              errorLabel='state'
              labelKey='name'
              valueKey='id'
              options={stateList}
              loadingOptions={stateListLoading}
              onChange={(e) => loadSubCounty(e, input)}
              error={(meta.touched && meta.error) || undefined}
              isModel={isEdit ? true : false}
            />
          )}
        />
      </div>
      <div className={columnStyle}>
        <Field
          name='site.subCounty'
          type='text'
          validate={required}
          render={({ input, meta }) => (
            <SelectInput
              {...(input as any)}
              label='District'
              errorLabel='district'
              labelKey='name'
              valueKey='id'
              options={districtList}
              loadingOptions={districtListLoading}
              error={(meta.touched && meta.error) || undefined}
              isModel={isEdit ? true : false}
            />
          )}
        />
      </div>
      <div className={columnStyle}>
        <Field
          required={false}
          name='site.city'
          render={(props) => (
            <AsyncSelectInput
              {...props}
              label='City'
              errorLabel='city'
              labelKey='label'
              valueKey='locationId'
              options={cityOptions}
              loadInputOptions={loadCities}
              onChange={handleCityChange}
              error={(props.meta.touched && props.meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className={columnStyle}>
        <Field
          name='site.postalCode'
          type='text'
          validate={composeValidators(required, minLength(4))}
          parse={normalizePhone}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Pincode'
              errorLabel='pin code'
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className={columnStyle}>
        <Field
          name='site.culture'
          type='text'
          validate={required}
          render={({ input, meta }) => (
            <SelectInput
              {...(input as any)}
              label='Culture'
              errorLabel='culture'
              valueKey='id'
              labelKey='name'
              options={cultureList}
              loadingOptions={cultureListLoading}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className={columnStyle}>
        <Field
          name='site.siteLevel'
          type='text'
          validate={required}
          render={({ input, meta }) => (
            <SelectInput
              {...(input as any)}
              label='Site Level'
              errorLabel='site level'
              options={APPCONSTANTS.SITE_LEVEL}
              error={(meta.touched && meta.error) || undefined}
              isModel={isEdit ? true : false}
            />
          )}
        />
      </div>
    </div>
  );
};

export default SiteDetailsForm;
