import { Form, FormRenderProps } from 'react-final-form';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/formContainer/FormContainer';
import Loader from '../../components/loader/Loader';
import ProgramForm from './ProgramForm';
import DetailsIcon from '../../assets/images/info-grey.svg';
import { programLoadingSelector } from '../../store/program/selectors';
import { ICreateProgramReqPayload, IProgramFormValues } from '../../store/program/types';
import { PROTECTED_ROUTES } from '../../constants/route';
import APPCONSTANTS from '../../constants/appConstants';
import { createProgram } from '../../store/program/actions';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';

interface IMatchParams {
  regionId?: string;
  tenantId: string;
}

interface IRouteProps extends RouteComponentProps<IMatchParams> {}

const CreateProgram = (props: IRouteProps): React.ReactElement => {
  const { regionId, tenantId } = props.match.params;
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(programLoadingSelector);

  const onSubmit = (values: { program: IProgramFormValues }) => {
    const { program } = values;
    const data = {
      name: program.name.trim(),
      tenantId,
      sites: program.sites.map((site) => site.id),
      country: regionId
    } as unknown as ICreateProgramReqPayload;
    dispatch(createProgram({ data, successCb: onCreateSuccess, failureCb: onCreateFail }));
  };

  const onCreateSuccess = () => {
    toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.PROGRAM_CREATION_SUCCESS);
    onCancel();
  };
  
  const onCreateFail = (e: Error) => {
    try {
      throw e;
    } catch (error:any) {
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.PROGRAM_CREATION_ERROR));
      }
    };
    
  const onCancel = () => {
    const url = (regionId && PROTECTED_ROUTES.programByRegion) as string;
    history.push(url.replace(':tenantId', tenantId).replace(/(:regionId)/, regionId as string));
  };

  return (
    <>
      {loading && <Loader />}
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }: FormRenderProps<{ program: IProgramFormValues }>) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className='col-lg-12 col-12'>
                <FormContainer label='Program Details' icon={DetailsIcon}>
                  <ProgramForm tenantId={tenantId} form={form} />
                </FormContainer>
              </div>
              <div className='col-12 mt-1dot25 d-flex'>
                <button type='button' className='btn secondary-btn me-0dot625 px-1dot125 ms-auto' onClick={onCancel}>
                  Cancel
                </button>
                <button type='submit' className='btn primary-btn px-1dot75'>
                  Submit
                </button>
              </div>
            </form>
          );
        }}
      />
    </>
  );
};

export default CreateProgram;
