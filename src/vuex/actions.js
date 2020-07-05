// 异步函数的方法的对象
import {
  reqAddress,
  reqFoodsCateList,
  reqShopList,
  reqAutoLogin
} from '../api/index'

import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODSCATE,
  RECEIVE_SHOPLIST,
  RECEIVE_User,
  LOGOUT,
  RECEIVE_TOKEN
} from './mutation-types'

export default  {
  // 获取地址经纬度
  async getAddress ({commit, state}) {
    const res = await reqAddress (state.longitude, state.latitude)
    if (res.code === 0) {
      commit(RECEIVE_ADDRESS, res.data)
    } 
  },
  // async getAddress({commit, state}) {
  //   const {longitude,latitude} = state
  //   const result = await reqAddress(longitude,latitude)
  //   if (result.code === 0) {
  //     const address = result.data
  //     commit(RECEIVE_ADDRESS, {address})
  //   } 
  // },
  // 获取食品分类列表
  async getFoodsCate (context) {
    const res = await reqFoodsCateList ()
    if (res.code === 0) {
      context.commit(RECEIVE_FOODSCATE, res.data) 
    }
  },
  // 获取商家列表
  async getShopList ({commit, state}) {
    const res = await reqShopList (state.longitude,state.latitude)
    if (res.code === 0) {
      commit(RECEIVE_SHOPLIST, res.data) 
    }
  },
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