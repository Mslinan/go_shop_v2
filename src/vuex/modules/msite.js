import {
  reqAddress,
  reqFoodsCateList,
  reqShopList
} from '../../api/index.js'

import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODSCATE,
  RECEIVE_SHOPLIST
} from '../mutation-types'
const state = {
  latitude: 38.05, // 纬度
  longitude: 114.52, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组
}
const actions = {
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
const mutations = {
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  [RECEIVE_FOODSCATE] (state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPLIST] (state, shops) {
    state.shops = shops
  },
}
const getters = {}



export default {
  state,
  actions,
  mutations,
  getters
}