import { FormApi } from 'final-form';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useDispatch, useSelector } from 'react-redux';

import TextInput from '../formFields/TextInput';
import {
  composeValidators,
  required,
  validateName,
  validateLastName,
  normalizePhone,
  validateMobile,
  convertToNumber
} from '../../utils/validation';
import BinIcon from '../../assets/images/bin.svg';
import ResetIcon from '../../assets/images/reset.svg';
import Radio from '../formFields/Radio';
import SelectInput from '../formFields/SelectInput';
import { fetchTimezoneListRequest, fetchCountryListRequest, fetchCultureListRequest } from '../../store/user/actions';
import {
  timezoneListSelector,
  loadingSelector,
  countryListSelector,
  cultureListSelector,
  cultureListLoadingSelector
} from '../../store/user/selectors';
import APPCONSTANTS from '../../constants/appConstants';
import PlusIcon from '../../assets/images/plus_blue.svg';
import { IAdminsFormValues } from '../../typings/global';
import EmailField from '../formFields/EmailField';
import { IUser } from '../../store/user/types';
import Checkbox from '../formFields/Checkbox';

export interface IUserFormValues {
  email: string;
  firstName: string;
  lastName: string;
  countryCode: string | { countryCode: string };
  username: string;
  phoneNumber: string;
  timezone: { id: string; description: string };
  gender: string;
  country: { countryCode: string };
}

interface IUserFormProps {
  form: FormApi<any>;
  initialEditValue?: any;
  disableOptions?: boolean;
  isEdit?: boolean;
  isSiteUser?: boolean;
  isDropdownDisable?: boolean;
  parentOrgId?: string;
  tenantId?: string;
  entityName?: string;
  enableAutoPopulate?: boolean;
}

/**
 * Form for region admin creation
 * @param param0
 * @returns {React.ReactElement}
 */
const UserForm = ({
  form,
  initialEditValue,
  disableOptions = false,
  isEdit,
  isSiteUser = false,
  isDropdownDisable = false,
  parentOrgId,
  tenantId,
  entityName,
  enableAutoPopulate
}: IUserFormProps): React.ReactElement => {
  const idRefs = useRef([new Date().getTime()]);
  const formName = 'users';
  const dispatch = useDispatch();
  const cultureList = useSelector(cultureListSelector);
  const isCultureListLoading = useSelector(cultureListLoadingSelector);
  const initialValue = useMemo<Array<Partial<IAdminsFormValues>>>(
    // memoizing the initial value to prevent infinite render cycles
    () => [
      {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        gender: '',
        culture: cultureList?.find((culture) => culture.id === APPCONSTANTS.DEFAULT_CULTURE.id)
      }
    ],
    [cultureList]
  );

  const isFormInvalid = form?.getState()?.errors?.[formName]?.length;
  const initialEditData = useMemo<Array<Partial<any>>>(
    () => [
      isDropdownDisable
        ? {
            ...initialEditValue,
            culture:
              !isCultureListLoading &&
              cultureList?.find(
                (culture) => culture.id === (initialEditValue?.cultureId || APPCONSTANTS.DEFAULT_CULTURE.id)
              )
          }
        : {
            ...initialEditValue,
            countryCode: { countryCode: initialEditValue?.countryCode },
            culture:
              !isCultureListLoading &&
              cultureList?.find(
                (culture) => culture.id === (initialEditValue?.cultureId || APPCONSTANTS.DEFAULT_CULTURE.id)
              )
          }
    ],
    [isDropdownDisable, initialEditValue, cultureList, isCultureListLoading]
  );
  const resetAdminForm = useCallback(
    (fields, index: number) => {
      form.mutators?.resetFields?.(`${formName}[${index}]`);
      fields.update(index, { ...initialValue[0] });
    },
    [initialValue, form.mutators]
  );

  const timezoneList = useSelector(timezoneListSelector);
  const isTmezoneListLoading = useSelector(loadingSelector);
  const countryList = useSelector(countryListSelector);
  const isCountryListLoading = useSelector(loadingSelector);

  const [autoFetched, setAutoFetched] = useState<boolean[]>([]);

  useEffect(() => {
    if (!timezoneList.length) {
      dispatch(fetchTimezoneListRequest());
    }
    if (!isDropdownDisable && !countryList.length) {
      dispatch(fetchCountryListRequest());
    }
    if (isSiteUser && cultureList && !cultureList.length) {
      dispatch(fetchCultureListRequest());
    }
    return () => {
      setAutoFetched([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autoPopulateUserData = (user: any, index: number) => {
    form.batch(() => {
      form.change(`${formName}[${index}].id`, user.id);
      form.change(`${formName}[${index}].firstName`, user.firstName);
      form.change(`${formName}[${index}].lastName`, user.lastName);
      form.change(`${formName}[${index}].gender`, user.gender);
      form.change(`${formName}[${index}].timezone`, user.timezone);
      form.change(
        `${formName}[${index}].culture`,
        (cultureList || []).find((culture) => culture.id === (user?.cultureId || APPCONSTANTS.DEFAULT_CULTURE.id))
      );
      form.change(`${formName}[${index}].phoneNumber`, user.phoneNumber);
      form.change(`${formName}[${index}].countryCode`, { countryCode: user.countryCode });
      form.change(`${formName}[${index}].redRisk`, user.redRisk);
      form.change(
        `${formName}[${index}].roleName`,
        APPCONSTANTS.SITE_ROLES.find((roles) => roles.value === user.defaultRoleName)
      );
      const newAutoFetched = [...autoFetched];
      newAutoFetched[index] = true;
      setAutoFetched(newAutoFetched);
    });
  };

  const isError = (meta: any) => (meta.touched && meta.error) || undefined;

  const handleShowAddIcon = (isLastChild: boolean, fields: any) => {
    return (
      isLastChild && (
        <div
          className={`theme-text lh-1dot25 pointer d-flex align-items-center ${isFormInvalid ? 'not-allowed' : ''}`}
          onClick={
            isFormInvalid
              ? undefined
              : () => {
                  idRefs.current.push(new Date().getTime());
                  fields.push({ ...initialValue[0] });
                }
          }
        >
          <img className='me-0dot5' src={PlusIcon} alt='' />
          {isSiteUser ? 'Add Another User' : 'Add Another Admin'}
        </div>
      )
    );
  };

  const handleShowRemoveIcon = (fields: any, index: number) => {
    return (
      Number(fields?.length) > 1 && (
        <div
          className='danger-text lh-1dot25 pointer'
          onClick={() => {
            const newAutoFetched = [...autoFetched];
            newAutoFetched.splice(index, 1);
            setAutoFetched(newAutoFetched);
            idRefs.current = idRefs.current.filter((id) => idRefs.current[index] !== id);
            fields.remove(index);
          }}
        >
          <img className='me-0dot5' src={BinIcon} alt='' />
          {isSiteUser ? 'Remove User' : 'Remove Admin'}
        </div>
      )
    );
  };

  const disableSiteRoles = (index: number) => (isEdit ? isEdit : autoFetched[index]);

  const formatCountryCode = (value: string) => (value ? `+${value}` : '');

  const siteRolesChange = (input: any, v: any, index: number) => {
    if (!isEdit || !autoFetched[index]) {
      input.onChange(v);
    }
  };

  const actionButtons = (fields: any, index: number, isLastChild: boolean, emailFieldRef: any) =>
    !disableOptions && (
      <div className={`col-12 d-flex justify-content-between mt-0dot5 ${isLastChild ? '' : 'mb-2'}`}>
        {handleShowAddIcon(isLastChild, fields)}
        {handleShowRemoveIcon(fields, index)}
        <div
          className='theme-text lh-1dot25 pointer'
          onClick={() => {
            const newAutoFetched = [...autoFetched];
            newAutoFetched[index] = false;
            setAutoFetched(newAutoFetched);
            emailFieldRef.current?.resetEmailField?.();
            resetAdminForm(fields, index);
          }}
        >
          <img className='me-0dot5' src={ResetIcon} alt='' />
          Reset Fields
        </div>
      </div>
    );

  return (
    <>
      <FieldArray name={formName} initialValue={isEdit ? initialEditData : initialValue}>
        {({ fields }) =>
          fields.map((name, index) => {
            const isLastChild = (fields?.length || 0) === index + 1;
            const isFirstChild = !index;
            const emailFieldRef = React.createRef<{ resetEmailField?: () => void }>();
            return (
              <span key={`form_${idRefs.current[index]}`}>
                <div className='row gx-1dot25'>
                  <Field name={`${name}._id`} render={() => null} />{' '}
                  {/** A hidden field to store user' id if user is auto populated */}
                  <div className={`col-12 ${isFirstChild ? '' : 'mt-1dot5'}`}>
                    <EmailField
                      ref={emailFieldRef}
                      formName={formName}
                      index={index}
                      name={name}
                      isEdit={isEdit}
                      form={form}
                      parentOrgId={parentOrgId}
                      tenantId={tenantId}
                      entityName={entityName}
                      enableAutoPopulate={enableAutoPopulate}
                      onFindExistingUser={(user: IUser) => autoPopulateUserData(user, index)}
                    />
                  </div>
                  <div className='col-sm-6 col-12'>
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
                  <div className='col-sm-6 col-12'>
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
                  <div className='col-12'>
                    <Field
                      name={`${name}.gender`}
                      render={(props) => (
                        <Radio
                          {...props}
                          fieldLabel='Gender'
                          errorLabel='gender'
                          options={APPCONSTANTS.GENDER_OPTIONS}
                        />
                      )}
                    />
                  </div>
                  {isDropdownDisable ? (
                    <div className='col-sm-6 col-12'>
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
                  ) : (
                    <div className='col-sm-6 col-12'>
                      <Field
                        name={`${name}.countryCode`}
                        type='text'
                        validate={required}
                        render={({ input, meta }) => (
                          <SelectInput
                            {...(input as any)}
                            label='Country Code'
                            errorLabel='country code'
                            labelKey='countryCode'
                            valueKey='countryCode'
                            appendPlus={true}
                            options={countryList}
                            loadingOptions={isCountryListLoading}
                            error={isError(meta)}
                            isModel={true}
                          />
                        )}
                      />
                    </div>
                  )}
                  <div className='col-sm-6 col-12'>
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
                  <div className='col-sm-6 col-12'>
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
                          loadingOptions={isTmezoneListLoading}
                          error={isError(meta)}
                          isModel={true}
                        />
                      )}
                    />
                  </div>
                  {isSiteUser && (
                    <>
                      <div className='col-sm-6 col-12'>
                        <Field
                          name={`${name}.culture`}
                          type='text'
                          render={({ input, meta }) => (
                            <SelectInput
                              {...(input as any)}
                              label='Culture'
                              errorLabel='culture'
                              required={false}
                              labelKey='name'
                              valueKey='id'
                              options={cultureList}
                              loadingOptions={isCultureListLoading}
                              error={isError(meta)}
                              isModel={true}
                            />
                          )}
                        />
                      </div>
                      <div className='col-6'>
                        <Field
                          name={`${name}.roleName`}
                          type='text'
                          validate={required}
                          render={({ input, meta }) => (
                            <SelectInput
                              {...(input as any)}
                              label='Role'
                              errorLabel='role'
                              options={APPCONSTANTS.SITE_ROLES}
                              disabled={disableSiteRoles(index)}
                              error={isError(meta)}
                              onChange={(v) => siteRolesChange(input, v, index)}
                            />
                          )}
                        />
                      </div>
                      <div className='col-6'>
                        <Field
                          name={`${name}.redRisk`}
                          type='checkbox'
                          render={({ input }) => <Checkbox switchCheckbox={true} label='Red Risk' {...input} />}
                        />
                      </div>
                    </>
                  )}
                  {actionButtons(fields, index, isLastChild, emailFieldRef)}
                </div>
                {!isLastChild && <div className='divider mx-neg-1dot25' />}
              </span>
            );
          })
        }
      </FieldArray>
    </>
  );
};

export default UserForm;
