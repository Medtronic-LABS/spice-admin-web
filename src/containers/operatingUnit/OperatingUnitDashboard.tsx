import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/loader/Loader';
import Searchbar from '../../components/searchbar/Searchbar';
import SummaryCard, { ISummaryCardProps } from '../../components/summaryCard/SummaryCard';
import APPCONSTANTS from '../../constants/appConstants';
import { useLoadMorePagination } from '../../hooks/pagination';
import { PROTECTED_ROUTES } from '../../constants/route';
import { appendZeroBefore } from '../../utils/commonUtils';
import {
  getOperatingUnitDetailSelector,
  operatingUnitCountSelector,
  operatingUnitDashboardListSelector,
  operatingUnitLoadingMoreSelector,
  operatingUnitLoadingSelector
} from '../../store/operatingUnit/selectors';
import { IOperatingUnitSummary } from '../../store/operatingUnit/types';
import {
  fetchOUDashboardListRequest,
  fetchOperatingUnitDetail,
  clearOperatingUnitDetail,
  setOperatingUnitDetails
} from '../../store/operatingUnit/actions';
import { countryIdSelector, formDataIdSelector, tenantIdSelector } from '../../store/user/selectors';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';

import styles from './OperatingUnit.module.scss';
import sessionStorageServices from '../../global/sessionStorageServices';

const OperatingUnitDashboard = () => {
  const dispatch = useDispatch();
  const operatingUnitDashboardList = useSelector(operatingUnitDashboardListSelector);
  const operatingUnitCount = useSelector(operatingUnitCountSelector);
  const loading = useSelector(operatingUnitLoadingSelector);
  const loadingMore = useSelector(operatingUnitLoadingMoreSelector);
  const operatingUnitDetail = useSelector(getOperatingUnitDetailSelector);
  const countryId = useSelector(countryIdSelector);
  const { isLastPage, loadMore, resetPage } = useLoadMorePagination({
    total: operatingUnitCount,
    itemsPerPage: APPCONSTANTS.OPERATING_UNIT_PER_PAGE,
    onLoadMore: ({ skip, limit, onFail }) => {
      dispatch(
        fetchOUDashboardListRequest({
          skip,
          limit,
          isLoadMore: true,
          failureCb: (e) => {
            onFail();
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OU_FETCH_ERROR));
          }
        })
      );
    }
  });

  useEffect(() => {
    dispatch(
      fetchOUDashboardListRequest({
        skip: 0,
        limit: APPCONSTANTS.OPERATING_UNIT_PER_PAGE,
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OU_FETCH_ERROR))
          }
        }
      })
    );
  }, [dispatch]);

  /**
   * To clear cache and set current OperatingUnit details
   */
  const onDashboardExit = useCallback(
    (id: string, tenantId: string, name: string) => {
      dispatch(clearOperatingUnitDetail());
      dispatch(setOperatingUnitDetails({ id, name, tenantId }));
      sessionStorageServices.setItem(APPCONSTANTS.COUNTRY_ID, countryId?.id);
    },
    [dispatch, countryId]
  );

  const searchText = useRef<string>('');
  const onSearch = useCallback(
    (search: string) => {
      searchText.current = search;
      dispatch(
        fetchOUDashboardListRequest({
          skip: 0,
          limit: APPCONSTANTS.OPERATING_UNIT_PER_PAGE,
          search,
          successCb: () => resetPage(),
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OU_FETCH_ERROR))
            }
          }
        })
      );
    },
    [dispatch, resetPage]
  );

  const parsedData: ISummaryCardProps[] = useMemo(
    () =>
      operatingUnitDashboardList?.map(({ siteCount, name, id, tenantId }: IOperatingUnitSummary) => ({
        title: name,
        detailRoute: PROTECTED_ROUTES.OUSummary.replace(':OUId', id).replace(':tenantId', tenantId),
        setBreadcrumbDetails: () => onDashboardExit(id, tenantId, name),
        data: [
          {
            type: 'number',
            value: Number(siteCount) ? appendZeroBefore(siteCount, 2) : '-',
            label: 'Site',
            disableEllipsis: true,
            route: PROTECTED_ROUTES.siteByOU.replace(':OUId', id).replace(':tenantId', tenantId),
            onClick: () => {
              if (!operatingUnitDetail.id || operatingUnitDetail.id !== id) {
                onDashboardExit(id, tenantId, name);
                dispatch(
                  fetchOperatingUnitDetail({
                    tenantId,
                    id
                  })
                );
              }
            }
          }
        ]
      })),
    [operatingUnitDashboardList, onDashboardExit, operatingUnitDetail.id, dispatch]
  );

  const noOperatingUnitsAvailable = !(searchText.current || parsedData?.length);
  const noSearchResultAvailable = Boolean(searchText.current && !parsedData?.length);

  const accountId = useSelector(formDataIdSelector);
  const accountTentantId = useSelector(tenantIdSelector);
  const createOURoute = PROTECTED_ROUTES.createOUByAccount
    .replace(':accountId', accountId)
    .replace(':tenantId', accountTentantId);
  const loaderWrapperClass = loadingMore
    ? `${styles.loaderWrapper} d-flex align-items-center justify-content-center mt-2dot5`
    : '';
  return (
    <div className='py-1dot5'>
      <div className='row'>
        <div
          className={`col-12 mb-1dot25 d-flex align-items-sm-center align-items-start flex-sm-row flex-column ${styles.header}`}
        >
          <h4 className='page-title mb-sm-0 mb-0dot5'>Operating Units</h4>
          {!noOperatingUnitsAvailable && (
            <>
              <span className='ms-sm-auto mb-sm-0 mb-1'>
                <Searchbar placeholder='Search Operating Unit' onSearch={onSearch} isOutlined={false} />
              </span>
              <Link to={createOURoute} className='ms-sm-1dot5' tabIndex={-1}>
                <button className='btn primary-btn'>Create Operating Unit</button>
              </Link>
            </>
          )}
        </div>
        <div className='col-12'>
          <div className='row gx-1dot25 gy-1dot25'>
            {parsedData?.map((summaryProps: ISummaryCardProps, i: number) => (
              <div key={`OU${i}`} className='col-lg-4 col-md-6 col-12 mx-md-0 mx-auto'>
                <SummaryCard disableImg={true} titleClassName={styles.ouSummaryTitle} {...summaryProps} />
              </div>
            ))}
          </div>
        </div>
        {noOperatingUnitsAvailable && !loading && (
          <div className={`col-12 text-center mt-1 py-3dot75 ${styles.noData}`}>
            <div className='fw-bold highlight-text'>Let’s Get Started!</div>
            <div className='subtle-color fs-0dot875 lh-1dot25 mb-1'>Create an operating unit</div>
            <Link to={createOURoute} className='mx-auto' tabIndex={-1}>
              <button className='btn primary-btn'>Create Operating Unit</button>
            </Link>
          </div>
        )}
        {noSearchResultAvailable && (
          <div className={`col-12 text-center mt-1 py-3dot75 ${styles.noData}`}>
            <div className='fw-bold highlight-text'>No operating units available</div>
            <div className='subtle-color fs-0dot875 lh-1dot25 mb-1'>Try changing the search keyword</div>
          </div>
        )}
        {!isLastPage && !loadingMore && (
          <div className='col-12 text-center mt-2dot5'>
            <button className='btn load-more-btn pointer' onClick={loadMore}>
              Load More<b className='ls-2px ms-0dot125'>...</b>
            </button>
          </div>
        )}
        {loadingMore || loading ? (
          <div className={loaderWrapperClass}>
            <Loader isFullScreen={!loadingMore} className='translate-x-minus50' />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OperatingUnitDashboard;
