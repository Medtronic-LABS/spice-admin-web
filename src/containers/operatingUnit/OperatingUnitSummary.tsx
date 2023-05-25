import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { FormApi } from 'final-form';
import arrayMutators from 'final-form-arrays';

import CustomTable from '../../components/customtable/CustomTable';
import DetailCard from '../../components/detailCard/DetailCard';
import Loader from '../../components/loader/Loader';
import ModalForm from '../../components/modal/ModalForm';
import {
  createOperatingUnitAdminReq,
  deleteOperatingUnitAdminReq,
  fetchOperatingUnitDetail,
  updateOperatingUnitAdminReq,
  updateOperatingUnitReq
} from '../../store/operatingUnit/actions';
import {
  getOperatingUnitDetailSelector,
  getOuAdminsSelector,
  operatingUnitLoadingSelector
} from '../../store/operatingUnit/selectors';
import {
  IOperatingUnitAdminFormvalue,
  IOperatingUnitAdmin,
  IOperatingUnitDetail
} from '../../store/operatingUnit/types';
import OperatingUnitForm from '../../components/operatingUnitForm/OperatingUnitForm';
import UserForm from '../../components/userForm/UserForm';
import APPCONSTANTS from '../../constants/appConstants';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import sessionStorageServices from '../../global/sessionStorageServices';
import { countryIdSelector, roleSelector } from '../../store/user/selectors';

import { ITimezone } from '../../store/user/types';

export interface IAdminEditFormValues {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  gender: string;
  countryCode: { countryCode: string };
  timezone: ITimezone;
  country: { countryCode: string };
  tenantId?: string;
}

const OperatingUnitSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const countryId = useSelector(countryIdSelector);
  const OUDetail = useSelector(getOperatingUnitDetailSelector);
  const OUAdmins = useSelector(getOuAdminsSelector);
  const loading = useSelector(operatingUnitLoadingSelector);
  const role = useSelector(roleSelector);
  const isReadOnly = role === APPCONSTANTS.ROLES.OPERATING_UNIT_ADMIN;
  const { OUId, tenantId }: { OUId: string; tenantId: string } = useParams();

  // Edit OU
  const [showOUEditModal, setShowOUEditModal] = useState(false);
  const openOUEditModal = useCallback(() => {
    setShowOUEditModal(true);
  }, []);
  const handleOUEdit = ({ name, account, id, tenantId: tenantIdFromEdit }: IOperatingUnitDetail) => {
    dispatch(
      updateOperatingUnitReq({
        payload: {
          name,
          countryId: Number(countryId?.id || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID)),
          account: { id: Number(account?.id) },
          id,
          tenantId: tenantIdFromEdit
        },
        isSuccessPayloadNeeded: true,
        successCb: () => {
          setShowOUEditModal(false);
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.OPERATING_UNIT_UPDATE_SUCCESS);
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OPERATING_UNIT_UPDATE_FAIL))
          }
        }
      })
    );
  };

  // OU Admin Form
  const [showOUAdminModal, setShowOUAdminModal] = useState(false);
  const [isOUAdminEdit, setIsOUAdminEdit] = useState(false);
  const OUAdminForEdit = useRef<{ users: IAdminEditFormValues[] }>({ users: [] });
  const handleEditOUAdminClick = useCallback(
    (OUAdmin: IAdminEditFormValues) => {
      setIsOUAdminEdit(true);
      OUAdminForEdit.current = { users: [OUAdmin] };
      setShowOUAdminModal(true);
    },
    [OUAdminForEdit]
  );

  const getOperatingUnitDetails = useCallback(
    (search: string = searchTerm) => {
      dispatch(
        fetchOperatingUnitDetail({
          tenantId,
          id: OUId,
          searchTerm: search,
          failureCb: (e: Error) => {
            try {
              throw e;
            } catch (error:any) {
              toastCenter.error(
                ...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OPERATING_UNIT_DETAIL_FETCH_ERROR)
              )
            }
          }
        })
      );
    },
    [OUId, dispatch, searchTerm, tenantId]
  );

  const handleAddOUAdminClick = useCallback(() => {
    setIsOUAdminEdit(false);
    OUAdminForEdit.current = { users: [] };
    setShowOUAdminModal(true);
  }, [OUAdminForEdit]);

  const handleOUAdminEdit = ({ users }: { users: IAdminEditFormValues[] }) => {
    const { firstName, lastName, timezone, gender, username: email, phoneNumber, id, countryCode } = users[0];
    dispatch(
      updateOperatingUnitAdminReq({
        payload: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          timezone: { id: Number(timezone?.id) },
          gender,
          email,
          username: email,
          phoneNumber,
          tenantId,
          id,
          countryCode: countryCode.countryCode,
          country: { id: countryId?.id || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID) }
        },
        successCb: () => {
          getOperatingUnitDetails(searchTerm);
          setShowOUAdminModal(false);
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.OPERATING_UNIT_ADMIN_UPDATE_SUCCESS);
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OPERATING_UNIT_ADMIN_UPDATE_FAIL))
          }
        }
      })
    );
  };
  const handleOUAdminCreate = ({
    users: [{ firstName, lastName, phoneNumber, timezone, gender, email, id, countryCode }]
  }: typeof OUAdminForEdit.current) => {
    const payload: IOperatingUnitAdminFormvalue = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      timezone: { id: Number(timezone?.id) },
      gender,
      email,
      username: email,
      phoneNumber,
      tenantId: OUDetail.tenantId,
      countryCode: countryCode.countryCode,
      country: { id: countryId?.id || sessionStorageServices.getItem(APPCONSTANTS.FORM_ID) }
    };
    if (id) {
      payload.id = id;
    }
    dispatch(
      createOperatingUnitAdminReq({
        payload,
        successCb: () => {
          setShowOUAdminModal(false);
          getOperatingUnitDetails(searchTerm);
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.OPERATING_UNIT_ADMIN_CREATE_SUCCESS);
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OPERATING_UNIT_ADMIN_CREATE_FAIL))
          }
        }
      })
    );
  };

  const handleOUAdminDelete = ({ data: { id } }: { data: IOperatingUnitAdmin }) => {
    dispatch(
      deleteOperatingUnitAdminReq({
        payload: { id, tenantId },
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.OPERATING_UNIT_ADMIN_DELETE_SUCCESS);
          getOperatingUnitDetails(searchTerm);
        },
        failureCb: (e: Error) => {
          try {
            throw e;
          } catch (error:any) {
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.OPERATING_UNIT_ADMIN_DELETE_FAIL))
          }
        }
      })
    );
  };

  useEffect(() => {
    getOperatingUnitDetails();
  }, [getOperatingUnitDetails]);

  const handleSearch = useCallback((search: string) => {
    setSearchTerm(search);
  }, []);

  const data = useMemo(
    () => [
      { label: 'Operating Unit Name', value: OUDetail.name },
      { label: 'Account', value: OUDetail.account?.name }
    ],
    [OUDetail]
  );

  const formatName = (user: IOperatingUnitAdmin) => `${user.firstName} ${user.lastName}`;
  const formatPhone = (user: IOperatingUnitAdmin) => {
    return `${user.countryCode && '+ ' + user.countryCode} ${user.phoneNumber}`;
  };

  const columnsDef = [
    { id: 1, name: 'firstName', label: 'ADMIN NAME', cellFormatter: formatName },
    { id: 2, name: 'username', label: 'EMAIL ID', width: '250px' },
    { id: 3, name: 'gender', label: 'GENDER' },
    { id: 5, name: 'phoneNumber', label: 'CONTACT NUMBER', cellFormatter: formatPhone }
  ];

  const renderOUAdminForm = useCallback(
    (form) => (
      <UserForm
        form={form as FormApi<any>}
        initialEditValue={OUAdminForEdit.current.users[0]}
        disableOptions={true}
        isEdit={isOUAdminEdit}
      />
    ),
    [isOUAdminEdit]
  );

  return (
    <>
      {loading && <Loader />}
      <div className='row g-0dot625'>
        <div className='col-12'>
          <DetailCard
            buttonLabel={isReadOnly ? undefined : 'Edit Operating Unit'}
            isEdit={true}
            header='Operating Unit Summary'
            onButtonClick={openOUEditModal}
          >
            <div className='row gy-1 mt-0dot25 mb-1dot25 mx-0dot5'>
              {data.map(({ label, value }) => (
                <div key={label} className={'col-lg-4 col-sm-6'}>
                  <div className='fs-0dot875 charcoal-grey-text'>{label}</div>
                  <div className='primary-title text-ellipsis'>{value || '--'}</div>
                </div>
              ))}
            </div>
          </DetailCard>
        </div>
        <div className='col-12'>
          <DetailCard
            buttonLabel={isReadOnly ? undefined : 'Add Operating Unit Admin'}
            header='Operating Unit Admin'
            isSearch={true}
            onSearch={handleSearch}
            searchPlaceholder={APPCONSTANTS.SEARCH_BY_NAME_EMAIL}
            onButtonClick={handleAddOUAdminClick}
          >
            <CustomTable
              columnsDef={columnsDef}
              rowData={OUAdmins || []}
              isEdit={!isReadOnly}
              isDelete={!isReadOnly}
              onRowEdit={handleEditOUAdminClick}
              onDeleteClick={handleOUAdminDelete}
              deleteTitle={APPCONSTANTS.OPERATING_UNIT_ADMIN_DELETE_TITLE}
              confirmationTitle={APPCONSTANTS.OPERATING_UNIT_ADMIN_DELETE_CONFIRMATION}
            />
          </DetailCard>
        </div>
      </div>
      <ModalForm
        title='Edit Operating Unit'
        cancelText='Cancel'
        submitText='Submit'
        show={showOUEditModal}
        handleCancel={() => setShowOUEditModal(false)}
        handleFormSubmit={handleOUEdit}
        initialValues={OUDetail}
      >
        <OperatingUnitForm isEdit={true} />
      </ModalForm>
      <ModalForm
        title={`${isOUAdminEdit ? 'Edit' : 'Add'} Operating Unit Admin`}
        cancelText='Cancel'
        submitText='Submit'
        show={showOUAdminModal}
        handleCancel={() => setShowOUAdminModal(false)}
        handleFormSubmit={isOUAdminEdit ? handleOUAdminEdit : handleOUAdminCreate}
        initialValues={OUAdminForEdit.current}
        mutators={arrayMutators}
        render={renderOUAdminForm}
      />
    </>
  );
};

export default OperatingUnitSummary;
