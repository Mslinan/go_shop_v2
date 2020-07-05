import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'
import {Toast} from 'mint-ui'
import router from '../router/index'
// 创建一个Axios是市里
const instence = axios.create({
  timeout: 10000,   // 设置请求超时时间 10s
  baseURL: '/api'
})

// 添加请求拦截器，
instence.interceptors.request.use(config => {
  // 处理POST请求参数（从对象转换为urlencoding格式）
  if (config.method.toUpperCase() === 'POST' && config.data instanceof Object) {
    config.data = qs.stringify(config.data) // username=admit&pwd=123456
  }
  // 处理token
  const token = store.state.token
  if (config.headers.needToken) {  // 需要token验证
    // 如果token有值, 添加授权的头, 值为token
    if (token) {
      config.headers.Authorization = token
    }else {
      // 抛出异常
      throw new Error('没有token,不发请求')
    } 
  }
  return config
})
// 添加响应拦截器
// 成功回调将返回的response改为response.data
// 失败回调将处理请求异常
instence.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 没有token。直接发请求的错误
    if (!error.response) {
      // 如果不在登录页，跳转回登录页
      if (router.currentRoute.path !== '/login') {
        Toast('没有token,请登录')
        router.replace('/login')
      }
    }
    // 发了请求，token失败
    else if (error.response.status == 401) {
      // 退出登录
      store.dispatch('logout')
      // 如果不在登录页，跳转回登录页
      if (router.currentRoute.path !== '/login') {
        Toast('没有token,请登录')
        router.replace('/login')
      }
    }
    // 404
    else if (error.response.status == 404) {
      Toast('页面不存在')
    }
    // 其他
    Toast(error.message)
    return new Promise(() => {})  // 返回一个pending状态的Promise
  }
)

export default instence