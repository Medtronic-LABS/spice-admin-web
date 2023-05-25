import { useRef, useState } from 'react';
import { IComponentConfig } from '../types/ComponentConfig';
import { FormApi } from 'final-form';
import { getConfigByViewType, isEditableFields, unitMeasurementFields } from '../utils/FieldUtils';
import { ISelectFormOptions } from '../../../components/formFields/SelectInput';
import APPCONSTANTS from '../../../constants/appConstants';
import { useParams } from 'react-router-dom';
import { camel2Title } from '../../../utils/validation';

interface IMatchParams {
  form: string;
}

const useFormCustomization = (isRegionFormCustomization?: boolean) => {
  const [formData, setFormData] = useState<any>({});
  const { form: formType } = useParams<IMatchParams>();
  const [isFamilyOrderModelOpen, setFamilyOrderModelOpen] = useState<boolean>(false);
  const [editGroupedFieldsOrder, setEditGroupedFieldsOrder] = useState<any>({
    isOpen: false,
    familyName: ''
  });

  const formRef = useRef<FormApi<any>>();

  const addedFieldRef = useRef<string[]>([]);
  const addedFields = addedFieldRef.current;

  const targetIdRef = useRef<ISelectFormOptions[]>([]);
  const targetIds = targetIdRef.current;

  const hashFieldIdsWithTitleRef = useRef<any>({});
  const hashFieldIdsWithTitle = hashFieldIdsWithTitleRef.current;
  const hashFieldIdsWithFieldNameRef = useRef<any>({});
  const hashFieldIdsWithFieldName = hashFieldIdsWithFieldNameRef.current;

  const resetCollapsedCalculation = (keys: string[]) => {
    const res: { [k: string]: boolean } = {};
    keys.forEach((key: string) => {
      res[key] = false;
    });
    return res as { [key: string]: boolean };
  };

  const [collapsedGroup, setCollapsedGroup] = useState<{ [key: string]: boolean }>(
    resetCollapsedCalculation(Object.keys(formData || {}))
  );

  // add targetIds based on condition
  const getTargetIds = (view: any) => {
    if (
      (!view.isNeededDefault ||
        (view.isNeededDefault && view.visibility && view.visibility === 'gone') ||
        (view.isNeededDefault && view.isEnabled === false)) &&
      !!view.family
    ) {
      targetIds.push({
        key: view.id,
        label: camel2Title(view.id)
      });
    }
  };

  // format initial data by family
  const groupViewsByFamily = (obj: any) => {
    const res: { [groupName: string]: any } = {};
    Object.values(obj).forEach((view: any) => {
      if (view.family) {
        // temp ID to track Display name changes
        hashFieldIdsWithTitle[view.id] = view.title;
        // temp ID to track Field name changes
        hashFieldIdsWithFieldName[view.id] = view.fieldName;
        res[view.family] = { ...res[view.family], ...{ [view.id]: view } };
      } else if (view.viewType === 'CardView' && !view.family) {
        res[view.id] = { [view.id]: view };
      } else if (view.viewType !== 'CardView' && !view.family) {
        res[APPCONSTANTS.NO_FAMILY] = { [view.id]: view };
      }
      addedFields.push(view.id);
      getTargetIds(view);

      if (!isRegionFormCustomization) {
        return;
      }
      if (formType === 'enrollment' && isEditableFields.includes(view.id) && !('isEditable' in view)) {
        view.isEditable = true;
      }
      if (unitMeasurementFields.includes(view.id) && !('unitMeasurement' in view)) {
        view.unitMeasurement = undefined;
      }
    });
    return res;
  };

  const getSortedData = (data: any) =>
    Object.entries(data)
      .sort(([val1, obj1]: [any, any], [val2, obj2]: [any, any]) =>
        obj1[val1]?.familyOrder >= 0 && obj2[val2]?.familyOrder >= 0
          ? obj1[val1].familyOrder - obj2[val2].familyOrder
          : 1
      )
      .map(([val1]: [any, any]) => val1);

  const presentableJson = (values: any, sortedFamily: string[] = []) => {
    let data: any = [];
    (sortedFamily.length ? sortedFamily : Object.keys(values)).forEach((familyName) => {
      const familyData: any = [];
      Object.keys(values[familyName]).forEach((fieldGroupName) => {
        const obj = values[familyName][fieldGroupName];
        const componentConfig: IComponentConfig = getConfigByViewType(obj?.viewType);
        const json = componentConfig.getJSON?.(obj);
        if (json) {
          familyData.push(json);
        }
      });
      data = data.concat(familyData.sort((a: any, b: any) => a.orderId - b.orderId));
    });
    return data;
  };

  return {
    formRef,
    formData,
    setFormData,

    // accordion props
    groupViewsByFamily,
    addedFields,
    getTargetIds,
    targetIds,
    collapsedGroup,
    setCollapsedGroup,
    resetCollapsedCalculation,
    getSortedData,
    presentableJson,
    hashFieldIdsWithTitle,
    hashFieldIdsWithFieldName,

    // reorder props
    isFamilyOrderModelOpen,
    setFamilyOrderModelOpen,
    editGroupedFieldsOrder,
    setEditGroupedFieldsOrder
  };
};

export default useFormCustomization;
