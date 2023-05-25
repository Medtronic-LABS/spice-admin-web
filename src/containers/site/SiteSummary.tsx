import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import arrayMutators from 'final-form-arrays';

import Loader from '../../components/loader/Loader';
import DetailCard from '../../components/detailCard/DetailCard';
import CustomTable from '../../components/customtable/CustomTable';
import APPCONSTANTS, { ROLE_LABELS } from '../../constants/appConstants';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import ModalForm from '../../components/modal/ModalForm';

import {
  ISiteUser,
  ISiteUserPayLoad,
  ICreateSiteFormValues,
  ISiteUpdateReqPayload,
  ISiteFormValues,
  ISiteUserFormValues
} from '../../store/site/types';
import {
  fetchSiteSummaryRequest,
  fetchSiteSummaryUsersRequest,
  updateSiteUserRequest,
  updateSiteDetailsRequest,
  createSiteUserRequest,
  deleteSiteUserRequest
} from '../../store/site/actions';
import { siteLoadingSelector, siteSelector } from '../../store/site/selectors';
import { countryIdSelector } from '../../store/user/selectors';

import UserForm from '../../components/userForm/UserForm';
import SiteDetailsForm from '../createSite/SiteDetailsForm';
import { IAddUserFormValues } from '../createSite/CreateSite';
import { FormApi } from 'final-form';
import sessionStorageServices from '../../global/sessionStorageServices';
import { formatSite } from '../../utils/commonUtils';
import { useTablePaginationHook } from '../../hooks/tablePagination';

interface IMatchParams {
  siteId: string;
  tenantId: string;
}

interface ISummaryUsersState {
  data?: ISiteUser[];
  total?: number;
  loading: boolean;
}

interface IModalState {
  data?: ISiteFormValues;
  isOpen: boolean;
}

export const SITE_USERS_WITH_ACCESS = [
  'ACCOUNT_ADMIN',
  'HEALTH_COACH',
  'HEALTH_SCREENER',
  'HRIO',
  'LAB_TECHNICIAN',
  'NURSE',
  'NUTRITIONIST',
  'OPERATING_UNIT_ADMIN',
  'PHARMACIST',
  'PHYSICIAN_PRESCRIBER',
  'PROVIDER',
  'REGION_ADMIN',
  'superuser'
];

const SiteSummary = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { siteId, tenantId } = useParams<IMatchParams>();
  const countryId = useSelector(countryIdSelector);

  const summaryDetails = useSelector(siteSelector);
  const loading = useSelector(siteLoadingSelector);

  const [editSiteDetailsModal, setEditSiteDetailsModal] = useState<IModalState>({
    isOpen: false
  });

  const [summaryUsers, setSummaryUsers] = useState<ISummaryUsersState>({
    loading: true
  });
  const { listParams, handleSearch, handlePage } = useTablePaginationHook();

  const [showSiteUserModal, setSiteUserModal] = useState(false);
  const [isSiteUserEdit, setIsSiteUserEdit] = useState(false);
  const siteUserForEdit = useRef<{ users: ISiteUserFormValues[] }>({ users: [] });

  const lableData = useMemo(
    () => [
      { label: 'Site Name', value: summaryDetails?.name },
      { label: 'Email ID', value: summaryDetails?.email },
      { label: 'Type', value: summaryDetails?.siteType },
      { label: 'Account', value: summaryDetails?.account?.name },
      { label: 'Operating Unit', value: summaryDetails?.operatingUnit?.name },
      { label: 'Phone Number', value: summaryDetails?.phoneNumber },
      { label: 'Address Type', value: summaryDetails?.addressType?.split('|').join(', ') },
      { label: 'Address Use', value: summaryDetails?.addressUse },
      { label: 'Address 1', value: summaryDetails?.address1 },
      { label: 'Address 2', value: summaryDetails?.address2 },
      { label: 'Culture', value: summaryDetails?.culture?.name },
      { label: 'Site Level', value: summaryDetails?.siteLevel?.label },
      { label: 'State', value: summaryDetails?.county?.name },
      { label: 'District', value: summaryDetails?.subCounty?.name },
      { label: 'City', value: summaryDetails?.city?.label },
      { label: 'Pin code', value: summaryDetails?.postalCode }
    ],
    [summaryDetails]
  );

  /*
   * To Handle initial data loading, pagination and search
   * requests for users table
   */
  useEffect(() => {
    refreshPage();
    // eslint-disable-next-line
  }, [listParams, tenantId, dispatch]);

  /*
   * Load initial site summary details
   */
  useEffect(() => {
    dispatch(
      fetchSiteSummaryRequest({
        tenantId: Number(tenantId),
        id: Number(siteId),
        failureCb: (e) => {
          fetchFailure(e, APPCONSTANTS.SITE_SUMMARY_FETCH_ERROR);
        }
      })
    );
  }, [tenantId, siteId, dispatch]);

  const fetchFailure = (e: Error, errorMessage: string) =>
    toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, errorMessage));

  const refreshPage = () => {
    setSummaryUsers((prevState) => ({ ...prevState, loading: true }));
    dispatch(
      fetchSiteSummaryUsersRequest({
        tenantId,
        skip: (listParams.page - APPCONSTANTS.INITIAL_PAGE) * listParams.rowsPerPage,
        limit: listParams.rowsPerPage,
        searchParams: listParams.searchTerm,
        successCb: turnOffUsersTableLoading,
        failureCb: (e) => {
          turnOffUsersTableLoading();
          fetchFailure(e, APPCONSTANTS.SITE_USERS_FETCH_ERROR);
        }
      })
    );
  };

  const turnOffUsersTableLoading = (data: ISiteUser[] | any[] = [], total = 0) => {
    setSummaryUsers((prevState) => ({
      ...prevState,
      data,
      total,
      loading: false
    }));
  };

  const openSiteEditModal = () => {
    if (summaryDetails) {
      const [typeObj] = APPCONSTANTS.SITE_TYPE.filter((data) => summaryDetails.siteType === data.value);
      const [addressUseObj] = APPCONSTANTS.ADDRESS_USE.filter((data) => summaryDetails.addressUse === data.value);
      if (!summaryDetails?.city?.label) {
        summaryDetails.city = undefined;
      }
      setEditSiteDetailsModal({
        isOpen: true,
        data: {
          ...summaryDetails,
          siteType: typeObj,
          addressUse: addressUseObj,
          addressType: summaryDetails.addressType.split('|') as any
        } as unknown as ISiteFormValues
      });
    } else {
      toastCenter.info(APPCONSTANTS.SITE_SUMMARY_FETCH_ERROR);
    }
  };

  const closeSiteEditModal = () => {
    setEditSiteDetailsModal({
      isOpen: false
    });
  };

  const editSiteDetailsModalRender = (form: any) => {
    const regionTenantId = summaryDetails ? summaryDetails.tenantId : 0;
    return <SiteDetailsForm form={form} tenantId={regionTenantId.toString()} isEdit={true} />;
  };

  const handleSiteDetailsSubmit = ({ site }: ICreateSiteFormValues) => {
    const data: ISiteUpdateReqPayload = {
      ...site,
      ...formatSite(site),
      id: siteId,
      accountId: Number(site.account.id),
      operatingUnit: site.operatingUnit,
      tenantId: Number(tenantId),
      countryId: countryId?.id || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID),
      cultureId: Number(site.culture),
      postalCode: site.postalCode
    } as ISiteUpdateReqPayload;
    dispatch(
      updateSiteDetailsRequest({
        data,
        successCb: siteUpdateSuccess,
        failureCb: (e) => {
          closeSiteEditModal();
          fetchFailure(e, APPCONSTANTS.SITE_DETAILS_UPDATE_ERROR);
        }
      })
    );
  };

  const siteUpdateSuccess = () => {
    toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.SITE_DETAILS_UPDATE_SUCCESS);
    dispatch(
      fetchSiteSummaryRequest({
        tenantId: Number(tenantId),
        id: Number(siteId),
        failureCb: (e) => {
          fetchFailure(e, APPCONSTANTS.SITE_SUMMARY_FETCH_ERROR);
        }
      })
    );
    closeSiteEditModal();
  };

  const handleEditSiteUserClick = useCallback(
    (user: ISiteUserFormValues) => {
      setIsSiteUserEdit(true);
      const [roleObj] = APPCONSTANTS.SITE_ROLES.filter((data) => user.roleName === data.value);
      user.country = { countryCode: user.countryCode || '' };
      siteUserForEdit.current = { users: [{ ...user, roleName: roleObj }] };
      setSiteUserModal(true);
    },
    [siteUserForEdit]
  );

  const handleEditUserSubmit = ({ users }: { users: IAddUserFormValues[] }) => {
    const userObj = formatSiteUserData(users[0]);
    const data: ISiteUser = userObj;
    dispatch(
      updateSiteUserRequest({
        data,
        successCb: siteUserSuccess,
        failureCb: (e) => {
          setSiteUserModal(false);
          fetchFailure(e, APPCONSTANTS.SITE_USER_UPDATE_ERROR);
        }
      })
    );
  };

  const handleAddSiteUserClick = useCallback(() => {
    setIsSiteUserEdit(false);
    siteUserForEdit.current = { users: [] };
    setSiteUserModal(true);
  }, [siteUserForEdit]);

  const handleAddSiteUserSubmit = ({ users }: { users: IAddUserFormValues[] }) => {
    const userObj = formatSiteUserData(users[0]);
    userObj.country = { id: Number(userObj.country) };
    const data: ISiteUserPayLoad = { id: siteId, user: userObj, tenantId };
    dispatch(
      createSiteUserRequest({
        data,
        successCb: siteUserSuccess,
        failureCb: (e) => {
          setSiteUserModal(false);
          fetchFailure(e, APPCONSTANTS.SITE_USER_CREATE_ERROR);
        }
      })
    );
  };

  const handleSiteUserDelete = ({ data: user }: { data: any; index: number; pageNo: number }) => {
    dispatch(
      deleteSiteUserRequest({
        data: {
          id: user.id,
          tenantId: Number(tenantId)
        },
        successCb: () => {
          refreshPage();
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.SITE_USER_DELETE_SUCCESS);
        },
        failureCb: (e) => {
          fetchFailure(e, APPCONSTANTS.SITE_USER_DELETE_FAIL);
        }
      })
    );
  };

  const siteUserSuccess = () => {
    const successMessage = isSiteUserEdit
      ? APPCONSTANTS.SITE_USER_UPDATE_SUCCESS
      : APPCONSTANTS.SITE_USER_CREATE_SUCCESS;
    toastCenter.success(APPCONSTANTS.SUCCESS, successMessage);
    isSiteUserEdit ? refreshPage() : handleSearch('');
    setSiteUserModal(false);
  };

  const formatSiteUserData = (user: IAddUserFormValues): ISiteUser => {
    return {
      ...user,
      firstName: user.firstName.trim(),
      cultureId: user.culture?.id,
      lastName: user.lastName.trim(),
      timezone: { id: Number(user.timezone.id) },
      roleName: user.roleName.value,
      countryCode: user.countryCode.countryCode,
      country: countryId?.id || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID),
      redRisk: user.redRisk || false
    };
  };

  /**
   * Formats the phone number with country code
   * @param user
   * @returns
   */
  const formatPhone = (user: ISiteUser) => {
    return `${user.countryCode && '+ ' + user.countryCode} ${user.phoneNumber}`;
  };

  const formatName = (user: ISiteUser) => {
    return `${user.firstName} ${user.lastName}`;
  };

  const formatRole = (user: ISiteUser) => {
    if (user.roleName) {
      const role = user.roleName as keyof typeof ROLE_LABELS;
      return ROLE_LABELS[role] || user.roleName;
    }
  };

  const siteUserFormRender = (form?: FormApi<any>) => {
    return (
      <UserForm
        form={form as FormApi<any>}
        initialEditValue={siteUserForEdit.current.users[0]}
        disableOptions={true}
        isEdit={isSiteUserEdit}
        isSiteUser={true}
        parentOrgId={summaryDetails?.operatingUnit.tenantId}
        entityName='site'
        enableAutoPopulate={true}
        tenantId={tenantId}
      />
    );
  };

  return (
    <>
      {loading && <Loader />}
      <div className='row g-0dot625'>
        <div className='col-12'>
          <DetailCard buttonLabel='Edit Site' isEdit={true} header='Site Summary' onButtonClick={openSiteEditModal}>
            <div className='row gy-1 mt-0dot25 mb-1dot25 mx-0dot5'>
              {lableData.map(({ label, value }) => (
                <div key={label} className={'col-lg-4 col-sm-6'}>
                  <div className='fs-0dot875 charcoal-grey-text'>{label}</div>
                  <div className='primary-title text-ellipsis'>{value || '--'}</div>
                </div>
              ))}
            </div>
          </DetailCard>
        </div>
        <div className='col-12'>
          <DetailCard
            buttonLabel='Add User'
            header='Site Users'
            isSearch={true}
            onSearch={handleSearch}
            searchPlaceholder={APPCONSTANTS.SEARCH_BY_NAME_EMAIL}
            onButtonClick={handleAddSiteUserClick}
          >
            <CustomTable
              rowData={summaryUsers.data || []}
              loading={summaryUsers.loading}
              columnsDef={[
                {
                  id: 1,
                  name: 'name',
                  label: 'Name',
                  width: '125px',
                  cellFormatter: formatName
                },
                { id: 2, name: 'roleName', label: 'ROLE', width: '130px', cellFormatter: formatRole },
                { id: 3, name: 'username', label: 'Email ID', width: '220px' },
                {
                  id: 4,
                  name: 'phoneNumber',
                  label: 'Contact Number',
                  width: '140px',
                  cellFormatter: formatPhone
                }
              ]}
              isEdit={true}
              isDelete={true}
              page={listParams.page}
              rowsPerPage={listParams.rowsPerPage}
              count={summaryUsers.total}
              onRowEdit={handleEditSiteUserClick}
              onDeleteClick={handleSiteUserDelete}
              handlePageChange={handlePage}
              confirmationTitle={APPCONSTANTS.SITE_USER_DELETE_CONFIRMATION}
              deleteTitle={APPCONSTANTS.SITE_USER_DELETE_TITLE}
              actionFormattor={{
                hideEditIcon: (rowData: any) => !SITE_USERS_WITH_ACCESS.includes(rowData.roleName),
                hideDeleteIcon: (rowData: any) => !SITE_USERS_WITH_ACCESS.includes(rowData.roleName)
              }}
            />
          </DetailCard>
        </div>
        <ModalForm
          show={editSiteDetailsModal.isOpen}
          title='Edit Site'
          cancelText='Cancel'
          submitText='Submit'
          handleCancel={closeSiteEditModal}
          handleFormSubmit={handleSiteDetailsSubmit}
          initialValues={{ site: editSiteDetailsModal.data }}
          render={editSiteDetailsModalRender}
          size='modal-lg'
          mutators={arrayMutators}
        />
        <ModalForm
          show={showSiteUserModal}
          title={`${isSiteUserEdit ? 'Edit' : 'Add'} User`}
          cancelText='Cancel'
          submitText='Submit'
          handleCancel={() => setSiteUserModal(false)}
          handleFormSubmit={isSiteUserEdit ? handleEditUserSubmit : handleAddSiteUserSubmit}
          initialValues={siteUserForEdit.current}
          render={siteUserFormRender}
          mutators={{ ...arrayMutators }}
        />
      </div>
    </>
  );
};

export default SiteSummary;
