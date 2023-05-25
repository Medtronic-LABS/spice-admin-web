import { FormApi } from 'final-form';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import { IMedicationFormValues } from './AddMedication';
import TextInput from '../../components/formFields/TextInput';
import { composeValidators, required, validateEntityName } from '../../utils/validation';
import PlusIcon from '../../assets/images/plus_blue.svg';
import BinIcon from '../../assets/images/bin.svg';
import CloseIcon from '../../assets/images/close-red.svg';
import TickIcon from '../../assets/images/tick.svg';
import SelectInput from '../../components/formFields/SelectInput';

import styles from './AddMedication.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchClassifications,
  fetchDosageForms,
  fetchMedicationBrands,
  removeMedicationBrands
} from '../../store/medication/actions';
import {
  getBrandsLoadingSelector,
  getClassificationsLoadingSelector,
  getDosageFormsLoadingSelector,
  getMedicationClassificationsSelector,
  getMedicationDosageFormsSelector,
  getMedicationLoadingSelector
} from '../../store/medication/selectors';
import { IList } from '../../store/medication/types';
import { useParams } from 'react-router';
import CustomTooltip from '../../components/tooltip';
import Loader from '../../components/loader/Loader';

export interface IMedicationDataFormValues {
  name: string;
  brand: { brand: IList };
  classification: { classification: IList };
  dosage_form: IList;
  country: string | IList;
}

export interface ICheckDuplicateValidation {
  fields: any;
  index: number;
  isFirstChild: boolean;
  initialValue?: Partial<IMedicationDataFormValues>;
  isUpdate?: boolean;
  isSubmitted?: boolean;
  submitCb?: () => void;
}

interface IMedicationFormProps {
  form: FormApi<IMedicationFormValues>;
  initialEditValue?: any;
  disableOptions?: boolean;
  checkDuplicateValidation?: (data: ICheckDuplicateValidation) => void;
  previousFieldValue?: IMedicationDataFormValues[];
  internalFormState?: Array<{ isValueChanged: boolean; isValid: boolean }>;
  setPreviousFieldValue?: (value: IMedicationDataFormValues | null, index: number, isRemove?: boolean) => void;
  setInternalFormState?: (
    value: { isValueChanged: boolean; isValid: boolean } | null,
    index: number,
    isRemove?: boolean
  ) => void;
}

/**
 * Form for medication creation
 * @param param0
 * @returns {React.ReactElement}
 */
const MedicationForm = ({
  form,
  initialEditValue,
  disableOptions,
  checkDuplicateValidation,
  previousFieldValue,
  internalFormState,
  setPreviousFieldValue,
  setInternalFormState
}: IMedicationFormProps): React.ReactElement => {
  const formName = 'medication';
  const { regionId: countryId }: { regionId: string } = useParams();
  const [brandOptions, setBrandOptions] = useState([] as IList[][]);

  const dispatch = useDispatch();
  const classificationOptions = useSelector(getMedicationClassificationsSelector);
  const dosageFormOptions = useSelector(getMedicationDosageFormsSelector);
  const isLoading = useSelector(getMedicationLoadingSelector);
  const isClassificationsLoading = useSelector(getClassificationsLoadingSelector);
  const isBrandsLoading = useSelector(getBrandsLoadingSelector);
  const isDosageFormsLoading = useSelector(getDosageFormsLoadingSelector);

  const initialValue = useMemo<Array<Partial<IMedicationDataFormValues>>>(
    () => [
      {
        name: '',
        country: countryId
      }
    ],
    [countryId]
  );

  /**
   * initial value for Medication edit
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialEditData = useMemo<Array<Partial<IMedicationDataFormValues>>>(() => [{ ...initialEditValue }], []);

  const resetBrandField = useCallback(
    (fields, index: number) => {
      form.mutators?.resetFields?.(`${formName}[${index}].brand`);
      fields.update(index, { ...form.getState().values.medication[index], brand: undefined });
    },
    [form]
  );

  useEffect(() => {
    dispatch(fetchClassifications({ countryId }));
    if (!dosageFormOptions.length) {
      dispatch(fetchDosageForms());
    }
    const classificationId = initialEditData[0]?.classification?.classification?.id;
    if (classificationId && disableOptions) {
      dispatch(
        fetchMedicationBrands({ countryId, classificationId, successCb: (brands) => setBrandOptionsToState(brands) })
      );
    }

    /**
     * to remove the existing brand options when the component unmounts.
     */
    return () => {
      setBrandOptions([]);
      dispatch(removeMedicationBrands());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, countryId]);

  const setBrandOptionsToState = useCallback(
    (brands: IList[], index = 0) => {
      const brandValues = [...brandOptions];
      brandValues[index] = brands;
      setBrandOptions(brandValues);
    },
    [brandOptions]
  );

  const loadBrands = useCallback(
    (value: any, fields: any, index: number, isReset = false) => {
      if (fields.value[index].brand && !isReset) {
        resetBrandField(fields, index);
      }
      dispatch(
        fetchMedicationBrands({
          countryId,
          classificationId: value.classification.id,
          successCb: (brands) => setBrandOptionsToState(brands, index)
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countryId, dispatch, setBrandOptionsToState]
  );

  /**
   * Detects the existing field value changes and updates the internal form state accordingly
   */
  const detectFieldChange = useCallback(
    (value: any, index: number) => {
      if (previousFieldValue?.[index] !== undefined) {
        const isValueChanged = !Object.values(previousFieldValue[index]).includes(value);
        setInternalFormState?.({ isValueChanged, isValid: !isValueChanged }, index);
      } else {
        setInternalFormState?.({ isValueChanged: false, isValid: false }, index);
      }
    },
    [previousFieldValue, setInternalFormState]
  );

  // checks if current row has any form validation errors
  const checkIfFieldValid = (index: number) => form.getState().errors?.medication?.[index] === undefined;

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
      fields.update(index, { ...previousFieldValue?.[index] });
      loadBrands(previousFieldValue?.[index]?.classification, fields, index, true);
      setInternalFormState?.({ isValueChanged: false, isValid: true }, index);
    },
    [form.mutators, loadBrands, previousFieldValue, setInternalFormState]
  );

  const handleAddAnotherMedication = (addNewRowEnabled: boolean, fields: any, index: number, isFirstChild: boolean) => {
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
  const renderActionIcons = (fields: any, index: number, isFirstChild: boolean, isLastChild: boolean) => {
    const isFieldValueChanged = internalFormState?.[index] && internalFormState[index]?.isValueChanged;
    const addNewRowEnabled = form.getState().valid && !isFieldValueChanged;
    return (
      !disableOptions && (
        <div className='d-flex justify-content-center flex-row flex-lg-column'>
          {/* plus icon to add a new field row and checks for duplicate validation */}
          {isLastChild && (
            <div className={`${styles.actionIcons} ${isFirstChild ? styles.actionIconTop : ''}`}>
              <div
                className={`theme-text lh-1dot25 pb-lg-1 ${addNewRowEnabled ? 'pointer' : 'not-allowed'}`}
                onClick={() => handleAddAnotherMedication(addNewRowEnabled, fields, index, isFirstChild)}
              >
                <CustomTooltip title='Add'>
                  <img
                    className={`me-0dot5 ${addNewRowEnabled ? '' : 'no-pointer-events'}`}
                    src={PlusIcon}
                    alt='plus-icon'
                  />
                </CustomTooltip>
              </div>
              {!isFirstChild && (
                <div className={`danger-text lh-1dot25 pointer pb-lg-1`} onClick={() => onRemoveFormRow(fields, index)}>
                  <CustomTooltip title='Delete'>
                    <img className='me-0dot5' src={BinIcon} alt='delete-icon' />
                  </CustomTooltip>
                </div>
              )}
            </div>
          )}{' '}
          {!isLastChild && isFieldValueChanged && (
            // shows update and reset action icons if existing field value changes
            <div className={`${styles.updateIcons}`}>
              {/* Reset icon: resets the existing field value changes */}
              <div className='danger-text lh-1dot25 pb-lg-1 pointer' onClick={() => onResetEditChanges(fields, index)}>
                <CustomTooltip title='Reset'>
                  <img className='me-0dot5 no-pointer-events' src={CloseIcon} alt='close-icon' />
                </CustomTooltip>
              </div>
              {/* Update icon: updates the existing field value changes */}
              <div
                className={`danger-text lh-1dot25 pb-lg-1 ${checkIfFieldValid(index) ? 'pointer' : 'not-allowed'}`}
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
            <div
              className={`danger-text lh-1dot25 pointer pb-lg-1 ${styles.actionIcons} ${styles.actionIconTop}`}
              onClick={() => onRemoveFormRow(fields, index)}
            >
              <CustomTooltip title='Delete'>
                <img className='me-0dot5' src={BinIcon} alt='delete-icon' />
              </CustomTooltip>
            </div>
          )}
        </div>
      )
    );
  };

  const renderMedicationName = (name: any, index: number) => {
    return (
      <div className={`${disableOptions ? 'col-6' : 'col-6 col-lg-3'}`}>
        <Field
          name={`${name}.name`}
          type='text'
          validate={composeValidators(required, validateEntityName)}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Medication Name'
              errorLabel='medication name'
              disabled={disableOptions}
              error={(meta.touched && meta.error) || undefined}
              capitalize={true}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                input.onChange(event);
                const timerId = 0;
                clearTimeout(timerId);
                setTimeout(() => detectFieldChange(event.target.value, index), 500);
              }}
            />
          )}
        />
      </div>
    );
  };

  const renderClassification = (name: any, fields: any, index: number) => {
    return (
      <div className={`${disableOptions ? 'col-6' : 'col-6 col-lg-3'}`}>
        <Field
          name={`${name}.classification`}
          type='text'
          validate={required}
          render={(props) => (
            <SelectInput
              {...(props as any)}
              label='Classification'
              errorLabel='classification'
              labelKey={['classification', 'name']}
              valueKey={['classification', 'id']}
              nestedObject={true}
              options={classificationOptions}
              loadingOptions={isClassificationsLoading}
              error={(props.meta.touched && props.meta.error) || undefined}
              onChange={(value) => {
                detectFieldChange(value, index);
                loadBrands(value, fields, index);
              }}
              isModel={initialEditValue ? true : false}
            />
          )}
        />
      </div>
    );
  };

  const renderBrand = (name: any, index: number) => {
    return (
      <div className={`${disableOptions ? 'col-6' : 'col-6 col-lg-3'}`}>
        <Field
          name={`${name}.brand`}
          type='text'
          validate={required}
          render={(props) => (
            <SelectInput
              {...(props as any)}
              label='Brand'
              errorLabel='brand'
              labelKey={['brand', 'name']}
              valueKey={['brand', 'id']}
              nestedObject={true}
              options={brandOptions[index]}
              loadingOptions={isBrandsLoading && internalFormState?.[index]?.isValueChanged}
              error={(props.meta.touched && props.meta.error) || undefined}
              onChange={(value) => detectFieldChange(value, index)}
              isModel={initialEditValue ? true : false}
            />
          )}
        />
      </div>
    );
  };

  const renderDosageForm = (name: any, index: number) => {
    return (
      <div className={`${disableOptions ? 'col-6' : 'col-6 col-lg-3'}`}>
        <Field
          name={`${name}.dosage_form`}
          type='text'
          validate={required}
          render={(props) => (
            <SelectInput
              {...(props as any)}
              label='Dosage Form'
              errorLabel='dosage form'
              labelKey='name'
              valueKey='id'
              options={dosageFormOptions}
              loadingOptions={isDosageFormsLoading}
              error={(props.meta.touched && props.meta.error) || undefined}
              onChange={(value) => detectFieldChange(value, index)}
              isModel={initialEditValue ? true : false}
            />
          )}
        />
      </div>
    );
  };

  return (
    <>
      {isLoading && !initialEditValue && <Loader />}
      <FieldArray name={formName} initialValue={initialEditValue ? initialEditData : initialValue}>
        {({ fields }) =>
          fields.map((name, index) => {
            const isLastChild = (fields?.length || 0) === index + 1;
            const isFirstChild = !index;

            return (
              <span key={`form_${name}`}>
                <div className={`position-relative w-100  ${isLastChild ? '' : styles.borderBottom}`}>
                  <div
                    className={`row gx-1dot25 ${disableOptions ? 'pe-0 pb-0' : 'pe-lg-3 pb-3 pb-lg-0'} ${
                      isFirstChild ? '' : 'mt-1dot5'
                    }`}
                  >
                    {renderMedicationName(name, index)}
                    {renderClassification(name, fields, index)}
                    {renderBrand(name, index)}
                    {renderDosageForm(name, index)}
                  </div>
                  {renderActionIcons(fields, index, isFirstChild, isLastChild)}
                </div>
                {isLastChild ? null : <div className='divider mx-neg-1dot25' />}
              </span>
            );
          })
        }
      </FieldArray>
    </>
  );
};

export default MedicationForm;
