import React, { useCallback, useRef } from 'react';
import styles from './Checkbox.module.scss';

export interface ICheckboxGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorLabel?: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  fieldLabel?: string;
  fields?: { [key: string]: any };
  meta?: { [key: string]: any };
}


const CheckboxGroup = ({
  errorLabel,
  options,
  required = false,
  fieldLabel,
  fields,
  meta
}: ICheckboxGroupProps): React.ReactElement => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const onKeyPress = useCallback((e: React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'Enter') {
      checkboxRef.current?.click();
    }
  }, []);

  const setValue = (event: React.BaseSyntheticEvent, value: string) => {
    if (event.target.checked) {
      fields?.push(value);
    } else {
      const index = fields?.value.indexOf(value);
      fields?.remove(index);
    }
  };
  return (
    <div>
      <div className='input-field-label'>
        {fieldLabel}
        {required && <span className='input-asterisk'>*</span>}
      </div>
      {options.map((option: { value: string; label: string }) => (
        <label key={option.value} className={`d-inline-flex align-items-center ${styles.checkboxLabel} ${styles.checkboxGroupLabel}`}>
          <div className={styles.checkboxWrapper}>
            <input
              type='checkbox'
              className={styles.checkbox}
              onClick={(event: React.BaseSyntheticEvent) => setValue(event, option.value)}
              onKeyPress={onKeyPress}
              defaultChecked={fields?.value?.includes(option.value) || false}
              onChange={(event) => (event.target.value)}
            />
          </div>
          {<span>{option.label}</span>}
        </label>
      ))}
      <div className={styles.error}>
        { (fields?.value && meta?.error) || (meta?.touched && meta.error) ? `${meta.error} ${errorLabel}` : ''}
      </div>
    </div>
  );
};

export default CheckboxGroup;

