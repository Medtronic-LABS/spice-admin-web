import React from 'react';
import styles from './TextInput.module.scss';

interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  errorLabel?: string;
  isShowLabel?: boolean;
}

const TextAreaInput = ({ label, isShowLabel = true, error = '', errorLabel = '', ...props }: ITextAreaProps) => {
  return (
    <div className={`${styles.textInput} ${error ? styles.danger : ''}`}>
      {isShowLabel && <label htmlFor={props.name}>{label}</label>}
      <br />
      <textarea {...props} className='w-100' maxLength={300} />
      <div className={styles.error}>
        {error} {error && errorLabel}
      </div>
    </div>
  );
};

export default TextAreaInput;
