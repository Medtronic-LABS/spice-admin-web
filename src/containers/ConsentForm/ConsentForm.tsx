import { useState } from 'react';
import SelectInput from '../../components/formFields/SelectInput';
import ModalViewer from '../../components/modal/ModalViewer';
import TextEditor from '../../components/editor/WysiwygEditor';
import styles from './ConsentForm.module.scss';

export interface IProps {
  title: string;
  handleClose: () => void;
  submitConsentForm: (data: any) => void;
  handleDeactivate?: (data: any) => void;
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<any>>;
  isAccount?: boolean;
  disableDeleteConsentBtn?: boolean;
  setSelectedFormType?: React.Dispatch<React.SetStateAction<{ name: string; id: number }>>;
}

const ConsentForm = ({
  title,
  handleClose,
  submitConsentForm,
  handleDeactivate,
  isAccount = true,
  editorContent,
  disableDeleteConsentBtn = true,
  setEditorContent,
  setSelectedFormType
}: IProps) => {
  const [isFormTypeSelected, setIsFormTypeSelected] = useState(false);
  const formTypeLabel = 'Form Type';

  const onChange = (data: { name: string; id: number }) => {
    if (setSelectedFormType) {
      setSelectedFormType(data);
    }
    setIsFormTypeSelected(true);
  };

  return (
    <ModalViewer show={true} title={title} handleCancel={handleClose} size='modal-lg'>
      <>
        {isAccount && (
          <div className='d-flex'>
            <div className={styles['consent-form-title']}>
              <label>{formTypeLabel}</label>
            </div>
            <div className={styles['consent-form-select']}>
              <SelectInput
                id={'input'}
                label={''}
                required={false}
                disabled={false}
                input={{ onChange }}
                labelKey={'name'}
                valueKey={'id'}
                options={[
                  { name: 'Screening', id: 0 },
                  { name: 'Enrollment', id: 1 }
                ]}
              />
            </div>
          </div>
        )}
        <TextEditor
          editorConfig={{ height: 340, disabled: isAccount && !isFormTypeSelected }}
          editorContent={editorContent}
          setEditorContent={setEditorContent}
        />
        <div className='d-flex justify-content-end m-0dot5'>
          <button
            type='button'
            className='btn danger-btn me-auto'
            data-dismiss='modal'
            disabled={(isAccount && !isFormTypeSelected) || !editorContent || disableDeleteConsentBtn}
            onClick={handleDeactivate}
          >
            Delete Consent
          </button>
          <button onClick={handleClose} className='btn secondary-btn me-0dot5'>
            Cancel
          </button>
          <button
            disabled={isAccount && !isFormTypeSelected}
            onClick={() => submitConsentForm(editorContent)}
            className='btn primary-btn'
          >
            Submit
          </button>
        </div>
      </>
    </ModalViewer>
  );
};

export default ConsentForm;
