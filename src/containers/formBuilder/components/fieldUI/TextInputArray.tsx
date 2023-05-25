import { Fragment, useRef, useState } from 'react';
import BinIcon from '../../../../assets/images/bin.svg';
import PlusIcon from '../../../../assets/images/plus_blue.svg';
import styles from '../../styles/TextInputArray.module.scss';

interface ITextInputArray {
  onChange?: (value: string[]) => void;
  defaultValue?: string[];
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const TextInputArray = ({ onChange, defaultValue = [], label, required = true, disabled }: ITextInputArray) => {
  const [value, setValue] = useState<string[]>(defaultValue);
  const keys = useRef(defaultValue.map((...[, index]) => index));
  const handleChange = (e: any, inputIndex: number) => {
    const nxtValue = [...value];
    e.target.innerText = e.target.innerText.trim() !== '' ? e.target.innerText : '';
    nxtValue[inputIndex] = e.target.innerText.trim() !== '' ? e.target.innerText : '';
    setValue(nxtValue);
    onChange?.(nxtValue.filter((val) => !!val.trim()));
  };

  const handleDelete = (inputIndex: number) => {
    keys.current = keys.current.filter((key) => key !== inputIndex);
    const nxtValue = value.filter((_, index) => index !== inputIndex);
    setValue(nxtValue);
    onChange?.(nxtValue.filter((val) => !!val.trim()));
  };

  const handleAdd = () => {
    keys.current.push(Number(keys.current[keys.current.length - 1] || 0) + 1);
    setValue([...value, '']);
  };
  return (
    <div className={styles.textInputArray}>
      {label && (
        <>
          <label>
            {label}
            {required && <span className='input-asterisk'>*</span>}
          </label>
          <br />
        </>
      )}
      <ul className='pb-0dot5'>
        {value?.map((txt, i) => (
          <Fragment key={keys.current[i]}>
            <li className='me-0dot5'>
              <div className='d-flex'>
                <div
                  className={`flex-grow-1 fs-0dot875 ${styles.input} ${txt === '' && styles.borderOnNoText}`}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleChange(e, i)}
                >
                  {txt}
                </div>
                {!disabled && <img onClick={() => handleDelete(i)} className='ms-0dot5 pointer' src={BinIcon} alt='' />}
              </div>
            </li>
          </Fragment>
        ))}
        {!disabled && (
          <li className='d-flex  align-items-center theme-text fw-bold fs-0dot875'>
            <div onClick={handleAdd} className='pointer d-flex align-items-center mt-0dot5'>
              <img className='me-0dot25 pb-1px' src={PlusIcon} alt='' width={15} height={15} />
              Add new
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TextInputArray;
