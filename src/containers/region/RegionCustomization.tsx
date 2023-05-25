import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ReactComponent as IconLegal } from '../../assets/images/icon-legal.svg';
import CustomTable from '../../components/customtable/CustomTable';
import DetailCard from '../../components/detailCard/DetailCard';
import APPCONSTANTS from '../../constants/appConstants';
import { PROTECTED_ROUTES } from '../../constants/route';
import ConsentForm from '../ConsentForm/ConsentForm';
import { clearConsentForm, customizeFormRequest, fetchCustomizationFormRequest } from '../../store/workflow/actions';
import { FormType } from '../../store/workflow/types';
import { consentFormSelector } from '../../store/workflow/selectors';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';

interface IMatchParams {
  regionId?: string;
  tenantId: string;
}

export const FormTypes = {
  Screening: 'screening',
  Enrollment: 'enrollment',
  Assessment: 'assessment'
};

export const findCurrentFormType = (index: number) => {
  switch (index) {
    case 0:
      return FormTypes.Screening;
    case 1:
      return FormTypes.Enrollment;
    case 2:
      return FormTypes.Assessment;
    default:
      return '';
  }
};

const RegionCustomization = (): React.ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: formId } = useSelector(consentFormSelector) || {};
  const { regionId, tenantId } = useParams<IMatchParams>();
  const [openConsentForm, setOpenConsentForm] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const formTypeLabel = useRef({} as any);

  /**
   * To remove Consent form cache in store
   */
  useEffect(() => {
    return () => {
      dispatch(clearConsentForm());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowEdit = ({ index }: { index: number }) => {
    const formType = findCurrentFormType(index);
    history.push(
      PROTECTED_ROUTES.accordianViewRegionCustomizationForm
        .replace(':tenantId', tenantId)
        .replace(':regionId', regionId as string)
        .replace(':form', formType)
    );
  };

  const handleConsentFormOpen = (data: any) => {
    formTypeLabel.current = data;
    formTypeLabel.current.form = findCurrentFormType(data.index);
    dispatch(
      fetchCustomizationFormRequest({
        tenantId,
        countryId: regionId || '',
        formType: formTypeLabel.current.form as FormType,
        category: 'Consent_form',
        successCb: ({ formInput }) => {
          setEditorContent(formInput);
        },
        failureCb: (e) => {
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.FETCH_CONSENT_FORM_ERROR));
        }
      })
    );
    setOpenConsentForm(true);
  };

  const formName = formTypeLabel.current?.form
    ? formTypeLabel.current.form.charAt(0).toUpperCase() + formTypeLabel.current.form.slice(1)
    : '';

  const handleConsentFormClose = () => {
    setOpenConsentForm(false);
    setEditorContent('');
  };

  const submitConsentForm = (data: any) => {
    dispatch(
      customizeFormRequest({
        formType: formTypeLabel.current.form as FormType,
        formId,
        tenantId,
        countryId: regionId ? regionId : '',
        category: 'Consent_form',
        payload: data,
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, `${formName} ${APPCONSTANTS.CONSENT_FORM_CUSTOMIZATION_SUCCESS}`);
        },
        failureCb: (e) => {
          toastCenter.error(
            ...getErrorToastArgs(e, APPCONSTANTS.ERROR, `${formName} ${APPCONSTANTS.CONSENT_FORM_CUSTOMIZATION_ERROR}`)
          );
        }
      })
    );
    setOpenConsentForm(false);
    setEditorContent('');
  };

  return (
    <>
      <div className='col-12'>
        <DetailCard header='Region Customization' isSearch={false}>
          <CustomTable
            rowData={APPCONSTANTS.REGION_CUSTOMIZATION_SCREENS}
            columnsDef={[
              {
                id: 1,
                name: 'name',
                label: 'Name',
                width: '200px'
              }
            ]}
            isEdit={true}
            isDelete={false}
            onRowEdit={handleRowEdit}
            onCustomConfirmed={handleConsentFormOpen}
            CustomIcon={IconLegal}
            isCustom={true}
          />
        </DetailCard>
        {openConsentForm && editorContent && (
          <ConsentForm
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            title={formName + ' - Consent Form'}
            isAccount={false}
            handleClose={handleConsentFormClose}
            submitConsentForm={submitConsentForm}
          />
        )}
      </div>
    </>
  );
};

export default RegionCustomization;
