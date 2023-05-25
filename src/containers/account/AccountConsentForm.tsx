import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import APPCONSTANTS from '../../constants/appConstants';
import ConsentForm from '../ConsentForm/ConsentForm';
import {
  clearConsentForm,
  customizeFormRequest,
  deactivateConsentRequest,
  fetchCustomizationFormRequest
} from '../../store/workflow/actions';
import { FormType } from '../../store/workflow/types';
import { consentFormSelector } from '../../store/workflow/selectors';
import { removeEditorContentIfAddedHTMLPlugins } from '../../utils/consentFormHelpers';
import ConfirmationModalPopup from '../../components/customtable/ConfirmationModalPopup';

interface IProps {
  isOpen?: boolean;
  consentFormConfig: any;
  handleConsentFormClose: () => void;
}

/**
 * Shows the account list
 * @returns {React.ReactElement}
 */
const AccountConsentForm = ({ isOpen, consentFormConfig, handleConsentFormClose }: IProps): React.ReactElement => {
  const dispatch = useDispatch();
  const { id: formId } = useSelector(consentFormSelector) || {};
  const [editorContent, setEditorContent] = useState('');
  const [isDeactivatePopupOpen, setDeactivatePopupOpen] = useState(false);
  const [selectedFormType, setSelectedFormType] = useState({ name: '', id: -1 } as { name: string; id: number });

  /**
   * To remove Consent form cache in store
   */
  useEffect(() => {
    return () => {
      dispatch(clearConsentForm());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomizationFormDataTypes = useMemo(
    () => ({
      formId,
      tenantId: consentFormConfig.tenantId,
      countryId: consentFormConfig.regionId || '',
      formType: selectedFormType.name as FormType,
      category: 'Consent_form',
      accountId: consentFormConfig.id
    }),
    [formId, consentFormConfig, selectedFormType.name]
  );

  useEffect(() => {
    if (selectedFormType.id !== -1) {
      dispatch(
        fetchCustomizationFormRequest({
          ...getCustomizationFormDataTypes,
          successCb: (data) => {
            setEditorContent('');
            setEditorContent(data?.formInput);
          },
          failureCb: (e) => {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.FETCH_CONSENT_FORM_ERROR));
          }
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFormType]);

  const submitConsentForm = (data: any) => {
    if (data && removeEditorContentIfAddedHTMLPlugins(data)) {
      dispatch(
        customizeFormRequest({
          ...getCustomizationFormDataTypes,
          payload: data,
          successCb: () => {
            toastCenter.success(
              APPCONSTANTS.SUCCESS,
              `${selectedFormType.name} ${APPCONSTANTS.CONSENT_FORM_CUSTOMIZATION_SUCCESS}`
            );
            handleConsentFormClose();
            setEditorContent('');
          },
          failureCb: (e) => {
            toastCenter.error(
              ...getErrorToastArgs(
                e,
                APPCONSTANTS.ERROR,
                `${selectedFormType.name} ${APPCONSTANTS.CONSENT_FORM_CUSTOMIZATION_ERROR}`
              )
            );
          }
        })
      );
    } else {
      toastCenter.error(APPCONSTANTS.ERROR, `${APPCONSTANTS.CONSENT_FORM_EMPTY_ERROR}`);
    }
  };

  const handleDeactivate = () => {
    setDeactivatePopupOpen(true);
  };

  const deactivatePopupCancel = () => {
    setDeactivatePopupOpen(false);
  };

  const deactivateSubmit = () => {
    if (formId) {
      dispatch(
        deactivateConsentRequest({
          ...getCustomizationFormDataTypes,
          successCb: () => {
            toastCenter.success(
              APPCONSTANTS.SUCCESS,
              `${selectedFormType.name} ${APPCONSTANTS.DEACTIVATE_CONSENT_SUCCESS}`
            );
            handleConsentFormClose();
            setEditorContent('');
          },
          failureCb: (e) => {
            toastCenter.error(
              ...getErrorToastArgs(
                e,
                APPCONSTANTS.ERROR,
                `${selectedFormType.name} ${APPCONSTANTS.DEACTIVATE_CONSENT_FAILURE}`
              )
            );
          }
        })
      );
      deactivatePopupCancel();
    } else {
      toastCenter.error(APPCONSTANTS.ERROR, APPCONSTANTS.DEACTIVATE_CONSENT_NO_DATA);
    }
  };

  return (
    <>
      {isOpen && (
        <ConsentForm
          title={consentFormConfig.name + ' - Consent Form'}
          handleClose={() => {
            handleConsentFormClose();
            setEditorContent('');
          }}
          handleDeactivate={handleDeactivate}
          submitConsentForm={submitConsentForm}
          editorContent={editorContent}
          setEditorContent={setEditorContent}
          setSelectedFormType={setSelectedFormType}
          disableDeleteConsentBtn={!formId}
        />
      )}
      <ConfirmationModalPopup
        isOpen={isDeactivatePopupOpen}
        popupTitle={APPCONSTANTS.DELETE_CONSENT_TITLE.replace('Account', selectedFormType.name)}
        cancelText='Cancel'
        submitText='Ok'
        handleCancel={deactivatePopupCancel}
        handleSubmit={deactivateSubmit}
        popupSize='modal-md'
        confirmationMessage={APPCONSTANTS.DELETE_CONSENT_CONFIRMATION.replace(
          'account',
          selectedFormType.name.toLowerCase()
        )}
      />
    </>
  );
};

export default AccountConsentForm;
