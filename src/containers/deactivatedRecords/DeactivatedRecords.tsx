import { useCallback, useMemo, useEffect } from 'react';
import DetailCard from '../../components/detailCard/DetailCard';
import CustomTable from '../../components/customtable/CustomTable';
import APPCONSTANTS from '../../constants/appConstants';
import { accountsCountSelector, accountsLoadingSelector, getAccountsSelector } from '../../store/account/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { activateAccountReq, fetchAccountsRequest, removeDeactivatedAccountList } from '../../store/account/actions';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import { roleSelector, tenantIdSelector } from '../../store/user/selectors';
import { IAccount } from '../../store/account/types';
import { formatDate } from '../../utils/validation';
import { useTablePaginationHook } from '../../hooks/tablePagination';

const DeactivatedRecords = (): React.ReactElement => {
  const { listParams, handleSearch, handlePage } = useTablePaginationHook();
  const dispatch = useDispatch();
  const loading = useSelector(accountsLoadingSelector);
  const deactivatedRecords = useSelector(getAccountsSelector);
  const deactivatedRecordsCount = useSelector(accountsCountSelector);
  const tenantId = useSelector(tenantIdSelector);
  const role = useSelector(roleSelector);
  const { ROLES } = APPCONSTANTS;

  const fetchDetails = useCallback(() => {
    dispatch(
      fetchAccountsRequest({
        tenantId: ROLES.REGION_ADMIN === role ? tenantId : '',
        skip: (listParams.page - APPCONSTANTS.INITIAL_PAGE) * listParams.rowsPerPage,
        limit: listParams.rowsPerPage,
        search: listParams.searchTerm,
        isActive: false,
        failureCb: (e) => {
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.DEACTIVATED_RECORDS_FETCH_ERROR));
        }
      })
    );
  }, [ROLES.REGION_ADMIN, dispatch, role, tenantId, listParams]);

  useEffect(() => {
    fetchDetails();
    return () => {
      dispatch(removeDeactivatedAccountList());
    };
  }, [dispatch, fetchDetails, listParams]);

  /**
   * Handler to open activate modal
   * @param values
   */
  const openActivateModal = (value: IAccount) => {
    dispatch(
      activateAccountReq({
        data: { tenantId: Number(value?.tenantId) },
        successCb: () => {
          fetchDetails();
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.ACCOUNT_ACTIVATE_SUCCESS);
        },
        failureCb: (e) => {
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.ACCOUNT_ACTIVATE_FAIL));
        }
      })
    );
  };

  const columnDefs = useMemo(
    () => [
      {
        id: 1,
        name: 'name',
        label: 'Name'
      },
      {
        id: 2,
        name: 'updated_at',
        label: 'Deactivated Date',
        cellFormatter: (data: IAccount) => {
          if (data?.updatedAt) {
            return formatDate(data.updatedAt, { month: 'short', format: 'DD MM, YYYY' });
          } else {
            return '';
          }
        }
      },
      {
        id: 3,
        name: 'status',
        label: 'Deactivated Reason'
      }
    ],
    []
  );

  return (
    <div className='row g-0dot625'>
      <div className='col-12'>
        <DetailCard header='Deactivated Account' isSearch={true} onSearch={handleSearch}>
          <CustomTable
            loading={loading}
            rowData={deactivatedRecords}
            columnsDef={columnDefs}
            isEdit={false}
            isDelete={false}
            isActivate={true}
            page={listParams.page}
            rowsPerPage={listParams.rowsPerPage}
            count={deactivatedRecordsCount}
            handlePageChange={handlePage}
            onActivateClick={openActivateModal}
            activateConfirmationTitle={APPCONSTANTS.ACTIVATE_ACCOUNT_CONFIRMATION}
            activateTitle={APPCONSTANTS.ACTIVATE_ACCOUNT_TITLE}
          />
        </DetailCard>
      </div>
    </div>
  );
};

export default DeactivatedRecords;
