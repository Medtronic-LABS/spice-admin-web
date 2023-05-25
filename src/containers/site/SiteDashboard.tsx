import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/loader/Loader';
import Searchbar from '../../components/searchbar/Searchbar';
import SummaryCard, { ISummaryCardProps } from '../../components/summaryCard/SummaryCard';
import APPCONSTANTS from '../../constants/appConstants';
import { useLoadMorePagination } from '../../hooks/pagination';
import { PROTECTED_ROUTES } from '../../constants/route';
import { clearSiteSummary, fetchSiteDashboardListRequest, setSiteSummary } from '../../store/site/actions';
import { ISiteDashboard } from '../../store/site/types';
import {
  siteDashboardListSelector,
  siteListTotalSelector,
  siteLoadingSelector,
  siteLoadingMoreSelector
} from '../../store/site/selectors';
import { formDataIdSelector, tenantIdSelector } from '../../store/user/selectors';
import ERRORS from '../../constants/errors';
import toastCenter from '../../utils/toastCenter';

import styles from './site.module.scss';

const SiteDashboard = () => {
  const dispatch = useDispatch();
  const siteDashboardList = useSelector(siteDashboardListSelector);
  const siteCount = useSelector(siteListTotalSelector);
  const loading = useSelector(siteLoadingSelector);
  const loadingMore = useSelector(siteLoadingMoreSelector);
  const searchText = useRef<string>('');

  const fetchDetails = useCallback(
    (
      skip: number,
      limit: number | null,
      searchString: string = searchText.current,
      isLoadMore: boolean = false,
      successCb?: any
    ) => {
      dispatch(
        fetchSiteDashboardListRequest({
          skip,
          limit,
          search: searchString,
          isLoadMore,
          successCb,
          failureCb: (e) => {
            if (e.message === ERRORS.NETWORK_ERROR.message) {
              toastCenter.error(APPCONSTANTS.NETWORK_ERROR, APPCONSTANTS.CONNECTION_LOST);
            } else {
              toastCenter.error(APPCONSTANTS.OOPS, APPCONSTANTS.SITE_FETCH_ERROR);
            }
          }
        })
      );
    },
    [dispatch]
  );

  const { isLastPage, loadMore, resetPage } = useLoadMorePagination({
    total: siteCount,
    itemsPerPage: APPCONSTANTS.SITES_PER_PAGE,
    onLoadMore: ({ skip, limit }) => {
      fetchDetails(skip, limit, searchText.current, true);
    }
  });

  useEffect(() => {
    fetchDetails(0, APPCONSTANTS.SITES_PER_PAGE);
  }, [dispatch, fetchDetails]);

  const onSearch = useCallback(
    (search: string) => {
      searchText.current = search;
      fetchDetails(0, APPCONSTANTS.SITES_PER_PAGE, search, false, resetPage);
    },
    [fetchDetails, resetPage]
  );

  const parsedData: ISummaryCardProps[] = useMemo(
    () =>
      siteDashboardList.map(({ name, id, siteType, tenantId }: ISiteDashboard) => ({
        title: name,
        subTitle: siteType,
        // To remove Site Detail cache in store
        setBreadcrumbDetails: () => {
          dispatch(clearSiteSummary());
          dispatch(setSiteSummary({ name, id, tenantId }));
        },
        detailRoute: PROTECTED_ROUTES.siteSummary
          .replace(':siteId', id.toString())
          .replace(':tenantId', tenantId.toString()),
        data: []
      })),
    [dispatch, siteDashboardList]
  );

  const noSitesAvailable = !(searchText.current || parsedData.length);
  const noSearchResultAvailable = Boolean(searchText.current && !parsedData.length);

  const OUId = useSelector(formDataIdSelector);
  const ouTentantId = useSelector(tenantIdSelector);
  const createSiteRoute = PROTECTED_ROUTES.createSiteByOU.replace(':OUId', OUId).replace(':tenantId', ouTentantId);
  const loaderWrapperClass = loadingMore
    ? `${styles.loaderWrapper} d-flex align-items-center justify-content-center mt-2dot5`
    : '';
  return (
    <div className='py-1dot5'>
      <div className='row'>
        <div
          className={`col-12 mb-1dot25 d-flex align-items-sm-center align-items-start flex-sm-row flex-column ${styles.header}`}
        >
          <h4 className='page-title mb-sm-0 mb-0dot5'>Sites</h4>
          {!noSitesAvailable && (
            <>
              <span className='ms-sm-auto mb-sm-0 mb-1'>
                <Searchbar placeholder='Search Site' onSearch={onSearch} isOutlined={false} />
              </span>
              <Link to={createSiteRoute} className='ms-sm-1dot5' tabIndex={-1}>
                <button className='btn primary-btn'>Create Site</button>
              </Link>
            </>
          )}
        </div>
        <div className='col-12'>
          <div className='row gx-1dot25 gy-1dot25'>
            {parsedData.map((summaryProps: ISummaryCardProps, i: number) => (
              <div key={`site${i}`} className='col-lg-4 col-md-6 col-12 mx-md-0 mx-auto'>
                <SummaryCard disableImg={true} titleClassName={styles.siteSummaryTitle} {...summaryProps} />
              </div>
            ))}
          </div>
        </div>
        {noSitesAvailable && !loading && (
          <div className={`col-12 text-center mt-1 py-3dot75 ${styles.noData}`}>
            <div className='fw-bold highlight-text'>Let’s Get Started!</div>
            <div className='subtle-color fs-0dot875 lh-1dot25 mb-1'>Create an site</div>
            <Link to={createSiteRoute} className='mx-auto' tabIndex={-1}>
              <button className='btn primary-btn'>Create Site</button>
            </Link>
          </div>
        )}
        {noSearchResultAvailable && (
          <div className={`col-12 text-center mt-1 py-3dot75 ${styles.noData}`}>
            <div className='fw-bold highlight-text'>No sites available</div>
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

export default SiteDashboard;
