import { useCallback, useEffect, useMemo } from 'react';
import { useTablePaginationHook } from '../../hooks/tablePagination';
import CustomTable from '../../components/customtable/CustomTable';
import DetailCard from '../../components/detailCard/DetailCard';
import { ReactComponent as UnlockUserIcon } from '../../assets/images/user-unlock.svg';
import APPCONSTANTS from '../../constants/appConstants';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLockedUsersRequest, unlockUsersRequest } from '../../store/user/actions';
import { lockedUsers, lockedUsersCount, roleSelector, tenantIdSelector } from '../../store/user/selectors';
import { ILockedUsers } from '../../store/user/types';

const LockedUsers = (): React.ReactElement => {
  const { listParams, handleSearch, handlePage } = useTablePaginationHook();
  const dispatch = useDispatch();
  const tenantId = useSelector(tenantIdSelector);
  const lockedUsersList = useSelector(lockedUsers);
  const lockedUsersTotal = useSelector(lockedUsersCount);
  const role = useSelector(roleSelector);
  const { ROLES } = APPCONSTANTS;

  const fetchDetails = useCallback(() => {
    dispatch(
      fetchLockedUsersRequest({
        tenantId: role === ROLES.SUPER_USER || role === ROLES.SUPER_ADMIN ? undefined : tenantId,
        skip: (listParams.page - APPCONSTANTS.INITIAL_PAGE) * listParams.rowsPerPage,
        limit: listParams.rowsPerPage,
        search: listParams.searchTerm,
        failureCb: (e) => {
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.LOCKED_USERS_FETCH_ERROR));
        }
      })
    );
  }, [
    ROLES.SUPER_ADMIN,
    ROLES.SUPER_USER,
    dispatch,
    listParams.page,
    listParams.rowsPerPage,
    listParams.searchTerm,
    role,
    tenantId
  ]);

  useEffect(() => {
    fetchDetails();
  }, [dispatch, fetchDetails, listParams]);

  const columnDefs = useMemo(
    () => [
      {
        id: 1,
        name: 'name',
        label: 'Name',
        cellFormatter: ({ firstName = '', lastName = '' }: ILockedUsers) => [firstName, lastName].join(' ')
      },
      {
        id: 2,
        name: 'username',
        label: 'Email ID'
      }
    ],
    []
  );
  const onCustomClicked = (data: any) => {
    dispatch(
      unlockUsersRequest({
        userId: data.id,
        successCb: () => {
          fetchDetails();
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.UNLOCK_USER_SUCCESS);
        },
        failureCb: (e) => {
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.UNLOCK_USER_FAIL));
        }
      })
    );
  };

  return (
    <div className='row g-0dot625'>
      <div className='col-12'>
        <DetailCard
          header='Locked Users'
          searchPlaceholder={APPCONSTANTS.SEARCH_BY_EMAIL}
          isSearch={true}
          onSearch={handleSearch}
        >
          <CustomTable
            loading={false}
            rowData={lockedUsersList}
            columnsDef={columnDefs}
            isEdit={false}
            isDelete={false}
            isCustom={true}
            page={listParams.page}
            rowsPerPage={listParams.rowsPerPage}
            count={lockedUsersTotal}
            customTitle='Unlock User'
            CustomIcon={UnlockUserIcon}
            handlePageChange={handlePage}
            onCustomConfirmed={onCustomClicked}
          />
        </DetailCard>
      </div>
    </div>
  );
};

export default LockedUsers;
