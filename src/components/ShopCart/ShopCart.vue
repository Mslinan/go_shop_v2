<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="isShow=!isShow">
          <div class="logo-wrapper">
            <div class="logo highlight">
              <i class="iconfont icon-shopping_cart highlight"></i>
            </div>
            <div class="num" v-show="totalNum">{{totalNum}}</div>
          </div>
          <div class="price highlight">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥4元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="totalPrice>20?'enough':'not-enough'">
            {{goPay}}
          </div>
        </div>
      </div>
      <!-- 购物车列表 -->
      <transition name="move">
        <div class="shopcart-list" v-show="isShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" v-if="cartArr.length>0">清空</span>
          </div>
          <div class="list-content" ref="foodList">
            <!-- 购物车有商品时的显示 -->
            <ul v-if="cartArr.length > 0">
              <li class="food" v-for="(item, index) in cartArr" :key="index">
                <span class="name">{{item.name}}</span>
                <div class="price"><span>￥{{item.price * item.count}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="item"></CartControl>
                </div>
              </li>
            </ul>
            <!-- 购物车无商品时的显示 -->
            <div v-else class="empty">购物车还没有商品，快去添加商品吧</div>
          </div>
        </div>
      </transition>
      
    </div>
    <transition name="fade">
      <div class="list-mask" @click="isShow=false" v-show="isShow"></div>
    </transition>
</div>
</template>

<script>
import CartControl from '../CartContral/CartContral'
import BScroll from '@better-scroll/core'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['cartArr','totalNum','totalPrice','clearCart']),
    // 还差多少元起送
    surplusPay () {
      const totalPrice = this.totalPrice
      // console.log(this.totalPrice)
      if (totalPrice < 20) {
        return 20 - this.totalPrice
      }
      return totalPrice
    },
    // 去结算显示
    goPay () {
      const totalPrice = this.totalPrice
      const surplusPay = this.surplusPay
      let goPay = ''
      if (totalPrice < 20) {
        goPay = `还差${surplusPay}元起送`
      } else if (totalPrice >= 20) {
        goPay = '去结算'
      }
      // 控制购物车列表的滚动效果
      if (this.cartArr.length > 0 && this.isShow) {
          this.$nextTick(() => {
            /* 
              单例对象: 单一的实例
              1. 创建对象前: 判断对象不存在
              2. 创建对象后: 保存对象
            */
            if (!this.scroll) { // 第一次打开
              this.scroll = new BScroll(this.$refs.foodList, {
                click: true
              })
            } else { // 再次打开
              this.scroll.refresh() // 重新进行高度统计, 看是否需要形成滑动
            }
          })
        }
      return goPay
    }
  },
  methods: {
    
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #f01414
            color: #fff
            font-size 16px
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition: all 0.5s
      &.move-enter, &.move-leave-to
        opacity: 0
        transform translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        position relative
        .empty {
          padding 20px
          color #bbbbbb
          font-size 15px
          left 0
          right 0
          bottom 0
          top 0
          margin 0 29px
        }
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>