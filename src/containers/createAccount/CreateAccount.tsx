import { FormApi, Tools } from 'final-form';
import React from 'react';
import { History } from 'history';
import { RouteComponentProps } from 'react-router-dom';
import { Form, FormRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import AccountForm from './AccountForm';
import FormContainer from '../../components/formContainer/FormContainer';
import APPCONSTANTS from '../../constants/appConstants';
import { PROTECTED_ROUTES } from '../../constants/route';
import { AppState } from '../../store/rootReducer';
import { createAccountRequest } from '../../store/account/actions';
import { IAccountPayload, ICreateAccountRequestPayload } from '../../store/account/types';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import AccountFormIcon from '../../assets/images/info-grey.svg';
import AccountAdminFormIcon from '../../assets/images/avatar-o.svg';
import Loader from '../../components/loader/Loader';
import UserForm, { IUserFormValues } from '../../components/userForm/UserForm';
import sessionStorageServices from '../../global/sessionStorageServices';

export interface IAccountFormValues {
  account: {
    name: string;
    maxNoOfUsers?: number;
    clinicalWorkflow: number[];
    customizedWorkflow: number[];
  };
  users: IUserFormValues[];
}

interface IRouteProps {
  history: History;
}

interface IDispatchProps {
  createAccountRequest: (data: ICreateAccountRequestPayload) => void;
}

interface IStateProps {
  loading: boolean;
  countryId: string;
}

interface IRouteProps extends RouteComponentProps<{ regionId: string; tenantId: string }> {}
export type Props = IStateProps & IDispatchProps & IRouteProps;

/**
 * Renders the form for account creation
 */
class CreateAccount extends React.PureComponent<Props> {
  private formInstance?: FormApi<IAccountFormValues>;
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
          render={({ handleSubmit, form }: FormRenderProps<IAccountFormValues>) => {
            this.formInstance = form;
            return (
              <form onSubmit={handleSubmit}>
                <div className='row g-1dot25'>
                  <div className='col-lg-6 col-12'>
                    <FormContainer label='Account Details' icon={AccountFormIcon}>
                      <AccountForm form={this.formInstance} />
                    </FormContainer>
                  </div>
                  <div className='col-lg-6 col-12'>
                    <FormContainer label='Account Admin' icon={AccountAdminFormIcon}>
                      <UserForm form={this.formInstance} />
                    </FormContainer>
                  </div>
                </div>
                <div className='col-12 mt-1dot25 d-flex'>
                  <button
                    type='button'
                    className='btn secondary-btn me-0dot625 px-1dot125 ms-auto'
                    onClick={this.handleNavigation}
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
  private resetFields = ([subStrOfKey]: [string], state: any, utils: Tools<IAccountFormValues>) => {
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
   * Handler for navigation
   */
  private handleNavigation = () => {
    const { countryId } = this.props;
    let redirectTo: string;
    if (countryId) {
      redirectTo = PROTECTED_ROUTES.accountDashboard;
    } else {
      redirectTo = PROTECTED_ROUTES.accountByRegion
        .replace(':regionId', sessionStorageServices.getItem(APPCONSTANTS.FORM_ID))
        .replace(':tenantId', sessionStorageServices.getItem(APPCONSTANTS.ID));
    }
    this.props.history.push(redirectTo);
  };

  /**
   * Handler for form submition action
   * @param values
   */
  private onSubmit = ({ account, users }: IAccountFormValues) => {
    const { regionId, tenantId } = this.props.match.params;
    const accountUsers = [...users] as any;
    // to be changed when working on Create Account
    const data = {
      name: account.name.trim(),
      maxNoOfUsers: account.maxNoOfUsers ? Number(account.maxNoOfUsers) : undefined,
      clinicalWorkflow: account.clinicalWorkflow,
      customizedWorkflow: account.customizedWorkflow,
      countryId: Number(regionId),
      parentOrganizationId: Number(tenantId),
      tenantId: Number(tenantId),
      users: accountUsers.map((user: any) => {
        return {
          ...user,
          firstName: user.firstName.trim(),
          lastName: user.lastName.trim(),
          username: user.email,
          timezone: { id: Number(user.timezone.id) },
          countryCode: user.countryCode.countryCode,
          country: regionId,
          tenantId: user
        };
      })
    } as IAccountPayload;
    this.props.createAccountRequest({
      data,
      successCb: () => {
        this.handleNavigation();
        toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.ACCOUNT_CREATION_SUCCESS);
      },
      failureCb: (e) =>
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_CREATION_FAIL))
    });
  };
}

const mapStateToProps = (state: AppState) => ({
  loading: state.account.loading,
  countryId: state.user.user.countryId
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createAccountRequest: (data: ICreateAccountRequestPayload) => dispatch(createAccountRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
