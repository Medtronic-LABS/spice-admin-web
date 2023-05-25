import { useLayoutEffect, useState } from 'react';
import styles from './Accordian.module.scss';

interface IAccordianProps {
  header: React.ReactElement[] | React.ReactElement | string;
  body: React.ReactElement[] | React.ReactElement | string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onToggle?: () => void;
}

const Accordian = ({ header, body, collapsed, defaultCollapsed, onToggle: onToggleProps }: IAccordianProps) => {
  const [show, setShow] = useState(defaultCollapsed || collapsed || false);
  useLayoutEffect(() => {
    if (typeof collapsed === 'boolean' && collapsed !== show) {
      setShow(collapsed);
    }
  }, [collapsed, show]);
  const handleToggle = () => {
    if (typeof collapsed !== 'boolean') {
      setShow((prev) => !prev);
    }
    onToggleProps?.();
  };
  return (
    <div className='accordion'>
      <div className='accordion-item'>
        <div className={`accordion-header ${show ? styles.headerBorder : ''}`} onClick={handleToggle}>
          <div className={`accordion-button bg-light ${show ? 'collapsed' : ''}`}>{header}</div>
        </div>
        <div className={`accordion-collapse collapse ${show ? 'show' : ''}`}>
          <div className='accordion-body'>{body}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordian;
