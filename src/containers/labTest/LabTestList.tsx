import React, { useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PROTECTED_ROUTES } from '../../constants/route';
import CustomTable from '../../components/customtable/CustomTable';
import DetailCard from '../../components/detailCard/DetailCard';
import Loader from '../../components/loader/Loader';
import APPCONSTANTS from '../../constants/appConstants';
import { fetchLabtestsRequest, deleteLabtestRequest } from '../../store/labTest/actions';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import { labtestLoadingSelector, labtestsSelector, labtestCountSelector } from '../../store/labTest/selectors';
import { ILabTest } from '../../store/labTest/types';
import { formatDate } from '../../utils/validation';
import { useTablePaginationHook } from '../../hooks/tablePagination';

interface IMatchParams {
  regionId: string;
  tenantId: string;
}

export interface ILabTestsEditFormValues {
  labTest: ILabTest;
}
interface IMatchProps extends RouteComponentProps<IMatchParams> {}

/**
 * Shows the lab test list
 * @returns {React.ReactElement}
 */
const LabTestList = (props: IMatchProps): React.ReactElement => {
  const { listParams, handleSearch, handlePage } = useTablePaginationHook();
  const dispatch = useDispatch();
  const loading = useSelector(labtestLoadingSelector);
  const labTestList = useSelector(labtestsSelector);
  const labTestCount = useSelector(labtestCountSelector);

  const fetchDetails = useCallback(() => {
    dispatch(
      fetchLabtestsRequest({
        data: {
          tenantId: props.match.params.tenantId,
          skip: (listParams.page - APPCONSTANTS.INITIAL_PAGE) * listParams.rowsPerPage,
          limit: listParams.rowsPerPage,
          searchTerm: listParams.searchTerm,
          countryId: props.match.params.regionId,
          paginated: true
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.LABTEST_LIST_FETCH_ERROR))
          }
        }
      })
    );
  }, [dispatch, props.match.params.tenantId, props.match.params.regionId, listParams]);

  useEffect(() => {
    fetchDetails();
  }, [dispatch, fetchDetails, props.match.params.tenantId]);

  const openAddLabTest = () => {
    props.history.push(
      PROTECTED_ROUTES.createLabTest
        .replace(':regionId', props.match.params.regionId)
        .replace(':tenantId', props.match.params.tenantId)
    );
  };

  const handleLabTestDelete = ({ data }: { data: ILabTest }) => {
    dispatch(
      deleteLabtestRequest({
        data: { id: Number(data.id), tenantId: Number(data.tenantId) },
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.LABTEST_DELETE_SUCCESS);
          handlePage(APPCONSTANTS.INITIAL_PAGE);
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.LABTEST_DELETE_ERROR))
          }
        }
      })
    );
  };

  const handleEdit = ({ id, tenantId }: ILabTest) => {
    props.history.push(
      PROTECTED_ROUTES.editLabTest
        .replace(':regionId', props.match.params.regionId)
        .replace(':tenantId', props.match.params.tenantId)
        .replace(':labTestId', String(id))
        .replace(':labTestTenantId', String(tenantId))
    );
  };

  const formatUpdatedAt = (data: ILabTest) => {
    if (data?.updatedAt) {
      return formatDate(data.updatedAt, { month: 'short', format: 'YYYY-MM-DD' });
    } else {
      return '';
    }
  };

  const formatStatus = (rowData: ILabTest) => (rowData.active ? APPCONSTANTS.ACTIVE : APPCONSTANTS.INACTIVE);

  return (
    <>
      {loading && <Loader />}
      <div className='row g-0dot625'>
        <div className='col-12'>
          <DetailCard
            buttonLabel='Add Lab Test'
            header='Lab Test List'
            isSearch={true}
            onSearch={handleSearch}
            onButtonClick={openAddLabTest}
          >
            <CustomTable
              rowData={labTestList}
              columnsDef={[
                {
                  id: 1,
                  name: 'name',
                  label: 'name',
                  width: '140px'
                },
                {
                  id: 2,
                  name: 'status',
                  label: 'STATUS',
                  width: '125px',
                  cellFormatter: formatStatus
                },
                {
                  id: 3,
                  name: 'updated_at',
                  label: 'UPDATED ON',
                  width: '125px',
                  cellFormatter: formatUpdatedAt
                }
              ]}
              isEdit={true}
              isDelete={true}
              page={listParams.page}
              rowsPerPage={listParams.rowsPerPage}
              count={labTestCount}
              onRowEdit={handleEdit}
              onDeleteClick={handleLabTestDelete}
              confirmationTitle={APPCONSTANTS.LABTEST_DELETE_CONFIRMATION}
              deleteTitle={APPCONSTANTS.LABTEST_DELETE_TITLE}
              handlePageChange={handlePage}
            />
          </DetailCard>
        </div>
      </div>
    </>
  );
};

export default LabTestList;
