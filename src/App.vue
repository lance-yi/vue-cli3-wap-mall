<template>
  <div id="app">
    <!-- view router -->
    <van-sticky>
      <van-nav-bar
        v-if="ShowBarFlag"
        :title="$route.meta.title"
        :right-text="$route.meta.text"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <transition name="fade">
      <navigation>
        <router-view />
      </navigation>
    </transition>
    <!-- show tabber router name -->
    <div
      v-if="this.$route.name == 'category' || this.$route.name == 'cart' || this.$route.name == 'wode'"
      class="bottom_nav"
    >
      <van-tabbar v-model="active" route>
        <van-tabbar-item v-for="(item, index) in icon" :key="index" :to="item.url">
          <span class="fs-12">{{ item.tabBar }}</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? item.active : item.normal"
            class="iconImage"
          />
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const HideNavBarRouterNameArray = [
  "author",
  "index",
  "category",
  "cart",
  "wode"
];
export default {
  data() {
    return {
      ShowBarFlag: false,
      HideNavBarRouterNameArray,
      show: false,
      active: 0,
      icon: [
        {
          tabBar: "首页",
          url: "/index",
          normal: require("@/assets/images/logo@2x.png"),
          active: require("@/assets/images/logo@2x.png")
        },
        {
          tabBar: "分类",
          url: "/category",
          normal: require("@/assets/images/logo@2x.png"),
          active: require("@/assets/images/logo@2x.png")
        },
        {
          tabBar: "购物车",
          url: "/cart",
          normal: require("@/assets/images/logo@2x.png"),
          active: require("@/assets/images/logo@2x.png")
        },
        {
          tabBar: "我的",
          url: "/wode",
          normal: require("@/assets/images/logo@2x.png"),
          active: require("@/assets/images/logo@2x.png")
        }
      ]
    };
  },
  watch: {
    $route(to, from) {
      this.ShowBarFlag = !(
        _.indexOf(this.HideNavBarRouterNameArray, to.name) > -1
      );
    }
  },
  created() {
    this.setfont();
    this.$navigation.on("forward", (to, from) => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    });
    this.$navigation.on("back", (to, from) => {});
    this.$navigation.on("replace", (to, from) => {});
    this.$navigation.on("refresh", (to, from) => {});
    this.$navigation.on("reset", () => {
      // 刷新清除记录
      this.$navigation.cleanRoutes();
    });
  },
  methods: {
    setfont() {
      if (
        typeof WeixinJSBridge === "object" &&
        typeof WeixinJSBridge.invoke === "function"
      ) {
        handleFontSize();
      } else {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            handleFontSize,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", handleFontSize);
          document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
      }

      function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on("menu:setfont", function() {
          WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
        });
      }
    },
    onClickLeft() {
      this.$baseUtils.goBack(-1);
    }
  }
};
</script>

<style lang="scss">
body {
  background: #f8f8f8;
  -webkit-text-size-adjust: 100% !important;
}

#app {
  font-size: 16px;
  height: 100%;
  width: 100%;
  background: #f8f8f8;
  -webkit-overflow-scrolling: touch;
}

.bottom_nav {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1000;
  display: flex;
  background: #fff;
  border-top: 1px solid #f8f8f8;
}

.iconImage {
  width: 25px !important;
  height: 25px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
  .fade-leave-to
  /* .fade-leave-active in <2.1.8 */
 {
  opacity: 0;
}

@import "./assets/scss/js-base";
@import "./assets/scss/base/eidt-vant-base";
</style>