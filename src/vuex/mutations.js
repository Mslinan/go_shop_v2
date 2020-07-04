// 更新state中数据的方法的对象
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODSCATE,
  RECEIVE_SHOPLIST
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
  }
}