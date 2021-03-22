import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import Router from './router'
import vuetify from './plugins/vuetify';
Vue.use(VueRouter)

const router = new VueRouter ({
  mode: 'history',
  routes : Router
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router :router
}).$mount('#app')
