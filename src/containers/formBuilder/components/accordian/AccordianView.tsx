import arrayMutators from 'final-form-arrays';
import { cloneDeep } from 'lodash';
import { Fragment, useMemo, useRef } from 'react';
import { Form } from 'react-final-form';
import { matchPath, useLocation } from 'react-router-dom';
import BinIcon from '../../../../assets/images/bin.svg';
import editIcon from '../../../../assets/images/edit.svg';
import plusIcon from '../../../../assets/images/plus.svg';
import Accordian from '../../../../components/accordian/Accordian';
import APPCONSTANTS from '../../../../constants/appConstants';
import { PROTECTED_ROUTES } from '../../../../constants/route';
import styles from '../../styles/FormBuilder.module.scss';
import { IFieldViewType as IViewType } from '../../types/ComponentConfig';
import { creatableViews, getConfigByViewType, isEditableFields, unitMeasurementFields } from '../../utils/FieldUtils';
import RenderFieldGroups from '../RenderFieldGroups';

interface IAccordinaViewProps {
  formRef: any;
  formMeta: any;
  setFormMeta: any;
  targetIds: any;
  onSubmit: any;
  onCancel: any;
  setEditGroupedFieldsOrder: any;
  presentableJson: any;
  collapsedGroup: any;
  setCollapsedGroup: any;
  addedFields: any;
  allowedFields: any;
  hashFieldIdsWithTitle?: any;
  hashFieldIdsWithFieldName?: any;
  culture?: any;
}

export interface IFormValues {
  jsonForm: IViewType[];
}

const AccordianHeader = ({
  collapsedGroup,
  familyName,
  currentFamilyGroup,
  setEditGroupedFieldsOrder,
  handleAddNewField,
  isAccountCustomization
}: any) => {
  return (
    <div className='row g-0 w-100'>
      <div className='col-lg-8 col-7'>{currentFamilyGroup[familyName].title}</div>
      {collapsedGroup[familyName as keyof typeof collapsedGroup] && (
        <div className='col-lg-4 col-5 d-flex justify-content-end'>
          <div className=' dropdown me-1 d-flex' onClick={(e) => e.stopPropagation()}>
            <button
              className='btn btn-secondary dropdown-toggle primary-btn ms-1'
              type='button'
              id='edit-field-order'
              data-bs-toggle='dropdown'
              aria-expanded='false'
              disabled={Object.keys(currentFamilyGroup).length < 3}
              onClick={() => setEditGroupedFieldsOrder({ isOpen: true, familyName })}
            >
              <img className={`me-0dot5 ${styles.editBtnImg}`} width='14' height='14' src={editIcon} alt='edit-icon' />
              Edit Order
            </button>
            <button
              className='btn btn-secondary dropdown-toggle primary-btn ms-1'
              type='button'
              id='newfieldoptions'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <img className='me-0dot5' width='14' height='14' src={plusIcon} alt='plus-icon' />
              Add New Field
            </button>
            <ul className='dropdown-menu' aria-labelledby='newfieldoptions' id='dropdownMenu'>
              {[...creatableViews]
                .filter((views) => (isAccountCustomization ? views.isAccountCustomizable : true))
                .sort((a, b) => (a.label > b.label ? 1 : -1))
                .map((view, index) => {
                  return (
                    <li key={index}>
                      <button
                        className='dropdown-item'
                        type='button'
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddNewField(familyName, view.value);
                        }}
                      >
                        {view.label}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const AccordianBody = ({
  currentFamilyGroup,
  newlyAddedIds,
  familyName,
  fieldGroupRef,
  form,
  unAddedFields,
  targetIds,
  handleDeleteField,
  handleUpdateFieldName,
  isAccountCustomization,
  hashFieldIdsWithTitle,
  hashFieldIdsWithFieldName
}: any) => {
  return (
    <div className='row'>
      {Object.keys(currentFamilyGroup)
        .sort(
          (fieldA: string, fieldB: string) =>
            (currentFamilyGroup[fieldA]?.orderId || 0) - (currentFamilyGroup[fieldB]?.orderId || 0)
        )
        .map((fieldGroupName: any, index: number) => {
          const isNew = newlyAddedIds.includes(currentFamilyGroup[fieldGroupName].id);
          return currentFamilyGroup[fieldGroupName].viewType !== 'CardView' &&
            currentFamilyGroup[fieldGroupName].viewType !== APPCONSTANTS.NO_FAMILY ? (
            <Fragment key={currentFamilyGroup[fieldGroupName].id}>
              <div
                key={`${familyName}_${currentFamilyGroup[fieldGroupName]?.id || index}`}
                className={`col-12 py-1 position-relative bg-light rounded ps-2 pe-2`}
                ref={(ref) => {
                  fieldGroupRef.current[`${familyName}_${currentFamilyGroup[fieldGroupName]?.id}`] = ref;
                }}
              >
                <div className='row align-items-stretch'>
                  <RenderFieldGroups
                    obj={currentFamilyGroup[fieldGroupName]}
                    name={`${familyName}.${fieldGroupName}`}
                    form={form}
                    unAddedFields={unAddedFields}
                    targetIds={targetIds}
                    newlyAddedIds={newlyAddedIds}
                    isNew={isNew}
                    handleUpdateFieldName={handleUpdateFieldName}
                    isAccountCustomization={isAccountCustomization}
                    hashFieldIdsWithTitle={hashFieldIdsWithTitle}
                    hashFieldIdsWithFieldName={hashFieldIdsWithFieldName}
                  />
                </div>
                {(isNew || currentFamilyGroup[fieldGroupName]?.isNotDefault) && (
                  <div className={`col-12 d-flex justify-content-end mt-1 danger-text lh-1dot25`}>
                    <div
                      onClick={() => handleDeleteField(familyName, fieldGroupName)}
                      className='pointer d-flex align-items-center'
                    >
                      <img className='me-0dot5' title='Delete' src={BinIcon} alt='' />
                      <span className={`${styles.customizationFont}`}>Delete</span>
                    </div>
                  </div>
                )}
              </div>
              {Object.keys(currentFamilyGroup).length - 1 > index && <div className='col-12 divider m-0dot125' />}
            </Fragment>
          ) : null;
        })}
    </div>
  );
};

const AccordianFooter = ({ initialState, submitting, values, culture, onCancel, _presentableJson }: any) => {
  return (
    <>
      <div className='col-12 mt-1dot25 d-flex'>
        <button type='button' className='btn secondary-btn me-0dot625 px-1dot125 ms-auto' onClick={onCancel}>
          Cancel
        </button>
        {Boolean(Object.keys(values).length) && (
          <button
            type='submit'
            disabled={
              (initialState && initialState.length === 0 && submitting) ||
              (culture?.id && culture.id !== APPCONSTANTS.DEFAULT_CULTURE.id)
            }
            className='btn primary-btn px-1dot75'
          >
            Submit
          </button>
        )}
      </div>
      {/* <div className='mt-1 bg-black p-2'>
        <code>
          <pre style={{ fontSize: '1rem' }}>{JSON.stringify(_presentableJson(cloneDeep(values)), null, 2)}</pre>
        </code>
      </div> */}
    </>
  );
};

const AccordianView = ({
  formRef,
  formMeta,
  setFormMeta,
  onCancel,
  targetIds,
  onSubmit,
  setEditGroupedFieldsOrder,
  presentableJson,
  collapsedGroup,
  setCollapsedGroup,
  addedFields,
  allowedFields,
  hashFieldIdsWithTitle,
  hashFieldIdsWithFieldName,
  culture
}: IAccordinaViewProps) => {
  const accordianRef = useRef<any>([]);
  const fieldGroupRef = useRef<any>([]);
  const newlyAddedIdsRef = useRef<any>([]);
  const newlyAddedIds = newlyAddedIdsRef.current;

  const { pathname } = useLocation();
  const isAccountCustomization = Boolean(
    matchPath(pathname, { path: PROTECTED_ROUTES.accordianViewAccountWorlflowCustomizationForm, exact: true })
  );

  const unAddedFields = useMemo(
    () =>
      allowedFields
        .sort((a: any, b: any) => (a.label > b.label ? 1 : -1))
        .filter((item: any) => !addedFields.includes(item.key)),
    [allowedFields, addedFields]
  );

  // return field which has error
  const getFinalFormError = (errors: any) => {
    let errorField: any = null;
    Object.keys(errors).forEach((familyName: string) => {
      if (!errorField) {
        let fieldGroupName: any;
        for (fieldGroupName in errors[familyName]) {
          if (errors[familyName][fieldGroupName]) {
            errorField = formMeta[familyName][fieldGroupName];
            break;
          }
        }
      }
    });
    return errorField;
  };

  const onToggle = (key: keyof typeof collapsedGroup) => {
    const finalFormState = formRef.current.getState();
    const prev = { ...collapsedGroup };
    let foundError: any = null;
    if (finalFormState?.valid) {
      Object.keys(prev).forEach((currKey: string) => {
        prev[currKey as keyof typeof prev] = currKey === key ? !prev[currKey] : false;
      });
    } else {
      foundError = getFinalFormError(finalFormState?.errors);
    }
    setCollapsedGroup(prev);
    setTimeout(() => {
      const allowedRef = foundError?.id
        ? fieldGroupRef.current[`${foundError.family}_${foundError.id}`]
        : accordianRef?.current[key];
      allowedRef.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const handleDeleteField = (familyName: string, fieldGroupName: string) => {
    const finalFormState = { ...formRef.current.getState() };
    const formValues = cloneDeep(finalFormState.values);
    // update newly added ids
    const index = newlyAddedIds.indexOf(fieldGroupName);
    if (index > -1) {
      newlyAddedIds.splice(index, 1);
    }

    // update newly added ids and fieldname value
    if (isAccountCustomization) {
      if (fieldGroupName in hashFieldIdsWithFieldName) {
        delete hashFieldIdsWithFieldName[fieldGroupName];
      }
      if (fieldGroupName in hashFieldIdsWithTitle) {
        delete hashFieldIdsWithTitle[fieldGroupName];
      }
    }
    delete formValues[familyName][fieldGroupName];
    setFormMeta(formValues);
  };

  const handleAddNewField = (family: string, view: string) => {
    const finalFormState = { ...formRef.current.getState() };
    const formValues = cloneDeep(finalFormState.values);
    // enable add field options dropdown
    const element = document.getElementById('dropdownMenu');
    element?.classList.remove('show');
    const dropdownelement = document.getElementById('newfieldoptions');
    dropdownelement?.classList.remove('show');
    // add new field to form meta
    const nxtView: any = getConfigByViewType(view).getEmptyData();
    nxtView.family = family;
    nxtView.orderId = Object.values(formValues[family]).filter((item: any) => item.viewType !== 'CardView').length + 1;
    // add newly added ids and fieldname
    newlyAddedIds.push(nxtView.id);
    formValues[family][nxtView.id] = nxtView;
    if (isAccountCustomization) {
      hashFieldIdsWithTitle[nxtView.id] = '';
      hashFieldIdsWithFieldName[nxtView.id] = '';
    }
    setFormMeta(formValues);
    setTimeout(() => {
      accordianRef?.current[family].scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 0);
  };

  const handleUpdateFieldName = (
    familyName: string,
    currentFieldID: string,
    newFieldName: string,
    newFieldLabel: string,
    currentTitle: string,
    onlyCallBack = false,
    callBack?: (formValues: any) => void
  ) => {
    const finalFormState = { ...formRef.current.getState() };
    const formValues = cloneDeep(finalFormState.values);
    const isAccountCustomizationFunction = (isAccountCustomization: boolean) => {
      if (isAccountCustomization && currentFieldID in hashFieldIdsWithFieldName) {
          hashFieldIdsWithFieldName[newFieldName] = newFieldLabel;
          hashFieldIdsWithTitle[newFieldName] = currentTitle;
          delete hashFieldIdsWithFieldName[currentFieldID];
          delete hashFieldIdsWithTitle[currentFieldID];
      }
    }
    if (!onlyCallBack) {
      formValues[familyName][newFieldName] = formValues[familyName][currentFieldID];
      formValues[familyName][newFieldName].id = newFieldName;
      formValues[familyName][newFieldName].fieldName = newFieldLabel;

      // toggle fields based on fieldname
      if (isEditableFields.includes(newFieldName)) {
        formValues[familyName][newFieldName].isEditable = true;
      } else if ('isEditable' in formValues[familyName][newFieldName]) {
        delete formValues[familyName][newFieldName].isEditable;
      }
      if (unitMeasurementFields.includes(newFieldName)) {
        formValues[familyName][newFieldName].unitMeasurement = undefined;
      } else if ('unitMeasurement' in formValues[familyName][newFieldName]) {
        delete formValues[familyName][newFieldName].unitMeasurement;
      }
      delete formValues[familyName][currentFieldID];

      // update newly added ids
      const index = newlyAddedIds.indexOf(currentFieldID);
      if (index > -1) {
        newlyAddedIds.splice(index, 1);
      }
      newlyAddedIds.push(newFieldName);
      // update newly added ids with fieldname
      isAccountCustomizationFunction(isAccountCustomization);
    }
    // update newly added ids with title
    if (isAccountCustomization && currentFieldID in hashFieldIdsWithTitle) {
        hashFieldIdsWithTitle[currentFieldID] = newFieldLabel;
    }

    setFormMeta(formValues);
    if (callBack) {
      return callBack(formValues);
    }
  };

  const handleFormSubmit = (event: any) => {
    const finalFormState = formRef.current.getState();
    event.preventDefault();
    let foundError: any = null;
    if (!finalFormState.valid) {
      foundError = getFinalFormError(finalFormState.errors);
      if (!!foundError?.id) {
        const prev = { ...collapsedGroup };
        Object.keys(prev).forEach((currKey: string) => {
          prev[currKey as keyof typeof prev] = currKey === foundError.family ? true : false;
        });
        setCollapsedGroup(prev);
        fieldGroupRef.current[
          `${foundError.family}_${foundError.id}${foundError.subField ? '_' + foundError.subField : ''}`
        ].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      onSubmit(finalFormState.values);
    }
  };

  // final form mutator to change value outside Form
  const setValue = ([fieldName, value]: any, state: any, { changeValue }: any) => {
    changeValue(state, fieldName, () => value);
  };

  const setError = ([fieldName, error]: any, state: any) => {
    if (error !== undefined) {
      const { fields } = state;
      const field = fields[fieldName];
      field.data.customError = error;
      field.touched = true;
    }
  };

  return (
    <div className={`${styles.formBuilderViewTwo} container-fluid px-0 w-100`}>
      <Form
        mutators={{
          ...arrayMutators,
          setValue,
          setError
        }}
        initialValues={formMeta}
        // tslint:disable-next-line:no-empty
        onSubmit={() => {
          //
        }}
        render={({ form, submitting, values }) => {
          formRef.current = form;
          return (
            <form onSubmit={(event) => handleFormSubmit(event)}>
              <div className='row gy-1'>
                {Object.keys(values)
                  .sort(
                    (fieldA: string, fieldB: string) =>
                      (values[fieldA][fieldA]?.familyOrder || 0) - (values[fieldB][fieldB]?.familyOrder || 0)
                  )
                  .map((familyName) => {
                    const currentFamilyGroup: any[] = values[familyName] || [];
                    if (familyName === APPCONSTANTS.NO_FAMILY) {
                      return null;
                    }
                    return (
                      <div
                        className={`${styles.viewContent}col-12`}
                        key={familyName}
                        ref={(ref) => (accordianRef.current[familyName] = ref)}
                      >
                        <Accordian
                          collapsed={collapsedGroup[familyName as keyof typeof collapsedGroup]}
                          onToggle={() => onToggle(familyName as keyof typeof collapsedGroup)}
                          header={
                            <AccordianHeader
                              currentFamilyGroup={currentFamilyGroup}
                              familyName={familyName}
                              collapsedGroup={collapsedGroup}
                              setEditGroupedFieldsOrder={setEditGroupedFieldsOrder}
                              handleAddNewField={handleAddNewField}
                              isAccountCustomization={isAccountCustomization}
                            />
                          }
                          body={
                            <AccordianBody
                              currentFamilyGroup={currentFamilyGroup}
                              familyName={familyName}
                              fieldGroupRef={fieldGroupRef}
                              newlyAddedIds={newlyAddedIds}
                              form={form}
                              unAddedFields={unAddedFields}
                              targetIds={targetIds}
                              handleUpdateFieldName={handleUpdateFieldName}
                              handleDeleteField={handleDeleteField}
                              isAccountCustomization={isAccountCustomization}
                              hashFieldIdsWithTitle={hashFieldIdsWithTitle}
                              hashFieldIdsWithFieldName={hashFieldIdsWithFieldName}
                            />
                          }
                        />
                      </div>
                    );
                  })}
              </div>
              <AccordianFooter
                initialState={formMeta}
                submitting={submitting}
                values={values}
                culture={culture}
                onCancel={onCancel}
                _presentableJson={presentableJson}
              />
            </form>
          );
        }}
      />
    </div>
  );
};

export default AccordianView;
