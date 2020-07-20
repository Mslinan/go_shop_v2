import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Header from './components/Header/Header.vue'
import store from './vuex/store'
import Star from './components/Star/Star.vue'
import CartContral from './components/CartContral/CartContral.vue'
import { Button } from 'mint-ui';
import VueLazyload from 'vue-lazyload'
import './mock/mockServr'

Vue.config.productionTip = false
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component('CartContral',CartContral)
Vue.component(Button.name, Button);
Vue.prototype.$eventBus = new Vue()
Vue.use(VueLazyload,{
  loading: './common/images/8.jpeg'
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
