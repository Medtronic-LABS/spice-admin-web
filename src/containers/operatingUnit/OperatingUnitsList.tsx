import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import APPCONSTANTS from '../../constants/appConstants';
import {
  operatingUnitListCountSelector,
  operatingUnitListSelector,
  operatingUnitLoadingSelector
} from '../../store/operatingUnit/selectors';
import DetailCard from '../../components/detailCard/DetailCard';
import CustomTable from '../../components/customtable/CustomTable';
import Loader from '../../components/loader/Loader';
import {
  clearOperatingUnitDetail,
  clearOperatingUnitList,
  fetchOperatingUnitByIdReq,
  fetchOperatingUnitListRequest,
  setOperatingUnitDetails,
  updateOperatingUnitReq
} from '../../store/operatingUnit/actions';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import { IOperatingUnitDetail, IOperatingUnitList } from '../../store/operatingUnit/types';
import { PROTECTED_ROUTES } from '../../constants/route';
import OperatingUnitForm from '../../components/operatingUnitForm/OperatingUnitForm';
import ModalForm from '../../components/modal/ModalForm';
import { IAccountOption } from '../../store/account/types';
import sessionStorageServices from '../../global/sessionStorageServices';
import { countryIdSelector } from '../../store/user/selectors';
import { useTablePaginationHook } from '../../hooks/tablePagination';

interface IOperatingUnitFormValue {
  name: string;
  email: string;
  manager_name: string;
  manager_phone_number: string;
  account?: IAccountOption;
}

/**
 * Lists all the operating units
 * Provides search feature
 * @returns {React.ReactElement}
 */
const OperatingUnitsList = (): React.ReactElement => {
  const { listParams, handleSearch, handlePage } = useTablePaginationHook();
  const dispatch = useDispatch();
  const history = useHistory();
  const countryId = useSelector(countryIdSelector);
  const operatingUnitsList = useSelector(operatingUnitListSelector);
  const loading = useSelector(operatingUnitLoadingSelector);
  const listCount = useSelector(operatingUnitListCountSelector);
  // Considering this component can be rendered under ouByRegion and ouByAccount routes
  // taking all the possible params(ie: accountId & regionId) to determine current route
  const {
    regionId = '',
    accountId = '',
    tenantId = ''
  } = useParams<{ regionId?: string; accountId?: string; tenantId?: string }>();

  /**
   * to load Operating Unit List data.
   * @param Operating Unit List
   */
  const fetchList = useCallback(() => {
    dispatch(
      fetchOperatingUnitListRequest({
        tenantId,
        skip: (listParams.page - APPCONSTANTS.INITIAL_PAGE) * listParams.rowsPerPage,
        limit: listParams.rowsPerPage,
        search: listParams.searchTerm,
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OPERATING_UNIT_LIST_FETCH_ERROR))
          }
        }
      })
    );
  }, [dispatch, tenantId, listParams]);

  useEffect(() => {
    fetchList();
  }, [dispatch, fetchList, listParams]);

  /**
   * To remove OU List and OU Detail cache in store
   */
  useEffect(() => {
    return () => {
      dispatch(clearOperatingUnitList());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddOperatingUnit = useCallback(() => {
    const pathname = regionId ? PROTECTED_ROUTES.createOUByRegion : PROTECTED_ROUTES.createOUByAccount;
    history.push(
      pathname.replace(':regionId', regionId).replace(':accountId', accountId).replace(':tenantId', tenantId)
    );
  }, [history, regionId, accountId, tenantId]);

  const [showOUEditModal, setShowOUEditModal] = useState(false);
  const OUToBeEdited = useRef<IOperatingUnitFormValue | {}>({});
  const openOUEditModal = useCallback(
    ({ id, tenantId: tenantIdFromEdit }: IOperatingUnitDetail) => {
      dispatch(
        fetchOperatingUnitByIdReq({
          payload: { id, tenantId: tenantIdFromEdit },
          successCb: (payload: IOperatingUnitDetail) => {
            OUToBeEdited.current = payload;
            setShowOUEditModal(true);
          },
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OPERATING_UNIT_UPDATE_FAIL))
            }
          }
        })
      );
    },
    [dispatch]
  );
  const handleOUEdit = ({ name, account, id, tenantId: tenantIdFromEdit }: IOperatingUnitDetail) => {
    dispatch(
      updateOperatingUnitReq({
        payload: {
          name: name.trim(),
          countryId: Number(countryId?.id || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID)),
          account: { id: Number(account?.id) },
          id,
          tenantId: tenantIdFromEdit
        },
        successCb: () => {
          setShowOUEditModal(false);
          handlePage(APPCONSTANTS.INITIAL_PAGE);
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.OPERATING_UNIT_UPDATE_SUCCESS);
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OPERATING_UNIT_UPDATE_FAIL))
          }
        }
      })
    );
  };

  const handleRowClick = ({ id, tenantId: tenantIdFromClick, name }: IOperatingUnitList) => {
    dispatch(clearOperatingUnitDetail());
    dispatch(setOperatingUnitDetails({ id, tenantId, name }));
    history.push(PROTECTED_ROUTES.OUSummary.replace(':OUId', id).replace(':tenantId', tenantIdFromClick));
  };
  return (
    <>
      {loading && <Loader />}
      <div className={`row g-0dot625`}>
        <div className='col-12'>
          <DetailCard
            buttonLabel='Add Operating Unit'
            header='Operating Unit'
            isSearch={true}
            onSearch={handleSearch}
            onButtonClick={openAddOperatingUnit}
          >
            <CustomTable
              rowData={operatingUnitsList}
              columnsDef={[
                { id: 1, name: 'name', label: 'NAME', width: '200px' },
                {
                  id: 2,
                  name: 'account',
                  label: 'ACCOUNT',
                  width: '200px',
                  cellFormatter: (ouList: IOperatingUnitList) => ouList.account?.name
                }
              ]}
              isEdit={true}
              isDelete={false}
              page={listParams.page}
              rowsPerPage={listParams.rowsPerPage}
              count={listCount}
              handlePageChange={handlePage}
              isRowEdit={true}
              onRowEdit={openOUEditModal}
              handleRowClick={handleRowClick as any}
              confirmationTitle={APPCONSTANTS.OPERATING_UNIT_DELETE_CONFIRMATION}
              deleteTitle={APPCONSTANTS.OPERATING_UNIT_DELETE_TITLE}
            />
          </DetailCard>
        </div>
      </div>
      <ModalForm
        title='Edit Operating Unit'
        cancelText='Cancel'
        submitText='Submit'
        show={showOUEditModal}
        handleCancel={() => setShowOUEditModal(false)}
        handleFormSubmit={handleOUEdit}
        initialValues={OUToBeEdited.current}
      >
        <OperatingUnitForm isEdit={true} />
      </ModalForm>
    </>
  );
};

export default OperatingUnitsList;
