// 异步函数的方法的对象
import {
  reqAddress,
  reqFoodsCateList,
  reqShopList
} from '../api/index'

import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODSCATE,
  RECEIVE_SHOPLIST
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
}