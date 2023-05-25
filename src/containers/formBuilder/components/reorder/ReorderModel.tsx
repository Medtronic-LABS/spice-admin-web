import { FormApi } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { cloneDeep } from 'lodash';
import { useRef } from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import ModalViewer from '../../../../components/modal/ModalViewer';
import ReorderContainer from '../../../../components/reorder/ReorderContainer';
import ReorderItem from '../../../../components/reorder/ReorderItem';
import APPCONSTANTS from '../../../../constants/appConstants';
import { composeValidators, convertToCaptilize, required, convertToSubString } from '../../../../utils/validation';
import styles from '../../styles/FormBuilder.module.scss';
import { IFieldViewType as IViewType } from '../../types/ComponentConfig';
export const ReorderModel = ({
  initialValue,
  orderRef,
  formName,
  onSubmit,
  onCancel,
  isRemoveItem,
  reorderTitle = 'Edit Order',
  familyName
}: {
  initialValue: any;
  orderRef: any;
  formName: string;
  onSubmit: () => void;
  onCancel: () => void;
  isRemoveItem?: boolean;
  reorderTitle?: string;
  familyName?: string;
}) => {
  let formattedValue: any = null;

  if (!familyName) {
    const sortAndgroupByFamily = () => {
      const formValues = cloneDeep(initialValue.values);
      const groupedFamily: Array<{ [x: string]: any }> = [];
      Object.keys(formValues)
        .sort(
          (fieldA: string, fieldB: string) =>
            (formValues[fieldA][fieldA]?.familyOrder || 0) - (formValues[fieldB][fieldB]?.familyOrder || 0)
        )
        .forEach((groupedFamilyName: string) => {
          if (groupedFamilyName !== APPCONSTANTS.NO_FAMILY) {
            groupedFamily.push(formValues[groupedFamilyName][groupedFamilyName]);
          }
        });
      return groupedFamily;
    };
    formattedValue = sortAndgroupByFamily();
  } else {
    const formValues = cloneDeep(initialValue.values);
    const currentFamilyGroup = formValues[familyName];
    // remove card view object
    delete currentFamilyGroup[familyName];
    formattedValue = Object.values(currentFamilyGroup).sort((a: any, b: any) => a.orderId - b.orderId);
  }

  const checkDuplication = (value: any, values: any, i: number) => {
    let duplicateIndex: number | undefined;
    if (
      values[formName]?.find((res: any, index: number) => {
        if (res?.name === value && i !== index) {
          duplicateIndex = index;
          return true;
        }
        return false;
      })
    ) {
      return `duplicate_${duplicateIndex}_${i}`;
    }
  };

  const formRef = useRef<FormApi<any>>();
  const idRefs = useRef<string[]>(
    (() => (formattedValue ? formattedValue.map((item: any) => item.id as string) : []))()
  );
  const onReorder = (order: { [itemId: string]: number }) => {
    orderRef.current = { ...order };
    idRefs.current.forEach((itemId: string, i: number) => {
      formRef.current?.change(`${formName}[${i}].displayOrder` as keyof IViewType, String(order[itemId]));
    });
  };

  return (
    <ModalViewer show={true} title={reorderTitle} handleCancel={onCancel} size='modal-md'>
      <Form
        onSubmit={() => undefined}
        mutators={{
          ...arrayMutators
        }}
        initialValues={{ is_active: true }}
        render={({ form }) => {
          formRef.current = form;
          return (
            <>
              <div className={`modal-body ${styles.scroll}`}>
                <FieldArray name={formName} initialValue={formattedValue}>
                  {({ fields }) => {
                    return (
                      <ReorderContainer onReorder={onReorder}>
                        {fields.map((name, index) => {
                          if (!idRefs.current[index]) {
                            idRefs.current[index] = fields.value[index].id as string;
                          }
                          return (
                            <ReorderItem
                              initOrder={index}
                              itemId={idRefs.current[index].toString()}
                              isRemoveItem={isRemoveItem}
                              key={idRefs.current[index].toString()}
                            >
                              <Field
                                name={`${name}.name`}
                                type='text'
                                validate={composeValidators(required, (value: string, values: any) =>
                                  checkDuplication(value, values, index)
                                )}
                                format={convertToCaptilize}
                                parse={convertToCaptilize}
                                render={() => {
                                  return (
                                    <div className={`${styles.customizationFont}`}>
                                      {convertToSubString(fields.value[index].title)}
                                    </div>
                                  );
                                }}
                              />
                              <Field name={`${name}.displayOrder`} initialValue={index + 1} render={() => null} />
                            </ReorderItem>
                          );
                        })}
                      </ReorderContainer>
                    );
                  }}
                </FieldArray>
              </div>
              <div className='modal-footer py-0dot75 px-1dot25'>
                <button type='button' className='btn secondary-btn me-0dot625 px-1dot125 ms-auto' onClick={onCancel}>
                  Cancel
                </button>
                <button type='button' className='btn primary-btn px-1dot75' onClick={onSubmit}>
                  Confirm
                </button>
              </div>
            </>
          );
        }}
      />
    </ModalViewer>
  );
};
