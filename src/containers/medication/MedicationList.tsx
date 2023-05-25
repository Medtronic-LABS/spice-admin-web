import React, { useCallback, useEffect, useState } from 'react';
import CustomTable from '../../components/customtable/CustomTable';
import DetailCard from '../../components/detailCard/DetailCard';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMedication, fetchMedicationListReq, updateMedication } from '../../store/medication/actions';
import APPCONSTANTS from '../../constants/appConstants';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import { IMedicationList } from '../../store/medication/types';
import {
  getMedicationListCountSelector,
  getMedicationListSelector,
  getMedicationLoadingSelector
} from '../../store/medication/selectors';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { PROTECTED_ROUTES } from '../../constants/route';
import Loader from '../../components/loader/Loader';
import ModalForm from '../../components/modal/ModalForm';
import MedicationForm, { IMedicationDataFormValues } from './MedicationForm';
import arrayMutators from 'final-form-arrays';
import { useTablePaginationHook } from '../../hooks/tablePagination';

/**
 * Shows the medication list
 * Provides search feature in medication
 * Provides edit feature for medication list
 * @returns {React.ReactElement}
 */
const MedicationList = (): React.ReactElement => {
  const { listParams, handleSearch, handlePage } = useTablePaginationHook();
  const [isOpenMedicationModal, setOpenMedicationModal] = useState(false);
  const [medicationInitialValues, setMedicationInitialValues] = useState({});

  const dispatch = useDispatch();
  const medicationList = useSelector(getMedicationListSelector);
  const loading = useSelector(getMedicationLoadingSelector);
  const listCount = useSelector(getMedicationListCountSelector);

  const { regionId, tenantId }: { regionId: string; tenantId: string } = useParams();
  const history = useHistory();

  /**
   * Handler for add medication button click.
   */
  const handleAddMedication = () => {
    const url = PROTECTED_ROUTES.createMedication;
    const createMedicationURL = url.replace(':regionId', regionId).replace(':tenantId', tenantId);
    history.push(createMedicationURL);
  };

  const handleMedicationDelete = (values: { data: IMedicationList; index: number }) => {
    dispatch(
      deleteMedication({
        data: { id: values?.data?.id, tenantId },
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.MEDICATION_DELETE_SUCCESS);
          handlePage(
            Math.ceil(listCount / listParams.rowsPerPage) === listParams.page &&
              (listCount - 1) % listParams.rowsPerPage === 0
              ? listParams.page - 1
              : listParams.page
          );
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.MEDICATION_DELETE_FAIL))
          }
        }
      })
    );
  };

  const openEditModal = (value: any) => {
    setOpenMedicationModal(true);
    const editValue = {
      ...value,
      name: value?.medicationName,
      brand: value.brandId ? { brand: { id: value.brandId, name: value.brandName } } : undefined,
      classification: value.classificationId
        ? { classification: { id: value.classificationId, name: value.classificationName } }
        : undefined,
      dosage_form: value.dosageFormId ? { id: value.dosageFormId, name: value.dosageFormName } : undefined
    };
    setMedicationInitialValues(editValue);
  };

  /**
   * Handler for edit medication form cancel.
   */
  const handleEditCancelClick = () => {
    setOpenMedicationModal(false);
    setMedicationInitialValues({});
  };

  /**
   * Handler for edit medication form submit.
   * @param medication
   */
  const handleMedicationEditSubmit = ({ medication }: { medication: IMedicationDataFormValues[] }) => {
    const data = JSON.parse(JSON.stringify(medication[0]));
    const postData = {
      countryId: data?.countryId,
      classificationId: data?.classification.classification.id,
      classificationName: data?.classification.classification.name,
      brandId: data?.brand.brand.id,
      brandName: data?.brand.brand.name,
      dosageFormId: data?.dosage_form.id,
      dosageFormName: data?.dosage_form.name,
      medicationName: data?.name,
      id: data?.id,
      tenantId
    };
    dispatch(
      updateMedication({
        data: postData,
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.MEDICATION_UPDATE_SUCCESS);
          handlePage(APPCONSTANTS.INITIAL_PAGE);
          handleEditCancelClick();
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.MEDICATION_UPDATE_FAIL))
          }
        }
      })
    );
  };

  /**
   * to load medication data.
   * @param medication
   */
  const fetchList = useCallback(() => {
    dispatch(
      fetchMedicationListReq({
        skip: (listParams.page - APPCONSTANTS.INITIAL_PAGE) * listParams.rowsPerPage,
        limit: listParams.rowsPerPage,
        search: listParams.searchTerm,
        payload: {
          tenantId,
          countryId: regionId
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.MEDICATION_FETCH_ERROR))
          }
        }
      })
    );
  }, [dispatch, tenantId, regionId, listParams]);

  useEffect(() => {
    fetchList();
  }, [dispatch, fetchList, regionId, listParams]);

  const editModalRender = (form: any) => {
    return <MedicationForm form={form} initialEditValue={medicationInitialValues} disableOptions={true} />;
  };

  return (
    <>
      {loading && <Loader />}
      <div className='col-lg-12'>
        <div className='mt-0'>
          <DetailCard
            buttonLabel='Add Medication'
            header='Medication List'
            isSearch={true}
            onSearch={handleSearch}
            onButtonClick={handleAddMedication}
          >
            <CustomTable
              rowData={medicationList}
              columnsDef={[
                { id: 1, name: 'medicationName', label: 'Name', width: '125px' },
                {
                  id: 2,
                  name: 'classificationName',
                  label: 'Classification',
                  width: '150px'
                },
                {
                  id: 3,
                  name: 'brandName',
                  label: 'Brand Name',
                  width: '150px'
                },
                {
                  id: 4,
                  name: 'dosageFormName',
                  label: 'Dosage Form',
                  width: '150px'
                }
              ]}
              isEdit={true}
              isDelete={true}
              onRowEdit={openEditModal}
              page={listParams.page}
              rowsPerPage={listParams.rowsPerPage}
              count={listCount}
              onDeleteClick={handleMedicationDelete}
              handlePageChange={handlePage}
              confirmationTitle={APPCONSTANTS.MEDICATION_DELETE_CONFIRMATION}
              deleteTitle={APPCONSTANTS.MEDICATION_DELETE_TITLE}
            />
          </DetailCard>
        </div>
      </div>
      <ModalForm
        show={isOpenMedicationModal}
        title={`Edit Medication Details`}
        cancelText='Cancel'
        submitText='Submit'
        handleCancel={handleEditCancelClick}
        handleFormSubmit={handleMedicationEditSubmit}
        initialValues={medicationInitialValues}
        mutators={arrayMutators}
        render={editModalRender}
      />
    </>
  );
};

export default MedicationList;
