import axios from 'axios'
import qs from 'qs'
// 创建一个Axios是市里
const instence = axios.create({
  timeout: 10000,   // 设置请求超时时间 10s
  baseURL: '/api'
})

// 添加请求拦截器，处理POST请求参数（从对象转换为urlencoding格式）
instence.interceptors.request.use(config => {
  if (config.method.toUpperCase() === 'POST' && config.data instanceof Object) {
    config.data = qs.stringify(config.data) // username=admit&pwd=123456
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
    alert(error.message)
    return new Promise(() => {})  // 返回一个pending状态的Promise
  }
)

export default instence