import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import { Form, FormRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useDispatch, useSelector } from 'react-redux';

import { ILabResult, ILabTest, ILabTestFormValues } from '../../store/labTest/types';
import FormContainer from '../../components/formContainer/FormContainer';
import Loader from '../../components/loader/Loader';
import { PROTECTED_ROUTES } from '../../constants/route';
import LabTestForm from './LabTestForm';
import AddLabTestIcon from '../../assets/images/info-grey.svg';
import APPCONSTANTS from '../../constants/appConstants';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import { createLabtestRequest, fetchLabtestByIdRequest, updateLabtestRequest } from '../../store/labTest/actions';
import { labtestLoadingSelector } from '../../store/labTest/selectors';
import { useEffect, useRef, useState } from 'react';
import { FormApi } from 'final-form';
import LabTestResultForm, { ICheckDuplicateValidation } from './LabTestResultForm';

interface IMatchParams {
  regionId: string;
  tenantId: string;
}

interface IMatchProps extends RouteComponentProps<IMatchParams> {}

/**
 * Renders the form for labtest create. Here there is an option to add multiple lab test at a time.
 * Also this function performs the duplicate check for each new row. After a duplication check
 * we can able to change the given details in any of row. During that circumstances the duplicate
 * check will performed once again based on user action.
 */
const AddLabTest = (props: IMatchProps): React.ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(labtestLoadingSelector);
  const { labTestId, labTestTenantId } = useParams<any>();
  const formRef = useRef<FormApi<any>>();
  const labTestTobeEdited = useRef<Partial<ILabTest>>({});
  const testResultcache = useRef<ILabResult[]>([]);
  const [addLabtestForm, setAddLabtestForm] = useState({
    previousFieldValue: {} as ILabTestFormValues,
    internalFormState: [] as Array<{ isValueChanged: boolean; isValid: boolean }>
  });

  useEffect(() => {
    if (labTestId && labTestTenantId) {
      dispatch(
        fetchLabtestByIdRequest({
          payload: { id: labTestId, tenantId: labTestTenantId },
          successCb: (labTest: ILabTest) => {
            try {
              labTest = { ...labTest, labTestResults: (labTest as any).labTestResults };
              labTestTobeEdited.current = labTest;
              testResultcache.current = [...(labTestTobeEdited.current.labTestResults || [])];
              formRef.current?.change('name', labTest.name);
              formRef.current?.change('active', labTest.active);
              formRef.current?.change('labTestResults', [...(labTest.labTestResults || [])]);
              if (labTest.labTestResults) {
                const valueUpdates = labTest.labTestResults.map(() => ({ isValueChanged: false, isValid: true }));
                setAddLabtestForm({
                  previousFieldValue: labTest as ILabTestFormValues,
                  internalFormState: valueUpdates
                });
              }
            } catch (e) {
              //
            }
          },
          failureCb: (e) => {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.LABTEST_UPDATE_FAIL));
          }
        })
      );
    }
  }, [dispatch, labTestId, labTestTenantId]);

  /**
   * This function checks for duplicate data validation with existing form values and existing values in database
   */
  const checkDuplicateValidation = ({
    fields,
    index,
    isFirstChild,
    initialValue,
    isUpdate = false,
    isSubmitted = false,
    submitCb
  }: ICheckDuplicateValidation): void => {
    const currentRecord = fields.value[index];
    // contains all the field values except the value of current index to check for duplicates.
    const oldRecords = fields.value.filter((_record: ILabTestFormValues, fieldIndex: number) => fieldIndex !== index);

    // checks if current row values exists in the previous row values in the form
    const isRecordExists = oldRecords.some((record: ILabTestFormValues) => {
      let result: boolean;
      try {
        result = record.name.toLowerCase() === currentRecord.name.toLowerCase();
      } catch {
        result = false;
      }
      return result;
    });
    if (isRecordExists && !isFirstChild) {
      // shows popup if duplicate values entered in the form
      toastCenter.error(
        APPCONSTANTS.OOPS,
        APPCONSTANTS.RESULT_NAME_REENTERED_ERROR.replace('this result name', `"${currentRecord.name}"`)
      );
    } else if (isFirstChild || !isRecordExists) {
      // no duplicates found in the database
      if (!isUpdate && !isSubmitted && !isRecordExists) {
        fields.push({ ...initialValue });
      }
      setPreviousFieldValue(fields.value[index], index);
      setInternalFormState({ isValueChanged: false, isValid: true }, index);
      // if submitted and no duplicates found then the below callback
      submitCb?.();
    }
  };

  /**
   * Handler for form cancel
   */
  const onCancel = () => {
    history.push(
      PROTECTED_ROUTES.labTestByRegion
        .replace(':regionId', props.match.params.regionId)
        .replace(':tenantId', props.match.params.tenantId)
    );
  };

  /**
   * Handler for form submition action on create
   * @param values
   */
  const onAdd = (labTests: ILabTestFormValues) => {
    labTests.labTestResults = labTests.labTestResults?.map((result) => ({
      ...result,
      displayOrder: Number(result.displayOrder) ? Number(result.displayOrder) : 0
    }));
    const data = {
      ...labTests,
      countryId: props.match.params.regionId,
      tenantId: props.match.params.tenantId
    };
    dispatch(
      createLabtestRequest({
        data,
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.LABTEST_CREATION_SUCCESS);
          history.push(
            PROTECTED_ROUTES.labTestByRegion
              .replace(':regionId', props.match.params.regionId)
              .replace(':tenantId', props.match.params.tenantId)
          );
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.LABTEST_CREATION_ERROR))
          }
        }
      })
    );
  };

  /**
   * Handler for form submition action on edit
   * @param values
   */
  const onEdit = (labTest: ILabTestFormValues) => {
    labTest = { ...labTest };
    const resultToIdMap: { [k: string]: ILabResult } = {};
    const resultToNameMap: { [k: string]: ILabResult } = {};
    testResultcache.current?.forEach((result: ILabResult) => {
      resultToIdMap[result.id as string] = result;
      resultToNameMap[result.name] = result;
    });
    labTest.labTestResults = labTest.labTestResults || [];
    // iterating and deleting the property that are updated from resultToIdMap,
    // which results in only the results that are deleted remains in the map
    labTest.labTestResults = labTest.labTestResults?.map((result: ILabResult) => {
      delete result?.labTestResultRanges;
      if (result?.id) {
        delete resultToIdMap[result.id];
      } else if (resultToNameMap[result.name]) {
        // there is a case where user will delete a result and create a new result with same name
        // in that case we are simulating it as updating the existing result
        // results that are created in same name as that of one which is deleted
        // will pass this if block and executes this
        delete resultToIdMap[resultToNameMap[result.name].id as string];
        return {
          ...resultToNameMap[result.name],
          ...result,
          displayOrder: Number(result.displayOrder) ? Number(result.displayOrder) : 0,
          deleted: false
        };
      }
      return {
        ...result,
        displayOrder: Number(result.displayOrder) ? Number(result.displayOrder) : 0,
        deleted: false
      };
    });
    // Rmeaining delted results also pushed into the update payload with is_deleted=true
    Object.values(resultToIdMap).forEach((result: ILabResult) => {
      labTest.labTestResults.push({
        ...result,
        deleted: true,
        displayOrder: Number(result.displayOrder) ? Number(result.displayOrder) : 0
      });
    });
    const data = {
      ...labTestTobeEdited.current,
      ...labTest,
      countryId: props.match.params.regionId
    };
    dispatch(
      updateLabtestRequest({
        data: data as ILabTest,
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.LABTEST_UPDATE_SUCCESS);
          props.history.push(
            PROTECTED_ROUTES.labTestByRegion
              .replace(':regionId', props.match.params.regionId)
              .replace(':tenantId', props.match.params.tenantId)
          );
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.LABTEST_UPDATE_FAIL))
          }
        }
      })
    );
  };

  /**
   * Sets the new field row value or Removes the specific field row values by index
   */
  const setPreviousFieldValue = (value: ILabResult | null, index: number, isRemove = false) => {
    const newFieldValues = addLabtestForm.previousFieldValue.labTestResults
      ? [...addLabtestForm.previousFieldValue.labTestResults]
      : [];
    if (isRemove) {
      newFieldValues.splice(index, 1);
    } else if (!isRemove && value) {
      newFieldValues[index] = value;
    }
    setAddLabtestForm((previous) => ({
      ...previous,
      previousFieldValue: { ...previous.previousFieldValue, labTestResults: newFieldValues }
    }));
  };

  /**
   * Sets the new form state for value changes and validation or Removes the specific state by index
   */
  const setInternalFormState = (
    value: { isValueChanged: boolean; isValid: boolean } | null,
    index: number,
    isRemove = false
  ) => {
    const valueUpdates = [...addLabtestForm.internalFormState];
    if (isRemove) {
      valueUpdates.splice(index, 1);
    } else if (!isRemove && value) {
      valueUpdates[index] = value;
    }
    setAddLabtestForm((previous) => ({
      ...previous,
      internalFormState: [...valueUpdates]
    }));
  };

  const onSubmit = (labTestValues: ILabTestFormValues) => {
    const labTest = {
      ...labTestValues,
      name: labTestValues.name.trim(),
      labTestResults: labTestValues.labTestResults.map((labResult) => {
        return { ...labResult, name: labResult.name.trim() };
      })
    };
    const { internalFormState } = addLabtestForm;
    const lastChildIndex = labTest.labTestResults.length - 1;
    // contains the form state of all field rows except the last child
    // tslint:disable-next-line: variable-name
    const oldInternalFormState = internalFormState.filter((_value, index) => index !== lastChildIndex);
    // checks if any existing field value changed and not saved
    const isChangesNotConfirmed = oldInternalFormState.some((value) => value?.isValueChanged);
    if (isChangesNotConfirmed) {
      toastCenter.error(APPCONSTANTS.OOPS, APPCONSTANTS.UNSAVED_CHANGES_MESSAGE);
      return;
    }
    checkDuplicateValidation({
      fields: { value: labTest.labTestResults },
      index: lastChildIndex,
      isFirstChild: labTest.labTestResults.length === 1,
      initialValue: {},
      isUpdate: false,
      isSubmitted: true,
      submitCb: () => {
        // no duplicate data found so save to database
        labTestId ? onEdit(labTest) : onAdd(labTest);
      }
    });
  };

  return (
    <>
      {loading && <Loader />}
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators
        }}
        initialValues={{ active: true }}
        render={({ handleSubmit, valid, form }: FormRenderProps<ILabTestFormValues>) => {
          formRef.current = form;
          return (
            <form onSubmit={handleSubmit}>
              <FormContainer label='Lab Test Details' icon={AddLabTestIcon}>
                <LabTestForm form={form} isEdit={!!labTestId} isValid={valid} />
                <LabTestResultForm
                  form={form}
                  isEdit={!!labTestId}
                  checkDuplicateValidation={checkDuplicateValidation}
                  previousFieldValue={addLabtestForm.previousFieldValue}
                  internalFormState={addLabtestForm.internalFormState}
                  setPreviousFieldValue={setPreviousFieldValue}
                  setInternalFormState={setInternalFormState}
                />
              </FormContainer>
              <div className='mt-1dot25 d-flex'>
                <button type='button' className='btn secondary-btn me-0dot625 px-1dot125 ms-auto' onClick={onCancel}>
                  Cancel
                </button>
                <button type='submit' className='btn primary-btn px-1dot75'>
                  Submit
                </button>
              </div>
            </form>
          );
        }}
      />
    </>
  );
};

export default AddLabTest;
