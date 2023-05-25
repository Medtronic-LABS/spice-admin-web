import Modal from '../../components/modal/ModalForm';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomTable from '../../components/customtable/CustomTable';
import DetailCard from '../../components/detailCard/DetailCard';
import APPCONSTANTS from '../../constants/appConstants';
import {
  clearOperatingUnitAdminList,
  deleteOperatingUnitAdminReq,
  fetchOperatingUnitAdminRequest,
  updateOperatingUnitAdminReq
} from '../../store/operatingUnit/actions';
import {
  operatingUnitAdminListSelector,
  operatingUnitCountSelector,
  operatingUnitLoadingSelector
} from '../../store/operatingUnit/selectors';
import { IOperatingUnitAdminFormvalue, IOperatingUnitAdmin } from '../../store/operatingUnit/types';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import UserForm from '../../components/userForm/UserForm';
import arrayMutators from 'final-form-arrays';
import { fetchUserByIdReq } from '../../store/user/actions';
import Loader from '../../components/loader/Loader';
import { countryIdSelector } from '../../store/user/selectors';
import sessionStorageServices from '../../global/sessionStorageServices';
import { useTablePaginationHook } from '../../hooks/tablePagination';

const OperatingUnitAdmin = (): React.ReactElement => {
  const dispatch = useDispatch();

  const { listParams, handleSearch, handlePage } = useTablePaginationHook();

  const listCount = useSelector(operatingUnitCountSelector);
  const loading = useSelector(operatingUnitLoadingSelector);
  const operatingUnitAdmins = useSelector(operatingUnitAdminListSelector);
  const [isOpenAdminModal, setIsOpenAdminModal] = useState(false);
  const { tenantId }: { regionId: string; tenantId: string } = useParams();
  const operatingUnitAdminToBeEdited = useRef<IOperatingUnitAdmin | {}>({});
  const countryId = useSelector(countryIdSelector);

  /**
   * To get list of operating unit admins for provided limit
   */
  const getOperatingUnitAdminList = useCallback(() => {
    dispatch(
      fetchOperatingUnitAdminRequest({
        payload: {
          skip: (listParams.page - APPCONSTANTS.INITIAL_PAGE) * listParams.rowsPerPage,
          limit: listParams.rowsPerPage,
          searchTerm: listParams.searchTerm,
          tenantId
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OPERATING_UNIT_ADMIN_FETCH_ERROR))
          }
        }
      })
    );
  }, [dispatch, listParams, tenantId]);

  useEffect(() => {
    getOperatingUnitAdminList();
  }, [dispatch, getOperatingUnitAdminList]);

  /**
   * To remove OU Admin list cache in store
   */
  useEffect(() => {
    return () => {
      dispatch(clearOperatingUnitAdminList());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * To delete operating unit admin on submit
   */
  const handleAdminDeleteClick = useCallback(
    (values: { data: IOperatingUnitAdmin }) => {
      dispatch(
        deleteOperatingUnitAdminReq({
          payload: { tenantId: values.data.tenantId, id: values.data.id },
          successCb: () => {
            toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.OPERATING_UNIT_ADMIN_DELETE_SUCCESS);
            handlePage(APPCONSTANTS.INITIAL_PAGE);
          },
          failureCb: (e) => {
            toastCenter.error(
              ...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.OPERATING_UNIT_ADMIN_DELETE_FAIL)
            );
          }
        })
      );
    },
    [dispatch, handlePage]
  );

  const openEditModal = useCallback(
    ({ id }: IOperatingUnitAdmin) => {
      dispatch(
        fetchUserByIdReq({
          payload: { id },
          successCb: (payload) => {
            payload.country = { countryCode: payload?.countryCode || '' };
            operatingUnitAdminToBeEdited.current = payload;
            setIsOpenAdminModal(true);
          },
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OPERATING_UNIT_ADMIN_UPDATE_FAIL))
            }
          }
        })
      );
    },
    [dispatch]
  );

  const editModalRender = (form: any) => {
    return (
      <UserForm
        form={form}
        initialEditValue={operatingUnitAdminToBeEdited.current}
        disableOptions={true}
        isEdit={true}
      />
    );
  };

  /**
   * Handler for edit admin form submit.
   * @param data
   */
  const handleAdminSubmit = useCallback(
    ({ users }: { users: IOperatingUnitAdminFormvalue[] }) => {
      const admin: any = users[0];
      admin.countryCode = admin.countryCode.countryCode;
      admin.country = countryId?.id || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID);
      dispatch(
        updateOperatingUnitAdminReq({
          payload: admin as IOperatingUnitAdminFormvalue,
          successCb: () => {
            setIsOpenAdminModal(false);
            handlePage(APPCONSTANTS.INITIAL_PAGE);
            toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.OPERATING_UNIT_ADMIN_UPDATE_SUCCESS);
          },
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(
                ...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.OPERATING_UNIT_ADMIN_UPDATE_FAIL)
              )
            }
          }
        })
      );
    },
    [countryId, dispatch, handlePage]
  );

  const columnDefs = useMemo(
    () => [
      {
        id: 1,
        name: 'name',
        label: 'Name',
        cellFormatter: (user: IOperatingUnitAdmin) => `${user.firstName} ${user.lastName}`
      },
      {
        id: 2,
        name: 'username',
        label: 'Email ID'
      },
      {
        id: 3,
        name: 'organizationName',
        label: 'Operating Unit'
      },
      {
        id: 4,
        name: 'phoneNumber',
        label: 'Phone Number',
        cellFormatter: (user: IOperatingUnitAdmin) => `+${user.countryCode} ${user.phoneNumber}`
      }
    ],
    []
  );

  return (
    <>
      {loading && <Loader />}
      <div className='row g-0dot625'>
        <div className='col-12'>
          <DetailCard
            header='Operating Unit Admin'
            isSearch={true}
            onSearch={handleSearch}
            searchPlaceholder={APPCONSTANTS.SEARCH_BY_NAME_EMAIL}
          >
            <CustomTable
              rowData={operatingUnitAdmins}
              columnsDef={columnDefs}
              isEdit={true}
              isDelete={true}
              page={listParams.page}
              rowsPerPage={listParams.rowsPerPage}
              count={listCount}
              handlePageChange={handlePage}
              onRowEdit={openEditModal}
              onDeleteClick={handleAdminDeleteClick}
              confirmationTitle={APPCONSTANTS.OPERATING_UNIT_ADMIN_DELETE_CONFIRMATION}
              deleteTitle={APPCONSTANTS.OPERATING_UNIT_ADMIN_DELETE_TITLE}
            />
          </DetailCard>
          <Modal
            show={isOpenAdminModal}
            title={'Edit Operating Unit Admin'}
            cancelText='Cancel'
            submitText='Submit'
            handleCancel={() => setIsOpenAdminModal(false)}
            handleFormSubmit={handleAdminSubmit}
            mutators={arrayMutators}
            initialValues={{ users: operatingUnitAdminToBeEdited.current }}
            render={editModalRender}
          />
        </div>
      </div>
    </>
  );
};

export default OperatingUnitAdmin;
