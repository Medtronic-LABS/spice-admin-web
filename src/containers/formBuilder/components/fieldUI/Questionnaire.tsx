import { Fragment, useRef, useState } from 'react';

import BinIcon from '../../../../assets/images/bin.svg';
import PlusIcon from '../../../../assets/images/plus_blue.svg';

import styles from './../../styles/TextInputArray.module.scss';
import TagInput from './TagInput';

interface IQuestionnaireProps {
  onChange?: (value: string[]) => void;
  defaultValue?: any[];
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const Questionnaire = ({ onChange, defaultValue = [], label, required = true, disabled }: IQuestionnaireProps) => {
  const [value, setValue] = useState<any[]>(defaultValue);
  const keys = useRef(defaultValue.map((...[, index]) => index));
  const handleChange = (e: any, inputIndex: number) => {
    const nxtValue = [...value];
    const isAlreadyPresent = defaultValue.some(({ id } = {}) => id && id === nxtValue[inputIndex].id);
    nxtValue[inputIndex] = {
      ...nxtValue[inputIndex],
      id: isAlreadyPresent ? nxtValue[inputIndex]?.id : e.target.innerText.split(' ').join('_').toLowerCase(),
      name: e.target.innerText
    };
    setValue(nxtValue);
    onChange?.(nxtValue);
  };

  const handleSubQuestionsChange = (options: any, inputIndex: number) => {
    const nxtValue = [...value];
    nxtValue[inputIndex].optionsList = options;
    setValue(nxtValue);
    onChange?.(nxtValue);
  };

  const handleDelete = (inputIndex: number) => {
    keys.current = keys.current.filter((key) => key !== inputIndex);
    const nxtValue = value.filter((index) => index !== inputIndex);
    setValue(nxtValue);
    onChange?.(nxtValue);
  };

  const handleAdd = () => {
    keys.current.push(Number(keys.current.length) + 1);
    setValue([...value, { optionsList: [] }]);
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
      <ol className='pb-0dot5'>
        {value?.map((txt, i) => (
          <Fragment key={keys.current[i]}>
            <li className='me-0dot5'>
              <div className='d-flex align-items-center'>
                <div
                  className={`flex-grow-1 f-flex fs-0dot875 ${styles.input}`}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleChange(e, i)}
                >
                  {txt.name}
                </div>
                {!disabled && txt.name && (
                  <img onClick={() => handleDelete(i)} className='me-0dot5 ms-0dot5 pointer' src={BinIcon} alt='' />
                )}
              </div>
              <div>
                <TagInput
                  defaultValue={txt?.optionsList?.map((option: { name: string; value: string }) => option.name)}
                  onChange={(nxtOptions: string[]) => handleSubQuestionsChange(nxtOptions, i)}
                />
              </div>
            </li>
          </Fragment>
        ))}
        {!disabled && (
          <li className='d-flex  align-items-center theme-text mt-2 fw-bold fs-0dot875'>
            <div onClick={handleAdd} className='pointer d-flex align-items-center mt-0dot5'>
              <img className='me-0dot25 pb-1px' src={PlusIcon} alt='' width={15} height={15} />
              Add new Question
            </div>
          </li>
        )}
      </ol>
    </div>
  );
};

export default Questionnaire;
