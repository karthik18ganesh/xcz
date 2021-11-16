import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {isLoggedIn:false,sideBarEnabled:false,masterData:[],
    selectedEntityRow:null,usersList:[],
    sidebarMenu:[ {
    action: 'mdi-home',
    hasSubmenu:false,
    items: [{ title: 'List Item' }],
    title: 'Home',
  },
     {
    action: 'mdi-view-dashboard',
    hasSubmenu:false,
    items: [{ title: 'List Item' }],
    title: 'Dashboard',
  }],
    isLoading: false,adminDashboard:false,userData:[],
    showAlert:false,alertText:'', title: '', reasons:[], locations:[],tagHeaders:[], companies:[], roles:[], categories:[],userDetails:[],currentPath:''
  },
  mutations: {
    setAdminDashboard(state, value) {	
      state.adminDashboard = value;	
    },
    setUserList(state, value){
state.usersList=value;
    },
    setUserData(state, value) {	
      state.userData = value;	
    },
    setdminDashboard(state, value) {	
      state.adminDashboard = value;	
    },
    SET_IS_LOADING(state, value) {
      state.isLoading = value;
    },
    setSidebarMenu(state, value) {
      state.sidebarMenu = value;
    },
    
    setSidebar(state, value) {
      state.sideBarEnabled = value;
    },
    setSelectedEntity(state, value) {
      state.selectedEntityRow = value;
    },
    setMasterData(state, value) {
      state.masterData = value;
    },
    
    setShowAlert(state, value) {
      state.showAlert = value;
    },
    setLogin(state, value) {
      console.log("st",value)
      state.isLoggedIn = value;
    },
    setTagHeaders(state,value) {
      state.tagHeaders = value;
    },
    setAlertText(state,value) {
      state.alertText = value;
    },
    SetTitle(state, value) {
      state.title = value;
    },
    setCurrentPath(state, value) {
      state.currentPath = value;
    },
    setReasons(state,value) {
      state.reasons = value;
    },
    setLocations(state,value) {
      state.locations = value;
    },
    setCompanies(state,value) {
      state.companies = value;
    },
    setCompaniesType(state,value) {
      state.companiesType = value;
    },
    setAssignedUser(state,value) {
      state.assignedUser = value;
    },
    setRoles(state,value) {
      state.roles = value;
    },
    setCategories(state,value) {
      state.categories = value;
    },
    setUserDetails(state,value) {
      state.userDetails = value;
    }
  },
  getters: {
    userList(state){
return state.usersList;
    },
    adminDashboardEnabled(state) {	
      return state.adminDashboard;	
    },
    isLoading(state) {
      return state.isLoading;
    },
    getMasterData(state) {
      return state.masterData;
    },
    sibeBarEnabled(state){
      return state.sideBarEnabled;
    },
    userData(state){
      return state.userData;
    },
    isLoggedIn(state){
return state.isLoggedIn;
    },
    showAlert(state) {
      return state.showAlert;
    },
    alertText(state) {
      return state.alertText;
    },
    title(state) {
      return state.title;
    },
    tagHeaders(state) {
      return state.tagHeaders;
    },
    currentPath(state) {
      return state.currentPath;
    },
    reasons(state) {
      return state.reasons;
    },
    locations(state) {
      return state.locations;
    },
    companies(state) {
      return state.companies;
    },
    companiesType(state) {
      return state.companiesType;
    },
    assignedUser(state) {
      return state.assignedUser;
    },
    roles(state) {
      return state.roles;
    },
    categories(state) {
      return state.categories;
    },
    sidebarMenu(state) {
      return state.sidebarMenu;
    },
    userDetails(state) {
      return state.userDetails;
    },
    selectedEntity(state) {
      return state.selectedEntityRow;
    }
    
  },
  actions: {
  },
  modules: {
  }
})
