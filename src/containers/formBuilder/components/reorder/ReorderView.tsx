import { cloneDeep } from 'lodash';
import { useRef } from 'react';
import APPCONSTANTS from '../../../../constants/appConstants';
import { ReorderModel } from './ReorderModel';

const ReorderView = ({
  formRef,
  isFamilyOrderModelOpen,
  setFamilyOrderModelOpen,
  setFormMeta,
  editGroupedFieldsOrder,
  setEditGroupedFieldsOrder
}: any) => {
  /**************family order change handlers **************/
  const familyOrderRef = useRef<{ [k: string]: number }>({});
  const onCancelFamilyOrder = () => {
    familyOrderRef.current = {};
    setFamilyOrderModelOpen(false);
  };
  const onSubmitFamilyOrder = () => {
    const finalFormState = { ...formRef.current.getState() };
    const formValues = cloneDeep(finalFormState.values);
    let isOrderChanged = false;
    // change familyOrder values
    Object.keys(formValues).forEach((familyName: string) => {
      if (familyName !== APPCONSTANTS.NO_FAMILY) {
        const familyOrder = formValues[familyName][familyName]?.familyOrder;
        formValues[familyName][familyName].familyOrder = familyOrderRef.current[familyName];
        if (familyOrder !== familyOrderRef.current[familyName]) {
          isOrderChanged = true;
        }
      }
    });
    if (isOrderChanged) {
      setFormMeta(formValues);
    }
    onCancelFamilyOrder();
  };

  /************** grouped field order change handlers **************/
  const groupedFieldsOrderRef = useRef<{ [k: string]: number }>({});
  const onCancelGroupedFieldsOrder = () => {
    setEditGroupedFieldsOrder({
      isOpen: false,
      familyName: ''
    });
  };
  const onSubmitGroupedFieldsOrder = () => {
    const finalFormState = { ...formRef.current.getState() };
    const formValues = cloneDeep(finalFormState.values);
    let isOrderChanged = false;
    const familyName = editGroupedFieldsOrder?.familyName;
    // change field order values
    Object.keys(formValues[familyName]).forEach((fieldName: any) => {
      const fieldOrder = formValues[familyName][fieldName].orderId;
      formValues[familyName][fieldName].orderId = groupedFieldsOrderRef.current[fieldName];
      if (fieldOrder === groupedFieldsOrderRef.current[fieldName]) {
        isOrderChanged = true;
      }
    });
    if (isOrderChanged) {
      setFormMeta(formValues);
    }
    onCancelGroupedFieldsOrder();
  };
  return (
    <>
      {isFamilyOrderModelOpen && (
        <ReorderModel
          onSubmit={onSubmitFamilyOrder}
          reorderTitle='Edit Family order'
          onCancel={onCancelFamilyOrder}
          initialValue={{ ...formRef.current.getState() }}
          orderRef={familyOrderRef}
          formName={'family_reorder'}
        />
      )}
      {editGroupedFieldsOrder.isOpen && editGroupedFieldsOrder?.familyName && (
        <ReorderModel
          onSubmit={onSubmitGroupedFieldsOrder}
          reorderTitle='Edit Field order'
          onCancel={onCancelGroupedFieldsOrder}
          initialValue={{ ...formRef.current.getState() }}
          orderRef={groupedFieldsOrderRef}
          familyName={editGroupedFieldsOrder?.familyName}
          formName={'field_reorder'}
        />
      )}
    </>
  );
};

export default ReorderView;
