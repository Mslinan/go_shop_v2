<template>
  <section class="msite">
    <!-- 首页头部 -->
    <Header :title="address.name || '定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <img src="./images/msite_back.svg" v-if="categorys.length === 0">
      <div class="swiper-container" v-else>
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(categroy, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + categroy.image_url">
              </div>
              <span>{{categroy.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <ShopList></ShopList>
  </section>
</template>

<script>
import ShopList from '../../components/ShopList/ShopList'
import Swiper from 'swiper'
import '../../../node_modules/swiper/swiper-bundle.css'
import chunk from 'lodash/chunk'
import {mapState} from 'vuex'
export default {
  name: 'Msite',
  mounted () {
    this.$store.dispatch('getFoodsCate')
  },
  computed: {
    ...mapState({
      address: state => state.msite.address,
      categorys: state => state.msite.categorys,
    }),
    categorysArr(){
      const {categorys} = this
      return chunk(categorys,8)
    }
  },
  watch:{
    categorys(){
      this.$nextTick(() => {
        new Swiper('.swiper-container',{
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
    }
  },
  components: {
    ShopList
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
.msite  //首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  </style>