import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconGlobal from '../../assets/images/icon-global.svg';
import IconAdmin from '../../assets/images/icon-admin.svg';
import IconDeactivated from '../../assets/images/icon-deactivated.svg';
import LockedUserIcon from '../../assets/images/user-lock.svg';
import IconLegal from '../../assets/images/icon-legal.svg';
import IconProfile from '../../assets/images/icon-profile.svg';
import { PROTECTED_ROUTES } from '../../constants/route';
import { roleType } from '../../store/user/types';
import APPCONSTANTS from '../../constants/appConstants';
import { formDataIdSelector, tenantIdSelector } from '../../store/user/selectors';

import styles from './Header.module.scss';
import { SU_SA, SU_SA_RA, SU_SA_RA_AA, SU_SA_RA_AA_OUA } from '../../routes';

interface IUserMenuItem {
  label: string;
  icon: string;
  route: string;
  roles: string[];
}

interface IUserMenuProps {
  role: roleType;
}

const { ROLES } = APPCONSTANTS;

const UserMenu = ({ role }: IUserMenuProps) => {
  const formDataId = useSelector(formDataIdSelector);
  const tenantId = useSelector(tenantIdSelector);
  const menus = [
    {
      label: 'Super Admins',
      icon: IconAdmin,
      route: PROTECTED_ROUTES.superAdmin,
      roles: SU_SA
    },
    {
      label: 'Region Details',
      icon: IconGlobal,
      route: PROTECTED_ROUTES.regionSummary.replace(':regionId', formDataId).replace(':tenantId', tenantId),
      roles: [ROLES.REGION_ADMIN]
    },
    {
      label: 'Account Details',
      icon: IconGlobal,
      route: PROTECTED_ROUTES.accountSummary.replace(':accountId', formDataId).replace(':tenantId', tenantId),
      roles: [ROLES.ACCOUNT_ADMIN]
    },
    {
      label: 'Operating Unit Details',
      icon: IconGlobal,
      route: PROTECTED_ROUTES.OUSummary.replace(':OUId', formDataId).replace(':tenantId', tenantId),
      roles: [ROLES.OPERATING_UNIT_ADMIN]
    },
    {
      label: 'Deactivated Records',
      icon: IconDeactivated,
      route: PROTECTED_ROUTES.deactivatedRecords,
      roles: SU_SA_RA
    },
    {
      label: 'Locked Users',
      icon: LockedUserIcon,
      route: PROTECTED_ROUTES.lockedUsers,
      roles: SU_SA_RA_AA_OUA
    },
    {
      label: 'Legal Terms',
      icon: IconLegal,
      route: PROTECTED_ROUTES.legalTerms,
      roles: SU_SA_RA_AA
    },
    {
      label: 'My Profile',
      icon: IconProfile,
      route: PROTECTED_ROUTES.profile,
      roles: Object.values(ROLES)
    }
  ];
  const permittedMenus = menus.filter(({ roles }) => roles?.includes(role));
  return (
    <>
      {permittedMenus.map(({ label, icon, route }: IUserMenuItem, key) => (
        <NavLink to={route} key={`label_${key}`} activeClassName='no-pointer-events' exact={true}>
          <div
            className={`dropdown-item px-0dot875 py-0dot75 pointer \
              d-flex align-items-center ${styles.navbarDropdownItem}`}
          >
            <div className={`${styles.iconWrapper} me-0dot75 d-flex align-items-center justify-content-center`}>
              <img src={icon} alt={label} width={16} height={16} />
            </div>
            {label}
          </div>
        </NavLink>
      ))}
    </>
  );
};

export default UserMenu;
