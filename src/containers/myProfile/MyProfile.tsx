import { FormApi } from 'final-form';
import { useCallback, useMemo, useEffect, useState } from 'react';
import arrayMutators from 'final-form-arrays';
import { useDispatch, useSelector } from 'react-redux';

import DetailCard from '../../components/detailCard/DetailCard';
import UserForm from '../../components/userForm/UserForm';
import ModalForm from '../../components/modal/ModalForm';
import { IEditUserDetail } from '../../store/user/types';
import { userIdSelector } from '../../store/user/selectors';
import { fetchUserByIdReq, updateUserRequest } from '../../store/user/actions';
import toastCenter from '../../utils/toastCenter';
import APPCONSTANTS, { ROLE_LABELS } from '../../constants/appConstants';
import Loader from '../../components/loader/Loader';

const MyProfile = (): React.ReactElement => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userDetails, setUserDetails] = useState<IEditUserDetail>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = useCallback(
    () =>
      dispatch(
        fetchUserByIdReq({
          payload: { id: userId },
          successCb: (payload) => {
            setUserDetails(payload);
          },
          failureCb: () => {
            toastCenter.error(APPCONSTANTS.OOPS, APPCONSTANTS.PROFILE_DETAIL_ERROR);
          }
        })
      ),
    [dispatch, userId]
  );
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lableData = useMemo(
    () => [
      { label: 'Name', value: userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : null },
      { label: 'Email ID', value: userDetails?.username, colClassName: 'col-sm-6 col-lg-8' },
      {
        label: 'Mobile Number',
        value: `${userDetails?.countryCode ? '+' + userDetails?.countryCode : ''} ${
          userDetails?.phoneNumber ? userDetails?.phoneNumber : '--'
        }`,
        colClassName: 'col-sm-6 col-lg-4 col-md-6'
      },
      { label: 'Gender', value: userDetails?.gender },
      {
        label: 'Role',
        value: userDetails && ROLE_LABELS[userDetails?.roleName as keyof typeof APPCONSTANTS.ALL_ROLES]
      },
      { label: 'Timezone', value: userDetails?.timezone?.description, colClassName: 'col-12 col-sm-12' }
    ],
    [userDetails]
  );

  const handleEditClick = useCallback(() => {
    setShowEditModal(true);
  }, []);

  const handleEdit = ({ users: [user] }: { users: IEditUserDetail[] }) => {
    const newUser = { ...user } as any;
    newUser.countryCode =
      typeof newUser?.countryCode === 'string' ? newUser.countryCode : newUser?.countryCode?.countryCode;
    newUser.firstName = user.firstName.trim();
    newUser.lastName = user.lastName.trim();
    delete newUser.country;
    setLoading(true);
    dispatch(
      updateUserRequest({
        payload: newUser,
        successCb: () => {
          editSuccess();
        },
        failureCb: () => {
          setLoading(false);
          toastCenter.error(APPCONSTANTS.ERROR, APPCONSTANTS.USER_DETAILS_UPDATE_ERROR);
        }
      })
    );
  };

  const editSuccess = () => {
    setLoading(false);
    setShowEditModal(false);
    fetchUser();
    toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.USER_DETAILS_UPDATE_SUCCESS);
  };

  const renderMyProfileForm = useCallback(
    (form) => (
      <UserForm
        form={form as FormApi<any>}
        initialEditValue={userDetails}
        disableOptions={true}
        isEdit={showEditModal}
        isDropdownDisable={
          userDetails?.roleName === APPCONSTANTS.ROLES.REGION_ADMIN ||
          userDetails?.roleName === APPCONSTANTS.ROLES.SUPER_ADMIN ||
          userDetails?.roleName === APPCONSTANTS.ROLES.SUPER_USER
        }
      />
    ),
    [showEditModal, userDetails]
  );

  return (
    <>
      {loading && <Loader />}
      <DetailCard buttonLabel='Edit My Profile' isEdit={true} header='My Profile' onButtonClick={handleEditClick}>
        <div className='row gy-1 mt-0dot25 mb-1dot25 mx-0dot5'>
          {lableData.map(({ label, value, colClassName }) => (
            <div key={label} className={colClassName || 'col-lg-4 col-sm-6'}>
              <div className='charcoal-grey-text'>{label}</div>
              <div className='primary-title text-ellipsis'>{value || '--'}</div>
            </div>
          ))}
        </div>
      </DetailCard>
      <ModalForm
        show={showEditModal}
        title='Edit My Profile'
        cancelText='Cancel'
        submitText='Submit'
        handleCancel={() => setShowEditModal(false)}
        handleFormSubmit={handleEdit}
        mutators={arrayMutators}
        render={renderMyProfileForm}
      />
    </>
  );
};

export default MyProfile;
