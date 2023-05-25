import { useRef } from 'react';
import { Field } from 'react-final-form';
import { useParams } from 'react-router-dom';
import Checkbox from '../../../components/formFields/Checkbox';
import { camel2Title, containsOnlyLettersAndNumbers } from '../../../utils/validation';
import { InputTypes } from '../config/BaseFieldConfig';
import { inputTypesSwitch, isEditableFields, unitMeasurementFields } from '../utils/FieldUtils';
import ConditionConfig from './fieldUI/ConditionConfig';
import OptionList from './fieldUI/OptionList';
import Questionnaire from './fieldUI/Questionnaire';
import SelectFieldWrapper from './fieldUI/SelectFieldWrapper';
import TextFieldWrapper from './fieldUI/TextFieldWrapper';
import TextInputArray from './fieldUI/TextInputArray';

interface IMatchParams {
  form: string;
}

const filterByGetMetaViewTypes: { [K: string]: string[] } = {
  RadioGroup: ['checkbox', 'radio']
};

const getComponentsByFieldName = (fieldName: string, obj: any, isNew?: boolean, isAccountCustomization?: boolean) => {
  let inputProps = {};
  if (fieldName === 'fieldName') {
    inputProps = { ...inputProps, ...{ component: !isNew || isAccountCustomization ? 'TEXT_FIELD' : 'SELECT_INPUT' } };
  }
  // change to questionaire component on mental health view
  if (fieldName === 'optionsList' && obj.viewType === 'MentalHealthView') {
    inputProps = { ...inputProps, ...{ component: 'QUESTIONNAIRE' } };
  }
  // disabled fields based on run time conditions
  if (!isNew && (fieldName === 'fieldName' || fieldName === 'inputType')) {
    inputProps = { ...inputProps, ...{ disabled: true } };
  }
  if (
    obj?.isNeededDefault &&
    (fieldName === 'isMandatory' || fieldName === 'visibility' || fieldName === 'isEnabled')
  ) {
    inputProps = { ...inputProps, ...{ disabled: true } };
  }
  return inputProps;
};

interface IComponentProps {
  form?: any;
  name: string;
  fieldName: string;
  inputProps: any;
  obj?: any;
  targetIds?: any[];
  newlyAddedIds?: any[];
  unAddedFields?: any[];
  handleUpdateFieldName?: (
    familyName: string,
    currentFieldID: string,
    newFieldName: string,
    newFieldLabel: string,
    currentTitle: string,
    onlyCallBack: boolean,
    callBack?: (formValues: any) => void
  ) => void;
  hashFieldIdsWithTitle?: any;
  hashFieldIdsWithFieldName?: any;
  isAccountCustomization?: boolean;
}

export const CheckboxComponent = ({ name, fieldName, inputProps = {} }: IComponentProps) => {
  return (
    <div className={`col-sm-4 ${fieldName === 'disableFutureDate' ? 'col-4' : 'col-lg-2'}`}>
      <div className='h-100 d-flex align-item-center py-1'>
        <Field
          name={`${name}.${fieldName}`}
          type='checkbox'
          render={({ input }) => (
            <Checkbox
              disabled={inputProps?.disabled}
              readOnly={inputProps?.disabled}
              switchCheckbox={false}
              label={inputProps?.label}
              {...input}
            />
          )}
        />
      </div>
    </div>
  );
};

export const SelectInputValues = ({
  name,
  fieldName,
  inputProps,
  obj,
  newlyAddedIds,
  unAddedFields,
  handleUpdateFieldName
}: IComponentProps) => {
  let options: any = inputProps?.options || [];
  let parseFn = (val: any) => val;
  let value = obj[fieldName] || null;

  // parse as number
  if (fieldName === 'orientation') {
    options = inputProps?.options;
    parseFn = (val: any) => Number(val?.key);
    value = options?.find(({ key }: any) => obj[fieldName] === Number(key)) || null;
  }
  // parse as string
  if (
    fieldName === 'visibility' ||
    fieldName === 'family' ||
    fieldName === 'totalCount' ||
    fieldName === 'mandatoryCount'
  ) {
    options = inputProps?.options;
    parseFn = (val: any) => val?.key;
    value = options?.find(({ key }: any) => obj[fieldName] === key) || null;
  }
  // parse with custom key
  if (fieldName === 'defaultValue') {
    options = obj.optionsList;
    parseFn = (val: any) => val?.id;
    value = options?.find(({ id }: any) => obj[fieldName] === id) || null;
  }
  // parse with custom logic
  if (fieldName === 'inputType') {
    options = inputProps?.options;
    parseFn = (val: any) => {
      inputTypesSwitch(Number(val?.key), obj);
      return Number(val?.key);
    };
    value = options?.find(({ key }: any) => obj[fieldName] === Number(key)) || {
      key: -1,
      label: 'Text'
    };
  }
  if (fieldName === 'unitMeasurement') {
    options = inputProps?.options;
    parseFn = (val: any) => {
      inputTypesSwitch(obj.inputType, obj);
      return val?.key;
    };
    value = options?.find(({ key }: any) => obj[fieldName] === key) || inputProps?.options[0];
  }
  // parse with custom options list
  if (fieldName === 'fieldName') {
    const { customOptions, customParseFn, customValue } = customOptionsList(
      fieldName,
      obj,
      newlyAddedIds,
      unAddedFields,
      handleUpdateFieldName
    );
    options = customOptions;
    parseFn = customParseFn;
    value = customValue;
  }
  return (
    <div className='col-4'>
      <SelectFieldWrapper
        name={name}
        customValue={value}
        customOptions={options}
        customParseFn={parseFn}
        inputProps={inputProps}
      />
    </div>
  );
};

const customOptionsList = (
  fieldName: string,
  obj: any,
  newlyAddedIds?: any[],
  unAddedFields?: any[],
  handleUpdateFieldName?: any
) => {
  // Ignore current field id
  const newlyAddedFieldIds: any = (newlyAddedIds || []).filter((fieldId: string) => fieldId !== obj.id);
  // filter newly added fields from allowed fields
  const filteredOptions = (unAddedFields || []).filter((item: any) => !newlyAddedFieldIds.includes(item.key));
  // filter allowed fields based on getMeta types
  const customOptions = filteredOptions.filter(({ type }: { type: any }) =>
    Object.keys(filterByGetMetaViewTypes).includes(obj?.viewType)
      ? filterByGetMetaViewTypes[obj?.viewType].includes(type)
      : !([].concat(...(Object.values(filterByGetMetaViewTypes) as any[])) as any[]).includes(type)
  );
  const customParseFn = (val: any) => {
    if (val?.label && val?.label !== obj[fieldName] && handleUpdateFieldName) {
      handleUpdateFieldName(obj.family, obj.id, val.key, val.label);
    }
    return val?.label;
  };
  const customValue = customOptions?.find(({ label }: any) => obj[fieldName] === label);
  return { customOptions, customParseFn, customValue };
};

export const TextFieldComponent = ({
  form,
  name,
  fieldName,
  obj,
  inputProps,
  targetIds,
  newlyAddedIds,
  handleUpdateFieldName,
  hashFieldIdsWithTitle,
  hashFieldIdsWithFieldName,
  isAccountCustomization
}: IComponentProps) => {
  let parseFn = (value: any) => value;
  let capitalize = false;
  let customOnBlurFn = (value: any) => value;
  const filterDuplicates = () => {
    const otherFieldNames: any = [];
    Object.entries(hashFieldIdsWithFieldName).forEach(([key, value]) => {
      if (key !== obj.id) {
        otherFieldNames.push(value);
      }
    });
    return otherFieldNames;
  };
  const filterTitleDuplicates = () => {
    const otherTitles: any = [];
    Object.entries(hashFieldIdsWithTitle).forEach(([key, value]) => {
      if (key !== obj.id) {
        otherTitles.push(value);
      }
    });
    return otherTitles;
  };

  const fileNameFunction = (propsValue: any, otherFieldNames: any) => {
    if (propsValue?.includes('.')) {
      errorRef.current = 'Cannot have "." in ';
      return errorRef.current;
    }
    if (!!containsOnlyLettersAndNumbers(propsValue)) {
      errorRef.current = 'Cannot have any special characters in ';
      return errorRef.current;
    }
    if (propsValue.length > 32) {
      errorRef.current = 'Maximum allowed characters is 32';
      return errorRef.current;
    }
    if (otherFieldNames.includes(propsValue)) {
      errorRef.current = 'Cannot enter duplicate ';
      return errorRef.current;
    }
  }

  const otherFieldNamesfunction = (otherFieldNames: any, fieldNameValue: any, newFieldName: any, newFieldLabel: any) => {
    if (otherFieldNames.includes(fieldNameValue) || !fieldNameValue) {
      newFieldName = new Date().getTime().toString() + 'FieldID';
      form.mutators.setValue(`${name}.${fieldName}`, '');
      newFieldLabel = '';
    }
  }
  
  const errorRef = useRef('');
  if (fieldName === 'fieldName' || fieldName === 'title') {
    if (isAccountCustomization) {
      inputProps.customValidator = (propsValue: any) => {
        const otherFieldNames = filterDuplicates();
        const otherTitleNames = filterTitleDuplicates();
        errorRef.current = '';
        if (fieldName === 'fieldName') {
          fileNameFunction(propsValue, otherFieldNames)
        }
        if (!isNaN(propsValue)) {
          errorRef.current = 'Invalid ';
          return errorRef.current;
        }
        if (otherTitleNames.includes(propsValue) && fieldName === 'title') {
          errorRef.current = 'Cannot enter duplicate ';
          return errorRef.current;
        }

        return errorRef.current;
      };
      if (fieldName === 'fieldName' || fieldName === 'title') {
        customOnBlurFn = ({ target: { value: fieldNameValue } }: any) => {
          if (!!errorRef.current) {
            fieldNameValue = '';
          }
          const otherFieldNames = fieldName === 'fieldName' ? filterDuplicates() : filterTitleDuplicates();
          let newFieldName = fieldNameValue;
          let newFieldLabel = fieldNameValue;
          otherFieldNamesfunction(otherFieldNames, fieldNameValue, newFieldName, newFieldLabel)
          if ((fieldNameValue !== obj?.id || fieldName === 'title') && handleUpdateFieldName && targetIds) {
            handleUpdateFieldName(
              obj.family,
              obj.id,
              newFieldName,
              newFieldLabel,
              obj.title,
              fieldName === 'title',
              (formValues) => {
                const formData = { ...formValues[obj.family] };
                Object.values(formData)
                  .filter((v) => v)
                  .forEach((values: any, index) => {
                    targetIds[index] = { key: values.fieldName, label: camel2Title(values.fieldName) };
                  });
              }
            );
          }
        };
      }
    }
    capitalize = true;
  }

  if (fieldName === 'interval' && inputProps?.type === 'interval') {
    inputProps.customValidator = (propsValue: any) => {
      const intervalCount = (Number(obj.endValue) - Number(obj.startValue)) / 15;
      const showIntervalError =
        intervalCount <= 0 ||
        Number(propsValue) <= intervalCount ||
        Number(propsValue) >= obj.endValue ||
        Number(propsValue) <= 0;
      return showIntervalError
        ? `The interval value should be between ${intervalCount.toString().split('.')[0]} and ${obj.endValue}`
        : '';
    };
    parseFn = (value: any) => (value % 1 === 0 ? value : null);
  }

  if (inputProps?.type === 'sliderValue') {
    parseFn = (value: any) => {
      obj.interval = null;
      return value % 1 === 0 ? value : null;
    };
  }
  if (fieldName === 'fieldName') {
    capitalize = true;
  }
  if (inputProps?.type === 'number' && obj.inputType !== InputTypes.DECIMAL) {
    parseFn = (value: any) => (value !== '' ? parseInt(value, 10) : value);
  }
  return (
    <div className='col-4'>
      <TextFieldWrapper
        name={`${name}.${fieldName}`}
        customValue={obj.fieldName}
        customParseFn={parseFn}
        inputProps={inputProps}
        customOnBlurFn={customOnBlurFn}
        obj={obj}
        fieldName={fieldName}
        capitalize={capitalize}
      />
    </div>
  );
};

const RenderFields = ({
  obj,
  name,
  fieldName,
  inputProps,
  form,
  unAddedFields,
  targetIds,
  isNew,
  newlyAddedIds,
  handleUpdateFieldName,
  isAccountCustomization,
  hashFieldIdsWithTitle,
  hashFieldIdsWithFieldName
}: any) => {
  // Toggle text field component to select component on disable mode
  const { form: formType } = useParams<IMatchParams>();

  inputProps = {
    ...inputProps,
    ...getComponentsByFieldName(fieldName, obj, isNew, isAccountCustomization)
  };

  if (fieldName === 'isEditable' && (!isEditableFields.includes(obj.id) || formType !== 'enrollment')) {
    return null;
  }
  if (fieldName === 'unitMeasurement' && !unitMeasurementFields.includes(obj.id)) {
    return null;
  }

  switch (inputProps?.component) {
    case 'CHECKBOX': {
      return <CheckboxComponent name={name} fieldName={fieldName} inputProps={inputProps} />;
    }
    case 'SELECT_INPUT': {
      return (
        <SelectInputValues
          name={`${name}.${fieldName}`}
          fieldName={fieldName}
          inputProps={inputProps}
          obj={obj}
          newlyAddedIds={newlyAddedIds}
          unAddedFields={unAddedFields}
          handleUpdateFieldName={handleUpdateFieldName}
        />
      );
    }

    // Custom Field UI
    case 'INSTRUCTIONS': {
      const fieldVal = obj[fieldName]?.length ? obj[fieldName] : [''];
      return (
        <div className='col-12'>
          <Field name={`${name}.${fieldName}`}>
            {(_props) => (
              <>
                <TextInputArray
                  label={inputProps?.label || ''}
                  defaultValue={fieldVal as unknown as string[]}
                  required={false}
                  onChange={(value: string[]) => {
                    form.mutators.setValue(`${name}.${fieldName}`, value);
                  }}
                />
              </>
            )}
          </Field>
        </div>
      );
    }
    case 'OPTION_LIST': {
      return (
        <div className='col-4'>
          <OptionList field={fieldName} name={`${name}.${fieldName}`} obj={obj} form={form} inputProps={inputProps} />
        </div>
      );
    }
    case 'QUESTIONNAIRE': {
      return (
        <Questionnaire
          label={'Questionnaire'}
          defaultValue={obj[fieldName]}
          required={false}
          onChange={(value: any) => {
            fieldName[fieldName] = value;
          }}
        />
      );
    }
    case 'CONDITION_CONFIG': {
      return (
        <ConditionConfig
          field={fieldName}
          name={`${name}.${fieldName}`}
          obj={obj}
          form={form}
          targetIds={targetIds}
          unAddedFields={unAddedFields}
          newlyAddedIds={newlyAddedIds}
        />
      );
    }
    case 'TEXT_FIELD':
    default: {
      return (
        <TextFieldComponent
          form={form}
          name={name}
          fieldName={fieldName}
          obj={obj}
          inputProps={inputProps}
          targetIds={targetIds}
          newlyAddedIds={newlyAddedIds}
          handleUpdateFieldName={handleUpdateFieldName}
          hashFieldIdsWithTitle={hashFieldIdsWithTitle}
          hashFieldIdsWithFieldName={hashFieldIdsWithFieldName}
          isAccountCustomization={isAccountCustomization}
        />
      );
    }
  }
};

export default RenderFields;
