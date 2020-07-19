import Vue from 'vue'
import {
  reqShopGoods,
  reqShopInfo,
  reqShopRatings
} from '../../api/index.js'

import {
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  ADD_FOOD,
  REDUCE_FOOD
} from '../mutation-types'
const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
}
const actions = {
  // 异步获取商家信息
  async getShopInfo({commit}, cb) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})
      cb && cb()
    }
  },
  // 异步获取商家评价列表
  async getShopRatings({commit}, cb) {
    const result = await reqShopRatings()
      if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      cb && cb()
    }
  },
  // 异步获取商家商品列表
  async getShopGoods({commit}, cb) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      cb && cb()
    }
  },
  // 同步更新食物数量
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(ADD_FOOD,food)
    }else {
      commit(REDUCE_FOOD, food)
    }
  }
}
const mutations = {
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
  state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
  state.goods = goods
  },
  [ADD_FOOD] (state, food) {
    if (!food.count) {
      // 第一次添加
      // food.count = 1   这种方法不行
      Vue.set(food, 'count', 1)
    }else {
      food.count++
    }
  },
  [REDUCE_FOOD] (state, food) {
    if (food.count > 0) {
      // 当食物数量不为0
      food.count--
    }
  },
}
const getters = {}



export default {
  state,
  actions,
  mutations,
  getters
}