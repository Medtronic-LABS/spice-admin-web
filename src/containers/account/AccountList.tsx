import React, { useCallback, useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Account.module.scss';
import CustomTable from '../../components/customtable/CustomTable';
import DetailCard from '../../components/detailCard/DetailCard';
import {
  clearAccountDetails,
  clearAccounts,
  decactivateAccountReq,
  fetchAccountDetailReq,
  fetchAccountsRequest,
  resetClinicalWorkflow,
  setAccountDetails,
  updateAccountDetail
} from '../../store/account/actions';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import APPCONSTANTS from '../../constants/appConstants';
import {
  accountsLoadingSelector,
  getAccountsSelector,
  accountsCountSelector,
  getClinicalWorkflowSelector
} from '../../store/account/selectors';
import Loader from '../../components/loader/Loader';
import { PROTECTED_ROUTES } from '../../constants/route';
import {
  IAccount,
  IAccountDeactivateFormValues,
  IAccountDetail,
  IDeactivateReqPayload
} from '../../store/account/types';
import Modal from '../../components/modal/ModalForm';
import AccountForm from '../createAccount/AccountForm';
import sessionStorageServices from '../../global/sessionStorageServices';
import Deactivation from '../../components/deactivate/Deactivation';
import { useTablePaginationHook } from '../../hooks/tablePagination';
import { ReactComponent as IconLegal } from '../../assets/images/icon-legal.svg';
import { clearConsentForm } from '../../store/workflow/actions';
import AccountConsentForm from './AccountConsentForm';
import { loadingSelector } from '../../store/workflow/selectors';

interface IMatchParams {
  regionId: string;
  tenantId: string;
}

interface IDispatchProps {
  decactivateAccountReq: (payload: IDeactivateReqPayload) => void;
}

interface IMatchProps extends RouteComponentProps<IMatchParams> {}

/**
 * Shows the account list
 * @returns {React.ReactElement}
 */
const AccountList = (props: IMatchProps & IDispatchProps): React.ReactElement => {
  const { listParams, handleSearch, handlePage } = useTablePaginationHook();
  const dispatch = useDispatch();
  const loading = useSelector(accountsLoadingSelector);
  const workflowLoading = useSelector(loadingSelector);
  const accountList = useSelector(getAccountsSelector);
  const accountsCount = useSelector(accountsCountSelector);
  const clinicalWorkflows = useSelector(getClinicalWorkflowSelector);
  const [isOpenAccountModal, setOpenAccountModal] = useState(false);
  const [isOpenDeactivateModal, setOpenDeactivateModal] = useState(false);
  const accountToBeEdited = useRef<IAccountDetail>({} as IAccountDetail);
  const consentFormConfig = useRef({} as any);
  const [openConsentForm, setOpenConsentForm] = useState(false);

  const fetchDetails = useCallback(() => {
    dispatch(
      fetchAccountsRequest({
        tenantId: props.match.params.tenantId,
        skip: (listParams.page - APPCONSTANTS.INITIAL_PAGE) * listParams.rowsPerPage,
        limit: listParams.rowsPerPage,
        search: listParams.searchTerm,
        isActive: true,
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(error, APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_FETCH_ERROR));
          }
        }
      })
    );
  }, [dispatch, props.match.params.tenantId, listParams]);

  useEffect(() => {
    fetchDetails();
  }, [dispatch, fetchDetails, props.match.params.tenantId, listParams]);

  /**
   * To remove Account List and Consent form cache in store
   */
  useEffect(() => {
    if (clinicalWorkflows.length) {
      dispatch(resetClinicalWorkflow());
    }
    return () => {
      dispatch(clearAccounts());
      dispatch(clearConsentForm());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddModal = () => {
    props.history.push(
      PROTECTED_ROUTES.createAccountByRegion
        .replace(':regionId', props.match.params.regionId)
        .replace(':tenantId', props.match.params.tenantId)
    );
  };

  const handleRowClick = (data: Partial<IAccount>) => {
    dispatch(clearAccountDetails());
    dispatch(setAccountDetails(data));
    props.history.push(
      PROTECTED_ROUTES.accountSummary
        .replace(':accountId', data.id as string)
        .replace(':tenantId', data.tenantId as string)
    );
  };

  /**
   * Handle for modal cancel
   */
  const handleCancelClick = () => {
    setOpenAccountModal(false);
    setOpenDeactivateModal(false);
  };

  const openAccountEditModal = (value: IAccountDetail) => {
    dispatch(
      fetchAccountDetailReq({
        tenantId: value.tenantId,
        id: value.id,
        successCb: (accountData) => {
          accountToBeEdited.current = accountData;
          setOpenAccountModal(true);
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_UPDATE_FAIL))
          }
        }
      })
    );
  };

  /**
   * Handler for account edit form submit.
   * @param values
   */
  const handleAccountFormSubmit = (values?: IAccountDetail) => {
    const data = JSON.parse(JSON.stringify(values));
    data.account.maxNoOfUsers = data.account.maxNoOfUsers ? Number(data.account.maxNoOfUsers) : 0;
    data.account.name = data.account.name.trim();
    data.account.countryId = Number(sessionStorageServices.getItem(APPCONSTANTS.COUNTRY_ID));
    delete data.account.users;
    delete data.account.country;
    dispatch(
      updateAccountDetail({
        data: data.account,
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.ACCOUNT_UPDATE_SUCCESS);
          handlePage(APPCONSTANTS.INITIAL_PAGE);
          handleCancelClick();
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_UPDATE_FAIL))
          }
        }
      })
    );
  };

  const showDeactivateModal = () => {
    setOpenDeactivateModal(true);
  };

  const handleDeactivate = (values: IAccountDeactivateFormValues) => {
    const status = values.status.value;
    const { reason } = values;
    dispatch(
      decactivateAccountReq({
        data: { tenantId: Number(accountToBeEdited.current.tenantId), status, reason },
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.ACCOUNT_DEACTIVATE_SUCCESS);
          props.history.push(
            PROTECTED_ROUTES.accountByRegion
              .replace(':regionId', sessionStorageServices.getItem(APPCONSTANTS.FORM_ID))
              .replace(':tenantId', sessionStorageServices.getItem(APPCONSTANTS.ID))
          );
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.ACCOUNT_DEACTIVATE_FAIL))
          }
        }
      })
    );
  };

  const formatUsers = (accounts: IAccount) => {
    return accounts.maxNoOfUsers || '--';
  };

  const editModalRender = (form: any) => {
    return isOpenDeactivateModal ? <Deactivation formName='account' /> : <AccountForm form={form} />;
  };

  const handleConsentFormOpen = (data: { name: string; index: number }) => {
    consentFormConfig.current = { ...data, regionId: props.match.params.regionId || '' };
    setOpenConsentForm(true);
  };

  const handleConsentFormClose = () => {
    setOpenConsentForm(false);
    consentFormConfig.current = {};
  };

  return (
    <>
      {(loading || workflowLoading) && <Loader />}
      <div className={`${styles.accountContainer} row g-0dot625`}>
        <div className='col-12'>
          <DetailCard
            buttonLabel='Add Account'
            header='Account'
            isSearch={true}
            onSearch={handleSearch}
            onButtonClick={openAddModal}
          >
            <CustomTable
              rowData={accountList}
              columnsDef={[
                {
                  id: 1,
                  name: 'name',
                  label: 'Name',
                  width: '300px'
                },
                {
                  id: 2,
                  name: 'maxNoOfUsers',
                  label: 'Maximum No. of Users',
                  width: '300px',
                  cellFormatter: formatUsers
                }
              ]}
              isEdit={true}
              isDelete={false}
              page={accountsCount > APPCONSTANTS.ROWS_PER_PAGE_OF_TABLE ? listParams.page : 0}
              rowsPerPage={listParams.rowsPerPage}
              count={accountsCount}
              onRowEdit={openAccountEditModal}
              handlePageChange={handlePage}
              onCustomConfirmed={handleConsentFormOpen}
              CustomIcon={IconLegal}
              customTitle='Consent Form'
              isCustom={true}
              isRowEdit={true}
              handleRowClick={handleRowClick}
            />
          </DetailCard>
        </div>
        <AccountConsentForm
          isOpen={openConsentForm}
          consentFormConfig={consentFormConfig.current}
          handleConsentFormClose={handleConsentFormClose}
        />
        <Modal
          show={isOpenAccountModal}
          title={isOpenDeactivateModal ? 'Deactivate Account' : 'Edit Account'}
          cancelText='Cancel'
          submitText='Submit'
          handleCancel={handleCancelClick}
          handleFormSubmit={!isOpenDeactivateModal ? handleAccountFormSubmit : handleDeactivate}
          initialValues={!isOpenDeactivateModal ? { account: accountToBeEdited.current } : {}}
          deactivateLabel={!isOpenDeactivateModal ? 'Deactivate Account' : ''}
          handleDeactivate={showDeactivateModal}
          isDeactivateModal={isOpenDeactivateModal}
          render={editModalRender}
        />
      </div>
    </>
  );
};

export default AccountList;
