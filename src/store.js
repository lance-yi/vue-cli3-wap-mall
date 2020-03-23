import Vue from 'vue'
import Vuex from 'vuex'
import { SET_STORES_INFO, LOGIN_OUT, USER_WEIXIN_INFO } from './store/mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storesInfo: JSON.parse(window.localStorage.getItem('storesInfo')) || {},
    token: JSON.parse(window.localStorage.getItem('token')) || {},
    userWeixinInfo: JSON.parse(window.localStorage.getItem('userWeixinInfo')) || {}
  },
  mutations: {
    [SET_STORES_INFO] (state, payload) {
      window.localStorage.setItem('storesInfo', JSON.stringify(payload))
      window.localStorage.setItem('token', JSON.stringify(payload.token))
      state.storesInfo = payload
      state.token = payload.token
    },
    [LOGIN_OUT] (state) {
      window.localStorage.removeItem('storesInfo')
      window.localStorage.removeItem('token')
      state.storesInfo = {}
      state.token = {}
    },
    [USER_WEIXIN_INFO] (state, payload) {
      window.localStorage.setItem('userWeixinInfo', JSON.stringify(payload))
      state.userWeixinInfo = payload
    }
  },
  actions: {
    setStoresInfo ({ commit }, data) {
      commit(SET_STORES_INFO, data)
    },
    loginOut ({ commit }) {
      commit(LOGIN_OUT)
      setTimeout(() => {
        window.location.href = `/sht-dist/#/login${window.localStorage.getItem('isApp') ? '?source=app' : ''}`
      }, 1000)
    },
    clearStoreInfo ({ commit }) {
      commit(LOGIN_OUT)
    },
    setUserWeixinInfo ({ commit }, data) {
      commit(USER_WEIXIN_INFO, data)
    }

  }
})
