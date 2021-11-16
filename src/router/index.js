import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/EntityDashboard',
    name: 'CompanyDetails',
    component: () => import('../components/CompanyDetails.vue'),
  },
  {
    path: '/tagginglanding',
    name: 'Tagging',
    component: () => import('../components/TaggingLanding.vue'),
  },
  {
    path: '/taggingdisplay',
    name: 'TaggingDsiplay',
    component: () => import('../components/TaggingDisplay.vue'),
  },
  {
    path: '/importdetails',
    name: 'ImportDetails',
    component: () => import('../components/ImportDetails.vue'),
  },
  {
    path: '/addcompanydetails',
    name: 'AddCompanyDetails',
    component: () => import('../components/AddCompany.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue'),
  },
  {
    path: '/financials',
    name: 'Financials',
    component: () => import('../components/Financials.vue'),
  },
  {
    path: '/directorsadd',
    name: 'AddDirector',
    component: () => import('../components/AddDirector.vue'),
  },
  {
    path: '/proprietor',
    name: 'Proprietor',
    component: () => import('../components/Proprietor.vue'),
  },
  {
    path: '/addproprietor',
    name: 'AddProprietor',
    component: () => import('../components/AddProprietor.vue'),
  },
  {
    path: '/directors',
    name: 'Directors',
    component: () => import('../components/Directors.vue'),
  },
  {
    path: '/entityProfile',
    name: 'EntityProfile',
    component: () => import('../components/EntityProfile.vue'),
  },

  {
    path: '/homescreen',
    name: 'HomeScreen',
    component: () => import('../components/HomeScreen.vue'),
  },
  {
    path: '/securities',
    name: 'Securities',
    component: () => import('../components/Securities.vue'),
  },
  {
    path: '/newissue',
    name: 'NewIssue',
    component: () => import('../components/NewIssue.vue'),
  },
  {
    path: '/stakeholder',
    name: 'Stakeholder',
    component: () => import('../components/Stakeholder.vue'),
  },
  {
    path: '/stakeholderinfo',
    name: 'StakeholderInfo',
    component: () => import('../components/StakeholderInfo.vue'),
  },
  {
    path: '/stakeholderinfotable',
    name: 'StakeholderInfoTable',
    component: () => import('../components/StakeholderInfoTable.vue'),
  },
  {
    path: '/auditor',
    name: 'Auditor',
    component: () => import('../components/Auditor.vue'),
  },
  {
    path: '/addnewfirm',
    name: 'AddNewFirm',
    component: () => import('../components/AddNewFirm.vue'),
  },
  {
    path: '/addmember',
    name: 'AddMember',
    component: () => import('../components/AddMember.vue'),
  },
  {
    path: '/auditfirminfo',
    name: 'AuditFirmInfo',
    component: () => import('../components/AuditFirmInfo.vue'),
  },
  {
    path: '/fixedassets',
    name: 'FixedAssets',
    component: () => import('../components/FixedAssets.vue'),
  },
  {
    path: '/assetmanagementadd',
    name: 'ManagementAdd',
    component: () => import('../components/ManagementAdd.vue'),
  },
  {
    path: '/investments',
    name: 'Investments',
    component: () => import('../components/Investments.vue'),
  },
  {
    path: '/investmentgroup',
    name: 'InvestmentGroup',
    component: () => import('../components/InvestmentGroup.vue'),
  },
  {
    path: '/inventorycategory',
    name: 'InventoryCategory',
    component: () => import('../components/InventoryCategory.vue'),
  },
  {
    path: '/addinventory',
    name: 'AddInventory',
    component: () => import('../components/AddInventory.vue'),
  },
  {
    path: '/admindashboard',
    name: 'AdminDashboard',
    component: () => import('../components/Admin/AdminDashboard.vue'),
  },
  {
    path: '/adminorganization',
    name: 'AdminOrganization',
    component: () => import('../components/Admin/Organization.vue'),
  },
  {
    path: '/adminusers',
    name: 'AdminUsers',
    component: () => import('../components/Admin/Users.vue'),
  },
  {
    path: '/userDetails',
    name: 'UserDetails',
    component: () => import('../components/Admin/UserDetails.vue'),
  },
  {
    path: '/admingroup',
    name: 'AdminGroup',
    component: () => import('../components/Admin/AdminGroup.vue'),
  },
  {
    path: '/adminentities',
    name: 'AdminEntities',
    component: () => import('../components/Admin/Entities.vue'),
  },
  {
    path: '/EntityFinancial',
    name: 'EntitiesFinancial',
    component: () => import('../components/Admin/EntitiesFinancial.vue'),
  },
  {
    path: '/clientusers',
    name: 'clientusers',
    component: () => import('../components/Admin/ClientUsers.vue'),
  },
  {
    path: '/privileges',
    name: 'privileges',
    component: () => import('../components/Admin/Privileges.vue'),
  },
  {
    path: '/subscription',
    name: 'subscription',
    component: () => import('../components/Admin/Subscription.vue'),
  },
  {
    path: '/selection',
    name: 'Selection',
    component: () => import('../components/Selection.vue'),
  },
  {
    path: '/financialbalancesheet',
    name: 'BalanceSheet',
    component: () => import('../components/BalanceSheet.vue'),
  },
  {
    path: '/financial1',
    name: 'Financial1',
    component: () => import('../components/Financial1.vue'),
  },
  {
    path: '/reclassify',
    name: 'Reclassify',
    component: () => import('../components/Reclassify.vue'),
  },
  {
    path: '/explanation',
    name: 'Explanation',
    component: () => import('../components/AddExplanation.vue'),
  },
  {
    path: '/disclosures',
    name: 'Disclosures',
    component: () => import('../components/ShowDisclosure.vue'),
  },
  {
    path: '/adddisclosures',
    name: 'AddDisclosures',
    component: () => import('../components/AddDisclosure.vue'),
  },
  {
    path: '/selection',
    name: 'Selection',
    component: () => import('../components/Selection.vue'),
  },
  {
    path: '/sharecapital',
    name: 'ShareCapital',
    component: () => import('../components/FinancialBalaneSheet/ShareCapital.vue'),
  },
  {
    path: '/sharecapital1',
    name: 'ShareCapital1',
    component: () => import('../components/FinancialBalaneSheet/ShareCapital1.vue'),
  },
  {
    path: '/sharecapitalauto',
    name: 'ShareCapitalAuto',
    component: () => import('../components/FinancialBalaneSheet/ShareCapitalAuto.vue'),
  },
  {
    path: '/finaldocument',
    name: 'finaldocument',
    component: () => import('../components/FinalDocument.vue'),
  },
  {
    path: '/publishsettings',
    name: 'publishsettings',
    component: () => import('../components/PublishSettings.vue'),
  },
  {
    path: '/publishpreview',
    name: 'publishpreview',
    props: true,
    component: () => import('../components/PublishPreview.vue'),
  },
  {
    path: '/publishpreviewonly',
    name: 'publishpreviewonly',
    props: true,
    component: () => import('../components/PublishPreviewOnly.vue'),
  },
];

export const router = new Router({
  mode: 'history',
  routes,
});
