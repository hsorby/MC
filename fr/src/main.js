import Vue from 'vue'
import App from './App.vue'

import '@/assets/css/global.css'
import '@/assets/css/z-index.css'

import 'sweetalert2/dist/sweetalert2.css'
import VueSimpleAlert from "vue-simple-alert"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMinus)

Vue.config.productionTip = false

Vue.use(VueSimpleAlert)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
}).$mount('#app')
