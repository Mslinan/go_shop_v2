import {
  reqAutoLogin,
} from '../../api/index.js'

import {
  RECEIVE_User,
  LOGOUT,
  RECEIVE_TOKEN,
} from '../mutation-types'

const state = {
  user: {}, // 用户信息
  token: localStorage.getItem('token_Id'),
}
const actions = {
  // 保存用户信息
  saveUser (context,user) {
    // 将token存到local中
    const token = user.token
    localStorage.setItem('token_Id',token)
    // 删除user中的token
    delete user.token
    // 将token保存到state中
    context.commit(RECEIVE_User,user)
    context.commit(RECEIVE_TOKEN, token)
  },
  // 退出登录
  logout ({commit}) {
    // 清除local中的token
    localStorage.removeItem('token_Id')
    commit(LOGOUT)
  },
  // 自动登录
  async autoLogin ({commit}) {
      const result = await reqAutoLogin()
      if (result.code===0) {
        const user = result.data
        commit(RECEIVE_User, user)
    }
  },
}
const mutations = {
  [RECEIVE_User] (state, user) {
    state.user = user
  },
  [RECEIVE_TOKEN] (state, token) {
    state.token = token
  },
  [LOGOUT] (state) {
    state.user = {}
    state.token = ''
  },
}
const getters = {}



export default {
  state,
  actions,
  mutations,
  getters
}