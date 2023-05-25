import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { camelCase } from 'lodash';

import { formJSONSelector, formMetaSelector, loadingSelector } from '../../store/workflow/selectors';
import APPCONSTANTS from '../../constants/appConstants';
import { PROTECTED_ROUTES } from '../../constants/route';
import Loader from '../../components/loader/Loader';
import AccordianView from './components/accordian/AccordianView';
import { clearFormJSON, customizeFormRequest, fetchCustomizationFormRequest } from '../../store/workflow/actions';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import ReorderView from './components/reorder/ReorderView';
import { getConfigByViewType } from './utils/FieldUtils';
import useFormCustomization from './hooks/useFormCustomization';

interface IMatchParams {
  regionId: string;
  tenantId: string;
  form: string;
  clinicalWorkflowId: string;
  workflowId: string;
}

const AccountWorkflowFormCustomization = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tenantId, regionId, form, clinicalWorkflowId, workflowId: wfId } = useParams<IMatchParams>();
  const formType = decodeURIComponent(form);
  const workflowId = decodeURIComponent(wfId);
  const formGetMeta = useSelector(formMetaSelector) || [];
  const { id: formId } = useSelector(formJSONSelector) || {};
  const loading = useSelector(loadingSelector);

  const {
    formRef,
    formData,
    setFormData,

    // accordion props
    groupViewsByFamily,
    addedFields,
    targetIds,
    collapsedGroup,
    setCollapsedGroup,
    resetCollapsedCalculation,
    presentableJson,
    hashFieldIdsWithTitle,
    hashFieldIdsWithFieldName,

    // reorder props
    isFamilyOrderModelOpen,
    setFamilyOrderModelOpen,
    editGroupedFieldsOrder,
    setEditGroupedFieldsOrder
  } = useFormCustomization();

  useEffect(() => {
    dispatch(
      fetchCustomizationFormRequest({
        tenantId,
        countryId: regionId,
        formType: 'Module',
        category: 'Input_form',
        clinicalWorkflowId,
        successCb: ({ formInput }) => {
          const formJSON = JSON.parse(formInput)?.formLayout;
          if (formJSON) {
            setFormData(groupViewsByFamily(formJSON));
          } else {
            handleAddDefaultFamily(formType);
          }
        }
      })
    );
    handleAddDefaultFamily(formType);
    return () => {
      dispatch(clearFormJSON());
      setFormData(undefined);
    };
    // eslint-disable-next-line
  }, [dispatch, formType, regionId, tenantId]);

  const onCancel = () => {
    history.push(
      PROTECTED_ROUTES.accountWorkflowCustomization.replace(':tenantId', tenantId).replace(':regionId', regionId)
    );
  };

  const onSubmit = (data: any) => {
    const formatData = presentableJson(data);
    const newData = JSON.stringify({
      time: Date.now(),
      formLayout: formatData
    }).toString();
    dispatch(
      customizeFormRequest({
        formType: 'Module',
        formId,
        category: 'Input_form',
        tenantId,
        countryId: regionId ? regionId : '',
        payload: newData,
        workflowId,
        clinicalWorkflowId,
        successCb: () => {
          toastCenter.success(
            APPCONSTANTS.SUCCESS,
            APPCONSTANTS.FORM_CUSTOMIZATION_SUCCESS.replace(
              'Dynamic',
              formType.charAt(0).toUpperCase() + formType.slice(1)
            )
          );
          onCancel();
        },
        failureCb: (e) => {
          toastCenter.error(
            ...getErrorToastArgs(
              e,
              APPCONSTANTS.ERROR,
              APPCONSTANTS.FORM_CUSTOMIZATION_ERROR.replace('dynamic', formType)
            )
          );
        }
      })
    );
  };

  const handleAddDefaultFamily = (familyName: string) => {
    const formValues: any = {};
    const id = camelCase(familyName);
    const nxtView: any = getConfigByViewType('CardView').getEmptyData();
    nxtView.viewType = 'CardView';
    nxtView.id = id;
    nxtView.title = familyName;
    nxtView.familyOrder = 0;
    nxtView.isCustomWorkflow = true;
    formValues[id] = {};
    formValues[id][id] = nxtView;
    setCollapsedGroup(resetCollapsedCalculation(Object.keys(formValues)));
    setFormData(formValues);
  };
  return (
    <>
      {formData && !loading ? (
        <>
          <AccordianView
            formRef={formRef}
            formMeta={formData}
            setFormMeta={setFormData}
            addedFields={addedFields}
            allowedFields={formGetMeta}
            targetIds={targetIds}
            onSubmit={onSubmit}
            onCancel={onCancel}
            setEditGroupedFieldsOrder={setEditGroupedFieldsOrder}
            presentableJson={presentableJson}
            collapsedGroup={collapsedGroup}
            setCollapsedGroup={setCollapsedGroup}
            hashFieldIdsWithTitle={hashFieldIdsWithTitle}
            hashFieldIdsWithFieldName={hashFieldIdsWithFieldName}
          />
          <ReorderView
            formRef={formRef}
            formMeta={formData}
            setFormMeta={setFormData}
            isFamilyOrderModelOpen={isFamilyOrderModelOpen}
            setFamilyOrderModelOpen={setFamilyOrderModelOpen}
            editGroupedFieldsOrder={editGroupedFieldsOrder}
            setEditGroupedFieldsOrder={setEditGroupedFieldsOrder}
          />
        </>
      ) : null}
      {loading && <Loader />}
    </>
  );
};

export default AccountWorkflowFormCustomization;
