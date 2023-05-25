import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

import APPCONSTANTS from '../../constants/appConstants';
import { PROTECTED_ROUTES } from '../../constants/route';
import sessionStorageServices from '../../global/sessionStorageServices';
import { roleSelector } from '../../store/user/selectors';

import styles from './SideMenu.module.scss';

interface ISideMenuItem {
  label: string;
  route: string;
  collapsible?: boolean;
}

interface ISideMenuProps {
  className?: string;
}

const regionRoutes = [
  {
    label: 'Summary & Admin',
    route: PROTECTED_ROUTES.regionSummary,
    collapsible: false,
    type: 'regionAdmin'
  },
  {
    label: 'Region Customization',
    route: PROTECTED_ROUTES.customizationByRegion,
    collapsible: false,
    type: 'regionAdmin'
  },
  {
    label: 'Medication Database',
    route: PROTECTED_ROUTES.medicationByRegion,
    collapsible: false,
    disabled: false,
    type: 'regionAdmin'
  },
  {
    label: 'Lab Test Database',
    route: PROTECTED_ROUTES.labTestByRegion,
    collapsible: false,
    type: 'regionAdmin'
  },
  {
    label: 'Account Workflow',
    route: PROTECTED_ROUTES.accountWorkflowCustomization,
    collapsible: false,
    disabled: false,
    type: 'regionAdmin'
  },
  {
    label: 'Account',
    route: PROTECTED_ROUTES.accountByRegion,
    collapsible: true,
    disabled: false
  },
  {
    label: 'Account Admin',
    route: PROTECTED_ROUTES.accountAdminByRegion,
    collapsible: true
  },
  {
    label: 'Operating Unit',
    route: PROTECTED_ROUTES.OUByRegion,
    collapsible: true,
    disabled: false
  },
  {
    label: 'OU Admin',
    route: PROTECTED_ROUTES.OUAdminByRegion,
    collapsible: true
  },
  {
    label: 'Site',
    route: PROTECTED_ROUTES.siteByRegion,
    collapsible: true,
    disabled: false
  },
  {
    label: 'Program',
    route: PROTECTED_ROUTES.programByRegion,
    collapsible: true,
    type: 'regionAdmin'
  },
  {
    label: 'User',
    route: PROTECTED_ROUTES.userByRegion,
    collapsible: true
  }
];

const accountRoutes = [
  {
    label: 'Summary & Admin',
    route: PROTECTED_ROUTES.accountSummary
  },
  {
    label: 'Operating Unit',
    route: PROTECTED_ROUTES.OUByAccount
  },
  {
    label: 'OU Admin',
    route: PROTECTED_ROUTES.OUAdminByAccount
  },
  { label: 'Site', route: PROTECTED_ROUTES.siteByAccount, collapsible: true },
  { label: 'User', route: PROTECTED_ROUTES.userByAccount, collapsible: true }
];

const ouRoutes = [
  { label: 'Summary & Admin', route: PROTECTED_ROUTES.OUSummary },
  { label: 'Site', route: PROTECTED_ROUTES.siteByOU },
  { label: 'User', route: PROTECTED_ROUTES.userByOU }
];

const siteRoutes = [
  { label: 'Summary & Admin', route: PROTECTED_ROUTES.siteSummary }
];

const SideMenu = ({ className }: ISideMenuProps) => {
  const { pathname } = useLocation();

  const role = useSelector(roleSelector);

  // sidemenu collapse state handling
  const [isCollapsed, setIsCollapsed] = useState(
    sessionStorageServices.getItem(APPCONSTANTS.IS_SIDEMENU_COLLAPSED) !== 'false'
  );
  useEffect(() => {
    sessionStorageServices.setItem(APPCONSTANTS.IS_SIDEMENU_COLLAPSED, isCollapsed);
  }, [isCollapsed]);

  const { regionId, regionTenantId } = useMemo(() => {
    const matchedRoute = regionRoutes.find(({ route }) => matchPath(pathname, { path: route, exact: true }));
    if (matchedRoute) {
      const params = matchPath(pathname, { path: matchedRoute.route, exact: true })?.params as any;
      return { regionId: params?.regionId, regionTenantId: params?.tenantId };
    }
    return {};
  }, [pathname]);

  const { siteId, siteTenantId } = useMemo(() => {
    const matchedRoute = siteRoutes.find(({ route }) => matchPath(pathname, { path: route, exact: true }));
    if (matchedRoute) {
      const params = matchPath(pathname, { path: matchedRoute.route, exact: true })?.params as any;
      return { siteId: params?.siteId, siteTenantId: params?.tenantId };
    }
    return {};
  }, [pathname]);

  const { accountId, accountTenantId } = useMemo(() => {
    const matchedRoute = accountRoutes.find(({ route }) => matchPath(pathname, { path: route, exact: true }));
    if (matchedRoute) {
      const params = matchPath(pathname, { path: matchedRoute.route, exact: true })?.params as any;
      return { accountId: params?.accountId, accountTenantId: params?.tenantId };
    }
    return {};
  }, [pathname]);

  const { OUId, OUTenantId } = useMemo(() => {
    const matchedRoute = ouRoutes.find(({ route }) => matchPath(pathname, { path: route, exact: true }));
    if (matchedRoute) {
      const params = matchPath(pathname, { path: matchedRoute.route, exact: true })?.params as any;
      return { OUId: params?.OUId, OUTenantId: params?.tenantId };
    }
    return {};
  }, [pathname]);

  const [collapsibleMenus, nonCollapsibleMenus] = useMemo(() => {
    const collapsibleItems: ISideMenuItem[] = [];
    const nonCollapsibleItems: ISideMenuItem[] = [];
    let choosenRoutes: ISideMenuItem[] = [];
    const pathParams: Array<[string, string]> = [];
    if (regionId && regionTenantId) {
      choosenRoutes = [...(role === APPCONSTANTS.ROLES.REGION_ADMIN ? regionRoutes.filter((route) => route.type === 'regionAdmin') : regionRoutes)];
      pathParams.push([':regionId', regionId], [':tenantId', regionTenantId]);
    }
    if (accountId && accountTenantId) {
      choosenRoutes = [...(role === APPCONSTANTS.ROLES.ACCOUNT_ADMIN ? accountRoutes.slice(0, 1) : accountRoutes)];
      pathParams.push([':accountId', accountId], [':tenantId', accountTenantId]);
    }
    if (OUId && OUTenantId) {
      choosenRoutes = [...ouRoutes];
      pathParams.push([':OUId', OUId], [':tenantId', OUTenantId]);
    }
    if (siteId && siteTenantId) {
      choosenRoutes = [...siteRoutes];
      pathParams.push([':siteId', siteId], [':tenantId', siteTenantId]);
    }
    choosenRoutes.forEach((menu: ISideMenuItem) => {
      menu = { ...menu };
      pathParams.forEach(([paramName, paramValue]) => {
        menu.route = menu.route.replace(paramName, paramValue);
      });
      if (menu.collapsible) {
        collapsibleItems.push(menu);
      } else {
        nonCollapsibleItems.push(menu);
      }
    });
    return [collapsibleItems, nonCollapsibleItems];
  }, [regionId, regionTenantId, accountId, accountTenantId, siteId, siteTenantId, OUId, OUTenantId, role]);

  return (
    <div className={`${styles.sideMenu} py-0dot25 ${className}`}>
      {nonCollapsibleMenus.map(({ label, route, disabled }: any, i: number) => {
        const isActive = matchPath(pathname, { exact: true, path: route });
        return (
          <NavLink
            to={route}
            key={`label_${i}`}
            className={`d-block lh-1dot375 py-0dot625 ps-1 pe-1dot25 my-0dot25 pointer ${styles.menuItem} ${
              isActive ? styles.selected : ''
              } ${disabled ? 'no-pointer-events' : ''}`}
          >
            {label}
          </NavLink>
        );
      })}
      {!isCollapsed &&
        collapsibleMenus.map(({ label, route, disabled }: any, i: number) => {
          const isActive = matchPath(pathname, { exact: true, path: route });
          return (
            <NavLink
              to={route}
              key={`label_${i}`}
              className={`d-block lh-1dot375 py-0dot625 ps-1 pe-1dot25 my-0dot25 pointer ${styles.menuItem} ${
                isActive ? styles.selected : ''
                } ${disabled ? 'no-pointer-events' : ''}`}
            >
              {label}
            </NavLink>
          );
        })}
      {!!collapsibleMenus.length && (
        <div
          className={`d-block lh-1dot375 py-0dot625 ps-1 pe-1dot25 my-0dot25 pointer ${styles.menuItem} ${styles.showMore}`}
          onClick={(e) => {
            e.stopPropagation(); // to prevent menu closing in low resolution devices
            setIsCollapsed((prev) => !prev);
          }}
        >
          {isCollapsed ? 'Show More' : 'Show Less'}
        </div>
      )}
    </div>
  );
};

export default SideMenu;
