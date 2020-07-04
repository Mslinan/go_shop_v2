// 包含多个发请求的代码,每个对象返回的都是Promise对象
import ajax from './ajax'


// 获取经纬度详情
export const reqAddress = (longitude,latitude) => {
  return ajax.get(`/position/${latitude},${longitude}`)
}

// 获取食品分类列表
export const reqFoodsCateList = () => {
  return ajax('index_category')
}

// 根据经纬度获取商铺列表
export const reqShopList = (longitude,latitude) => {
  return ajax(`/shops`,{
    params: {
      latitude,
      longitude
    }
  })
}

