import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/Goods.vue'
import Rating from '../pages/Shop/Rating.vue'
import Info from '../pages/Shop/Info.vue'

export default [
  {
    path: '/msite',
    component: Msite,
    meta: {
      isShow: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShow: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShow: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShow: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: 'goods',
        component: Goods
      },
      {
        path: 'rating',
        component: Rating
      },
      {
        path: 'info',
        component: Info
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      },
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  },
]