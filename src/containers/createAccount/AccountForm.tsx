import { FormApi } from 'final-form';
import React, { useEffect } from 'react';
import { Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Checkbox from '../../components/formFields/Checkbox';

import TextInput from '../../components/formFields/TextInput';
import APPCONSTANTS from '../../constants/appConstants';
import sessionStorageServices from '../../global/sessionStorageServices';
import { fetchClinicalWorkflow } from '../../store/account/actions';
import { accountSelector, getClinicalWorkflowSelector } from '../../store/account/selectors';
import { IClinicalWorkflow } from '../../store/account/types';
import {
  convertToNumber,
  required,
  convertToCaptilize,
  composeValidators,
  validateEntityName
} from '../../utils/validation';

/**
 * Renders the workflow fields for account form
 * @returns {React.ReactElement}
 */
const renderWorkflowByModuleType = (clinicalWorkflows: IClinicalWorkflow[], moduleType: string) => (
  <div className='col-12 mb-1'>
    <div className='mb-0dot5 input-field-label'>{`${convertToCaptilize(moduleType)} Workflows involved`}</div>
    <div className='row'>
      {clinicalWorkflows.map((workflow) => {
        if (workflow.moduleType === moduleType) {
          return (
            <div key={workflow.name} className='col-sm-6 col-12'>
              <Field
                id={Number(workflow.id)}
                name={`account.${moduleType}Workflow`}
                key={workflow.name}
                type='checkbox'
                value={workflow.id}
                render={({ input }) => (
                  <Checkbox {...input} label={convertToCaptilize(workflow.name)} disabled={workflow.default} />
                )}
              />
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  </div>
);

/**
 * Renders the fields for account form
 * @returns {React.ReactElement}
 */
const AccountForm = ({ form }: { form: FormApi<any> }): React.ReactElement => {
  const dispatch = useDispatch();
  const clinicalWorkflows = useSelector(getClinicalWorkflowSelector);
  const { country } = useSelector(accountSelector);
  const { regionId } = useParams<{ regionId: string }>();
  useEffect(() => {
    const countryId = regionId || country?.id;
    if (!(clinicalWorkflows || []).length) {
      dispatch(
        fetchClinicalWorkflow({
          countryId: countryId || '',
          tenantId: sessionStorageServices.getItem(APPCONSTANTS.COUNTRY_TENANT_ID),
          skip: 0,
          limit: null,
          searchTerm: ''
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAccountWorkflowIds = (accountWorkflow: any[], workflow: IClinicalWorkflow, moduleType: string) => {
    if (workflow.moduleType === moduleType) {
      if (accountWorkflow.length) {
        return workflow.id;
      } else {
        if (workflow?.default) {
          return workflow.id;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    if (clinicalWorkflows.length) {
      form.initialize((data) => {
        const accountWorkflow = data?.account?.clinicalWorkflow || [];
        const accountCustomizedWorkflow = data?.account?.customizedWorkflow || [];
        const clinicalWorkflow = accountWorkflow.length ? accountWorkflow : clinicalWorkflows;
        const newClinicalWorkflow = (newWorkflow: IClinicalWorkflow[], moduleType: string) =>
          newWorkflow
            .map((workflow: IClinicalWorkflow) => getAccountWorkflowIds(accountWorkflow, workflow, moduleType))
            .filter(Boolean);
        const newData = {
          ...data,
          account: {
            ...data?.account,
            clinicalWorkflow: newClinicalWorkflow(clinicalWorkflow, 'clinical'),
            customizedWorkflow: newClinicalWorkflow(accountCustomizedWorkflow, 'customized')
          }
        };
        return newData;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicalWorkflows]);

  return (
    <div className='row gx-1dot25'>
      <div className='col-sm-6 col-12'>
        <Field
          name='account.name'
          type='text'
          validate={composeValidators(required, validateEntityName)}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              label='Account Name'
              errorLabel='account name'
              capitalize={true}
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      <div className='col-sm-6 col-12'>
        <Field
          name='account.maxNoOfUsers'
          type='text'
          parse={convertToNumber}
          render={({ input, meta }) => (
            <TextInput
              {...input}
              required={false}
              label='Maximum No.of users'
              errorLabel='Maximum No.of users'
              error={(meta.touched && meta.error) || undefined}
            />
          )}
        />
      </div>
      {renderWorkflowByModuleType(clinicalWorkflows, 'clinical')}
      {renderWorkflowByModuleType(clinicalWorkflows, 'customized')}
    </div>
  );
};

export default AccountForm;
