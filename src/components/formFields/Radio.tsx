import styles from './Radio.module.scss';

interface IRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorLabel?: string;
  value?: string;
  options: Array<{ value: string | boolean; label: string }>;
  input: { [key: string]: any };
  meta?: { [key: string]: any };
  required?: boolean;
  fieldLabel?: string;
  onChange?: (e: any) => void;
}

const handleChange = (input: any, onChange: (e: any) => void, event: any) => {
  if (input) {
    input.onChange(event);
  }
  if (onChange) {
    onChange(event);
  }
};

const Radio = ({
  options,
  meta,
  input,
  value,
  errorLabel = '',
  required = false,
  fieldLabel,
  onChange
}: IRadioProps) => {
  return (
    <div className={styles.radioInputEnclosure}>
      <div className='input-field-label'>
        {fieldLabel}
        {required && <span className='input-asterisk'>*</span>}
      </div>
      {options.map((option: any) => (
        <label key={option.value} className={`d-inline-flex align-items-center ${styles.radioContainer}`}>
          <div className={`${styles.radioWrapper} me-0dot5`}>
            <input
              {...input}
              type='radio'
              className='d-flex'
              value={option.value}
              checked={option.value === (input.value || value)}
              onChange={(event) => handleChange(input, onChange as (e: any) => void, event.target.value)}
            />
          </div>
          {option.label}
        </label>
      ))}
      <div className={styles.error}>{meta?.touched && meta.error ? `${meta.error} ${errorLabel}` : ''}</div>
    </div>
  );
};

export default Radio;
