import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { matchPath, useLocation } from 'react-router';

import { ReactComponent as HomeIcon } from '../../assets/images/home.svg';
import { HOME_PAGE_BY_ROLE, PROTECTED_ROUTES } from '../../constants/route';
import { useDispatch, useSelector } from 'react-redux';
import { getRegionDetailSelector } from '../../store/region/selectors';
import { accountSelector } from '../../store/account/selectors';
import { getOperatingUnitDetailSelector } from '../../store/operatingUnit/selectors';
import { siteSelector } from '../../store/site/selectors';
import { roleSelector } from '../../store/user/selectors';
import { clearAccountDetails, setAccountDetails } from '../../store/account/actions';
import APPCONSTANTS from '../../constants/appConstants';

import styles from './Breadcrumb.module.scss';
import sessionStorageServices from '../../global/sessionStorageServices';
import { clearRegionDetail, setRegionDetails } from '../../store/region/actions';
import { clearOperatingUnitDetail, setOperatingUnitDetails } from '../../store/operatingUnit/actions';
import { clearSiteSummary, setSiteSummary } from '../../store/site/actions';

interface ISection {
  route: string;
  label: string;
  appendParent?: boolean;
}

const OURoutes = [
  PROTECTED_ROUTES.OUSummary,
  PROTECTED_ROUTES.siteByOU,
  PROTECTED_ROUTES.userByOU,
  PROTECTED_ROUTES.createSiteByOU,
];

const accountRoutes = [
  PROTECTED_ROUTES.accountSummary,
  PROTECTED_ROUTES.OUByAccount,
  PROTECTED_ROUTES.OUAdminByAccount,
  PROTECTED_ROUTES.siteByAccount,
  PROTECTED_ROUTES.userByAccount,
  PROTECTED_ROUTES.createOUByAccount,
  PROTECTED_ROUTES.createSiteByAccount,
];

const regionRoutes = [
  PROTECTED_ROUTES.regionSummary,
  PROTECTED_ROUTES.accountByRegion,
  PROTECTED_ROUTES.accountAdminByRegion,
  PROTECTED_ROUTES.OUByRegion,
  PROTECTED_ROUTES.OUAdminByRegion,
  PROTECTED_ROUTES.siteByRegion,
  PROTECTED_ROUTES.userByRegion,
  PROTECTED_ROUTES.createAccountByRegion,
  PROTECTED_ROUTES.createOUByRegion,
  PROTECTED_ROUTES.createSiteByRegion,
  PROTECTED_ROUTES.createMedication,
  PROTECTED_ROUTES.createLabTest,
  PROTECTED_ROUTES.medicationByRegion,
  PROTECTED_ROUTES.labTestByRegion,
  PROTECTED_ROUTES.programByRegion,
  PROTECTED_ROUTES.createProgramByRegion,
  PROTECTED_ROUTES.customizationByRegion,
  PROTECTED_ROUTES.accordianViewRegionCustomizationForm,
  PROTECTED_ROUTES.accordianViewAccountWorlflowCustomizationForm,
  PROTECTED_ROUTES.accountWorkflowCustomization
];

const siteRoutes = [
  PROTECTED_ROUTES.siteSummary,
  PROTECTED_ROUTES.siteByRegion,
];

const dashboardRoutes = [
  PROTECTED_ROUTES.regionDashboard,
  PROTECTED_ROUTES.accountDashboard,
  PROTECTED_ROUTES.OUDashboard,
  PROTECTED_ROUTES.siteDashboard
];

const customBreadcrumbs = [
  { route: PROTECTED_ROUTES.createMedication, label: 'Add Medication', appendParent: true },
  { route: PROTECTED_ROUTES.createLabTest, label: 'Add Lab Test', appendParent: true },
  { route: PROTECTED_ROUTES.createRegion, label: 'Create Region', appendParent: true },
  { route: PROTECTED_ROUTES.createAccountByRegion, label: 'Create Account', appendParent: true },
  { route: PROTECTED_ROUTES.createOUByRegion, label: 'Create Operating Unit', appendParent: true },
  { route: PROTECTED_ROUTES.createOUByAccount, label: 'Create Operating Unit', appendParent: true },
  { route: PROTECTED_ROUTES.createSiteByRegion, label: 'Create Site', appendParent: true },
  { route: PROTECTED_ROUTES.createSiteByAccount, label: 'Create Site', appendParent: true },
  { route: PROTECTED_ROUTES.createSiteByOU, label: 'Create Site', appendParent: true },
  { route: PROTECTED_ROUTES.createSuperAdmin, label: 'Create Super Admin' },
  { route: PROTECTED_ROUTES.profile, label: 'Settings' },
  { route: PROTECTED_ROUTES.superAdmin, label: 'Super Admin' },
  { route: PROTECTED_ROUTES.deactivatedRecords, label: 'Deactivated Records' },
  { route: PROTECTED_ROUTES.lockedUsers, label: 'Locked Users' },
  { route: PROTECTED_ROUTES.legalTerms, label: 'Legal Terms' },
  { route: PROTECTED_ROUTES.createProgramByRegion, label: 'Create Program', appendParent: true },
  { route: PROTECTED_ROUTES.createLabTest, label: 'Create Lab Test', appendParent: true },
  { route: PROTECTED_ROUTES.editLabTest, label: 'Edit Lab Test', appendParent: true },
  { route: PROTECTED_ROUTES.accordianViewRegionCustomizationForm, label: 'Screening Form', appendParent: true },
  { route: PROTECTED_ROUTES.accordianViewAccountWorlflowCustomizationForm, label: '', appendParent: true }
];

/**
 * Dynamic breadcrumb for application
 * @returns {React.ReactElement}
 */
const Breadcrumb = (): React.ReactElement => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const region = useSelector(getRegionDetailSelector);
  const account = useSelector(accountSelector);
  const operatingUnit = useSelector(getOperatingUnitDetailSelector);
  const site = useSelector(siteSelector);
  const role = useSelector(roleSelector);

  const activeRoute = useMemo(
    () =>
      Object.values(PROTECTED_ROUTES).find((route) => Boolean(matchPath(pathname, { path: route, exact: true }))) || '',
    [pathname]
  );
  const customBreadcrumb: ISection | undefined = useMemo(() => {
    const breadCrumb = customBreadcrumbs.find(({ route }) =>
      Boolean(matchPath(pathname, { path: route, exact: true }))
    );
    if (breadCrumb) {
      if (
          matchPath(pathname, {
            path: PROTECTED_ROUTES.accordianViewRegionCustomizationForm,
            exact: true
          }) ||
            matchPath(pathname, {
              path: PROTECTED_ROUTES.accordianViewAccountWorlflowCustomizationForm,
              exact: true
            })
      ) {
        const pathArray = pathname.split('/');
        const formName = decodeURIComponent(pathArray[4]);
        return {
          ...breadCrumb,
          label: `${formName.charAt(0).toUpperCase() + formName.slice(1)} Form`,
          route: pathname
        };
      } else {
        return { ...breadCrumb, route: pathname };
      }
    }
  }, [pathname]);

  const showSite = activeRoute.includes(':siteId');
  const showOU =
    (role !== APPCONSTANTS.ROLES.OPERATING_UNIT_ADMIN || OURoutes.includes(activeRoute)) &&
    (showSite || activeRoute.includes(':OUId'));
  const showAccount =
    (role !== APPCONSTANTS.ROLES.ACCOUNT_ADMIN || accountRoutes.includes(activeRoute)) &&
    (showOU || activeRoute.includes(':accountId'));
  const showRegion =
    (role !== APPCONSTANTS.ROLES.REGION_ADMIN || regionRoutes.includes(activeRoute)) &&
    (showAccount || activeRoute.includes(':regionId'));

  const sections: ISection[] = useMemo(() => {
    const result = [];
    if (customBreadcrumb && !customBreadcrumb.appendParent) {
      // we have a custom breadcrumb for certain routes
      // this if block executes when current route is one of customBreadcrumb routes
      result.push(customBreadcrumb);
      return result; // function execution ends here
    }
    if (region?.name && showRegion) {
      result.push({
        label: region.name,
        route: PROTECTED_ROUTES.regionSummary.replace(':regionId', region.id).replace(':tenantId', region.tenantId)
      });
    }
    if (account?.name && showAccount) {
      result.push({
        label: account.name,
        route: PROTECTED_ROUTES.accountSummary.replace(':accountId', account.id).replace(':tenantId', account.tenantId)
      });
    }
    if (operatingUnit?.name && showOU) {
      result.push({
        label: operatingUnit.name,
        route: PROTECTED_ROUTES.OUSummary.replace(':OUId', operatingUnit.id).replace(
          ':tenantId',
          operatingUnit.tenantId
        )
      });
    }
    if (site?.name && showSite) {
      result.push({
        label: site.name,
        route: PROTECTED_ROUTES.siteSummary
          .replace(':siteId', site.id.toString())
          .replace(':tenantId', site.tenantId.toString())
      });
    }
    if (customBreadcrumb && customBreadcrumb.appendParent) {
      // we have a custom breadcrumb for certain routes
      // this if block executes when current route is one of customBreadcrumb routes
      result.push(customBreadcrumb);
    }
    if (!result.length) {
      result.push({
        label: 'Home',
        route: '/'
      });
    }
    return result;
  }, [
    customBreadcrumb,
    region.name,
    region.id,
    region.tenantId,
    showRegion,
    account.name,
    account.id,
    account.tenantId,
    showAccount,
    operatingUnit.name,
    operatingUnit.id,
    operatingUnit.tenantId,
    showOU,
    site.name,
    site.id,
    site.tenantId,
    showSite
  ]);

  const dispatchData = useCallback((routeObject: any, name: string) => {
    return {
      id: routeObject[`:${routeObject.name}Id`],
      tenantId: routeObject[':tenantId'],
      name
    };
  }, []);

  const urlRouteIdDispatch = useCallback(
    (label: any, routeInitArray?: string[], currentRouteArr?: any[]) => {
      let routeObject: any = {};
      if (routeInitArray && currentRouteArr && routeInitArray.length === currentRouteArr.length) {
        routeInitArray?.forEach((route: string, i: number) => {
          routeObject = { ...routeObject, [i === 1 ? 'name' : route]: currentRouteArr[i] };
        });
        if (routeObject.name === APPCONSTANTS.ROUTE_NAMES.REGION) {
          dispatch(setRegionDetails(dispatchData(routeObject, label)));
        }
        if (routeObject.name === APPCONSTANTS.ROUTE_NAMES.ACCOUNT) {
          dispatch(setAccountDetails(dispatchData(routeObject, label)));
        }
        if (routeObject.name === APPCONSTANTS.ROUTE_NAMES.OU) {
          dispatch(setOperatingUnitDetails(dispatchData(routeObject, label)));
        }
        if (routeObject.name === APPCONSTANTS.ROUTE_NAMES.SITE) {
          dispatch(setSiteSummary(dispatchData(routeObject, label)));
        }
      }
    },
    [dispatch, dispatchData]
  );

  const dataPersistOnRefresh = useCallback(() => {
    const storedBC = sessionStorageServices.getItem('breadCrumbs');
    if (storedBC) {
      const breadCrumbs = JSON.parse(storedBC);
      breadCrumbs.forEach((bc: ISection) => {
        const isCustomPath = Boolean(
          customBreadcrumbs.find(({ route }) => Boolean(matchPath(bc.route, { path: route, exact: true })))
        );
        if (!isCustomPath) {
          const routeMatch = Object.values(PROTECTED_ROUTES).find((route) =>
            Boolean(matchPath(bc.route, { path: route, exact: true }))
          );
          const routeInitArray = routeMatch?.split('/');
          const currentRouteArr = bc.route?.split('/');

          urlRouteIdDispatch(bc.label, routeInitArray, currentRouteArr);
        }
      });
      sessionStorageServices.deleteItem('breadCrumbs');
    }
  }, [urlRouteIdDispatch]);

  const prevPathname = useRef(pathname);
  // Clearing the region/account/ou/site data in reducer, to prevent showing wrong data in breadcrumb
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      const prevRoute = {
        isSiteRoute: Boolean(
          siteRoutes.find((route) => Boolean(matchPath(prevPathname.current, { path: route, exact: true })))
        ),
        isOURoute: Boolean(
          OURoutes.find((route) => Boolean(matchPath(prevPathname.current, { path: route, exact: true })))
        ),
        isAccountRoute: Boolean(
          accountRoutes.find((route) => Boolean(matchPath(prevPathname.current, { path: route, exact: true })))
        ),
        isRegionRoute: Boolean(
          regionRoutes.find((route) => Boolean(matchPath(prevPathname.current, { path: route, exact: true })))
        ),
        isDashboardRoute: Boolean(
          dashboardRoutes.find((route) => Boolean(matchPath(prevPathname.current, { path: route, exact: true })))
        )
      };
      const currRoute = {
        isSiteRoute: Boolean(siteRoutes.find((route) => Boolean(matchPath(pathname, { path: route, exact: true })))),
        isOURoute: Boolean(OURoutes.find((route) => Boolean(matchPath(pathname, { path: route, exact: true })))),
        isAccountRoute: Boolean(
          accountRoutes.find((route) => Boolean(matchPath(pathname, { path: route, exact: true })))
        ),
        isRegionRoute: Boolean(
          regionRoutes.find((route) => Boolean(matchPath(pathname, { path: route, exact: true })))
        ),
        isDashboardRoute: Boolean(
          dashboardRoutes.find((route) => Boolean(matchPath(prevPathname.current, { path: route, exact: true })))
        )
      };
      if (!prevRoute.isDashboardRoute && currRoute.isDashboardRoute) {
        dispatch(clearAccountDetails());
        dispatch(clearOperatingUnitDetail());
      }
      if ((prevRoute.isOURoute || prevRoute.isSiteRoute) && !currRoute.isOURoute && !currRoute.isSiteRoute) {
        dispatch(clearOperatingUnitDetail());
      }
      if (
        (prevRoute.isOURoute || prevRoute.isSiteRoute || prevRoute.isAccountRoute) &&
        !currRoute.isOURoute &&
        !currRoute.isSiteRoute &&
        !currRoute.isAccountRoute
      ) {
        dispatch(clearAccountDetails());
      }
      prevPathname.current = pathname;
    }
    dataPersistOnRefresh();
  }, [account, dataPersistOnRefresh, dispatch, dispatchData, operatingUnit, pathname, region, site]);

  const sessionStoreEvent = useCallback(() => {
    sessionStorageServices.setItem(`breadCrumbs`, `${JSON.stringify(sections)}`);
  }, [sections]);

  useEffect(() => {
    window.addEventListener('beforeunload', sessionStoreEvent);
    return () => {
      window.removeEventListener('beforeunload', sessionStoreEvent);
    };
  }, [sessionStoreEvent]);

  const clearData = useCallback(() => {
    dispatch(clearRegionDetail());
    dispatch(clearAccountDetails());
    dispatch(clearOperatingUnitDetail());
    dispatch(clearSiteSummary());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.breadcrumb} d-flex align-items-center`}>
      <Link
        className={`${styles.homeIcon} d-inline-flex align-items-center justify-content-center me-0dot75 lh-0`}
        onClick={clearData}
        to={HOME_PAGE_BY_ROLE[role]}
      >
        <HomeIcon className='d-inline-block' aria-labelledby='Home' />
      </Link>
      <div>
        {sections.map(({ label, route }, i) => (
          <React.Fragment key={label}>
            {!!i && <span className='subtle-color mx-0dot25 align-baseline'>/</span>}
            <NavLink
              to={route}
              activeClassName={`fs-1dot5 fw-bold no-pointer-events ${styles.active}`}
              className={`align-baseline ${styles.breadcrumbLink}`}
              isActive={() => i === sections.length - 1}
            >
              {label}
            </NavLink>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
