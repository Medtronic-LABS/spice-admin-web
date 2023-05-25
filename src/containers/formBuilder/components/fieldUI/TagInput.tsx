import { useState } from 'react';
import styles from './../../styles/FormBuilder.module.scss';

export interface ITagInputProps {
  onChange?: (value: string[]) => void;
  defaultValue?: string[];
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  classChange?: string;
}

const TagInput = ({
  defaultValue = [],
  onChange,
  label,
  disabled,
  error = '',
  classChange = '',
  ...props
}: ITagInputProps) => {
  const [items, setItems] = useState<string[]>(defaultValue || []);
  const [inputValue, setInput] = useState<string>('');

  const handleInputChange = (evt: React.BaseSyntheticEvent) => {
    setInput(evt.target.value);
  };

  const handleInputKeyDown = (evt: any) => {
    if (evt.keyCode === 13) {
      const value = (evt.target.value || '').trim();
      if (value && items.indexOf(value.trim()) === -1) {
        let newItems = [] as any[];
        setItems((prevItems) => {
          newItems = [...items, value];
          return [...prevItems, value];
        });
        setTimeout(() => {
          onChange?.(newItems);
        });
        setInput('');
      } else {
        setInput('');
      }
      evt.stopPropagation();
      evt.preventDefault();
    }
    if (items.length && evt.keyCode === 8 && !inputValue.length) {
      let updatedItems = [] as any[];
      setItems((prevItems: string[]) => {
        updatedItems = prevItems.slice(0, items.length - 1);
        return updatedItems;
      });
      setTimeout(() => {
        onChange?.(updatedItems);
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    let updatedItems = [] as any[];
    setItems((prevItems: string[]) => {
      updatedItems = prevItems.filter(
        (_item: string, i: number) => i !== index || _item === 'Gestational Diabetes(GDM)'
      );
      return updatedItems;
    });
    setTimeout(() => {
      onChange?.(updatedItems);
    });
  };

  const taginputClass = `${styles.items} ${disabled ? 'no-pointer-events ' + styles.disabledItems : ''}`;
  return (
    <div className={`${styles.tagInput} ${styles[classChange]}`}>
      {label && (
        <>
          <label>
            {label}
            {<span className='input-asterisk'>*</span>}
          </label>
          <br />
        </>
      )}
      <ul
        className={`${styles.taginputContainer} ${error ? styles.danger : ''} ${
          disabled ? styles.disabledContainer : ''
        } mb-0`}
      >
        {items.map((item: string, i: number) => (
          <li key={i} className={taginputClass}>
            {item}
            <span className={`ps-0dot75 ${styles.remove}`} onClick={() => handleRemoveItem(i)}>
              x
            </span>
          </li>
        ))}
        {(!disabled || !items.length) && (
          <input
            {...props}
            className={styles.input}
            value={inputValue}
            disabled={disabled}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
        )}
      </ul>
      {!items.length && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default TagInput;
