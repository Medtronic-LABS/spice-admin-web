import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import arrayMutators from 'final-form-arrays';
import { FormApi } from 'final-form';

import DetailCard from '../../components/detailCard/DetailCard';
import CustomTable from '../../components/customtable/CustomTable';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import Loader from '../../components/loader/Loader';
import { IEditUserFormValues, ISiteUserFormValues, ISiteUserList } from '../../store/site/types';
import {
  clearSiteUserList,
  deleteSiteUserRequest,
  fetchSiteUserListRequest,
  updateSiteUserRequest
} from '../../store/site/actions';
import { siteListTotalSelector, siteUserListSelector, siteLoadingSelector } from '../../store/site/selectors';
import APPCONSTANTS from '../../constants/appConstants';
import ModalForm from '../../components/modal/ModalForm';
import UserForm from '../../components/userForm/UserForm';
import { changePassword, fetchUserByIdReq } from '../../store/user/actions';
import { IUpdateUserDetail } from '../../store/user/types';
import { useTablePaginationHook } from '../../hooks/tablePagination';
import { ReactComponent as PasswordChangeIcon } from '../../assets/images/reset-password.svg';
import ResetPasswordFields, { generatePassword } from '../authentication/ResetPasswordFields';
import { SITE_USERS_WITH_ACCESS } from '../site/SiteSummary';

interface IMatchParams {
  regionId: string;
  tenantId: string;
}

interface IMatchProps extends RouteComponentProps<IMatchParams> {}

const SiteUserList = (props: IMatchProps): React.ReactElement => {
  const { listParams, handleSearch, handlePage } = useTablePaginationHook();
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const siteUserForEdit = useRef<ISiteUserFormValues | {}>({});

  const dispatch = useDispatch();

  const siteUsers = useSelector(siteUserListSelector);
  const loading = useSelector(siteLoadingSelector);
  const userCount = useSelector(siteListTotalSelector);
  const { tenantId } = props.match.params;

  useEffect(() => {
    dispatch(
      fetchSiteUserListRequest({
        tenantId,
        skip: (listParams.page - APPCONSTANTS.INITIAL_PAGE) * listParams.rowsPerPage,
        limit: listParams.rowsPerPage,
        search: listParams.searchTerm,
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.SITE_USERS_FETCH_ERROR))
          }
        }
      })
    );
  }, [dispatch, listParams, tenantId]);

  /**
   * To remove Site User List cache in store
   */
  useEffect(() => {
    return () => {
      dispatch(clearSiteUserList());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSiteUserDelete = useCallback(
    ({ data }: any) => {
      dispatch(
        deleteSiteUserRequest({
          data: {
            id: data.id,
            tenantId: Number(data.tenantId)
          },
          isAllSites: true,
          successCb: () => {
            toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.SITE_USER_DELETE_SUCCESS);
            handlePage(
              Math.ceil(userCount / listParams.rowsPerPage) === listParams.page &&
                (userCount - 1) % listParams.rowsPerPage === 0
                ? listParams.page - 1
                : listParams.page
            );
          },
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.SITE_USER_DELETE_FAIL))
            }
          }
        })
      );
    },
    [dispatch, handlePage, listParams.page, listParams.rowsPerPage, userCount]
  );

  const fetchSiteUserDetail = useCallback(
    (value: ISiteUserList) => {
      dispatch(
        fetchUserByIdReq({
          payload: { id: value.id },
          successCb: (payload) => {
            const [roleObj] = APPCONSTANTS.SITE_ROLES.filter((role) => payload.roleName === role.value);
            const editData = { ...payload, roleName: roleObj, site_id: value.modelOrgId };
            siteUserForEdit.current = editData;
            setIsOpenUserModal(true);
          },
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.SITE_USER_FETCH_FAIL))
            }
          }
        })
      );
    },
    [dispatch]
  );

  /**
   * Handler to open site user edit modal
   * @param value
   */
  const openEditModal = (value: ISiteUserList) => {
    fetchSiteUserDetail(value);
  };

  /**
   * Handler for modal cancel
   */
  const handleCancelClick = () => {
    setIsOpenUserModal(false);
    siteUserForEdit.current = { users: [] };
  };

  /**
   * Handler for edit site user form submit.
   */
  const handleEditSubmit = useCallback(
    ({ users }: { users: IEditUserFormValues[] }) => {
      const userObj = formatSiteUserData(users[0]);
      const data: any = userObj;
      data.timezone = { id: data.timezone };
      dispatch(
        updateSiteUserRequest({
          data,
          successCb: () => {
            handleCancelClick();
            handleSearch(listParams.searchTerm);
            toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.SITE_USER_UPDATE_SUCCESS);
          },
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.SITE_USER_UPDATE_FAIL))
            }
          }
        })
      );
    },
    [dispatch, listParams, handleSearch]
  );

  const formatSiteUserData = (user: IEditUserFormValues): IUpdateUserDetail => {
    return {
      ...user,
      timezone: user.timezone.id,
      roleName: user.roleName.value,
      countryCode: user.countryCode.countryCode,
      cultureId: user.culture.id
    };
  };

  const formatName = (userList: ISiteUserList) => `${userList.firstName} ${userList.lastName}`;

  const siteUserFormRederer = (form?: FormApi<any>) => {
    return (
      <UserForm
        form={form as FormApi<any>}
        initialEditValue={siteUserForEdit.current}
        disableOptions={true}
        isEdit={true}
        isSiteUser={true}
      />
    );
  };

  const [openModal, setOpenModal] = useState({ isOpen: false, userData: {} as ISiteUserList });
  const [submitEnable, setSubmitEnabled] = useState(false);

  const onModalCancel = () => {
    setOpenModal({ isOpen: false, userData: {} as ISiteUserList });
  };

  const handleFormSubmit = (data: any) => {
    const password = generatePassword(data.password);
    dispatch(
      changePassword({
        user: openModal.userData.id,
        password,
        tenantId: openModal.userData.tenantId,
        successCB: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.PASSWORD_CHANGE_SUCCESS);
          onModalCancel();
        },
        failureCb: (e) => {
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.PASSWORD_CHANGE_FAILED));
        }
      })
    );
  };

  const handleRowEdit = (userData: ISiteUserList) => {
    setOpenModal({ isOpen: true, userData });
  };

  return (
    <>
      {loading && <Loader />}
      <div className='col-12'>
        <DetailCard
          header='Users'
          isSearch={true}
          searchPlaceholder={APPCONSTANTS.SEARCH_BY_NAME_EMAIL}
          onSearch={handleSearch}
        >
          <CustomTable
            rowData={siteUsers}
            columnsDef={[
              {
                id: 1,
                name: 'name',
                label: 'Name',
                width: '150px',
                cellFormatter: formatName
              },
              {
                id: 2,
                name: 'username',
                label: 'EMAIL',
                width: '200px'
              },
              {
                id: 3,
                name: 'organizationName',
                label: 'SITE',
                width: '140px'
              }
            ]}
            isDelete={true}
            isEdit={true}
            onRowEdit={openEditModal}
            onDeleteClick={handleSiteUserDelete}
            page={listParams.page}
            rowsPerPage={listParams.rowsPerPage}
            handlePageChange={handlePage}
            count={userCount}
            confirmationTitle={APPCONSTANTS.USER_DELETE_CONFIRMATION}
            deleteTitle={APPCONSTANTS.SITE_USER_DELETE_TITLE}
            onCustomConfirmed={handleRowEdit}
            CustomIcon={PasswordChangeIcon}
            customTitle='Change Password'
            isCustom={true}
            customIconStyle={{ width: 18 }}
            actionFormattor={{
              hideEditIcon: (rowData: any) => !SITE_USERS_WITH_ACCESS.includes(rowData.roleName),
              hideDeleteIcon: (rowData: any) => !SITE_USERS_WITH_ACCESS.includes(rowData.roleName),
              hideCustomIcon: (rowData: any) => !SITE_USERS_WITH_ACCESS.includes(rowData.roleName)
            }}
          />
        </DetailCard>
        <ModalForm
          show={isOpenUserModal}
          title='Edit Site User'
          cancelText='Cancel'
          submitText='Submit'
          handleCancel={handleCancelClick}
          handleFormSubmit={handleEditSubmit}
          initialValues={{ users: siteUserForEdit.current }}
          render={siteUserFormRederer}
          mutators={{ ...arrayMutators }}
        />
        <ModalForm
          show={openModal.isOpen}
          title={'Change Password'}
          cancelText={'Cancel'}
          submitText={'Submit'}
          handleCancel={onModalCancel}
          handleFormSubmit={handleFormSubmit}
          size={'modal-md'}
          submitDisabled={!submitEnable}
        >
          <ResetPasswordFields email={openModal.userData.username} setSubmitEnabled={setSubmitEnabled} />
        </ModalForm>
      </div>
    </>
  );
};

export default SiteUserList;
