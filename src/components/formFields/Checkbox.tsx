import React, { useCallback, useRef } from 'react';
import styles from './Checkbox.module.scss';

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  switchCheckbox?: boolean;
  readOnly?: boolean;
}

const Checkbox = ({ label, readOnly, switchCheckbox, ...inputProps }: ICheckboxProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const onKeyPress = useCallback((e: React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'Enter') {
      checkboxRef.current?.click();
    }
  }, []);

  return (
    <label
      className={`d-inline-flex align-items-center ${styles.checkboxLabel} ${
        switchCheckbox && 'pt-1dot75 pb-1dot5 h-100'
      } ${switchCheckbox && styles.clSwitch} ${readOnly ? styles.disabled : ''}`}
    >
      <div className={`${switchCheckbox && 'd-inline-flex align-items-center'}`}>
        {switchCheckbox && <span className={styles.checkboxLabelText}>{label}</span>}
        <div className={switchCheckbox ? '' : styles.checkboxWrapper}>
          <input
            type='checkbox'
            name={inputProps.name || label}
            {...inputProps}
            className={switchCheckbox ? '' : styles.checkbox}
            ref={checkboxRef}
            onKeyPress={onKeyPress}
          />
          {switchCheckbox && <span className={styles.switcher} />}
        </div>
        {!switchCheckbox && <span>{label}</span>}
      </div>
    </label>
  );
};

export default Checkbox;
