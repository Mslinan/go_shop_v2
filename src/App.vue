<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShow"></FooterGuide>
  </div>
</template>

<script>

import FooterGuide from './components/FooterGuide/FooterGuide'

export default {
  name: 'App',
  mounted () {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('autoLogin')
  },
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" scoped>
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
