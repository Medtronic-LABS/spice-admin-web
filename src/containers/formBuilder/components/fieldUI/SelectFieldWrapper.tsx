import { Field } from 'react-final-form';
import SelectInput, { ISelectFormOptions } from '../../../../components/formFields/SelectInput';
import { composeValidators, formValidators } from '../../../../utils/validation';

const SelectFieldWrapper = ({
  obj,
  name,
  inputProps,
  customOptions,
  customParseFn,
  customFormatFn,
  customValue,
  customError
}: any) => {
  const options: any = customOptions || inputProps?.options || [];
  const parseFn = customParseFn ? customParseFn : (val: any) => val;
  const value = customValue ? customValue : null;
  const formatFn = customFormatFn ? customFormatFn : (val: any) => val;
  let object = { ...obj };
  return (
    <Field
      name={name || 'select'}
      type='select'
      parse={parseFn}
      formatOnBlur={true}
      format={formatFn}
      validate={inputProps?.disabledValidation ? () => null : composeValidators(...formValidators(inputProps))}
      render={({ input, meta }) => (
        <SelectInput
          {...(input as any)}
          label={inputProps?.label || ''}
          labelKey={inputProps?.labelKey || 'label'}
          valueKey={inputProps?.valueKey || 'key'}
          disabled={inputProps?.disabled}
          required={inputProps?.required || false}
          options={options}
          error={
            (meta.error && customError && customError.toString()) ||
            (meta.error && inputProps.error && inputProps.error + ' ' + inputProps?.label.toLowerCase()) ||
            (meta.error && meta.error + ' ' + inputProps?.label.toLowerCase())
          }
          input={{
            value,
            onChange: (nxtvalue: ISelectFormOptions) => {
              object = nxtvalue || {};
              obj = object;
            }
          }}
        />
      )}
    />
  );
};

export default SelectFieldWrapper;
