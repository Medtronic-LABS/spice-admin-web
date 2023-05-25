import { FormApi, Tools } from 'final-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Form, FormRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import { PROTECTED_ROUTES } from '../../constants/route';
import FormContainer from '../../components/formContainer/FormContainer';
import SiteDetailsIcon from '../../assets/images/info-grey.svg';
import SiteAddUserIcon from '../../assets/images/avatar-o.svg';
import { ISelectOption } from '../../components/formFields/SelectInput';
import APPCONSTANTS from '../../constants/appConstants';
import Loader from '../../components/loader/Loader';
import UserForm from '../../components/userForm/UserForm';

import SiteDetailsForm from './SiteDetailsForm';
import { ICreateSiteFormValues, ICreateSiteRequestPayload, ISiteUserCreatePayload } from '../../store/site/types';
import { createSiteRequest } from '../../store/site/actions';
import { siteLoadingSelector } from '../../store/site/selectors';
import { countryIdSelector, roleSelector } from '../../store/user/selectors';
import sessionStorageServices from '../../global/sessionStorageServices';
import { formatSite } from '../../utils/commonUtils';
import { ICulture } from '../../store/user/types';

export interface IAddUserFormValues {
  email: string;
  firstName: string;
  lastName: string;
  countryCode: { countryCode?: string; id?: number };
  phoneNumber: string;
  timezone: { id: string; description: string };
  gender: string;
  roleName: ISelectOption;
  country: { countryCode?: string; id?: number };
  redRisk: boolean;
  culture: ICulture;
  cultureId: number;
}

interface IMatchParams {
  regionId?: string;
  tenantId: string;
  OUId?: string;
  accountId?: string;
}

interface IRouteProps extends RouteComponentProps<IMatchParams> {}

/**
 * Renders the form for create site
 */
const CreateSite = (props: IRouteProps): React.ReactElement => {
  let formInstance: FormApi<ICreateSiteFormValues>;
  const history = useHistory();
  const dispatch = useDispatch();

  const loading = useSelector(siteLoadingSelector);
  const countryId = useSelector(countryIdSelector);
  const role = useSelector(roleSelector);
  const [OUTenantId, setSelectedOUTenantId] = useState<string>('');

  const { regionId, tenantId, accountId, OUId } = props.match.params;

  useEffect(() => {
    formInstance?.subscribe(
      (formState) => {
        const nextOUTenantId = formState?.values?.site?.operatingUnit?.tenantId || '';
        if (nextOUTenantId !== OUTenantId) {
          setSelectedOUTenantId(nextOUTenantId);
        }
      },
      { values: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handler for form cancel
   */
  const onCancel = () => {
    const url = ((regionId && PROTECTED_ROUTES.siteByRegion) ||
      (accountId && PROTECTED_ROUTES.siteByAccount) ||
      (OUId && role === APPCONSTANTS.ROLES.OPERATING_UNIT_ADMIN && PROTECTED_ROUTES.siteDashboard) ||
      (OUId && PROTECTED_ROUTES.siteByOU)) as string;
    history.push(
      url
        .replace(':tenantId', tenantId)
        .replace(/(:regionId)|(:accountId)|(:OUId)/, (regionId || OUId || accountId) as string)
    );
  };

  /**
   * Resets all the fields whose name contains given substring,
   * @param param0
   * @param state
   * @param utils
   */
  const resetFields = ([subStrOfKey]: [string], state: any, utils: Tools<ICreateSiteFormValues>) => {
    try {
      Object.keys(state.fields).forEach((key: string) => {
        if (key.includes(subStrOfKey)) {
          utils.resetFieldState(key);
        }
      });
    } catch (e) {
      console.error('Error removing form', e);
    }
  };

  const onCreateSuccess = () => {
    toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.SITE_CREATION_SUCCESS);
    onCancel();
  };

  const onCreateFailure = (e: Error) => {
    try {
      throw e;
    } catch (error:any) {
      toastCenter.error(...getErrorToastArgs(error, APPCONSTANTS.ERROR, APPCONSTANTS.SITE_CREATION_ERROR));
    }
  };
  

  /**
   * Handler for form submition action
   * @param values
   */
  const onSubmit = ({ site, users }: ICreateSiteFormValues) => {
    const data: ICreateSiteRequestPayload = {
      ...formatSite(site),
      accountId: Number(accountId) || Number(site.account.id),
      parentOrganizationId: OUId ? Number(tenantId) : Number(site.operatingUnit.tenantId),
      tenantId: OUId ? Number(tenantId) : Number(site.operatingUnit.tenantId),
      operatingUnit: { id: site.operatingUnit.id },
      countryId: Number(countryId?.id) || Number(sessionStorageServices.getItem(APPCONSTANTS.COUNTRY_ID)),
      cultureId: Number(site.culture.id),
      email: site.email,
      name: site.name.trim(),
      address1: site.address1,
      address2: site.address2,
      postalCode: site.postalCode,
      phoneNumber: site.phoneNumber,
      location: site.location,
      users: users.map(
        (user) =>
          ({
            ...user,
            firstName: user.firstName.trim(),
            lastName: user.lastName.trim(),
            username: user.email,
            timezone: { id: Number(user.timezone.id) },
            roles: [{ name: user.roleName.value }],
            isAdded: true,
            redRisk: user.redRisk,
            cultureId: user.culture.id,
            countryCode: user.countryCode.countryCode,
            country: {
              id: Number(countryId?.id) || Number(sessionStorageServices.getItem(APPCONSTANTS.COUNTRY_ID))
            }
          } as ISiteUserCreatePayload)
      )
    };
    dispatch(createSiteRequest({ data, successCb: onCreateSuccess, failureCb: onCreateFailure }));
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
          resetFields
        }}
        render={({ handleSubmit, form }: FormRenderProps<ICreateSiteFormValues>) => {
          formInstance = form;
          return (
            <form onSubmit={handleSubmit}>
              <div className='row g-1dot25'>
                <div className='col-lg-6 col-12'>
                  <FormContainer label='Site Details' icon={SiteDetailsIcon}>
                    <SiteDetailsForm tenantId={tenantId} form={formInstance} />
                  </FormContainer>
                </div>
                <div className='col-lg-6 col-12'>
                  <FormContainer label='Add User' icon={SiteAddUserIcon}>
                    <UserForm
                      form={form}
                      isSiteUser={true}
                      enableAutoPopulate={true}
                      parentOrgId={OUTenantId}
                      entityName='site'
                    />
                  </FormContainer>
                </div>
              </div>
              <div className='col-12 mt-1dot25 d-flex'>
                <button type='button' className='btn secondary-btn me-0dot625 px-1dot125 ms-auto' onClick={onCancel}>
                  Cancel
                </button>
                <button type='submit' className='btn primary-btn px-1dot75'>
                  Submit
                </button>
              </div>
              {loading && <Loader isFullScreen={loading} className='translate-x-minus50' />}
            </form>
          );
        }}
      />
    </>
  );
};

export default CreateSite;
