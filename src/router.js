/*
 * @Author       : Lance Yi <latticeyi@gmail.com>
 * @Date         : 2020-12-24 17:13:12
 * @Description  :
 */
import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
// import store from './store'

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    meta: { title: '首页', noAuth: false },
    component: Index
  }
  // {
  //   path: '/author',
  //   name: 'author',
  //   meta: { title: '微信授权登陆中...', noAuth: true },
  //   component: () => import('@/views/author')
  // },
]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new Router({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 从第二页返回首页时savedPosition为undefined
    if (savedPosition || typeof savedPosition === 'undefined') {
      // 只处理设置了路由元信息的组件
      from.meta.isKeepAlive = typeof from.meta.isKeepAlive === 'undefined' ? undefined : false
      to.meta.isKeepAlive = typeof to.meta.isKeepAlive === 'undefined' ? undefined : true
      if (savedPosition) {
        return savedPosition
      }
    } else {
      from.meta.isKeepAlive = typeof from.meta.isKeepAlive === 'undefined' ? undefined : true
      to.meta.isKeepAlive = typeof to.meta.isKeepAlive === 'undefined' ? undefined : false
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta.noAuth) {
    next()
  } else {
    // if (to.path === '/author' && !_.isEmpty(store.state.userWeixinInfo)) {
    //   // 用户使用后退返回到授权页，则默认回到首页
    //   next('/index')
    //   return false
    // }
    // if (_.isEmpty(store.state.userWeixinInfo) && to.path !== '/author') {
    //   // 第一次进入项目
    //   window.sessionStorage.setItem('beforeLoginUrl', to.fullPath) // 保存用户进入的url
    //   next('/author')
    //   return false
    // }
    next()
  }
})

export default router
