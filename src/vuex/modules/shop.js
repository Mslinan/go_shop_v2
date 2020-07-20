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
  }
}
const getters = {
  // 构造购物车数组，数量大于1
  cartArr (state) {
    let cartArr = []  // 构造的购物车数组
    const goods = state.goods
    goods.forEach(good => {
      good.foods.forEach(food => {
        if (food.count >= 1) {
          cartArr.push(food)
        }
      })
    })
    return cartArr
  },
  // 计算总数量
  totalNum (state, getters) {
    const cartArr = getters.cartArr
    let totalNum = 0
    cartArr.forEach(food => {
      totalNum += food.count
    })
    return totalNum
  },
  // 计算总价格 = 单价 * 数量
  totalPrice (state, getters) {
    const cartArr = getters.cartArr
    let totalPrice = 0
    cartArr.forEach(food => {
      totalPrice += food.count * food.price
    })
    return totalPrice
  },
  // 计算评论总数
  totalRatings (state) {
    return state.ratings.length
  },
  // 计算吐槽评论总数
  tucaototalRatings (state) {
    let ratings = []
    state.ratings.forEach(rating => {
      if (rating.rateType === 1) {
        ratings.push(rating)
      }
    });
    return ratings.length
  },
  // 计算推荐评论总数
  tuijiantotalRatings (state) {
    let ratings = []
    state.ratings.forEach(rating => {
      if (rating.rateType === 0) {
        ratings.push(rating)
      }
    });
    return ratings.length
  },
}



export default {
  state,
  actions,
  mutations,
  getters
}