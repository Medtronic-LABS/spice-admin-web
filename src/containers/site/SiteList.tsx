import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import arrayMutators from 'final-form-arrays';

import APPCONSTANTS from '../../constants/appConstants';
import DetailCard from '../../components/detailCard/DetailCard';
import CustomTable from '../../components/customtable/CustomTable';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import Loader from '../../components/loader/Loader';
import { PROTECTED_ROUTES } from '../../constants/route';
import ModalForm from '../../components/modal/ModalForm';
import { useTablePaginationHook } from '../../hooks/tablePagination';

import { siteListSelector, siteLoadingSelector, siteListTotalSelector } from '../../store/site/selectors';
import { countryIdSelector } from '../../store/user/selectors';
import {
  ISiteList,
  ICreateSiteFormValues,
  ISiteSummary,
  ISiteUpdateReqPayload,
  ISiteFormValues
} from '../../store/site/types';
import {
  clearSiteList,
  fetchSiteListRequest,
  fetchSiteSummaryRequest,
  updateSiteDetailsRequest,
  clearSiteSummary,
  setSiteSummary
} from '../../store/site/actions';
import SiteDetailsForm from '../createSite/SiteDetailsForm';
import { FormApi } from 'final-form';
import sessionStorageServices from '../../global/sessionStorageServices';
import { formatSite } from '../../utils/commonUtils';

interface IModalState {
  data?: ISiteFormValues;
  isOpen: boolean;
}

interface IMatchParams {
  regionId?: string;
  tenantId: string;
  OUId?: string;
  accountId?: string;
}

const SiteList = (): React.ReactElement => {
  const { listParams, handleSearch, handlePage } = useTablePaginationHook();
  const [editSiteDetailsModal, setEditSiteDetailsModal] = useState<IModalState>({
    isOpen: false
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const sites = useSelector(siteListSelector);
  const loading = useSelector(siteLoadingSelector);
  const siteCount = useSelector(siteListTotalSelector);
  const countryId = useSelector(countryIdSelector);

  const { regionId, tenantId, accountId, OUId } = useParams<IMatchParams>();

  /**
   * to load Site List data.
   * @param site List
   */
  const fetchList = useCallback(() => {
    dispatch(
      fetchSiteListRequest({
        tenantId: Number(tenantId),
        skip: (listParams.page - APPCONSTANTS.INITIAL_PAGE) * listParams.rowsPerPage,
        limit: listParams.rowsPerPage,
        search: listParams.searchTerm,
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            requestFailure(e, APPCONSTANTS.SITE_FETCH_ERROR)
          }
        }
      })
    );
  }, [dispatch, tenantId, listParams]);

  useEffect(() => {
    fetchList();
  }, [listParams, tenantId, dispatch, fetchList]);

  /**
   * To remove Site List, Site Details cache in store
   */
  useEffect(() => {
    dispatch(clearSiteSummary());
    return () => {
      dispatch(clearSiteList());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestFailure = (e: Error, errorMessage: string) =>
    toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, errorMessage));

  const openEditDialogue = (data: ISiteList) => {
    dispatch(
      fetchSiteSummaryRequest({
        tenantId: data.tenantId,
        id: data.id,
        successCb: openSiteEditModal,
        failureCb: (e) => {
          requestFailure(e, APPCONSTANTS.SITE_SUMMARY_FETCH_ERROR);
        }
      })
    );
  };

  const openSiteEditModal = (siteDetails: ISiteSummary) => {
    if (siteDetails) {
      const [typeObj] = APPCONSTANTS.SITE_TYPE.filter((data) => siteDetails.siteType === data.value);
      const [addressUseObj] = APPCONSTANTS.ADDRESS_USE.filter((data) => siteDetails.addressUse === data.value);
      if (!siteDetails?.city?.label) {
        siteDetails.city = undefined;
      }
      setEditSiteDetailsModal({
        isOpen: true,
        data: {
          ...siteDetails,
          siteType: typeObj,
          addressUse: addressUseObj,
          addressType: siteDetails.addressType.split('|')
        } as unknown as ISiteFormValues
      });
    } else {
      toastCenter.error(APPCONSTANTS.ERROR, APPCONSTANTS.SITE_SUMMARY_UPDATE_ERROR);
    }
  };

  const closeSiteEditModal = () => {
    setEditSiteDetailsModal({
      isOpen: false
    });
  };

  const editSiteDetailsModalRender = (form: any) => {
    const regionTenantId = editSiteDetailsModal.data?.tenantId || '';
    return <SiteDetailsForm form={form as FormApi<any>} tenantId={regionTenantId} isEdit={true} />;
  };

  const handleSiteDetailsSubmit = ({ site }: ICreateSiteFormValues) => {
    const data: ISiteUpdateReqPayload = {
      ...(site as any),
      ...formatSite(site),
      accountId: site.account.id,
      operatingUnit: site.operatingUnit,
      tenantId: (site as any).tenantId,
      countryId: countryId?.id || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID)
    } as ISiteUpdateReqPayload;
    dispatch(
      updateSiteDetailsRequest({
        data,
        successCb: siteUpdateSuccess,
        failureCb: (e) => {
          requestFailure(e, APPCONSTANTS.SITE_DETAILS_UPDATE_ERROR);
        }
      })
    );
  };

  const siteUpdateSuccess = () => {
    toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.SITE_UPDATE_SUCCESS);
    handleSearch('');
    closeSiteEditModal();
  };

  const openCreateSite = () => {
    const url = ((regionId && PROTECTED_ROUTES.createSiteByRegion) ||
      (accountId && PROTECTED_ROUTES.createSiteByAccount) ||
      (OUId && PROTECTED_ROUTES.createSiteByOU)) as string;
    history.push(
      url
        .replace(':tenantId', tenantId)
        .replace(/(:regionId)|(:accountId)|(:OUId)/, (regionId || OUId || accountId) as string)
    );
  };

  const formatOperatingUnit = (site: ISiteList) => site?.operatingUnitName;

  const formatSiteLevel = (site: ISiteList) => site?.siteLevel;

  const handleRowClick = (data: any) => {
    dispatch(setSiteSummary({ name: data.name }));
    history.push(PROTECTED_ROUTES.siteSummary.replace(':siteId', data.id).replace(':tenantId', data.tenantId));
  };

  return (
    <>
      {loading && <Loader />}
      <div className='col-12'>
        <DetailCard
          buttonLabel='Add Site'
          header='Site'
          isSearch={true}
          onSearch={handleSearch}
          onButtonClick={openCreateSite}
        >
          <CustomTable
            rowData={sites}
            columnsDef={[
              {
                id: 1,
                name: 'name',
                label: 'Name',
                width: '125px'
              },
              {
                id: 2,
                name: 'siteType',
                label: 'Type',
                width: '110px'
              },
              {
                id: 3,
                name: 'operatingUnitName',
                label: 'Operating Unit',
                width: '140px',
                cellFormatter: formatOperatingUnit
              },
              {
                id: 4,
                name: 'cultureName',
                label: 'Culture',
                width: '140px'
              },
              {
                id: 5,
                name: 'siteLevel',
                label: 'Level',
                width: '140px',
                cellFormatter: formatSiteLevel
              }
            ]}
            isDelete={false}
            isEdit={true}
            page={listParams.page}
            rowsPerPage={listParams.rowsPerPage}
            count={siteCount}
            onRowEdit={openEditDialogue}
            handlePageChange={handlePage}
            handleRowClick={handleRowClick}
          />
        </DetailCard>
      </div>
      <ModalForm
        show={editSiteDetailsModal.isOpen}
        title={`Edit Site`}
        cancelText='Cancel'
        submitText='Submit'
        handleCancel={closeSiteEditModal}
        handleFormSubmit={handleSiteDetailsSubmit}
        initialValues={{ site: editSiteDetailsModal.data }}
        mutators={arrayMutators}
        render={editSiteDetailsModalRender}
        size='modal-lg'
      />
    </>
  );
};

export default SiteList;
