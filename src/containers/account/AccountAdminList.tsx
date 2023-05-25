import React, { useCallback, useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Account.module.scss';
import CustomTable from '../../components/customtable/CustomTable';
import DetailCard from '../../components/detailCard/DetailCard';
import {
  fetchAccountAdminsRequest,
  deleteAccountAdmin,
  updateAccountAdmin,
  clearAccountAdmin
} from '../../store/account/actions';
import { fetchUserByIdReq } from '../../store/user/actions';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import APPCONSTANTS from '../../constants/appConstants';
import { accountsLoadingSelector, accountsCountSelector, getAccountAdminSelector } from '../../store/account/selectors';
import Loader from '../../components/loader/Loader';
import { IDeactivateReqPayload, IAccountAdmin, IAdminEditFormValues } from '../../store/account/types';
import Modal from '../../components/modal/ModalForm';
import arrayMutators from 'final-form-arrays';
import UserForm from '../../components/userForm/UserForm';
import sessionStorageServices from '../../global/sessionStorageServices';
import { countryIdSelector } from '../../store/user/selectors';
import { useTablePaginationHook } from '../../hooks/tablePagination';

interface IMatchParams {
  regionId: string;
  tenantId: string;
}

interface IDispatchProps {
  decactivateAccountReq: (payload: IDeactivateReqPayload) => void;
}

interface IMatchProps extends RouteComponentProps<IMatchParams> {}

/**
 * Shows the account admins list
 * @returns {React.ReactElement}
 */
const AccountAdminList = (props: IMatchProps & IDispatchProps): React.ReactElement => {
  const { listParams, handleSearch, handlePage } = useTablePaginationHook();
  const dispatch = useDispatch();
  const loading = useSelector(accountsLoadingSelector);
  const accountAdminList = useSelector(getAccountAdminSelector);
  const accountadminsCount = useSelector(accountsCountSelector);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const accountAdminToBeEdited = useRef<IAccountAdmin | {}>({});
  const countryId = useSelector(countryIdSelector);

  const fetchList = useCallback(() => {
    dispatch(
      fetchAccountAdminsRequest({
        data: {
          tenantId: props.match.params.tenantId,
          skip: (listParams.page - APPCONSTANTS.INITIAL_PAGE) * listParams.rowsPerPage,
          limit: listParams.rowsPerPage,
          searchTerm: listParams.searchTerm
        },
        failureCb: (e) => {
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_ADMIN_FETCH_ERROR));
        }
      })
    );
  }, [dispatch, props.match.params.tenantId, listParams]);

  useEffect(() => {
    fetchList();
  }, [dispatch, fetchList, props.match.params.tenantId, listParams]);

  /**
   * To remove Account Admin list cache in store
   */
  useEffect(() => {
    return () => {
      dispatch(clearAccountAdmin());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handle for modal cancel
   */
  const handleCancelClick = () => {
    setOpenEditModal(false);
  };

  /**
   * Handler to open account admin edit modal
   * @param values
   */
  const openEditModal = (values: IAccountAdmin) => {
    dispatch(
      fetchUserByIdReq({
        payload: { id: values.id },
        successCb: (payload) => {
          payload.country = { countryCode: payload?.countryCode || '' };
          accountAdminToBeEdited.current = payload;
          setOpenEditModal(true);
        },
        failureCb: (e) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(error, APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_ADMIN_UPDATE_FAIL));
          }
        }
      })
    );
  };
  

  /**
   * Handler for admin delete action
   * @param values
   */
  const handleAdminDeleteClick = (values: { data: IAdminEditFormValues; index: number }) => {
    dispatch(
      deleteAccountAdmin({
        data: { id: values.data.id, tenantId: values.data.tenantId as string },
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.ACCOUNT_ADMIN_DELETE_SUCCESS);
          handlePage(APPCONSTANTS.INITIAL_PAGE);
        },
        failureCb: (e) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.ACCOUNT_ADMIN_DELETE_FAIL))
          }
        }
      })
    );
  };

  /**
   * Handler for add/edit admin form submit.
   * @param values
   */
  const handleAdminSubmit = ({ users }: { users: IAdminEditFormValues[] }) => {
    const admin: any = users[0];
    admin.countryCode = admin.countryCode.countryCode;
    admin.country = countryId?.id || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID);
    dispatch(
      updateAccountAdmin({
        data: admin as IAccountAdmin,
        successCb: () => {
          handlePage(APPCONSTANTS.INITIAL_PAGE);
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.ACCOUNT_ADMIN_UPDATE_SUCCESS);
          handleCancelClick();
        },
        failureCb: (e) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.ACCOUNT_ADMIN_UPDATE_FAIL))
          }
        }
      })
    );
  };

  /**
   * Generates the full name using first name and last name
   * @param user
   * @returns
   */
  const formatName = (user: IAccountAdmin) => {
    return `${user.firstName} ${user.lastName}`;
  };

  /**
   * Formats the phone number with country code
   * @param user
   * @returns
   */
  const formatPhone = (user: IAccountAdmin) => {
    return user.countryCode ? '+ ' + user.countryCode + ' ' + user.phoneNumber : user.phoneNumber;
  };

  const editModalRender = (form: any) => {
    return (
      <UserForm form={form} initialEditValue={accountAdminToBeEdited.current} disableOptions={true} isEdit={true} />
    );
  };

  return (
    <>
      {loading && <Loader />}
      <div className={`${styles.accountContainer} row g-0dot625`}>
        <div className='col-12'>
          <DetailCard
            header='Account Admin'
            isSearch={true}
            searchPlaceholder={APPCONSTANTS.SEARCH_BY_NAME_EMAIL}
            onSearch={handleSearch}
          >
            <CustomTable
              rowData={accountAdminList}
              columnsDef={[
                {
                  id: 1,
                  name: 'firstName',
                  label: 'Name',
                  width: '125px',
                  cellFormatter: formatName
                },
                { id: 2, name: 'username', label: 'Email ID', width: '220px' },
                {
                  id: 3,
                  name: 'organizationName',
                  label: 'Account',
                  width: '110px'
                },
                {
                  id: 5,
                  name: 'phoneNumber',
                  label: 'Contact Number',
                  width: '140px',
                  cellFormatter: formatPhone
                }
              ]}
              isEdit={true}
              isDelete={true}
              page={accountadminsCount > APPCONSTANTS.ROWS_PER_PAGE_OF_TABLE ? listParams.page : 0}
              rowsPerPage={listParams.rowsPerPage}
              count={accountadminsCount}
              onDeleteClick={handleAdminDeleteClick}
              onRowEdit={openEditModal}
              handlePageChange={handlePage}
              confirmationTitle={APPCONSTANTS.ACCOUNT_ADMIN_DELETE_CONFIRMATION}
              deleteTitle={APPCONSTANTS.ACCOUNT_ADMIN_DELETE_TITLE}
            />
          </DetailCard>
        </div>
        <Modal
          show={isOpenEditModal}
          title='Edit Account Admin'
          cancelText='Cancel'
          submitText='Submit'
          handleCancel={handleCancelClick}
          handleFormSubmit={handleAdminSubmit}
          initialValues={{ users: accountAdminToBeEdited.current }}
          mutators={arrayMutators}
          render={editModalRender}
        />
      </div>
    </>
  );
};

export default AccountAdminList;
