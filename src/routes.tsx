import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';

import { HOME_PAGE_BY_ROLE, PROTECTED_ROUTES, PUBLIC_ROUTES } from './constants/route';
import Login from './containers/authentication/Login';
import ResetPassword from './containers/authentication/ResetPassword';
import ForgotPassword from './containers/authentication/ForgotPassword';
import { getIsLoggedInSelector, roleSelector } from './store/user/selectors';
import Region from './containers/region/Region';
import CreateRegion from './containers/createRegion/CreateRegion';
import CreateSuperAdmin from './containers/createSuperAdmin/CreateSuperAdmin';
import RegionDetail from './containers/region/RegionDetail';
import LabTestList from './containers/labTest/LabTestList';
import { AppLayout } from './components/appLayout/AppLayout';
import MedicationList from './containers/medication/MedicationList';
import OperatingUnitDashboard from './containers/operatingUnit/OperatingUnitDashboard';
import AccountList from './containers/account/AccountList';
import AddMedication from './containers/medication/AddMedication';
import CreateAccount from './containers/createAccount/CreateAccount';
import CreateSite from './containers/createSite/CreateSite';
import SiteList from './containers/site/SiteList';
import SuperAdmin from './containers/superAdmin/SuperAdmin';
import OperatingUnitSummary from './containers/operatingUnit/OperatingUnitSummary';
import AccountSummary from './containers/account/AccountSummary';
import SiteSummary from './containers/site/SiteSummary';
import CreateOperatingUnit from './containers/createOperatingUnit/CreateOperatingUnit';
import SiteDashboard from './containers/site/SiteDashboard';

import APPCONSTANTS from './constants/appConstants';
import AccountDashboard from './containers/account/AccountDashboard';
import OperatingUnitsList from './containers/operatingUnit/OperatingUnitsList';
import AccountAdminList from './containers/account/AccountAdminList';
import OperatingUnitAdmin from './containers/operatingUnitAdmin/OperatingUnitAdmin';
import SiteUserList from './containers/siteUserList/SiteUserList';
import AddLabTest from './containers/labTest/AddLabTest';
import MyProfile from './containers/myProfile/MyProfile';
import DeactivatedRecords from './containers/deactivatedRecords/DeactivatedRecords';
import ProgramList from './containers/program/ProgramList';
import CreateProgram from './containers/program/CreateProgram';
import RegionFormCustomization from './containers/formBuilder/RegionFormCustomization';
import RegionCustomization from './containers/region/RegionCustomization';
import AccountWorkflowCustomization from './containers/account/AccountWorkflowCustomization';
import AccountWorkflowFormCustomization from './containers/formBuilder/AccountWorkflowFormCustomization';
import LockedUsers from './containers/lockedUsers/LockedUsers';
import PrivacyPolicy from './containers/privacyPolicy/PrivacyPolicy';

interface IRoute {
  path: string;
  exact: boolean;
  component: React.FunctionComponent<any> | React.ComponentClass<any>;
}

interface IProtectedRoute extends IRoute {
  authorisedRoles?: string[];
}

export const { SUPER_USER, SUPER_ADMIN, REGION_ADMIN, ACCOUNT_ADMIN, OPERATING_UNIT_ADMIN } = APPCONSTANTS.ROLES;
export const SU_SA = [SUPER_USER, SUPER_ADMIN];
export const SU_SA_RA = [...SU_SA, REGION_ADMIN];
export const SU_SA_RA_AA = [...SU_SA_RA, ACCOUNT_ADMIN];
export const SU_SA_RA_AA_OUA = [...SU_SA_RA_AA, OPERATING_UNIT_ADMIN];
const protectedRoutes: IProtectedRoute[] = (() => {
  return [
    {
      path: PROTECTED_ROUTES.regionDashboard,
      exact: true,
      component: Region,
      authorisedRoles: SU_SA
    },
    {
      path: PROTECTED_ROUTES.createRegion,
      exact: true,
      component: CreateRegion,
      authorisedRoles: SU_SA
    },
    {
      path: PROTECTED_ROUTES.regionSummary,
      exact: true,
      component: RegionDetail,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.siteSummary,
      exact: true,
      component: SiteSummary,
      authorisedRoles: SU_SA_RA_AA_OUA
    },
    {
      path: PROTECTED_ROUTES.medicationByRegion,
      exact: true,
      component: MedicationList,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.OUDashboard,
      exact: true,
      component: OperatingUnitDashboard,
      authorisedRoles: [ACCOUNT_ADMIN]
    },
    {
      path: PROTECTED_ROUTES.accountByRegion,
      exact: true,
      component: AccountList,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.createMedication,
      exact: true,
      component: AddMedication,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.createAccountByRegion,
      exact: true,
      component: CreateAccount,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.createSuperAdmin,
      exact: true,
      component: CreateSuperAdmin,
      authorisedRoles: SU_SA
    },
    {
      path: PROTECTED_ROUTES.createSiteByRegion,
      exact: true,
      component: CreateSite,
      authorisedRoles: SU_SA
    },
    {
      path: PROTECTED_ROUTES.createSiteByOU,
      exact: true,
      component: CreateSite,
      authorisedRoles: SU_SA_RA_AA_OUA
    },
    {
      path: PROTECTED_ROUTES.createSiteByAccount,
      exact: true,
      component: CreateSite,
      authorisedRoles: SU_SA_RA_AA
    },
    {
      path: PROTECTED_ROUTES.siteByRegion,
      exact: true,
      component: SiteList,
      authorisedRoles: SU_SA
    },
    {
      path: PROTECTED_ROUTES.siteByAccount,
      exact: true,
      component: SiteList,
      authorisedRoles: SU_SA_RA_AA
    },
    {
      path: PROTECTED_ROUTES.siteByOU,
      exact: true,
      component: SiteList,
      authorisedRoles: SU_SA_RA_AA_OUA
    },
    {
      path: PROTECTED_ROUTES.programByRegion,
      exact: true,
      component: ProgramList,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.superAdmin,
      exact: true,
      component: SuperAdmin,
      authorisedRoles: SU_SA
    },
    {
      path: PROTECTED_ROUTES.deactivatedRecords,
      exact: true,
      component: DeactivatedRecords,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.lockedUsers,
      exact: true,
      component: LockedUsers,
      authorisedRoles: SU_SA_RA_AA_OUA
    },
    {
      path: PROTECTED_ROUTES.OUSummary,
      exact: true,
      component: OperatingUnitSummary,
      authorisedRoles: SU_SA_RA_AA_OUA
    },
    {
      path: PROTECTED_ROUTES.OUAdminByRegion,
      exact: true,
      component: OperatingUnitAdmin,
      authorisedRoles: SU_SA
    },
    {
      path: PROTECTED_ROUTES.OUAdminByAccount,
      exact: true,
      component: OperatingUnitAdmin,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.accountSummary,
      exact: true,
      component: AccountSummary,
      authorisedRoles: SU_SA_RA_AA
    },
    {
      path: PROTECTED_ROUTES.createOUByRegion,
      exact: true,
      component: CreateOperatingUnit,
      authorisedRoles: SU_SA
    },
    {
      path: PROTECTED_ROUTES.createOUByAccount,
      exact: true,
      component: CreateOperatingUnit,
      authorisedRoles: SU_SA_RA_AA
    },
    {
      path: PROTECTED_ROUTES.accountDashboard,
      exact: true,
      component: AccountDashboard,
      authorisedRoles: [REGION_ADMIN]
    },
    {
      path: PROTECTED_ROUTES.OUByRegion,
      exact: true,
      component: OperatingUnitsList,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.OUByAccount,
      exact: true,
      component: OperatingUnitsList,
      authorisedRoles: SU_SA_RA_AA
    },
    {
      path: PROTECTED_ROUTES.accountAdminByRegion,
      exact: true,
      component: AccountAdminList,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.labTestByRegion,
      exact: true,
      component: LabTestList,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.userByRegion,
      exact: true,
      component: SiteUserList,
      authorisedRoles: SU_SA
    },
    {
      path: PROTECTED_ROUTES.userByAccount,
      exact: true,
      component: SiteUserList,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.userByOU,
      exact: true,
      component: SiteUserList,
      authorisedRoles: SU_SA_RA_AA
    },
    {
      path: PROTECTED_ROUTES.createLabTest,
      exact: true,
      component: AddLabTest,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.editLabTest,
      exact: true,
      component: AddLabTest,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.profile,
      exact: true,
      component: MyProfile,
      authorisedRoles: Object.values(APPCONSTANTS.ROLES)
    },
    {
      path: PROTECTED_ROUTES.siteDashboard,
      exact: true,
      component: SiteDashboard,
      authorisedRoles: [OPERATING_UNIT_ADMIN]
    },
    {
      path: PROTECTED_ROUTES.createProgramByRegion,
      exact: true,
      component: CreateProgram,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.accordianViewRegionCustomizationForm,
      exact: true,
      component: RegionFormCustomization,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.accordianViewAccountWorlflowCustomizationForm,
      exact: true,
      component: AccountWorkflowFormCustomization,
      authorisedRoles: SU_SA_RA
    },
    {
      path: PROTECTED_ROUTES.editLabTest,
      exact: true,
      authorisedRoles: SU_SA_RA,
      component: AddLabTest
    },
    {
      path: PROTECTED_ROUTES.customizationByRegion,
      exact: true,
      authorisedRoles: SU_SA_RA,
      component: RegionCustomization
    },
    {
      path: PROTECTED_ROUTES.accountWorkflowCustomization,
      exact: true,
      authorisedRoles: SU_SA_RA,
      component: AccountWorkflowCustomization
    }
  ];
})();

const publicRoutes = [
  {
    path: PUBLIC_ROUTES.login,
    exact: true,
    component: Login
  },
  {
    path: PUBLIC_ROUTES.forgotPassword,
    exact: true,
    component: ForgotPassword
  },
  {
    path: PUBLIC_ROUTES.resetPassword,
    exact: true,
    component: ResetPassword
  },
  {
    path: PUBLIC_ROUTES.privacyPolicy,
    exact: true,
    component: PrivacyPolicy
  }
];

export const AppRoutes = () => {
  const isLoggedIn = useSelector(getIsLoggedInSelector);
  const role = useSelector(roleSelector);
  return isLoggedIn ? (
    <AppLayout>
      <Switch>
        {protectedRoutes.map((route: IProtectedRoute, index: number) =>
          route.authorisedRoles?.includes(role) ? (
            <Route
              path={route.path}
              exact={route.exact}
              key={index}
              render={(routeProps: RouteComponentProps<any>) => (
                <route.component key={routeProps.location.key} {...routeProps} />
              )}
            />
          ) : null
        )}
        <Redirect exact={true} to={HOME_PAGE_BY_ROLE[role]} />
      </Switch>
    </AppLayout>
  ) : (
    <Switch>
      {publicRoutes.map((route: any, index: number) => (
        <Route
          path={route.path}
          exact={route.exact}
          key={index}
          render={(routeProps: RouteComponentProps<any>) => (
            <route.component key={routeProps.location.key} {...routeProps} />
          )}
        />
      ))}
      <Redirect exact={true} to={PUBLIC_ROUTES.login} />
    </Switch>
  );
};
