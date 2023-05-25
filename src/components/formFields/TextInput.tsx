import React from 'react';
import { convertToCaptilize, convertToLowerCase } from '../../utils/validation';
import styles from './TextInput.module.scss';

interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isShowLabel?: boolean;
  error?: string;
  errorLabel?: string;
  helpertext?: React.ReactElement;
  showLoader?: boolean;
  removeErrorContainer?: boolean;
  capitalize?: boolean;
  lowerCase?: boolean;
}

const TextInput = ({
  label = '',
  isShowLabel = true,
  error = '',
  errorLabel = '',
  helpertext,
  required = true,
  showLoader = false,
  removeErrorContainer = false,
  capitalize = false,
  lowerCase = false,
  ...props
}: ITextInputProps) => {
  return (
    <div className={`${styles.textInput} ${error ? styles.danger : ''}`}>
      {isShowLabel && (
        <>
          <label htmlFor={props.name}>
            {label}
            {required && <span className='input-asterisk'>*</span>}
          </label>
          <br />
        </>
      )}
      <input
        onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (capitalize || lowerCase) {
            const start = (event.target as HTMLInputElement).selectionStart as number;
            const end = (event.target as HTMLInputElement).selectionEnd as number;
            (event.target as HTMLInputElement).value = capitalize
              ? convertToCaptilize((event.target as HTMLInputElement).value)
              : convertToLowerCase((event.target as HTMLInputElement).value);
            (event.target as HTMLInputElement).setSelectionRange(start, end);
          }
        }}
        className='input'
        {...props}
        autoComplete='off'
      />
      {showLoader && (
        <div className={styles.iconContainer}>
          <em className={styles.loader} />
        </div>
      )}
      <div className='d-flex'>
        {!removeErrorContainer && (
          <div className={styles.error}>
            {error} {error && errorLabel}
          </div>
        )}
        {helpertext}
      </div>
    </div>
  );
};

export default TextInput;
