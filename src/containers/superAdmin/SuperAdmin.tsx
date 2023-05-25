import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCard from '../../components/detailCard/DetailCard';
import CustomTable from '../../components/customtable/CustomTable';
import {
  deleteSuperAdmin,
  fetchSuperAdmin,
  fetchSuperAdminsRequest,
  updateSuperAdmin
} from '../../store/superAdmin/actions';
import APPCONSTANTS from '../../constants/appConstants';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import {
  superAdminsCountSelector,
  superAdminsLoadingSelector,
  superAdminsSelector
} from '../../store/superAdmin/selectors';
import { ISuperAdminFormValues, ISuperAdminUser } from '../../store/superAdmin/types';
import { PROTECTED_ROUTES } from '../../constants/route';
import { History } from 'history';
import Modal from '../../components/modal/ModalForm';
import EditSuperAdminForm from './EditSuperAdminForm';
import { timezoneListSelector } from '../../store/user/selectors';
import Loader from '../../components/loader/Loader';
import { useTablePaginationHook } from '../../hooks/tablePagination';
import { fetchTimezoneListRequest } from '../../store/user/actions';

export interface IRouteProps {
  history: History;
}

const SuperAdmin = (props: IRouteProps): React.ReactElement => {
  const dispatch = useDispatch();
  const { listParams, handleSearch, handlePage } = useTablePaginationHook();
  const listCount = useSelector(superAdminsCountSelector);
  const superAdmins = useSelector(superAdminsSelector);
  const loading = useSelector(superAdminsLoadingSelector);
  const [isOpenAdminModal, setIsOpenAdminModal] = useState(false);
  const [adminInitialValues, setAdminInitialValues] = useState({} as ISuperAdminFormValues);
  const timezoneList = useSelector(timezoneListSelector);

  /**
   * To get the list of super admins
   */
  const getSuperAdminList = useCallback(() => {
    dispatch(
      fetchSuperAdminsRequest({
        pageNo: (listParams.page - 1) * listParams.rowsPerPage,
        limit: listParams.rowsPerPage,
        search: listParams.searchTerm,
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.SUPERADMIN_FETCH_ERROR))
          }
        }
      })
    );
  }, [dispatch, listParams]);

  useEffect(() => {
    getSuperAdminList();
    if (!timezoneList?.length) {
      dispatch(fetchTimezoneListRequest());
    }
  }, [dispatch, getSuperAdminList, listParams, timezoneList?.length]);

  /**
   * To delete super admin on submit
   */
  const handleAdminDeleteClick = useCallback(
    (values: { data: ISuperAdminUser; index: number }) => {
      dispatch(
        deleteSuperAdmin({
          data: { id: values.data.id, isDeleted: true },
          successCb: () => {
            toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.SUPER_ADMIN_DELETE_SUCCESS);
            getSuperAdminList();
          },
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.SUPER_ADMIN_DELETE_FAIL))
            }
          }
        })
      );
    },
    [dispatch, getSuperAdminList]
  );

  /**
   * Handler to get super admin details
   */
  const fetchSuperAdminDetails = useCallback(
    (values: ISuperAdminUser) => {
      dispatch(
        fetchSuperAdmin({
          id: values.id,
          successCb,
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.SUPER_ADMIN_FETCH_FAIL))
            }
          }
        })
      );
    },
    [dispatch]
  );

  const successCb = (data: ISuperAdminFormValues) => {
    setAdminInitialValues(data);
  };

  /**
   * Handler to open super admin edit modal
   * @param values
   */
  const openEditModal = (values: ISuperAdminUser) => {
    fetchSuperAdminDetails(values);
    setIsOpenAdminModal(true);
  };

  /**
   * Handler for modal cancel
   */
  const handleCancelClick = () => {
    setIsOpenAdminModal(false);
    setAdminInitialValues({} as ISuperAdminFormValues);
  };

  /**
   * Handler to open super admin add modal
   */
  const openSuperAdminAddModal = () => {
    props.history.push(PROTECTED_ROUTES.createSuperAdmin);
  };

  /**
   * Handler for edit admin form submit.
   * @param values
   */
  const handleAdminSubmit = useCallback(
    (values: ISuperAdminFormValues) => {
      dispatch(
        updateSuperAdmin({
          data: {
            ...values,
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            timezone: { id: values.timezone.id }
          },
          successCb: () => {
            setIsOpenAdminModal(false);
            getSuperAdminList();
            toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.SUPER_ADMIN_UPDATE_SUCCESS);
          },
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.SUPER_ADMIN_UPDATE_FAIL))
            }
          }
        })
      );
    },
    [dispatch, getSuperAdminList]
  );

  const columnDefs = useMemo(
    () => [
      {
        id: 1,
        name: 'name',
        label: 'Name',
        width: '150px',
        cellFormatter: (user: ISuperAdminUser) => `${user.firstName} ${user.lastName}`
      },
      {
        id: 2,
        name: 'username',
        label: 'Email ID',
        width: '230px'
      },
      {
        id: 3,
        name: 'phoneNumber',
        label: 'Phone Number',
        width: '150px',
        cellFormatter: (user: ISuperAdminUser) => `+${user.countryCode || ''} ${user.phoneNumber}`
      }
    ],
    []
  );

  return (
    <div className='row g-0dot625'>
      <div className='col-12'>
        <DetailCard
          header='Administrator List'
          buttonLabel='Add Super Admin'
          isSearch={true}
          onSearch={handleSearch}
          searchPlaceholder={APPCONSTANTS.SEARCH_BY_NAME_EMAIL}
          onButtonClick={openSuperAdminAddModal}
        >
          <CustomTable
            loading={loading}
            rowData={superAdmins}
            columnsDef={columnDefs}
            isEdit={true}
            isDelete={true}
            page={listParams.page}
            rowsPerPage={listParams.rowsPerPage}
            count={listCount}
            handlePageChange={handlePage}
            onRowEdit={openEditModal}
            onDeleteClick={handleAdminDeleteClick}
            confirmationTitle={APPCONSTANTS.SUPER_ADMIN_DELETE_CONFIRMATION}
            deleteTitle={APPCONSTANTS.SUPER_ADMIN_DELETE_TITLE}
          />
        </DetailCard>
        <Modal
          show={isOpenAdminModal}
          title={'Edit Super Admin'}
          cancelText='Cancel'
          submitText='Submit'
          handleCancel={handleCancelClick}
          handleFormSubmit={handleAdminSubmit}
          initialValues={adminInitialValues}
        >
          <>
            {loading && <Loader />}
            <EditSuperAdminForm timezoneList={timezoneList} />
          </>
        </Modal>
      </div>
    </div>
  );
};

export default SuperAdmin;
