import { FormApi } from 'final-form';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useDispatch, useSelector } from 'react-redux';

import TextInput from '../../components/formFields/TextInput';
import { composeValidators, required, normalizePhone } from '../../utils/validation';
import BinIcon from '../../assets/images/bin.svg';
import { fetchTimezoneListRequest, fetchCountryListRequest } from '../../store/user/actions';
import { timezoneListSelector } from '../../store/user/selectors';
import PlusIcon from '../../assets/images/plus_blue.svg';
import CloseIcon from '../../assets/images/close-red.svg';
import TickIcon from '../../assets/images/tick.svg';
import { ReactComponent as RangesIcon } from '../../assets/images/ranges.svg';

import { ILabResult, ILabResultRange, ILabTestFormValues } from '../../store/labTest/types';
import { fetchLabResultRangeList, saveUpdateLabResultRanges } from '../../store/labTest/actions';
import CustomTooltip from '../../components/tooltip';

import Modal from '../../components/modal/ModalForm';
import LabTestResultUnitForm, { IMatchParams } from './LabTestResultUnitForm';
import arrayMutators from 'final-form-arrays';
import APPCONSTANTS from '../../constants/appConstants';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import { useParams } from 'react-router-dom';
import { labResultRangesSelector, labtestLoadingSelector } from '../../store/labTest/selectors';

export interface IUserFormValues {
  email: string;
  first_name: string;
  last_name: string;
  country_code: string;
  phone_number: string;
  timezone: { id: string; description: string };
  gender: string;
  country: { country_code: string };
}

export interface ILabtestResultFormProps {
  form: FormApi<any>;
  initialEditValue?: any;
  isEdit?: boolean;
  checkDuplicateValidation?: (data: ICheckDuplicateValidation) => void;
  previousFieldValue?: ILabTestFormValues;
  internalFormState?: Array<{ isValueChanged: boolean; isValid: boolean }>;
  setPreviousFieldValue?: (value: ILabTestFormValues | null, index: number, isRemove?: boolean) => void;
  setInternalFormState?: (
    value: { isValueChanged: boolean; isValid: boolean } | null,
    index: number,
    isRemove?: boolean
  ) => void;
}

export interface ICheckDuplicateValidation {
  fields: any;
  index: number;
  isFirstChild: boolean;
  initialValue?: Partial<ILabResult>;
  isUpdate?: boolean;
  isSubmitted?: boolean;
  submitCb?: () => void;
}

export interface ICheckUnitsDuplicateValidation {
  fields: any;
  index: number;
  isFirstChild: boolean;
  initialRangeValue?: Partial<ILabResultRange>;
  isUpdate?: boolean;
  isSubmitted?: boolean;
  submitCb?: () => void;
  finalSubmit?: boolean;
}

/**
 * Form for region admin creation
 * @param param0
 * @returns {React.ReactElement}
 */
const LabTestResultForm = ({
  form,
  initialEditValue,
  isEdit,
  checkDuplicateValidation,
  previousFieldValue,
  internalFormState,
  setPreviousFieldValue,
  setInternalFormState
}: ILabtestResultFormProps): React.ReactElement => {
  const formName = 'labTestResults';
  const dispatch = useDispatch();
  const { tenantId } = useParams<IMatchParams>();

  const timezoneList = useSelector(timezoneListSelector);
  const labResultRangesList = useSelector(labResultRangesSelector);
  const loading = useSelector(labtestLoadingSelector);
  const labTestRangesRef = useRef([] as ILabResultRange[]);

  // memoizing the initial value to prevent infinite render cycles
  const initialValue = useMemo<Array<Partial<ILabResult>>>(() => [{}], []);

  const initialEditData = useMemo<Array<Partial<any>>>(() => [initialEditValue], [initialEditValue]);

  useEffect(() => {
    if (!timezoneList.length) {
      dispatch(fetchTimezoneListRequest());
    }
    dispatch(fetchCountryListRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Detects the existing field value changes and updates the internal form state accordingly
   */
  const detectFieldChange = useCallback(
    (value: any, index: number) => {
      if (previousFieldValue?.labTestResults?.length && previousFieldValue?.labTestResults[index] !== undefined) {
        const isValueChanged = !Object.values(previousFieldValue?.labTestResults[index].name).includes(value);
        setInternalFormState?.({ isValueChanged, isValid: !isValueChanged }, index);
      } else {
        setInternalFormState?.({ isValueChanged: false, isValid: false }, index);
      }
    },
    [previousFieldValue, setInternalFormState]
  );

  // checks if current row has any form validation errors
  const checkIfFieldValid = (index: number) => {
    return form.getState().errors?.labTestResults?.[index] === undefined;
  };

  /**
   * Removes the current row by index
   */
  const onRemoveFormRow = useCallback(
    (fields: any, index: number) => {
      setPreviousFieldValue?.(null, index, true);
      setInternalFormState?.(null, index, true);
      fields.remove(index);
    },
    [setInternalFormState, setPreviousFieldValue]
  );

  /**
   * Reverts the changes made on the existing field values
   */
  const onResetEditChanges = useCallback(
    (fields: any, index: number) => {
      form.mutators?.resetFields?.(`${formName}[${index}]`);
      fields.update(index, { ...previousFieldValue?.labTestResults?.[index] });
      setInternalFormState?.({ isValueChanged: false, isValid: true }, index);
    },
    [form.mutators, previousFieldValue, setInternalFormState]
  );

  /****    Result Range Modal Section     ******/

  const [resultRange, setResultRange] = useState<{ open: boolean; selectedLabResult: any }>({
    open: false,
    selectedLabResult: {}
  });
  const [addLabResultRangeForm, setAddLabResultRangeForm] = useState({
    previousFieldValue: [] as ILabResultRange[],
    internalFormState: [] as Array<{ isValueChanged: boolean; isValid: boolean }>
  });

  const closeUnitRangeModal = useCallback(() => {
    setResultRange({ open: false, selectedLabResult: {} });
  }, []);

  /**
   * Sets the new field row value or Removes the specific field row values by index
   */
  const setRangesPreviousFieldValue = useCallback(
    (value: ILabResultRange | ILabResultRange[] | null, index: number = 0, isRemove = false) => {
      let newFieldValues = [...(addLabResultRangeForm.previousFieldValue || null)];
      if (isRemove) {
        newFieldValues.splice(index, 1);
      } else if (!isRemove && value) {
        if (Array.isArray(value)) {
          newFieldValues = value;
        } else {
          newFieldValues[index] = value;
        }
      }
      setAddLabResultRangeForm((previous: any) => ({
        ...previous,
        previousFieldValue: [...newFieldValues]
      }));
    },
    [addLabResultRangeForm.previousFieldValue]
  );

  /**
   * Sets the new form state for value changes and validation or Removes the specific state by index
   */
  const setRangesInternalFormState = useCallback(
    (value: { isValueChanged: boolean; isValid: boolean } | null, index: number, isRemove = false) => {
      const valueUpdates = [...addLabResultRangeForm.internalFormState];
      if (isRemove) {
        valueUpdates.splice(index, 1);
      } else if (!isRemove && value) {
        valueUpdates[index] = value;
      }
      setAddLabResultRangeForm((previous: any) => ({
        ...previous,
        internalFormState: [...valueUpdates]
      }));
    },
    [addLabResultRangeForm]
  );

  const openUnitRangeModal = useCallback(
    ({ value }: any, index: number) => {
      dispatch(
        fetchLabResultRangeList({
          data: { tenantId, labtestResultId: value[index]?.id },
          successCb: (data: ILabResultRange[]) => {
            labTestRangesRef.current = [...data];
            if (data.length > 1) {
              const preValues = data.map((range: ILabResultRange, rangeIndex: number) => {
                if (rangeIndex < data.length - 1) {
                  const { maximumValue, minimumValue, displayOrder, ...rest } = range;
                  setRangesInternalFormState({ isValueChanged: false, isValid: true }, rangeIndex);
                  return {
                    ...rest,
                    maximumValue: Number(maximumValue),
                    minimumValue: Number(minimumValue),
                    displayOrder: Number(displayOrder)
                  } as ILabResultRange;
                } else {
                  return {} as ILabResultRange;
                }
              });
              preValues.splice(data.length - 1, 1);
              setRangesPreviousFieldValue(preValues);
            }
          },
          failureCb: (e) => {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.LABTEST_RANGE_FETCH_ERROR));
          }
        })
      );
      setResultRange({ open: true, selectedLabResult: value[index] || {} });
    },
    [dispatch, setRangesInternalFormState, setRangesPreviousFieldValue, tenantId]
  );

  /**
   * This function checks for duplicate data validation with existing form values and existing values in database
   */
  const checkRangesDuplicateValidation = useCallback(
    ({
      fields,
      index,
      isFirstChild,
      isUpdate = false,
      isSubmitted = false,
      initialRangeValue = {} as Partial<ILabResultRange>,
      submitCb,
      finalSubmit = false
    }: ICheckUnitsDuplicateValidation): boolean => {
      const currentRecord = fields.value[index];
      // contains all the field values except the value of current index to check for duplicates.
      const oldRecords = fields.value.filter((_record: ILabResultRange, fieldIndex: number) => fieldIndex !== index);

      // checks if current row values exists in the previous row values in the form
      const isRecordExists = oldRecords.some((record: any) => {
        let result: boolean;
        try {
          result = record?.unitId?.unit === currentRecord?.unitId?.unit;
        } catch {
          result = false;
        }
        return result;
      });

      if (isRecordExists && !isFirstChild) {
        // shows popup if duplicate values entered in the form
        toastCenter.error(APPCONSTANTS.OOPS, APPCONSTANTS.RESULT_UNIT_REENTERED_ERROR);
      } else if (isFirstChild || !isRecordExists) {
        // no duplicates found in the database
        if (!isUpdate && !isSubmitted && !isRecordExists) {
          fields.push({ ...initialRangeValue });
        }
        const { maximumValue, minimumValue, displayOrder, ...rest } = (fields.value[index] || []) as ILabResultRange;
        const preValue = {
          ...rest,
          maximumValue: Number(maximumValue),
          minimumValue: Number(minimumValue),
          displayOrder: Number(displayOrder)
        };
        setRangesPreviousFieldValue(preValue, index);
        setRangesInternalFormState({ isValueChanged: false, isValid: true }, index);
        // if submitted and no duplicates found then the below callback
        submitCb?.();
        if (finalSubmit) {
          return true;
        }
      }
      return false;
    },
    [setRangesInternalFormState, setRangesPreviousFieldValue]
  );

  const getRangesData = (data: ILabResultRange[]) =>
    data.map((item: any) => ({
      minimumValue: Number(item?.minimumValue),
      maximumValue: Number(item?.maximumValue),
      unit: item.unitId?.unit,
      displayOrder: Number(item?.displayOrder),
      displayName: item?.displayName,
      unitId: item.unitId?.id,
      id: item?.id
    }));

  const [rangesFormDataModified, setRangesFormData] = useState(false);

  const changedValues = (array1: any[], array2: any[]) =>
    array1.filter(
      (newValue: any) =>
        !array2.some(
          (oldValue: any) =>
            oldValue.unit === newValue.unit &&
            Number(oldValue.minimumValue) === Number(newValue.minimumValue) &&
            Number(oldValue.maximumValue) === Number(newValue.maximumValue) &&
            Number(oldValue.displayOrder) === Number(newValue.displayOrder) &&
            oldValue.displayName === newValue.displayName
        )
    );

  const saveAndUpdateRanges = useCallback(
    (labTestResultRanges: ILabResultRange[], oldRanges: ILabResultRange[]) => {
      const isUpdate = !!oldRanges.length;
      dispatch(
        saveUpdateLabResultRanges({
          data: {
            tenantId,
            labTestResultId: resultRange?.selectedLabResult?.id,
            labTestResultRanges
          },
          isUpdate,
          failureCb: (e) => {
            toastCenter.error(
              ...getErrorToastArgs(
                e,
                APPCONSTANTS.OOPS,
                isUpdate
                  ? APPCONSTANTS.LABTEST_RESULT_RANGES_UPDATE_FAIL
                  : APPCONSTANTS.LABTEST_RESULT_RANGES_CREATE_FAIL
              )
            );
          },
          successCb: () => {
            toastCenter.success(
              APPCONSTANTS.SUCCESS,
              isUpdate
                ? APPCONSTANTS.LABTEST_RESULT_RANGES_UPDATE_SUCCESS
                : APPCONSTANTS.LABTEST_RESULT_RANGES_CREATE_SUCCESS
            );
            closeUnitRangeModal();
          }
        })
      );
    },
    [closeUnitRangeModal, dispatch, resultRange?.selectedLabResult?.id, tenantId]
  );

  const handleSubmitResultRanges = useCallback(
    ({ lab_result_units: newLabResultRanges = [] as ILabResultRange[] }: { lab_result_units: ILabResultRange[] }) => {
      const isValid = checkRangesDuplicateValidation({
        fields: { value: newLabResultRanges },
        index: newLabResultRanges?.length - 1,
        isFirstChild: newLabResultRanges?.length === 1,
        isUpdate: false,
        isSubmitted: true,
        finalSubmit: true
      });
      if (isValid) {
        let updatedData = [] as ILabResultRange[];
        const newRanges = getRangesData(newLabResultRanges);
        const oldRanges = getRangesData(labTestRangesRef.current);
        if (oldRanges.length) {
          updatedData = changedValues(newRanges, oldRanges) as ILabResultRange[];
          if (!updatedData.length) {
            closeUnitRangeModal();
          } else if (updatedData.length) {
            saveAndUpdateRanges(updatedData, oldRanges);
          }
        } else {
          saveAndUpdateRanges(newRanges, oldRanges);
        }
      }
    },
    [checkRangesDuplicateValidation, closeUnitRangeModal, saveAndUpdateRanges]
  );

  /**
   * Renderer for result unit Add Edit Form
   * @param values
   */
  const rangesFormRederer = useCallback(
    (formData?: FormApi<any>) => {
      const isValueChanged = addLabResultRangeForm?.internalFormState.some((value) => value?.isValueChanged);
      const isValid = addLabResultRangeForm?.internalFormState.every((value) => value?.isValid);
      const rangeValues = formData?.getState()?.values?.lab_result_units || [];
      setTimeout(() => {
        const initialFieldCondition = rangeValues.length === 1 ? isValueChanged : isValid;
        setRangesFormData(
          ((isValueChanged ? initialFieldCondition : true) &&
            formData?.getState().dirty &&
            rangeValues?.every(
              (value: any) =>
                !!value.unitId.unit &&
                Number(value.minimumValue) >= 0 &&
                !!Number(value.maximumValue) &&
                Number(value.minimumValue) < Number(value.maximumValue) &&
                !!Number(value.displayOrder) &&
                !!value.displayName
            )) ||
            false
        );
      }, 0);
      return !loading ? (
        <LabTestResultUnitForm
          isEdit={!!labResultRangesList.length}
          form={formData as FormApi<any>}
          previousFieldValue={addLabResultRangeForm.previousFieldValue}
          internalFormState={addLabResultRangeForm.internalFormState}
          setPreviousFieldValue={setRangesPreviousFieldValue}
          setInternalFormState={setRangesInternalFormState}
          checkDuplicateValidation={checkRangesDuplicateValidation}
          initialEditValue={labResultRangesList}
          labResultRangesRef={labTestRangesRef}
        />
      ) : (
        <></>
      );
    },
    [
      addLabResultRangeForm,
      checkRangesDuplicateValidation,
      labResultRangesList,
      loading,
      setRangesInternalFormState,
      setRangesPreviousFieldValue
    ]
  );

  const onClickTickIcon = (addNewRowEnabled: boolean, fields: any, index: number, isFirstChild: boolean) => {
    if (addNewRowEnabled && checkDuplicateValidation) {
      checkDuplicateValidation({
        fields,
        index,
        isFirstChild,
        initialValue: initialValue[0],
        isUpdate: false
      });
    }
  };

  const actionsIconRenderer = (fields: any, index: number) => {
    const isLastChild = (fields?.length || 0) === index + 1;
    const isFirstChild = !index;
    const isFieldValueChanged = internalFormState?.[index] && internalFormState[index]?.isValueChanged;
    const addNewRowEnabled = form.getState().valid && (!isFieldValueChanged || isLastChild);
    const addNewRowEnabledClass = `theme-text lh-1dot25 ${addNewRowEnabled ? 'pointer' : 'not-allowed'}`;
    const plusIconClass = `me-0dot5 ${addNewRowEnabled ? '' : 'no-pointer-events'}`;
    return (
      <div style={{ height: '2.5rem', display: 'flex', alignItems: 'center' }}>
        <div className='d-flex flex-row'>
          {/* plus icon to add a new field row and checks for duplicate validation */}
          {isLastChild && (
            <>
              {!isFirstChild && (
                <div className='danger-text lh-1dot25 pointer' onClick={() => onRemoveFormRow(fields, index)}>
                  <CustomTooltip title='Delete'>
                    <img className='me-0dot5' src={BinIcon} alt='delete-icon' />
                  </CustomTooltip>
                </div>
              )}
              <div
                className={addNewRowEnabledClass}
                onClick={() => onClickTickIcon(addNewRowEnabled, fields, index, isFirstChild)}
              >
                <CustomTooltip title='Add'>
                  <img className={plusIconClass} src={PlusIcon} alt='plus-icon' />
                </CustomTooltip>
              </div>
            </>
          )}
          {!isLastChild && isFieldValueChanged && (
            // shows update and reset action icons if existing field value changes
            <div className='d-flex'>
              {/* Reset icon: resets the existing field value changes */}
              <div className='danger-text lh-1dot25  pointer' onClick={() => onResetEditChanges(fields, index)}>
                <CustomTooltip title='Reset'>
                  <img className='me-0dot5 no-pointer-events' src={CloseIcon} alt='close-icon' />
                </CustomTooltip>
              </div>

              {/* Update icon: updates the existing field value changes */}
              <div
                className={`danger-text lh-1dot25  ${checkIfFieldValid(index) ? 'pointer' : 'not-allowed'}`}
                onClick={() => {
                  if (checkIfFieldValid(index) && checkDuplicateValidation) {
                    checkDuplicateValidation({
                      fields,
                      index,
                      isFirstChild,
                      initialValue: initialValue[0],
                      isUpdate: true
                    });
                  }
                }}
              >
                <CustomTooltip title='Update'>
                  <img
                    className={`me-0dot5  ${checkIfFieldValid(index) ? '' : 'no-pointer-events'}`}
                    src={TickIcon}
                    alt='tick-icon'
                  />
                </CustomTooltip>
              </div>
            </div>
          )}{' '}
          {!isLastChild && !isFieldValueChanged && (
            // Delete icon: removes the current field row
            <div className='danger-text lh-1dot25 pointer ' onClick={() => onRemoveFormRow(fields, index)}>
              <CustomTooltip title='Delete'>
                <img className='me-0dot5' src={BinIcon} alt='delete-icon' />
              </CustomTooltip>
            </div>
          )}
        </div>
      </div>
    );
  };

  const rangesIconRender = (fields: any, index: number) => {
    return (
      <div style={{ height: '2.5rem', display: 'flex', alignItems: 'center' }}>
        <div
          className={`danger-text lh-1dot25 pointer ${fields.value[index]?.id ? 'visible' : 'invisible'}`}
          onClick={fields.value[index]?.id && (() => openUnitRangeModal(fields, index))}
        >
          <CustomTooltip title='Ranges'>
            <RangesIcon className='me-0dot5' aria-labelledby='ranges-icon' />
          </CustomTooltip>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', minWidth: '100%' }}>
        <div className='col-4'>
          <label>
            Result Name<span className='input-asterisk'>*</span>
          </label>
        </div>
        <div className='col-2' style={{ paddingLeft: 'calc(var(--bs-gutter-x) * .5)' }}>
          <label>Order</label>
        </div>
      </div>
      <FieldArray name={formName} initialValue={isEdit ? initialEditData : initialValue}>
        {({ fields }) =>
          fields.map((name, index) => {
            return (
              <span key={`form_${name}`}>
                <div className='row'>
                  <Field name={`${name}.id`} render={() => null} />{' '}
                  {/** A hidden field to store user' id if user is auto populated */}
                  <div className='col-4'>
                    <Field
                      name={`${name}.name`}
                      type='text'
                      validate={composeValidators(required)}
                      render={({ input, meta }) => (
                        <>
                          <TextInput
                            {...input}
                            isShowLabel={false}
                            errorLabel='result name'
                            error={(meta.touched && meta.error) || undefined}
                            capitalize={true}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              input.onChange(event);
                              const timerId = 0;
                              clearTimeout(timerId);
                              setTimeout(() => detectFieldChange(event.target.value, index), 500);
                            }}
                          />
                        </>
                      )}
                    />
                  </div>
                  <div className='col-2'>
                    <Field
                      name={`${name}.displayOrder`}
                      type='text'
                      parse={normalizePhone}
                      render={({ input, meta }) => (
                        <TextInput
                          {...input}
                          isShowLabel={false}
                          required={false}
                          label='Order'
                          errorLabel='order'
                          error={(meta.touched && meta.error) || undefined}
                        />
                      )}
                    />
                  </div>
                  <div className='col-1 d-flex'>
                    {rangesIconRender(fields, index)}
                    {actionsIconRenderer(fields, index)}
                  </div>
                </div>
              </span>
            );
          })
        }
      </FieldArray>
      {resultRange.open && (
        <Modal
          show={resultRange.open}
          title={`${resultRange?.selectedLabResult?.name || ''}`}
          cancelText='Cancel'
          submitText='Submit'
          size='modal-xl'
          handleCancel={closeUnitRangeModal}
          handleForceSubmit={true}
          handleFormSubmit={handleSubmitResultRanges}
          render={rangesFormRederer}
          mutators={{ ...arrayMutators }}
          submitDisabled={!rangesFormDataModified}
        />
      )}
    </>
  );
};

export default LabTestResultForm;
