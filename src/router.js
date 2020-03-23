import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
// import store from './store'

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: 'Lance-index',
        noAuth: false
      },
      component: Index
    }
    // {
    //   path: '/author',
    //   name: 'author',
    //   meta: {
    //     title: '微信授权登陆中...',
    //     noAuth: true
    //   },
    //   component: () => import('@/views/author')
    // },
  ],
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
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

  // !不需要用户登录
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
