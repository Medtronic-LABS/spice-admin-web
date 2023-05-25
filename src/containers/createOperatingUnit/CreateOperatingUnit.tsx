import { FormApi, Tools } from 'final-form';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Form, FormRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import OperatingUnitForm from '../../components/operatingUnitForm/OperatingUnitForm';
import FormContainer from '../../components/formContainer/FormContainer';
import { PROTECTED_ROUTES } from '../../constants/route';
import { AppState } from '../../store/rootReducer';
import OUFormIcon from '../../assets/images/info-grey.svg';
import OUAdminFormIcon from '../../assets/images/avatar-o.svg';
import Loader from '../../components/loader/Loader';
import UserForm, { IUserFormValues } from '../../components/userForm/UserForm';
import { createOperatingUnitRequest } from '../../store/operatingUnit/actions';
import { ICreateOperatingUnitRequest } from '../../store/operatingUnit/types';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import APPCONSTANTS from '../../constants/appConstants';
import { IAccountOption } from '../../store/account/types';
import { ICountry, roleType } from '../../store/user/types';
import sessionStorageServices from '../../global/sessionStorageServices';

export interface IOUFormValues {
  operatingUnit: {
    name: string;
    account?: IAccountOption;
  };
  users: IUserFormValues[];
}
interface IStateProps {
  loading: boolean;
  role: roleType;
  countryId?: ICountry;
}

interface IDispatchProps {
  createOperatingUnit: (data: Omit<ICreateOperatingUnitRequest, 'type'>) => void;
}

type Props = IStateProps &
  IDispatchProps &
  RouteComponentProps<{ regionId: string; tenantId: string; accountId: string }>;

/**
 * Renders the form for Operating Unit creation
 */
class CreateOperatingUnit extends React.Component<Props> {
  private formInstance?: FormApi<IOUFormValues>;

  public render() {
    const { loading } = this.props;
    return (
      <>
        <Form
          onSubmit={this.onSubmit}
          mutators={{
            ...arrayMutators,
            resetFields: this.resetFields
          }}
          render={({ handleSubmit, form }: FormRenderProps<IOUFormValues>) => {
            this.formInstance = form;
            return (
              <form onSubmit={handleSubmit}>
                <div className='row g-1dot25'>
                  <div className='col-lg-6 col-12'>
                    <FormContainer label='Operating Unit Details' icon={OUFormIcon}>
                      <OperatingUnitForm form={this.formInstance} nestingKey='operatingUnit' />
                    </FormContainer>
                  </div>
                  <div className='col-lg-6 col-12'>
                    <FormContainer label='Operating Unit Admin' icon={OUAdminFormIcon}>
                      <UserForm form={this.formInstance} />
                    </FormContainer>
                  </div>
                </div>
                <div className='col-12 mt-1dot25 d-flex'>
                  <button
                    type='button'
                    className='btn secondary-btn me-0dot625 px-1dot125 ms-auto'
                    onClick={this.navigateBack}
                  >
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
  }

  /**
   * Resets all the fields whose name contains given substring,
   * @param param0
   * @param state
   * @param utils
   */
  private resetFields = ([subStrOfKey]: [string], state: any, utils: Tools<IOUFormValues>) => {
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

  /**
   * Handler for navigating back
   */
  private navigateBack = () => {
    const { role } = this.props;
    const { accountId, tenantId, regionId } = this.props.match.params;
    let redirectTo: string;
    if (regionId && tenantId) {
      redirectTo = PROTECTED_ROUTES.OUByRegion.replace(':regionId', regionId).replace(':tenantId', tenantId);
    } else if (
      accountId &&
      tenantId &&
      (role === APPCONSTANTS.ROLES.REGION_ADMIN ||
        role === APPCONSTANTS.ROLES.SUPER_ADMIN ||
        role === APPCONSTANTS.ROLES.SUPER_USER)
    ) {
      redirectTo = PROTECTED_ROUTES.OUByAccount.replace(':accountId', accountId).replace(':tenantId', tenantId);
    } else {
      redirectTo = PROTECTED_ROUTES.OUDashboard;
    }
    this.props.history.push(redirectTo);
  };

  /**
   * Handler for form submition action
   * @param values
   */
  private onSubmit = ({ operatingUnit: { account, ...operatingUnit }, users }: IOUFormValues) => {
    const { accountId, tenantId } = this.props.match.params;
    const { countryId } = this.props;
    this.props.createOperatingUnit({
      payload: {
        ...operatingUnit,
        name: operatingUnit.name.trim(),
        users: users.map((user: any) => ({
          ...user,
          firstName: user.firstName.trim(),
          lastName: user.lastName.trim(),
          timezone: { id: Number(user.timezone?.id) },
          username: user.email,
          country: {
            id: Number(countryId?.id) || Number(sessionStorageServices.getItem(APPCONSTANTS.COUNTRY_ID))
          },
          countryCode: user.countryCode.countryCode
        })),
        countryId: Number(countryId?.id) || Number(sessionStorageServices.getItem(APPCONSTANTS.COUNTRY_ID)),
        account: { id: Number(account?.id) || Number(accountId) },
        parentOrganizationId: accountId ? Number(tenantId) : Number(account?.tenantId),
        tenantId: (accountId ? tenantId : account?.tenantId) as string
      },
      successCb: () => {
        this.navigateBack();
        toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.OU_CREATION_SUCCESS);
      },
      failureCb: (e: Error) =>
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OU_CREATION_FAIL))
    });
  };
}

const mapStateToProps = (state: AppState): IStateProps => ({
  loading: state.operatingUnit.loading,
  role: state.user.user.role,
  countryId: state.user.user.countryId
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  createOperatingUnit: (data: Omit<ICreateOperatingUnitRequest, 'type'>) => dispatch(createOperatingUnitRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOperatingUnit);
