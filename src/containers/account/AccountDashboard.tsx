import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Loader from '../../components/loader/Loader';
import Searchbar from '../../components/searchbar/Searchbar';
import SummaryCard, { ISummaryCardProps } from '../../components/summaryCard/SummaryCard';
import APPCONSTANTS from '../../constants/appConstants';
import { useLoadMorePagination } from '../../hooks/pagination';
import { PROTECTED_ROUTES } from '../../constants/route';
import { appendZeroBefore } from '../../utils/commonUtils';
import {
  accountsCountSelector,
  accDashboardListSelector,
  accDashboardLoadingMoreSelector,
  accountsLoadingSelector
} from '../../store/account/selectors';
import { IAccountDetail, IDashboardAccounts } from '../../store/account/types';
import { clearAccountDetails, fetchAccountsDashboardList, setAccountDetails } from '../../store/account/actions';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import { countryIdSelector, formDataIdSelector, tenantIdSelector } from '../../store/user/selectors';

import styles from './Account.module.scss';
import sessionStorageServices from '../../global/sessionStorageServices';

const AccountDashboard = () => {
  const dispatch = useDispatch();
  const regionId = useSelector(formDataIdSelector);
  const tenantId = useSelector(tenantIdSelector);
  const accountList = useSelector(accDashboardListSelector);
  const count = useSelector(accountsCountSelector);
  const loading = useSelector(accountsLoadingSelector);
  const loadingMore = useSelector(accDashboardLoadingMoreSelector);
  const countryId = useSelector(countryIdSelector);
  const { push } = useHistory();
  const { isLastPage, loadMore, resetPage } = useLoadMorePagination({
    total: count,
    itemsPerPage: APPCONSTANTS.ACCOUNTS_PER_PAGE,
    onLoadMore: ({ skip, limit, onFail }) => {
      dispatch(
        fetchAccountsDashboardList({
          skip,
          limit,
          isLoadMore: true,
          failureCb: (e: Error) => {
            onFail();
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_FETCH_ERROR));
          }
        })
      );
    }
  });

  /**
   * To clear cache and set current Account name
   */
  const onDashboardExit = useCallback(
    (partialAccountDetail: Partial<IAccountDetail>) => {
      dispatch(clearAccountDetails());
      dispatch(setAccountDetails(partialAccountDetail));
      sessionStorageServices.setItem(APPCONSTANTS.COUNTRY_ID, countryId?.id);
      sessionStorageServices.setItem(APPCONSTANTS.COUNTRY_TENANT_ID, countryId?.tenantId);
    },
    [countryId, dispatch]
  );

  useEffect(() => {
    dispatch(
      fetchAccountsDashboardList({
        skip: 0,
        limit: APPCONSTANTS.ACCOUNTS_PER_PAGE,
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(error, APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_FETCH_ERROR));
          }
        }
      })
    );
  }, [dispatch]);

  const searchText = useRef<string>('');
  const onSearch = useCallback(
    (searchTerm: string) => {
      searchText.current = searchTerm;
      dispatch(
        fetchAccountsDashboardList({
          skip: 0,
          limit: APPCONSTANTS.ACCOUNTS_PER_PAGE,
          searchTerm,
          successCb: () => resetPage(),
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.ACCOUNT_FETCH_ERROR))
            }
          }
        })
      );
    },
    [dispatch, resetPage]
  );

  const parsedData: ISummaryCardProps[] = useMemo(
    () =>
      accountList?.map(({ siteCount, ouCount, name, tenantId: _id, id: formDataId }: IDashboardAccounts) => ({
        title: name,
        _id,
        formId: formDataId,
        detailRoute: PROTECTED_ROUTES.accountSummary.replace(':accountId', formDataId).replace(':tenantId', _id),
        setBreadcrumbDetails: () => onDashboardExit({ id: formDataId, name, tenantId: _id }),
        data: [
          {
            type: 'number',
            value: Number(ouCount) ? appendZeroBefore(ouCount, 2) : '-',
            label: 'Operating Unit',
            disableEllipsis: true,
            route: PROTECTED_ROUTES.OUByAccount.replace(':accountId', formDataId).replace(':tenantId', _id),
            onClick: () => onDashboardExit({ id: formDataId, name, tenantId: _id })
          },
          {
            type: 'number',
            value: Number(siteCount) ? appendZeroBefore(siteCount, 2) : '-',
            label: 'Site',
            route: PROTECTED_ROUTES.siteByAccount.replace(':accountId', formDataId).replace(':tenantId', _id),
            onClick: () => onDashboardExit({ id: formDataId, name, tenantId: _id })
          }
        ]
      })),
    [accountList, onDashboardExit]
  );

  const noAccountsAvailable = !(searchText.current || parsedData.length);
  const noSearchRecordsAvailable = Boolean(searchText.current && !parsedData.length);

  const navigateToCreateAcc = () => {
    push(PROTECTED_ROUTES.createAccountByRegion.replace(':regionId', regionId).replace(':tenantId', tenantId));
  };

  return (
    <div className='py-1dot5'>
      <div className='row'>
        <div className='col-12 mb-1dot25 d-flex align-items-sm-center align-items-start flex-sm-row flex-column'>
          <h4 className='page-title mb-sm-0 mb-0dot5'>Accounts</h4>
          {!noAccountsAvailable && (
            <>
              <span className='ms-sm-auto mb-sm-0 mb-1'>
                <Searchbar placeholder='Search Account' onSearch={onSearch} isOutlined={false} />
              </span>
              <button className='ms-sm-1dot5 btn primary-btn' onClick={navigateToCreateAcc}>
                Create Account
              </button>
            </>
          )}
        </div>
        <div className='col-12'>
          <div className='row gx-1dot25 gy-1dot25'>
            {parsedData.map((summaryProps: ISummaryCardProps, i: number) => (
              <div key={`account${i}`} className='col-md-6 col-12 mx-md-0 mx-auto'>
                <SummaryCard {...summaryProps} disableImg={true} />
              </div>
            ))}
          </div>
        </div>
        {noAccountsAvailable && !loading && (
          <div className={`col-12 text-center mt-1 py-3dot75 ${styles.noData}`}>
            <div className='fw-bold highlight-text'>Let’s Get Started!</div>
            <div className='subtle-color fs-0dot875 lh-1dot25 mb-1'>Create an account</div>
            <button className='btn primary-btn mx-auto' onClick={navigateToCreateAcc}>
              Create Account
            </button>
          </div>
        )}
        {noSearchRecordsAvailable && (
          <div className={`col-12 text-center mt-1 py-3dot75 ${styles.noData}`}>
            <div className='fw-bold highlight-text'>No accounts available</div>
            <div className='subtle-color fs-0dot875 lh-1dot25 mb-1'>Try changing the search keyword</div>
          </div>
        )}
        {Boolean(parsedData.length) && !isLastPage && !loadingMore && (
          <div className='col-12 text-center mt-2dot5'>
            <button className='btn load-more-btn pointer' onClick={loadMore}>
              Load More<b className='ls-2px ms-0dot125'>...</b>
            </button>
          </div>
        )}
        {(loadingMore || loading) && (
          <div
            className={
              loadingMore ? `${styles.loaderWrapper} d-flex align-items-center justify-content-center mt-2dot5` : ''
            }
          >
            <Loader isFullScreen={!loadingMore} className='translate-x-minus50' />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDashboard;
