import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SummaryCard, { ISummaryCardProps } from '../../components/summaryCard/SummaryCard';
import Searchbar from '../../components/searchbar/Searchbar';
import Loader from '../../components/loader/Loader';
import Dropdown from '../../components/dropdown/Dropdown';
import APPCONSTANTS from '../../constants/appConstants';
import { useLoadMorePagination } from '../../hooks/pagination';
import { clearRegionDetail, fetchRegionsRequest, setRegionDetails } from '../../store/region/actions';
import {
  getRegionsCountSelector,
  getRegionsLoadingMoreSelector,
  getRegionsLoadingSelector,
  getRegionsSelector
} from '../../store/region/selectors';
import { appendZeroBefore } from '../../utils/commonUtils';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';

import styles from './Region.module.scss';
import { PROTECTED_ROUTES } from '../../constants/route';
import { fetchTimezoneListRequest } from '../../store/user/actions';
import { timezoneListSelector } from '../../store/user/selectors';
import { clearSiteSummary } from '../../store/site/actions';
import { clearAccountDetails, resetClinicalWorkflow } from '../../store/account/actions';
import { clearOperatingUnitDetail } from '../../store/operatingUnit/actions';
import { IRegionDetail } from '../../store/region/types';
import { getClinicalWorkflowSelector } from '../../store/account/selectors';
import sessionStorageServices from '../../global/sessionStorageServices';

const regionDropdownMenuItems = [
  {
    route: PROTECTED_ROUTES.createSuperAdmin,
    menuText: 'Super Admin'
  },
  { route: PROTECTED_ROUTES.createRegion, menuText: 'Region' }
];

/**
 * Lists all the regions
 * Provides search feature
 * Provided the links to navigate to creation page of super admin and region
 * @returns {React.ReactElement}
 */
const Region = (): React.ReactElement => {
  const dispatch = useDispatch();
  const regions = useSelector(getRegionsSelector);
  const regionsCount = useSelector(getRegionsCountSelector);
  const loading = useSelector(getRegionsLoadingSelector);
  const loadingMore = useSelector(getRegionsLoadingMoreSelector);
  const timezoneList = useSelector(timezoneListSelector);
  const clinicalWorkflows = useSelector(getClinicalWorkflowSelector);
  const { isLastPage, loadMore, resetPage } = useLoadMorePagination({
    total: regionsCount,
    itemsPerPage: APPCONSTANTS.REGIONS_PER_PAGE,
    onLoadMore: ({ skip, limit, onFail }) => {
      dispatch(
        fetchRegionsRequest({
          skip,
          limit,
          isLoadMore: true,
          failureCb: (e) => {
            onFail();
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.REGION_FETCH_ERROR));
          }
        })
      );
    }
  });

  useEffect(() => {
    dispatch(
      fetchRegionsRequest({
        skip: 0,
        limit: APPCONSTANTS.REGIONS_PER_PAGE,
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.REGION_FETCH_ERROR))
          }
        }
      })
    );
    if (!timezoneList?.length) {
      dispatch(fetchTimezoneListRequest());
    }
    if (clinicalWorkflows.length) {
      dispatch(resetClinicalWorkflow());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  /**
   * To remove Region, Account, OU, Site Details cache in store
   */
  useEffect(() => {
    dispatch(clearRegionDetail());
    dispatch(clearAccountDetails());
    dispatch(clearOperatingUnitDetail());
    dispatch(clearSiteSummary());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * To clear cached region details data and set current region name
   */
  const onDashboardExit = useCallback(
    (partialRegionDetail: Partial<IRegionDetail>) => {
      dispatch(clearRegionDetail());
      dispatch(setRegionDetails(partialRegionDetail));
      sessionStorageServices.setItem(APPCONSTANTS.COUNTRY_ID, partialRegionDetail.id);
      sessionStorageServices.setItem(APPCONSTANTS.COUNTRY_TENANT_ID, partialRegionDetail.tenantId);
    },
    [dispatch]
  );

  const searchText = useRef<string>('');
  const onSearch = useCallback(
    (search: string) => {
      searchText.current = search;
      dispatch(
        fetchRegionsRequest({
          skip: 0,
          limit: APPCONSTANTS.REGIONS_PER_PAGE,
          search,
          successCb: () => resetPage(),
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.REGION_FETCH_ERROR))
            }
          }
        })
      );
    },
    [dispatch, resetPage]
  );

  const parsedData: ISummaryCardProps[] = useMemo(
    () =>
      regions.map(({ ouCount, siteCount, accountsCount, name, tenantId, id: regionId }) => ({
        title: name,
        detailRoute: PROTECTED_ROUTES.regionSummary.replace(':regionId', regionId).replace(':tenantId', tenantId),
        setBreadcrumbDetails: () => onDashboardExit({ id: regionId, name, tenantId }),
        tenantId,
        formId: regionId,
        data: [
          {
            type: 'number',
            value: Number(accountsCount) ? appendZeroBefore(accountsCount, 2) : '-',
            label: 'Account',
            disableEllipsis: true,
            route: PROTECTED_ROUTES.accountByRegion.replace(':regionId', regionId).replace(':tenantId', tenantId),
            onClick: () => onDashboardExit({ id: regionId, name, tenantId })
          },
          {
            type: 'number',
            value: Number(ouCount) ? appendZeroBefore(ouCount, 2) : '-',
            label: 'Operating Unit',
            route: PROTECTED_ROUTES.OUByRegion.replace(':regionId', regionId).replace(':tenantId', tenantId),
            onClick: () => onDashboardExit({ id: regionId, name, tenantId })
          },
          {
            type: 'number',
            value: Number(siteCount) ? appendZeroBefore(siteCount, 2) : '-',
            label: 'Site',
            disableEllipsis: true,
            route: PROTECTED_ROUTES.siteByRegion.replace(':regionId', regionId).replace(':tenantId', tenantId),
            onClick: () => onDashboardExit({ id: regionId, name, tenantId })
          }
        ]
      })),
    [regions, onDashboardExit]
  );

  const noRegionsAvailable = !(searchText.current || parsedData.length);
  const noSearchResultAvailable = Boolean(searchText.current && !parsedData.length);
  const loaderWrapperClass = loadingMore
    ? `${styles.loaderWrapper} d-flex align-items-center justify-content-center mt-2dot5`
    : '';

  return (
    <div className='py-1dot5'>
      <div className='row'>
        <div className={`col-12 mb-1dot25 d-flex align-items-sm-center align-items-start flex-sm-row flex-column`}>
          <h4 className='page-title mb-sm-0 mb-0dot5'>Regions</h4>
          {!noRegionsAvailable && (
            <>
              <span className='ms-sm-auto mb-sm-0 mb-1'>
                <Searchbar placeholder='Search Region' onSearch={onSearch} isOutlined={false} />
              </span>
              <span className='ms-sm-1dot5'>
                <Dropdown label='Create new' menuItems={regionDropdownMenuItems} />
              </span>
            </>
          )}
        </div>
        <div className='col-12'>
          <div className='row gx-1dot25 gy-1dot25'>
            {parsedData.map((summaryProps: ISummaryCardProps, i: number) => (
              <div key={`region${i}`} className='col-lg-6 col-12 mx-lg-0 mx-auto'>
                <SummaryCard {...summaryProps} disableImg={true} />
              </div>
            ))}
          </div>
        </div>
        {noRegionsAvailable && !loading && (
          <div className={`col-12 text-center mt-1 py-3dot75 ${styles.noData}`}>
            <div className='fw-bold highlight-text'>Let’s Get Started!</div>
            <div className='subtle-color fs-0dot875 lh-1dot25 mb-1'>Create a new region or super admin</div>
            <Dropdown label='Create new' menuItems={regionDropdownMenuItems} className='mx-auto' />
          </div>
        )}
        {noSearchResultAvailable && (
          <div className={`col-12 text-center mt-1 py-3dot75 ${styles.noData}`}>
            <div className='fw-bold highlight-text'>No regions available</div>
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
        {loadingMore || loading ? (
          <div className={loaderWrapperClass}>
            <Loader isFullScreen={!loadingMore} className='translate-x-minus50' />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Region;
