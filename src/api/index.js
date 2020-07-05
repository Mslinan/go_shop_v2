// 包含多个发请求的代码,每个对象返回的都是Promise对象
import ajax from './ajax'


// 获取经纬度详情
export const reqAddress = (longitude,latitude) => {
  return ajax({
    url: `/position/${latitude},${longitude}`,
    headers: {
      needToken: true
    }
  })
}

// 获取食品分类列表
export const reqFoodsCateList = () => {
  return ajax({
    url: 'index_category',
    headers: {
      needToken: true
    }
  })
}

// 根据经纬度获取商铺列表
export const reqShopList = (longitude,latitude) => {
  return ajax(`/shops`,{
    params: {
      latitude,
      longitude
    },
    headers: {
      needToken: true
    }
  })
}

// 发送验证码
export const reqSendCode = (phone) => {
  return ajax('/sendcode',{params: {phone: phone}})
}

// 用户名密码登陆
export const reqLoginPwd = (name, pwd, captcha) => {
  return ajax.post('/login_pwd',{
    name,
    pwd,
    captcha
  })
}

// 手机短信登陆
export const reqLoginSms = (phone ,code) => {
  return ajax.post('/login_sms',{
    phone,
    code
  })
}

// 自动登录
export const reqAutoLogin = () => {
  return ajax('/auto_login',{
    headers: {
      needToken: true
    }
  })
}

