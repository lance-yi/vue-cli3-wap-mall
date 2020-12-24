/*
 * @Author       : Lance Yi <latticeyi@gmail.com>
 * @Date         : 2020-12-24 16:06:15
 * @Description  : VUE2.0 主类
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 移动端适配
import 'amfe-flexible'
// 配置axios
import api from './api/index.js'
// 导入自定义包
import utils from './utils/index'
// 引入map
import BaiduMap from 'vue-baidu-map'
import Navigation from 'vue-navigation'

import {
  Tabbar,
  TabbarItem,
  Button,
  Cell,
  CellGroup,
  Icon,
  Image,
  Row,
  Col,
  Popup,
  DatetimePicker,
  Field,
  Picker,
  Uploader,
  ActionSheet,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Loading,
  Notify,
  Overlay,
  Toast,
  Sticky,
  NavBar,
  Pagination,
  Area,
  SubmitBar
} from 'vant'

// 手机调试工具
// import VConsole from 'vconsole'
// const vConsole = new VConsole()
// console.log(vConsole.version)

if (process.env.NODE_ENV === 'development') {
  Vue.use(BaiduMap, {
    /* 需要注册百度地图开发者来获取你的ak */
    ak: 'x1W6Q9BbXxuypLbKoYmAWZp1KOVdX3ey'
  })
}

Vue.use(Navigation, { router, store })

Vue.use(utils)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Image)
  .use(Row)
  .use(Col)
  .use(Popup)
  .use(DatetimePicker)
  .use(Field)
  .use(Picker)
  .use(Uploader)
  .use(ActionSheet)
  .use(Dialog)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Loading)
  .use(Notify)
  .use(Overlay)
  .use(Toast)
  .use(Sticky)
  .use(NavBar)
  .use(Pagination)
  .use(Area)
  .use(SubmitBar)

Vue.config.productionTip = false

Vue.prototype.$http = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
