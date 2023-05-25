import APPCONSTANTS from './appConstants';

export const PUBLIC_ROUTES = {
  login: '/',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password/:token',
  privacyPolicy: '/privacy-policy'
};

export const PROTECTED_ROUTES = {
  screen: '/screening-form',
  accordianViewRegionCustomizationForm: '/region/:regionId/:tenantId/:form/regionCustomize',
  accordianViewAccountWorlflowCustomizationForm:
    '/region/:regionId/:tenantId/:form/accountCustomize/:clinicalWorkflowId/:workflowId',
  regionDashboard: '/region',
  accountDashboard: '/account',
  OUDashboard: '/OU',
  siteDashboard: '/site',
  createRegion: '/region/create',
  createAccountByRegion: '/region/:regionId/:tenantId/account/create',
  createSuperAdmin: '/super-admin/create',
  createOUByRegion: '/region/:regionId/:tenantId/OU/create',
  createOUByAccount: '/account/:accountId/:tenantId/OU/create',
  customizationByRegion: '/region/:regionId/:tenantId/customize',
  accountWorkflowCustomization: '/region/:regionId/:tenantId/customize/accountWorkflow',

  accountByRegion: '/region/:regionId/:tenantId/account',

  accountAdminByRegion: '/region/:regionId/:tenantId/account-admin',

  OUByRegion: '/region/:regionId/:tenantId/OU',
  OUByAccount: '/account/:accountId/:tenantId/OU',

  OUAdminByRegion: '/region/:regionId/:tenantId/ouAdmin',
  OUAdminByAccount: '/account/:accountId/:tenantId/ou-admin',

  siteByRegion: '/region/:regionId/:tenantId/site',
  siteByAccount: '/account/:accountId/:tenantId/site',
  siteByOU: '/OU/:OUId/:tenantId/site',
  createSiteByRegion: '/region/:regionId/:tenantId/site/create',
  createSiteByOU: '/OU/:OUId/:tenantId/site/create',
  createSiteByAccount: '/account/:accountId/:tenantId/site/create',

  programByRegion: '/region/:regionId/:tenantId/program',
  createProgramByRegion: '/region/:regionId/:tenantId/program/create',

  userByRegion: '/region/:regionId/:tenantId/user',
  userByAccount: '/account/:accountId/:tenantId/user',
  userByOU: '/OU/:OUId/:tenantId/user',

  regionSummary: '/region/:regionId/:tenantId',
  accountSummary: '/account/:accountId/:tenantId',
  OUSummary: '/OU/:OUId/:tenantId',
  siteSummary: '/site/:siteId/:tenantId',

  workflowByRegion: '/region/:regionId/:tenantId/workflow',
  workflowByAccount: '/account/:accountId/:tenantId/workflow',

  medicationByRegion: '/region/:regionId/:tenantId/medication',
  createMedication: '/region/:regionId/:tenantId/medication/create',

  labTestByRegion: '/region/:regionId/:tenantId/lab-test',
  createLabTest: '/region/:regionId/:tenantId/lab-test/create',
  editLabTest: '/region/:regionId/:tenantId/lab-test/:labTestId/:labTestTenantId',

  superAdmin: '/super-admin',
  profile: '/profile',
  deactivatedRecords: '/deactivated-records',
  lockedUsers: '/locked-users',
  legalTerms: '/legal-terms'
};

export const HOME_PAGE_BY_ROLE = {
  [APPCONSTANTS.ROLES.SUPER_USER]: PROTECTED_ROUTES.regionDashboard,
  [APPCONSTANTS.ROLES.SUPER_ADMIN]: PROTECTED_ROUTES.regionDashboard,
  [APPCONSTANTS.ROLES.REGION_ADMIN]: PROTECTED_ROUTES.accountDashboard,
  [APPCONSTANTS.ROLES.ACCOUNT_ADMIN]: PROTECTED_ROUTES.OUDashboard,
  [APPCONSTANTS.ROLES.OPERATING_UNIT_ADMIN]: PROTECTED_ROUTES.siteDashboard
};
