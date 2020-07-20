<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul ref="menuRef">
          <li class="menu-item" :class="{current: currentIndex===index}" 
          v-for="(good, index) in goods" :key="good.name" @click="select(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsRef">
          <li class="food-list-hook" v-for="good in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="food in good.foods" 
              :key="food.name" @click="selsectFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartContral :food="food"></CartContral>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <Food ref="foodRef" :food="food"></Food>
    <ShopCart></ShopCart>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Food from '../../components/food/food'
import ShopCart from '../../components/ShopCart/ShopCart'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      scrollY: 0,
      tops: [], // 右侧商品分类的头部
      food: {}, // 要显示弹窗的食物
    }
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods,
    }),
    // 计算当前索引
    currentIndex () {
      let {tops, scrollY} = this
      const index = tops.findIndex((item, index) => item <= scrollY && tops[index+1] >= scrollY)
      // 如果index有变化
      // if (index!==this.index && this.menuScroll) {
      //   // 保存index
      //   this.index = index
      //   // 在当前分类发生变化时, 让右侧列表滑动当前分类处
      //   const li = this.$refs.menuRef.children[index]
      //   this.menuScroll.scrollToElement(li, 300)
      // }
      return index
    }
  },
  mounted () {
    // 数据获取到以后，调用initScroll函数，创建滚动对象
    // 解决其他路由刷新界面，跳转回商品路由还能使用滚动（例如在评论刷新页面，跳回商品）
    if (this.goods.length > 0) {
      this.initScroll()
      this.initTops()
    }
  },
  watch: {
    // 解决刚刚进入页面，使用滚动
    goods () {
      // 监听goods得到以后，调用initScroll函数，创建滚动对象
      this.$nextTick(() => {
        this.initScroll()
        this.initTops()
      })
    }
  },
  methods: {
    // 初始化滚动
    initScroll () {
      this.menuScroll = new BScroll (this.$refs.menuWrapper, {
        click: true, // 标识分发点击事件
      })
      this.foodsScroll = new BScroll (this.$refs.foodsWrapper, {
        probeType: 2, // 触摸   低频(非实时)
        click: true, // 标识分发点击事件
      })
      // 滑动右边，左边跟着动
      this.foodsScroll.on('scroll', ({y}) => {
        // console.log(x,y)
        this.scrollY = Math.abs(y)
      })
      // 定位滚动结束的位置
      this.foodsScroll.on('scrollEnd', ({y}) => {
        // console.log(x,y)
        this.scrollY = Math.abs(y)
      })
    },
    // 点击左侧菜单，右侧跳到相应位置
    select (index) {
      // console.log(index)
      const tops = this.tops
      const top = tops[index]
      this.scrollY = top
      // 让右侧列表滑动到对应的位置
      this.foodsScroll.scrollTo(0, -top, 300)
    },
    // 初始化tops
    initTops () {
      const list = this.$refs.foodsRef.children
      let tops = []
      let top = 0
      tops.push(0)
      // console.log(list)
      list.forEach(item => {
        top += item.clientHeight
        tops.push(top)
      })
      // console.log(tops)
      this.tops = tops
    },
    // 点击显示食物
    selsectFood (food) {
      this.food = food
      this.$refs.foodRef.toggleShow() // 调用子组件方法
    }
  },
  components: {
    Food,
    ShopCart
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        background: #f3f4f3
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $blue
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
