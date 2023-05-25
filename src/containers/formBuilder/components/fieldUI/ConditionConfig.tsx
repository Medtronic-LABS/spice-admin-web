import { FieldArray } from 'react-final-form-arrays';
import BinIcon from '../../../../assets/images/bin.svg';
import PlusIcon from '../../../../assets/images/plus_blue.svg';
import CustomTooltip from '../../../../components/tooltip';
import APPCONSTANTS from '../../../../constants/appConstants';
import { camel2Title, required } from '../../../../utils/validation';
import styles from '../../styles/FormBuilder.module.scss';
import SelectFieldWrapper from './SelectFieldWrapper';
import TextFieldWrapper from './TextFieldWrapper';

const visibilityOptions = [{ ...APPCONSTANTS.VALIDITY_OPTIONS.gone }, { ...APPCONSTANTS.VALIDITY_OPTIONS.visible }];

const enabledOptions = [
  { label: 'True', key: true },
  { label: 'False', key: false }
];

const SelectInputComponent = ({
  name,
  fieldName,
  item,
  obj,
  config,
  index,
  newlyAddedIds,
  unAddedFields,
  targetIds
}: any) => {
  let options: any = config?.options || [];
  let parseFn = (val: any) => val;
  let value = item[fieldName] || null;

  if (fieldName === 'enabled' || fieldName === 'visibility') {
    options = config?.options;
    parseFn = (val: any) => val?.key;
    value = options?.find(({ key }: any) => item[fieldName] === key) || null;
  }

  if (fieldName === 'eq') {
    options = config?.options?.filter((optionItem: any) => optionItem.name !== '');
    parseFn = (val) => val?.name;
    value = options?.find(({ name: optionName }: any) => item[fieldName] === optionName) || null;
  }

  if (fieldName === 'targetId') {
    // filter items which has valid field Ids
    const unAddedFieldIds = unAddedFields.map((fieldItem: any) => fieldItem?.key);
    const filteredValidIds = newlyAddedIds.filter((key: string) => unAddedFieldIds.includes(key));
    // create newly added field ids as target id
    let filteredOptions = filteredValidIds.map((id: any) => ({
      key: id,
      label: camel2Title(id)
    }));
    // ignore current obj Id
    const filteredTargetIds = targetIds.filter(({ key }: any) => obj.id !== key);
    // concat newly add fields to target Ids
    filteredOptions = filteredOptions.concat(filteredTargetIds);
    options = filteredOptions.sort((a: any, b: any) => (a.label > b.label ? 1 : -1));
    parseFn = (val: any) => val?.key;
    value = options?.find(({ key }: any) => item[fieldName] === key) || '';
  }

  return (
    <div className='col-4'>
      <SelectFieldWrapper
        name={`${name}[${index}]${config?.name}`}
        customValue={value}
        customError={config.error}
        customOptions={options}
        customParseFn={parseFn}
        inputProps={config}
      />
    </div>
  );
};

const TextInputComponent = ({ name, fieldName, item, config, index }: any) => {
  let parseFn = (parseValue: any) => parseValue;
  const value = item[fieldName] || null;
  if (config?.type === 'number') {
    parseFn = (newParseValue: any) => (Number(newParseValue) ? Number(newParseValue) : null);
  }
  return (
    <div className='col-4'>
      <TextFieldWrapper
        name={`${name}[${index}]${config.name}`}
        customValue={value}
        customError={config.error}
        customParseFn={parseFn}
        inputProps={config}
      />
    </div>
  );
};

const ConditionFieldsComponent = ({
  item,
  name,
  obj,
  index,
  conditionFieldConfigs,
  newlyAddedIds,
  unAddedFields,
  targetIds
}: any) => {
  return (
    <>
      {Object.keys(item).map((fieldName: any) => {
        if (fieldName in conditionFieldConfigs) {
          const config = conditionFieldConfigs[fieldName];
          switch (config?.component) {
            case 'SELECT_INPUT': {
              return (
                <SelectInputComponent
                  name={name}
                  key={fieldName}
                  fieldName={fieldName}
                  item={item}
                  obj={obj}
                  config={config}
                  index={index}
                  newlyAddedIds={newlyAddedIds}
                  unAddedFields={unAddedFields}
                  targetIds={targetIds}
                />
              );
            }
            case 'TEXT_INPUT':
            default: {
              return (
                <TextInputComponent
                  name={name}
                  key={fieldName}
                  fieldName={fieldName}
                  item={item}
                  config={config}
                  index={index}
                />
              );
            }
          }
        } else {
          return <></>;
        }
      })}
    </>
  );
};

const ConditionConfig = ({ name, obj, field, form, targetIds, unAddedFields, newlyAddedIds }: any) => {
  const conditionFieldConfigs: any = {
    lengthGreaterThan: {
      name: '.lengthGreaterThan',
      type: 'number',
      label: 'Length Greater Than',
      error: 'Please enter a valid number',
      required: true,
      disabledValidation: true,
      component: 'TEXT_INPUT'
    },
    targetId: {
      name: '.targetId',
      label: 'Target Id',
      labelKey: 'label',
      valueKey: 'key',
      options: enabledOptions,
      error: 'Please select the target id',
      required: true,
      disabledValidation: true,
      component: 'SELECT_INPUT'
    },
    enabled: {
      name: '.enabled',
      label: 'Enabled',
      labelKey: 'label',
      valueKey: 'key',
      options: enabledOptions,
      error: 'Please select the enabled option',
      required: true,
      disabledValidation: true,
      component: 'SELECT_INPUT'
    },
    eq: {
      name: '.eq',
      label: 'Equal To',
      labelKey: 'name',
      valueKey: 'id',
      options: obj.optionsList,
      error: 'Please select the equal to value',
      required: true,
      disabledValidation: true,
      component: 'SELECT_INPUT'
    },
    visibility: {
      name: '.visibility',
      label: 'Visibility',
      options: visibilityOptions,
      error: 'Please select the visibility',
      required: true,
      disabledValidation: true,
      component: 'SELECT_INPUT'
    }
  };

  const editTextConditionInitialValue = {
    lengthGreaterThan: '',
    targetId: '',
    enabled: ''
  };

  const otherConditionInitialValue = {
    eq: '',
    targetId: '',
    visibility: ''
  };

  const initialValue = obj.viewType === 'EditText' ? editTextConditionInitialValue : otherConditionInitialValue;

  const onAddNewCondition = () => {
    form.mutators.setValue(`${name}`, [initialValue]);
  };

  return (
    <div className='col-4 col-12'>
      <div className='d-flex align-items-center '>
        <div
          className={`d-flex mt-1 mb-0dot5 theme-text lh-1dot25 ${obj.fieldName ? 'pointer' : 'not-allowed'}`}
          onClick={!!obj.fieldName && !obj[field].length ? onAddNewCondition : () => null}
        >
          <CustomTooltip title={`${obj.fieldName ? 'Add' : 'Please select a field name'}`}>
            <span className={`${styles.label} m-0 `}>Conditions</span>
            <img
              className={`ms-0dot5 ${obj.fieldName ? '' : 'no-pointer-events'} ${
                !obj[field].length ? 'visible' : 'invisible'
              }`}
              src={PlusIcon}
              alt='plus-icon'
            />
          </CustomTooltip>
        </div>
      </div>
      {obj[field].length ? (
        <div className={`${styles.conditionsContainer}`}>
          <FieldArray
            name={name}
            validate={(values) => {
              // custom validation to check all fields are valid
              const conditions: any = [];
              (values || []).forEach((item: any) => {
                const errors: any = {};
                Object.keys(item).forEach((key: any) => {
                  const error = required(item[key]);
                  if (error) {
                    errors[key] = error;
                  }
                });
                conditions.push(Object.keys(errors).length ? errors : null);
              });
              if (conditions.every((element: any) => element === null)) {
                return;
              }
              return conditions;
            }}
          >
            {({ fields, meta }) =>
              obj[field].map((item: any, index: any) => {
                if (!!item.targetId && !!item.targetOption) {
                  return null;
                } else {
                  return (
                    <div key={index}>
                      <div className='position-relative w-100 d-flex px-1' key={`${obj.family}_${obj.id}_${name}`}>
                        <div className='row d-flex w-100 gx-1dot25 pe-lg-1'>
                          <ConditionFieldsComponent
                            item={item}
                            name={name}
                            obj={obj}
                            index={index}
                            conditionFieldConfigs={conditionFieldConfigs}
                            newlyAddedIds={newlyAddedIds}
                            unAddedFields={unAddedFields}
                            targetIds={targetIds}
                          />
                        </div>
                        <div className={`d-flex align-items-center ${styles.actionIcons}`}>
                          <div
                            className='danger-text lh-1dot25 pointer m-0dot5'
                            onClick={() => {
                              fields.remove(index);
                            }}
                          >
                            <CustomTooltip title='Delete'>
                              <img className='me-0dot5' src={BinIcon} alt='delete-icon' />
                            </CustomTooltip>
                          </div>
                          {obj[field].length - 1 === index && !meta.error && (
                            <div
                              className={`theme-text lh-1dot25 m-0dot5`}
                              onClick={() => {
                                fields.push(initialValue);
                              }}
                            >
                              <CustomTooltip title='Add'>
                                <img className={`me-0dot5`} src={PlusIcon} alt='plus-icon' />
                              </CustomTooltip>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            }
          </FieldArray>
        </div>
      ) : null}
    </div>
  );
};

export default ConditionConfig;
