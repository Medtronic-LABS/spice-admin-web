import React, { useCallback, useState } from 'react';
import styles from './Pagination.module.scss';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxNumber: number;
  onPagination: (page: number) => void;
}

/**
 * Input that indicates the user by filling danger color in background
 * when user types in a number greater than maxNumber property
 */
const PaginationInput = ({ maxNumber, className, onChange, onPagination, ...otherProps }: IInputProps) => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && Number(value) && !error) {
        setValue('');
        onPagination(Number(value));
      }
    },
    [onPagination, value, error]
  );

  const onChangeEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: nxtValue } = event.target;
      if (isNaN(Number(nxtValue))) {
        event.preventDefault();
        return;
      }
      setValue(event.target.value);
      onChange?.(event);
      setError(nxtValue !== '' && (Number(nxtValue) > maxNumber || Number(nxtValue) < 1 || Number(nxtValue) % 1 !== 0));
    },
    [onChange, maxNumber]
  );
  return (
    <input
      {...otherProps}
      value={value}
      className={`${className} ${styles.goToPage} ${error ? styles.error : ''}`}
      onChange={onChangeEvent}
      onKeyPress={onKeyPress}
    />
  );
};

export default PaginationInput;
