import Vue from 'vue'
import App from './App.vue'

import '@/assets/css/global.css'
import '@/assets/css/z-index.css'

import 'sweetalert2/dist/sweetalert2.css'
import VueSimpleAlert from "vue-simple-alert"

Vue.config.productionTip = false

Vue.use(VueSimpleAlert)

new Vue({
  render: h => h(App),
}).$mount('#app')
