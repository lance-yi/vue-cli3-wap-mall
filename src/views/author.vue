<!-- 进入首页欢迎页面 -->
<template>
  <div class="loading-box">
    <van-loading type="spinner" vertical>微信授权登陆中...</van-loading>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['userWeixinInfo']),
  activated () {
    // 检测有没有登录
    if (_.isEmpty(this.userWeixinInfo)) {
      let ua = window.navigator.userAgent.toLowerCase()
      // eslint-disable-next-line eqeqeq
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // 跳转到微信授权页面
        this.wxLogin()
      } else {
        this.$toast('请在微信中打开登陆~')
      }
    }
  },
  methods: {
    // * 微信登陆
    wxLogin () {
      var code = this.$baseUtils.getUrlParam('code')
      if (code == null || code === '') {
        this.$baseUtils.getWeixinCode()
      }
      if (code !== null) {
        this.$http.post(this.$apiUri.GET_WEIXINUNIONID, { code }, res => {
          if (res.data.errcode > 0) {
            this.$store.dispatch('setUserWeixinInfo', {})
            this.$toast(res.data.errcode)
            return
          }
          this.$store.dispatch('setUserWeixinInfo', res.data)
          this.$baseUtils.goBeforeLoginUrl()
        })
      }
    }
  }
}
</script>

<style lang="scss">
.loading-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  left: 0;
  background: rgba(#ffffff, 0.35);
  z-index: 3500;
}
.loading-box::before {
  display: block;
  content: "";
  width: 100%;
  height: calc(50% - 30px);
}
</style>
