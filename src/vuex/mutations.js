// 更新state中数据的方法的对象
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODSCATE,
  RECEIVE_SHOPLIST,
  RECEIVE_User,
  LOGOUT,
  RECEIVE_TOKEN
} from './mutation-types'


export default  {
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  [RECEIVE_FOODSCATE] (state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPLIST] (state, shops) {
    state.shops = shops
  },
  [RECEIVE_User] (state, user) {
    state.user = user
  },
  [RECEIVE_TOKEN] (state, token) {
    state.token = token
  },
  [LOGOUT] (state) {
    state.user = {}
    state.token = ''
  }
}