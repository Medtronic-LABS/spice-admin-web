import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import AccordianView from './components/accordian/AccordianView';
import {
  clearFormJSON,
  clearFormMeta,
  customizeFormRequest,
  fetchFormMetaRequest,
  fetchCustomizationFormRequest
} from '../../store/workflow/actions';
import { formJSONSelector, formMetaSelector, loadingSelector } from '../../store/workflow/selectors';
import { FormType } from '../../store/workflow/types';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import APPCONSTANTS from '../../constants/appConstants';
import Loader from '../../components/loader/Loader';
import { PROTECTED_ROUTES } from '../../constants/route';
import IconButton from '../../components/button/IconButton';
import ReorderView from './components/reorder/ReorderView';
import useFormCustomization from './hooks/useFormCustomization';
import SelectInput from '../../components/formFields/SelectInput';
import { fetchCultureListRequest } from '../../store/user/actions';
import { cultureListLoadingSelector, cultureListSelector } from '../../store/user/selectors';
import styles from './styles/FormBuilder.module.scss';

interface IMatchParams {
  regionId: string;
  tenantId: string;
  form: string;
}

const RegionFormCustomization = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const { tenantId, regionId, form } = useParams<IMatchParams>();
  const formGetMeta = useSelector(formMetaSelector) || [];
  const { id: formId } = useSelector(formJSONSelector) || {};
  const loading = useSelector(loadingSelector);
  const cultureList = useSelector(cultureListSelector);
  const isCultureListLoading = useSelector(cultureListLoadingSelector);
  const defaultCulture = useMemo(
    () => (cultureList || []).find((culture) => culture.id === APPCONSTANTS.DEFAULT_CULTURE.id),
    [cultureList]
  );
  const [currentCulture, setCulture] = useState(defaultCulture);

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
    getSortedData,
    presentableJson,
    hashFieldIdsWithTitle,

    // reorder props
    isFamilyOrderModelOpen,
    setFamilyOrderModelOpen,
    editGroupedFieldsOrder,
    setEditGroupedFieldsOrder
  } = useFormCustomization(true);

  const fetchCustomizationForm = useCallback(
    (cultureId: number) =>
      dispatch(
        fetchCustomizationFormRequest({
          tenantId,
          countryId: regionId,
          formType: form as FormType,
          category: 'Input_form',
          cultureId,
          successCb: ({ formInput, cultureId: existingCulture }) => {
            if (!currentCulture?.id && cultureList?.length) {
              setCulture((cultureList || []).find((culture) => culture.id === existingCulture));
            }
            const formJSON = JSON.parse(formInput)?.formLayout;
            const formDataJSON = groupViewsByFamily(formJSON);
            setCollapsedGroup(resetCollapsedCalculation(Object.keys(formDataJSON)));
            setFormData(formDataJSON || {});
          }
        })
      ),
    [
      cultureList,
      currentCulture?.id,
      dispatch,
      form,
      groupViewsByFamily,
      regionId,
      resetCollapsedCalculation,
      setCollapsedGroup,
      setFormData,
      tenantId
    ]
  );
  useEffect(() => {
    if (!currentCulture?.id) {
      setCulture(defaultCulture);
    }
  }, [currentCulture?.id, defaultCulture]);

  useEffect(() => {
    dispatch(fetchCultureListRequest());
    fetchCustomizationForm(currentCulture?.id || APPCONSTANTS.DEFAULT_CULTURE.id);
    dispatch(
      fetchFormMetaRequest({
        formType: form as FormType,
        failureCb: (e) => {
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.FETCH_FORM_META_ERROR));
        }
      })
    );
    return () => {
      dispatch(clearFormJSON());
      setFormData(undefined);
      dispatch(clearFormMeta(form as FormType));
    };
    // eslint-disable-next-line
  }, [dispatch, form, regionId, tenantId]);

  const onCancel = () => {
    history.push(PROTECTED_ROUTES.customizationByRegion.replace(':tenantId', tenantId).replace(':regionId', regionId));
  };

  const onSubmit = (data: any) => {
    const formatData = [...presentableJson(data, getSortedData(data))];
    const newData = JSON.stringify({
      time: Date.now(),
      formLayout: formatData
    }).toString();
    dispatch(
      customizeFormRequest({
        formType: form as FormType,
        formId,
        category: 'Input_form',
        tenantId,
        countryId: regionId ? regionId : '',
        cultureId: currentCulture?.id,
        payload: newData,
        successCb: () => {
          toastCenter.success(
            APPCONSTANTS.SUCCESS,
            APPCONSTANTS.FORM_CUSTOMIZATION_SUCCESS.replace('Dynamic', form.charAt(0).toUpperCase() + form.slice(1))
          );
          onCancel();
        },
        failureCb: (e) => {
          toastCenter.error(
            ...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.FORM_CUSTOMIZATION_ERROR.replace('dynamic', form))
          );
        }
      })
    );
  };

  const onChange = ({ name, id }: { name: string; id: number }) => {
    if (currentCulture?.id !== id) {
      setCulture({ name, id });
      fetchCustomizationForm(id);
    }
  };

  return (
    <>
      {Object.keys(formData || {}).length && !loading ? (
        <>
          <div className='d-flex justify-content-end my-1'>
            <div className={`pe-1 ${styles.cultureDropdown}`}>
              <SelectInput
                id={'input'}
                showOnlyDropdown={true}
                label={''}
                required={false}
                disabled={false}
                input={{ onChange }}
                labelKey={'name'}
                valueKey={'id'}
                value={currentCulture as any}
                defaultValue={defaultCulture as any}
                options={cultureList}
                loadingOptions={isCultureListLoading}
              />
            </div>
            <IconButton label='Edit family order' isEdit={true} handleClick={() => setFamilyOrderModelOpen(true)} />
          </div>
          <AccordianView
            formRef={formRef}
            formMeta={formData}
            setFormMeta={setFormData}
            addedFields={addedFields}
            allowedFields={formGetMeta}
            targetIds={targetIds}
            culture={currentCulture}
            onSubmit={onSubmit}
            onCancel={onCancel}
            setEditGroupedFieldsOrder={setEditGroupedFieldsOrder}
            presentableJson={presentableJson}
            collapsedGroup={collapsedGroup}
            setCollapsedGroup={setCollapsedGroup}
            hashFieldIdsWithTitle={hashFieldIdsWithTitle}
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default RegionFormCustomization;
