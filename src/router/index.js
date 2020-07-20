import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../vuex/store'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})


// 在此处进行路由守卫.全局路由守卫
// 1 定义一个数组，来放需要守卫的路径
const paths = ['/a','/b']
router.beforeEach((to, from, next) => {
  // 去 '/a'和'/b' 之前，必须先登录，如果没有登录，就跳转到登录界面
  // console.log(to,from)
  const path = to.path  // 这是要去的目标路由
  if (!store.state.user.token && paths.indexOf(path) !== -1) {  // 登录了
    next('/login')
  }else {   // 没有登录
    next()
  }
})


export default router


