import { FormApi } from 'final-form';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useDispatch, useSelector } from 'react-redux';

import TextInput from '../../components/formFields/TextInput';
import { required, convertToFloatNumber, composeValidators, checkIfFloatNumber } from '../../utils/validation';
import BinIcon from '../../assets/images/bin.svg';
import PlusIcon from '../../assets/images/plus_blue.svg';
import CloseIcon from '../../assets/images/close-red.svg';
import TickIcon from '../../assets/images/tick.svg';

import { ILabResultRange } from '../../store/labTest/types';
import CustomTooltip from '../../components/tooltip';
import SelectInput from '../../components/formFields/SelectInput';
import { unitsLoadingSelector, unitsSelector, unitTypeSelector } from '../../store/labTest/selectors';
import { clearUnitList, deleteLabTestRange, fetchUnitListRequest } from '../../store/labTest/actions';
import { ICheckUnitsDuplicateValidation } from './LabTestResultForm';
import ConfirmationModalPopup from '../../components/customtable/ConfirmationModalPopup';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import APPCONSTANTS from '../../constants/appConstants';
import { useParams } from 'react-router-dom';

interface ILabtestResultUnitFormProps {
  form: FormApi<any>;
  initialEditValue: Array<Partial<ILabResultRange>>;
  disableOptions?: boolean;
  isEdit?: boolean;
  checkDuplicateValidation?: (data: ICheckUnitsDuplicateValidation) => boolean;

  previousFieldValue?: ILabResultRange[];
  setPreviousFieldValue: (value: ILabResultRange | null, index: number, isRemove?: boolean) => void;
  internalFormState?: Array<{ isValueChanged: boolean; isValid: boolean }>;
  setInternalFormState: (
    value: { isValueChanged: boolean; isValid: boolean } | null,
    index: number,
    isRemove?: boolean
  ) => void;
  labResultRangesRef: any;
}
export interface IMatchParams {
  tenantId: string;
}

/**
 * Form for region admin creation
 * @param param0
 * @returns {React.ReactElement}
 */
const LabTestResultUnitForm = ({
  form,
  initialEditValue,
  disableOptions = false,
  isEdit,
  previousFieldValue,
  setPreviousFieldValue,
  internalFormState,
  setInternalFormState,
  checkDuplicateValidation,
  labResultRangesRef
}: ILabtestResultUnitFormProps): React.ReactElement => {
  const formName = 'lab_result_units';
  const dispatch = useDispatch();
  const { tenantId } = useParams<IMatchParams>();

  const units = useSelector(unitsSelector);
  const unitsLoading = useSelector(unitsLoadingSelector);
  const unitsType = useSelector(unitTypeSelector);
  const [deleteRowData, setDeleteRowData] = useState({
    isPopupOpen: false,
    deleteData: {} as { fields: any; index: number }
  });

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialEditData = useMemo<Array<Partial<ILabResultRange>>>(() => [...initialEditValue], [initialEditValue]);
  const initialValue = useMemo<Array<Partial<ILabResultRange>>>(
    () => [
      {
        displayName: '',
        unitId: { unit: '', id: '' },
        minimumValue: 0,
        maximumValue: null
      }
    ],
    []
  );

  useEffect(() => {
    if (unitsType !== 'labtest') {
      dispatch(clearUnitList());
    }
    if (!units.length) {
      setTimeout(() => {
        dispatch(fetchUnitListRequest('labtest'));
     }, 0);
    }
  }, [dispatch, unitsType, units.length]);
 // Note: Get result units by ID and use as initialEditdata
 useEffect(() => {
    setInternalFormState?.({ isValueChanged: false, isValid: false }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Detects the existing field value changes and updates the internal form state accordingly
   */
  const detectFieldChange = useCallback(
    (value: any, index: number, key?: string) => {
      if (previousFieldValue?.length && previousFieldValue?.[index] !== undefined) {
        const resultUnit = previousFieldValue[index];
        const isValueChanged: boolean = resultUnit[key as keyof typeof resultUnit] !== value;
        if (isValueChanged) {
          setInternalFormState?.({ isValueChanged, isValid: false }, index);
        } else {
          setInternalFormState?.({ isValueChanged: false, isValid: false }, index);
        }
      } else if ((!previousFieldValue?.length || previousFieldValue?.[index] === undefined) && value) {
        setInternalFormState?.({ isValueChanged: false, isValid: true }, index);
      }
    },
    [previousFieldValue, setInternalFormState]
  );

  /**
   * Reverts the changes made on the existing field values
   */
  const onResetEditChanges = useCallback(
    (fields: any, index: number) => {
      form.mutators?.resetFields?.(`${formName}[${index}]`);
      fields.update(index, { ...previousFieldValue?.[index] });
      setInternalFormState?.({ isValueChanged: false, isValid: true }, index);
    },
    [form.mutators, previousFieldValue, setInternalFormState]
  );

  /**
   * Removes the current row by index
   */
  const onRemoveFormRow = useCallback(() => {
    if (deleteRowData.deleteData) {
      const { fields, index } = deleteRowData.deleteData;
      const { id } = fields.value[index];
      if (id) {
        dispatch(
          deleteLabTestRange({
            data: { tenantId, id },
            successCb: () => {
              setPreviousFieldValue?.(null, index, true);
              setInternalFormState?.(null, index, true);
              labResultRangesRef.current.splice(index, 1);
              fields.remove(index);
            },
            failureCb: (e) => {
              toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.LABTEST_RANGE_DELETE_ERROR));
            }
          })
        );
      } else {
        setPreviousFieldValue?.(null, index, true);
        setInternalFormState?.(null, index, true);
        fields.remove(index);
      }
    }
    deletePopupCancel();
  }, [deleteRowData.deleteData, dispatch, labResultRangesRef, setInternalFormState, setPreviousFieldValue, tenantId]);

  const deleteButtonClick = useCallback((data: any) => {
    setDeleteRowData({ isPopupOpen: true, deleteData: data });
  }, []);

  const deletePopupCancel = () => {
    setDeleteRowData({ isPopupOpen: false, deleteData: {} as { fields: any; index: number } });
  };

  const ActionButtons = ({
    fields,
    index,
    plusIconClass,
    isFirstChild,
    isLastChild,
    isFieldRowValid,
    isFieldValueChanged,
    addNewRowEnabled,
    addNewRowEnabledClass
  }: any) => {
    return (
      <div className='col-1 d-flex'>
        <div
          style={{
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            ...(isFirstChild && { paddingTop: '3rem' })
          }}
        >
          {!disableOptions && (
            <div className='d-flex flex-row'>
              {/* plus icon to add a new field row and checks for duplicate validation */}
              {isLastChild && (
                <>
                  {!isFirstChild && (
                    <div className='danger-text lh-1dot25 pointer' onClick={() => deleteButtonClick({ fields, index })}>
                      <CustomTooltip title='Delete'>
                        <img className='me-0dot5' src={BinIcon} alt='delete-icon' />
                      </CustomTooltip>
                    </div>
                  )}
                  <div
                    className={addNewRowEnabledClass}
                    onClick={() => {
                      if (addNewRowEnabled && checkDuplicateValidation) {
                        checkDuplicateValidation({
                          fields,
                          index,
                          isFirstChild,
                          initialRangeValue: initialValue[0],
                          isUpdate: false
                        });
                      }
                    }}
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
                    className={`danger-text lh-1dot25  ${isFieldRowValid ? 'pointer' : 'not-allowed'}`}
                    onClick={() => {
                      if (isFieldRowValid && checkDuplicateValidation) {
                        checkDuplicateValidation({
                          fields,
                          index,
                          isFirstChild,
                          initialRangeValue: initialValue[0],
                          isUpdate: true
                        });
                      }
                    }}
                  >
                    <CustomTooltip title='Update'>
                      <img
                        className={`me-0dot5  ${isFieldRowValid ? '' : 'no-pointer-events'}`}
                        src={TickIcon}
                        alt='tick-icon'
                      />
                    </CustomTooltip>
                  </div>
                </div>
              )}{' '}
              {!isLastChild && !isFieldValueChanged && (
                // Delete icon: removes the current field row
                <div className='danger-text lh-1dot25 pointer ' onClick={() => deleteButtonClick({ fields, index })}>
                  <CustomTooltip title='Delete'>
                    <img className='me-0dot5' src={BinIcon} alt='delete-icon' />
                  </CustomTooltip>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const fieldArrayHelperFn = (fields: any, index: number) => {
    const labResultUnits = form?.getState()?.values?.lab_result_units;
    const result = labResultUnits?.[index];

    const {
      unitId,
      displayOrder,
      minimumValue: minValue,
      maximumValue: maxValue,
      displayName
    } = result;

    const isLastChild = (fields?.length || 0) === index + 1;
    const isFirstChild = !index;
    const isFieldValueChanged = internalFormState?.[index] && internalFormState[index]?.isValueChanged;
    const isFieldRowValid =
      !!unitId?.unit &&
      Number(minValue) >= 0 &&
      !!Number(maxValue) &&
      Number(minValue) < Number(maxValue) &&
      !!Number(displayOrder) &&
      !!displayName;
    const addNewRowEnabled = isFirstChild && isLastChild ? true : !isFieldValueChanged && isFieldRowValid;
    const addNewRowEnabledClass = `theme-text lh-1dot25 ${addNewRowEnabled ? 'pointer' : 'not-allowed'}`;
    const plusIconClass = `me-0dot5 ${addNewRowEnabled ? '' : 'no-pointer-events'}`;
    const errorDefault = 'Please enter a valid';
    function minCheck(min: any) {
      if (!(min !== null && min !== undefined && Number(min) >= 0 && Number(min) < Number(maxValue))) {
        return errorDefault;
      }
    }
    function maxCheck(max: any) {
      if (
        !(
          max !== null &&
          max !== undefined &&
          !isNaN(max) &&
          minValue !== null &&
          minValue !== undefined &&
          Number(max) > Number(minValue)
        )
      ) {
        return errorDefault;
      }
    }

    return {
      isLastChild,
      isFirstChild,
      minValue,
      maxValue,
      isFieldValueChanged,
      isFieldRowValid,
      addNewRowEnabled,
      addNewRowEnabledClass,
      plusIconClass,
      minCheck,
      maxCheck
    };
  };

  const minMaxOnChangeFn = ({ target: { value: e } }: any, input: any, index: number, str: string) => {
    if (!isNaN(Number(e))) {
      detectFieldChange(e, index, str);
      input.onChange(e);
      return Number(convertToFloatNumber(e));
    }
  };

  return (
    <>
      <FieldArray name={formName} initialValue={isEdit ? initialEditData || [] : initialValue}>
        {({ fields }) =>
          fields.map((name, index) => {
            const {
              isLastChild,
              isFirstChild,
              minValue,
              maxValue,
              isFieldValueChanged,
              isFieldRowValid,
              addNewRowEnabled,
              addNewRowEnabledClass,
              plusIconClass,
              minCheck,
              maxCheck
            } = fieldArrayHelperFn(fields, index);
            function unitValidate(value: any) {
              if (!value?.unit) {
                return 'Please enter a valid';
              }
            }
            const minMaxErrorFn = maxCheck(maxValue) && minCheck(minValue);

            return (
              <span key={`form_${name}`}>
                <div className='row d-flex' style={{ verticalAlign: 'middle' }}>
                  <Field name={`${name}._id`} render={() => null} />{' '}
                  <div className='col-2'>
                    <Field
                      name={`${name}.unitId`}
                      type='text'
                      validate={composeValidators(required, unitValidate)}
                      render={(props) => {
                        return (
                          <SelectInput
                            {...(props as any)}
                            label='Unit'
                            required={true}
                            isShowLabel={isFirstChild}
                            labelKey='unit'
                            valueKey='id'
                            options={units}
                            loadingOptions={unitsLoading}
                            errorLabel='unit'
                            error={props.meta.touched && props.meta.error}
                            onChange={(value) => detectFieldChange(value, index)}
                            isModel={true}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className='col-2'>
                    <Field
                      name={`${name}.minimumValue`}
                      type='text'
                      validate={composeValidators(required, minCheck, checkIfFloatNumber)}
                      render={({ input, meta }) => {
                        return (
                          <TextInput
                            {...input}
                            isShowLabel={isFirstChild}
                            required={true}
                            label='Min Value'
                            errorLabel='min value'
                            placeholder='Number'
                            error={meta.touched && meta.error && minMaxErrorFn}
                            onChange={(e) => minMaxOnChangeFn(e, input, index, 'minimumValue')}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className='col-2'>
                    <Field
                      name={`${name}.maximumValue`}
                      type='text'
                      validate={composeValidators(required, maxCheck, checkIfFloatNumber)}
                      render={({ input, meta }) => {
                        return (
                          <TextInput
                            {...input}
                            isShowLabel={isFirstChild}
                            required={true}
                            label='Max Value'
                            placeholder='Number'
                            errorLabel='max value'
                            error={meta.touched && meta.error && minMaxErrorFn}
                            onChange={(e) => minMaxOnChangeFn(e, input, index, 'maximumValue')}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className='col-3'>
                    <Field
                      name={`${name}.displayName`}
                      type='text'
                      validate={required}
                      parse={(val) => {
                        detectFieldChange(val, index, 'displayName');
                        return val;
                      }}
                      render={({ input, meta }) => (
                        <TextInput
                          {...input}
                          isShowLabel={isFirstChild}
                          label='Display Range'
                          required={true}
                          errorLabel='the display range'
                          error={(meta.touched && meta.error) || undefined}
                        />
                      )}
                    />
                  </div>
                  <div className='col-1'>
                    <Field
                      name={`${name}.displayOrder`}
                      type='text'
                      defaultValue={(index + 1).toString()}
                      validate={required}
                      parse={(val) => {
                        detectFieldChange(val, index, 'displayOrder');
                        return convertToFloatNumber(val);
                      }}
                      render={({ input, meta }) => (
                        <TextInput
                          {...input}
                          isShowLabel={isFirstChild}
                          required={true}
                          label='Order'
                          errorLabel='the order'
                          error={(meta.touched && meta.error) || undefined}
                        />
                      )}
                    />
                  </div>
                  <ActionButtons
                    fields={fields}
                    index={index}
                    plusIconClass={plusIconClass}
                    isFirstChild={isFirstChild}
                    isLastChild={isLastChild}
                    isFieldRowValid={isFieldRowValid}
                    isFieldValueChanged={isFieldValueChanged}
                    addNewRowEnabled={addNewRowEnabled}
                    addNewRowEnabledClass={addNewRowEnabledClass}
                  />
                </div>
              </span>
            );
          })
        }
      </FieldArray>
      <ConfirmationModalPopup
        isOpen={deleteRowData.isPopupOpen}
        popupTitle={APPCONSTANTS.LABT_RESULT_RANGE_DELETE_TITLE}
        cancelText='Cancel'
        submitText='Ok'
        handleCancel={deletePopupCancel}
        handleSubmit={onRemoveFormRow}
        popupSize='modal-md'
        confirmationMessage={APPCONSTANTS.LABT_RESULT_RANGE_DELETE_CONFIRMATION}
      />
    </>
  );
};

export default LabTestResultUnitForm;
