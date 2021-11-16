import Vue from 'vue'
import App from './App.vue'
import httpservice from "./services/httpServices";
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core';
import {mixin} from './services/mixin';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import "font-awesome/css/font-awesome.min.css";
import 'vuetify/dist/vuetify.min.css'
import moment from 'moment'
import VueSimpleAlert from "vue-simple-alert";
import { debounce } from "debounce";
// import VueConfirmDialog from 'vue-confirm-dialog'
var worldMapData = require('city-state-country');
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faCaretLeft,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';
Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt,faCaretLeft,faCaretRight);
Vue.config.productionTip = false;
httpservice.defaults.timeout = 1000000;
Vue.mixin(mixin);
httpservice.interceptors.request.use((config) => { 
  // console.log(config,"ocnfig") 
  // var body = config?JSON.parse(config.data):null;
  // if(body && body.skipLoader){ console.log(body.skipLoader,"body.skipLoader")}
  // else
   store.commit('SET_IS_LOADING',true);  
  

  config.headers = {
  
 //} 
}
  return config
}, (error) => {  
  return Promise.reject(error)
})

httpservice.interceptors.response.use((response) => {
  store.commit('SET_IS_LOADING', false);  
  return response;
}, (error) => {  
  store.commit('SET_IS_LOADING', false);  

  if (error.response.status === 401) {
    router.push('/');
  }
    return Promise.reject(error)
})
Vue.prototype.location=worldMapData;
Vue.prototype.moment = moment;
Vue.prototype.$apiService = httpservice;
Vue.prototype.debounce=debounce;
import {router} from './router'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import VuePapaParse from 'vue-papa-parse';
import underscore from 'vue-underscore';
new Vue({vuetify,
  router,store,
  render: h => h(App),
}).$mount('#app')
Vue.use(underscore);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSimpleAlert);
Vue.use(require('vue-moment'));
Vue.use(VuePapaParse)
Vue.use(jsPDF)
// Vue.use(VueConfirmDialog)
// Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
