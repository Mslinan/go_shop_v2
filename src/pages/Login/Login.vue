<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">南瓜🎃外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!isRigthPhone || computTime > 0" class="get_verification" 
                :class="{right: isRigthPhone}" @click.prevent="sendCode">
                {{computTime === 0 ? '发送验证码' : `验证码已发送(${computTime})s`}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册南瓜外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" @click="isShowPwd = !isShowPwd" :class="isShowPwd ? 'on' : 'off'">
                  <div class="switch_circle" :class="isShowPwd ? 'right' : ''"></div>
                  <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" ref="captchaRef" :src="'http://localhost:4000/captcha'" 
                @click="changeCaptch" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
import {reqSendCode,reqLoginSms,reqLoginPwd} from '../../api/index'
import { Toast ,MessageBox} from 'mint-ui';
export default {
  data() {
    return {
      loginWay: true, //登录方式，true为短信登录
      phone: '', // 手机号
      code: '', // 手机验证码
      computTime: 0, // 发送验证码剩余时间
      isShowPwd: false, // 是否显示密码,
      name: '',
      pwd: '',
      captcha: ''
    }
  },
  computed: {
    // 手机号是否正确
    isRigthPhone () {
      return /^1[0-9]{10}$/.test(this.phone)
    }
  },
  methods: {
    // 获取验证码
    async sendCode () {
      // 定义发送验证码时长
      let computTime = 10
      // 开启定时器
      const timer = setInterval(() => {
        computTime--
        if (computTime <= 0) {
          clearInterval(timer)
        }
        this.computTime = computTime
      }, 1000);
      // 发请求，获取短信验证码
      const res = await reqSendCode (this.phone)
      // console.log(res)
      if (res.code === 0) {
        Toast('发送短信验证码成功');
      }else {
        this.computTime = 0
        MessageBox('提示', res.msg);
      }
    },
    // 一次性图形验证改变
    changeCaptch () {
      this.$refs.captchaRef.src = 'http://localhost:4000/captcha?time=' + Date.now()
    },
    // 登录
    async login () {
      let res
      if (this.loginWay) {
        // 短信登录
        res = await reqLoginSms(this.phone ,this.code)
      }else {
        // 用户名密码登录
        res = await reqLoginPwd(this.name, this.pwd, this.captcha)
        if (res.code !== 0) {
          // 刷新验证码
          this.changeCaptch()
          // 验证码清空
          this.captcha = ''
        }
      }
      if (res.code === 0) {
        // 登录成功
        // 保存user
        const user = res.data
        this.$store.dispatch('saveUser',user)
        
        // 跳转页面
        this.$router.replace('/profile')
      }else {
        // 登录失败
        MessageBox('提示', '验证码或密码不正确');
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color $blue
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color $blue
            font-weight 700
            border-bottom 2px solid $blue
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid $blue
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background $blue
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color $blue
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background $blue
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
            
</style>