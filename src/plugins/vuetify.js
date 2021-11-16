import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import VuetifyConfirm from "vuetify-confirm";

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        // primary: '#006B6A',
        // secondary: '#b0bec5',
        // accent: '#8c9eff',
        // error: '#b71c1c',
      },
    },
  },
  });
Vue.use(Vuetify)
Vue.use(VuetifyConfirm, {
    vuetify
  });
const opts = {iconfont: 'fa'}

export default new Vuetify(opts)
