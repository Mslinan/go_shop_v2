import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Header from './components/Header/Header.vue'
import store from './vuex/store'
import Star from './components/Star/Star.vue'

Vue.config.productionTip = false
Vue.component('Header',Header)
Vue.component('Star',Star)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
