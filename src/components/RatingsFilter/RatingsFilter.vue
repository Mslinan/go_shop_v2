<template>
  <div class="ratings-filter">
    <div class="rating-type border-1px">
      <span class="block" :class="type === 2 ? 'active' : ''" @click="showRatings(2)">
        全部<span class="count">{{totalRatings}}</span>
      </span>
      <span class="block" @click="showRatings(0)" :class="type === 0 ? 'active' : ''">
        推荐<span class="count">{{tuijiantotalRatings}}</span>
      </span>
      <span class="block" @click="showRatings(1)" :class="type === 1 ? 'active' : ''">
        吐槽<span class="count">{{tucaototalRatings}}</span>
      </span>
    </div>
    <div class="switch" :class="{on: isOn}" @click="onlySee">
      <span class="iconfont icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    type: Number,
    isOn: Boolean
  },
  computed: {
    ...mapGetters(['totalRatings','tuijiantotalRatings','tucaototalRatings'])
  },
  methods: {
    showRatings (type) {
      this.$eventBus.$emit('setSelectType',type);
    },
    onlySee () {
      this.$eventBus.$emit('seeOnly');
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .ratings-filter
    .rating-type
      padding: 18px 0
      margin: 0 18px
      top-border-1px(rgba(7, 17, 27, 0.1))
      // font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: $blue
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: $blue
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>
