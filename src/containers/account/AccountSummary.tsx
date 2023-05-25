import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import CustomTable from '../../components/customtable/CustomTable';
import DetailCard from '../../components/detailCard/DetailCard';
import {
  fetchAccountDetailReq,
  updateAccountDetail,
  updateAccountAdmin,
  createAccountAdmin,
  deleteAccountAdmin,
  decactivateAccountReq
} from '../../store/account/actions';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import APPCONSTANTS from '../../constants/appConstants';
import Loader from '../../components/loader/Loader';
import {
  IFetchAccountDetailReqPayload,
  IAccountAdmin,
  IAccount,
  IAccountInfo,
  IDeleteAccountAdminPayload,
  IAccountDetail,
  IAdminEditFormValues,
  IDeactivateReqPayload,
  IAccountDeactivateFormValues,
  IClinicalWorkflow
} from '../../store/account/types';
import { AppState } from '../../store/rootReducer';
import { ITimezone } from '../../store/user/types';
import Modal from '../../components/modal/ModalForm';
import AccountForm from '../createAccount/AccountForm';
import arrayMutators from 'final-form-arrays';
import sessionStorageServices from '../../global/sessionStorageServices';
import Deactivation from '../../components/deactivate/Deactivation';
import { PROTECTED_ROUTES } from '../../constants/route';
import UserForm from '../../components/userForm/UserForm';
import { convertToCaptilize } from '../../utils/validation';
import IconLegal from '../../assets/images/icon-legal.svg';
import AccountConsentForm from './AccountConsentForm';

interface IMatchParams {
  accountId: string;
  tenantId: string;
}

interface IMatchProps extends RouteComponentProps<IMatchParams> {}

interface IDispatchProps {
  fetchAccountDetailReq: (data: IFetchAccountDetailReqPayload) => void;
  updateAccountDetail: ({
    data,
    successCb,
    failureCb
  }: {
    data: IAccountInfo;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => void;
  updateAccountAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IAccountAdmin;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => void;
  createAccountAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IAccountAdmin;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => void;
  deleteAccountAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IDeleteAccountAdminPayload;
    successCb: () => void;
    failureCb: (e: Error) => void;
  }) => void;
  decactivateAccountReq: (payload: IDeactivateReqPayload) => void;
}

interface IStateProps {
  loading: boolean;
  workflowLoading: boolean;
  account: IAccount;
  timezoneList: ITimezone[];
  role: string;
  countryId?: any;
}

interface IAccountDetailState {
  isOpenAdminModal: boolean;
  isOpenAccountModal: boolean;
  adminInitialValues: IAccountAdmin;
  isAdd: boolean;
  isOpenDeactivateModal: boolean;
  selectedAccount: any;
  openConsentForm: boolean;
}

type Props = IMatchProps & IDispatchProps & IStateProps;
/**
 * Shows the account detail
 * Provides search feature in admin
 * Provides edit feature for admin and account basic detail
 */
class AccountSummary extends React.PureComponent<Props, IAccountDetailState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenAdminModal: false,
      isOpenAccountModal: false,
      adminInitialValues: {} as IAccountAdmin,
      isAdd: false,
      isOpenDeactivateModal: false,
      openConsentForm: false,
      selectedAccount: {}
    };
  }

  componentDidMount() {
    this.getAccountDetail();
  }

  editDeactivateModalRender = (form: any) => {
    return this.state.isOpenDeactivateModal ? <Deactivation formName='account' /> : <AccountForm form={form} />;
  };

  handleConsentFormOpen = (data: any) => {
    const { countryId } = this.props;
    this.setState({
      selectedAccount: { ...data, regionId: countryId || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID) },
      openConsentForm: true
    });
  };

  handleConsentFormClose = () => {
    this.setState({ selectedAccount: {}, openConsentForm: false });
  };

  public render() {
    const { loading, workflowLoading, account, role } = this.props;
    const { isOpenAdminModal, adminInitialValues, isOpenAccountModal, isAdd, isOpenDeactivateModal } = this.state;
    const isReadOnly = role === APPCONSTANTS.ROLES.ACCOUNT_ADMIN;
    return (
      <>
        {(loading || workflowLoading) && <Loader />}
        <div className='row g-0dot625'>
          <div className='col-12'>
            <DetailCard
              buttonLabel={isReadOnly ? undefined : 'Edit Account'}
              customLabel={isReadOnly ? '' : 'Consent form'}
              onCustomClick={() => (isReadOnly ? null : this.handleConsentFormOpen(account))}
              customButtonIcon={isReadOnly ? '' : IconLegal}
              isEdit={true}
              header='Account Summary'
              onButtonClick={this.openAccountEditModal}
            >
              <div className='row  gy-1 mt-0dot25 mb-1dot25 mx-0dot5'>
                {this.getSummaryDetails().map(({ label, value }) => (
                  <div key={label} className='col-lg-4 col-sm-6'>
                    <div className='fs-0dot875 charcoal-grey-text'>{label}</div>
                    <div className='primary-title text-ellipsis'>{value || '--'}</div>
                  </div>
                ))}
              </div>
            </DetailCard>
          </div>
          <div className='col-12'>
            <DetailCard
              buttonLabel={isReadOnly ? undefined : 'Add Account Admin'}
              header='Account Admin'
              searchPlaceholder={APPCONSTANTS.SEARCH_BY_NAME_EMAIL}
              isSearch={true}
              onSearch={this.handleSearch}
              onButtonClick={this.openAddModal}
            >
              <CustomTable
                rowData={account.users || []}
                columnsDef={[
                  {
                    id: 1,
                    name: 'firstName',
                    label: 'Name',
                    width: '125px',
                    cellFormatter: this.formatName
                  },
                  { id: 2, name: 'username', label: 'Email ID', width: '220px' },
                  {
                    id: 3,
                    name: 'gender',
                    label: 'Gender',
                    width: '110px'
                  },
                  {
                    id: 4,
                    name: 'phoneNumber',
                    label: 'Contact Number',
                    width: '140px',
                    cellFormatter: this.formatPhone
                  }
                ]}
                isEdit={!isReadOnly}
                isDelete={!isReadOnly}
                onRowEdit={this.openEditModal}
                onDeleteClick={this.handleAdminDeleteClick}
                confirmationTitle={APPCONSTANTS.ACCOUNT_ADMIN_DELETE_CONFIRMATION}
                deleteTitle={APPCONSTANTS.ACCOUNT_ADMIN_DELETE_TITLE}
              />
            </DetailCard>
          </div>
          <AccountConsentForm
            isOpen={this.state.openConsentForm}
            consentFormConfig={this.state.selectedAccount}
            handleConsentFormClose={this.handleConsentFormClose}
          />
          <Modal
            show={isOpenAdminModal}
            title={`${isAdd ? 'Add' : 'Edit'} Account Admin`}
            cancelText='Cancel'
            submitText='Submit'
            handleCancel={this.handleCancelClick}
            handleFormSubmit={this.handleAdminSubmit}
            initialValues={{ users: adminInitialValues }}
            mutators={arrayMutators}
            render={this.editModalRender}
          />
          <Modal
            show={isOpenAccountModal}
            title={isOpenDeactivateModal ? 'Deactivate Account' : 'Edit Account'}
            cancelText='Cancel'
            submitText='Submit'
            handleCancel={this.handleCancelClick}
            handleFormSubmit={!isOpenDeactivateModal ? this.handleAccountFormSubmit : this.handleDeactivate}
            initialValues={!isOpenDeactivateModal ? { account } : {}}
            deactivateLabel={!isOpenDeactivateModal ? 'Deactivate Account' : ''}
            handleDeactivate={this.showDeactivateModal}
            isDeactivateModal={isOpenDeactivateModal}
            render={this.editDeactivateModalRender}
          />
        </div>
      </>
    );
  }

  /**
   * Loads the account detail
   */
  private getAccountDetail = (search?: string) => {
    const { tenantId, accountId } = this.props.match.params;

    this.props.fetchAccountDetailReq({
      tenantId,
      id: accountId,
      searchTerm: search,
      failureCb: (e) =>
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_DETAIL_FETCH_ERROR)),
      successCb: (res: any) => {
        if (!res?.id) {
          toastCenter.error(APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_DETAIL_FETCH_ERROR);
          this.handleNavigation();
        }
      }
    });
  };

  /**
   * Getter for the formatted summary details
   * @param search
   */
  private getSummaryDetails = () => {
    const {
      account: { name, maxNoOfUsers, clinicalWorkflow, customizedWorkflow }
    } = this.props;
    const getWorkflowValues = (workflows?: Array<IClinicalWorkflow | string>) =>
      workflows
        ? workflows
            .map((workflow: IClinicalWorkflow | string) =>
              typeof workflow !== 'string' ? convertToCaptilize(workflow?.name) : null
            )
            .join(', ')
        : '';
    return [
      { label: 'Account Name', value: name },
      { label: 'Maximum No. of Users', value: maxNoOfUsers },
      { label: 'Clinical Workflows', value: getWorkflowValues(clinicalWorkflow) },
      { label: 'Customized Workflows', value: getWorkflowValues(customizedWorkflow) }
    ];
  };

  /**
   * Handler for search account admin
   * @param search search string
   */
  private handleSearch = (search: string) => {
    this.getAccountDetail(search);
  };

  /**
   * Generates the full name using first name and last name
   * @param user
   * @returns
   */
  private formatName = (user: IAccountAdmin) => {
    return `${user.firstName} ${user.lastName}`;
  };

  /**
   * Formats the phone number with country code
   * @param user
   * @returns
   */
  private formatPhone = (user: IAccountAdmin) => {
    return user.countryCode ? '+ ' + user.countryCode + ' ' + user.phoneNumber : user.phoneNumber;
  };

  /**
   * Handler to open account admin edit modal
   * @param values
   */
  private openEditModal = (values: IAccountAdmin) => {
    this.setState({ isOpenAdminModal: true, adminInitialValues: values, isAdd: false });
  };

  /**
   * Handler to open account edit modal with prepopulated values
   */
  private openAccountEditModal = () => {
    this.setState({ isOpenAccountModal: true });
  };

  /**
   * Handler for account edit form submit.
   * @param values
   */
  private handleAccountFormSubmit = (values?: IAccountDetail) => {
    const { countryId } = this.props;
    const data = JSON.parse(JSON.stringify(values));
    data.account.maxNoOfUsers = data.account.maxNoOfUsers ? Number(data.account.maxNoOfUsers) : 0;
    data.account.countryId = Number(countryId?.id) || Number(sessionStorageServices.getItem(APPCONSTANTS.COUNTRY_ID));
    delete data.account.users;
    delete data.account.country;
    this.props.updateAccountDetail({
      data: data.account,
      successCb: () => {
        toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.ACCOUNT_UPDATE_SUCCESS);
        this.getAccountDetail();
        this.handleCancelClick();
      },
      failureCb: (e) => toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_UPDATE_FAIL))
    });
  };

  /**
   * Handler for add/edit admin form submit.
   * @param values
   */
  private handleAdminSubmit = ({ users }: { users: IAdminEditFormValues[] }) => {
    const { isAdd } = this.state;
    const { countryId } = this.props;

    const { tenantId } = this.props.account;
    const admin: any = users[0];
    delete admin.index;
    admin.countryCode = admin.countryCode.countryCode;
    if (isAdd) {
      this.props.createAccountAdmin({
        data: {
          ...admin,
          firstName: admin.firstName.trim(),
          lastName: admin.lastName.trim(),
          username: admin.email,
          tenantId,
          timezone: { id: admin.timezone.id },
          country: { id: countryId || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID) }
        } as IAccountAdmin,
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.ACCOUNT_ADMIN_CREATE_SUCCESS);
          this.handleCancelClick();
          this.getAccountDetail();
        },
        failureCb: (e) =>
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.ACCOUNT_ADMIN_CREATE_FAIL))
      });
    } else {
      admin.tenantId = tenantId;
      this.props.updateAccountAdmin({
        data: {
          ...(admin as IAccountAdmin),
          firstName: admin.firstName.trim(),
          lastName: admin.lastName.trim(),
          country: { id: countryId?.id || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID) }
        },
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.ACCOUNT_ADMIN_UPDATE_SUCCESS);
          this.handleCancelClick();
          this.getAccountDetail();
        },
        failureCb: (e) =>
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.ACCOUNT_ADMIN_UPDATE_FAIL))
      });
    }
  };

  /**
   * Handle for modal cancel
   */
  private handleCancelClick = () => {
    this.setState({
      isOpenAdminModal: false,
      isOpenAccountModal: false,
      adminInitialValues: {} as IAccountAdmin,
      isOpenDeactivateModal: false
    });
  };

  /**
   * Handler for admin create modal
   */
  private openAddModal = () => {
    this.setState({
      isOpenAdminModal: true,
      isAdd: true,
      adminInitialValues: {} as IAccountAdmin
    });
  };
  private editModalRender = (form: any) => {
    const { adminInitialValues, isAdd } = this.state;
    return <UserForm form={form} initialEditValue={adminInitialValues} disableOptions={true} isEdit={!isAdd} />;
  };

  /**
   * Handler for admin delete action
   * @param values
   */
  private handleAdminDeleteClick = (values: { data: IAccountInfo; index: number }) => {
    const { tenantId } = this.props.account;
    this.props.deleteAccountAdmin({
      data: { id: values.data.id, tenantId },
      successCb: () => {
        toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.ACCOUNT_ADMIN_DELETE_SUCCESS);
        this.getAccountDetail();
      },
      failureCb: (e) =>
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.ACCOUNT_ADMIN_DELETE_FAIL))
    });
  };

  private showDeactivateModal = () => {
    this.setState({ isOpenDeactivateModal: true });
  };

  private handleNavigation = () => {
    const { role } = this.props;
    let redirectTo: string;
    if (role === APPCONSTANTS.ROLES.REGION_ADMIN) {
      redirectTo = PROTECTED_ROUTES.accountDashboard;
    } else {
      redirectTo = PROTECTED_ROUTES.accountByRegion
        .replace(':regionId', sessionStorageServices.getItem(APPCONSTANTS.FORM_ID))
        .replace(':tenantId', sessionStorageServices.getItem(APPCONSTANTS.ID));
    }
    this.props.history.push(redirectTo);
  };

  private handleDeactivate = (values: IAccountDeactivateFormValues) => {
    const { tenantId } = this.props.account;
    const status = values.status.value;
    const { reason } = values;
    this.props.decactivateAccountReq({
      data: { tenantId: Number(tenantId), status, reason },
      successCb: () => {
        toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.ACCOUNT_DEACTIVATE_SUCCESS);
        this.handleNavigation();
      },
      failureCb: (e) =>
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.ACCOUNT_DEACTIVATE_FAIL))
    });
  };
}

const mapStateToProps = (state: AppState) => ({
  loading: state.account.loading,
  workflowLoading: state.workflow.loading,
  timezoneList: state.user.timezoneList,
  account: state.account.account,
  role: state.user.user.role,
  countryId: state.user.user.countryId?.id
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAccountDetailReq: (data: IFetchAccountDetailReqPayload) => dispatch(fetchAccountDetailReq(data)),
  updateAccountDetail: ({
    data,
    successCb,
    failureCb
  }: {
    data: IAccountInfo;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => dispatch(updateAccountDetail({ data, successCb, failureCb })),
  updateAccountAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IAccountAdmin;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => dispatch(updateAccountAdmin({ data, successCb, failureCb })),
  createAccountAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IAccountAdmin;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => dispatch(createAccountAdmin({ data, successCb, failureCb })),
  deleteAccountAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IDeleteAccountAdminPayload;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => dispatch(deleteAccountAdmin({ data, successCb, failureCb })),
  decactivateAccountReq: (payload: IDeactivateReqPayload) => dispatch(decactivateAccountReq(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSummary);
