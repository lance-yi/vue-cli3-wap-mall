import _ from 'lodash'
import router from '../router'
import axios from '../api/index'
import apiConf from '../api/config'
import store from '../store'
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

/**
 * *  路由导航
 * @param {*} i
 */
const goBack = (i) => {
  return router.back(i)
}

/**
 * *  获取屏幕高度
 */
const getScreenHeight = () => {
  return document.documentElement.clientHeight || document.body.clientHeight
}

/**
 * *  获取app_token
 */
const getAppToken = () => {
  return new Promise((resolve, reject) => {
    axios.post(apiConf.GET_APP_TOKEN, {
      app_id: apiConf.APP_ID,
      private_key: apiConf.PRIVATE_KEY
    }, res => {
      store.dispatch('setAppToken', res.data)
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

/**
 * *  计算距离
 * @param {*} len
 */
const countDistance = (len) => {
  if (_.isNumber(len)) {
    if (len < 1000) {
      return len + 'm'
    }
    if (len > 10000) {
      return '>10.0km'
    }
    if (len > 5000) {
      return '>5.0km'
    }
    if (len > 3000) {
      return '>3.0km'
    }
    if (len > 1000) {
      return (len / 1000).toFixed(2) + 'km'
    }
  } else {
    return '0m'
  }
}

/**
 * 计算坐标系距离
 * @param {*} lat1 坐标一 经度
 * @param {*} lng1 坐标一 维度
 * @param {*} lat2 坐标二 经度
 * @param {*} lng2 坐标二 维度
 * @return 返回坐标系距离 m
 */
const getDistance = (lat1, lng1, lat2, lng2) => {
  let radLat1 = lat1 * Math.PI / 180.0
  let radLat2 = lat2 * Math.PI / 180.0
  let a = radLat1 - radLat2
  let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * 6378.137// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10
  return s
}

/**
 * *  价格过滤
 * @param {*} price
 */
const regPrice = (price) => {
  let _price = _.ceil(price, 2)
  return _price.toFixed(2)
}

/**
 * * 拨打电话
 * @param {*} phone
 */
const phoneCall = (phone) => {
  if (!_.isEmpty(phone)) {
    window.location.href = `tel://${phone}`
  }
}

/**
 * dataURL 转成 blob
 * @param dataURL
 * @return blob
*/
const dataURL2blob = (dataURL) => {
  let binaryString = atob(dataURL.split(',')[1])
  let arrayBuffer = new ArrayBuffer(binaryString.length)
  let intArray = new Uint8Array(arrayBuffer)
  let mime = dataURL.split(',')[0].match(/:(.*?);/)[1]
  for (let i = 0, j = binaryString.length; i < j; i++) {
    intArray[i] = binaryString.charCodeAt(i)
  }
  let data = [intArray]
  let result
  try {
    result = new Blob(data, { type: mime })
  } catch (error) {
    window.BlobBuilder = window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder
    if (error.name === 'TypeError' && window.BlobBuilder) {
      // eslint-disable-next-line no-undef
      var builder = new BlobBuilder()
      builder.append(arrayBuffer)
      // eslint-disable-next-line no-undef
      result = builder.getBlob(type)
    } else {
      throw new Error('没救了')
    }
  }
  return result
}
/**
 * base64转file
 *
 */
const dataURL2File = (dataURL, filename) => {
  try {
    let arr = dataURL.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  } catch (error) {
    console.warn('Browser does not support the File constructor,Will use blob instead of file')
    return dataURL2blob(dataURL)
  }
}

/**
 * * 静默登录 匹配code
 */
const getUrlParam = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let urlArr = window.location.href.split('?')
  let search = null
  if (_.size(urlArr) > 2) {
    // 微信回调之后的页面
    search = urlArr[1].split('#')[0] + (urlArr[2] ? '&' + urlArr[2] : '')
  } else {
    search = urlArr[1]
  }
  if (search) {
    var r = search.substr(0).match(reg)
    if (r !== null) return unescape(r[2])
    return null
  } else {
    return null
  }
}

// *  登陆后回跳的页面
const goBeforeLoginUrl = () => {
  let url = window.sessionStorage.getItem('beforeLoginUrl')
  if (!url || url.indexOf('/author') !== -1) {
    router.push('/')
  } else {
    if (url === '/') {
      url = '/'
    }
    window.location.href = apiConf.WEBSITE_URL + '#' + url
    window.sessionStorage.setItem('beforeLoginUrl', '')
  }
}
/**
 * * 静默登录  获取微信登录code
 */
const getWeixinCode = () => {
  axios.post(apiConf.GET_WEIXINURL, { url: window.location.href }, res => {
    window.location.href = res.data
  })
}

/**
 * * app暴露的方法
 * @param {*} method 方法名
 * @param {*} obj 对象
 */
const toAppBaseFun = (method, obj, callback) => {
  if (window.jsObj) { // Android
    // 传递分享数据
    if (window.jsObj[method]) {
      if (_.isEmpty(obj)) {
        window.jsObj[method]() // ? 没有参数的方法
      } else if (_.isString(obj)) {
        window.jsObj[method]() // ? 字符串参数方法
      } else {
        window.jsObj[method](JSON.stringify(obj)) // ? JSON对象参数的方法
      }
    }
  } else { // IOS
    setupWebViewJavascriptBridge(function (bridge) {
      // 传递分享数据
      bridge.callHandler(method, obj, function responseCallback (responseData) {
        console.log('JS received response:', responseData)
        return callback(responseData)
      })
    })
  }
}

const appLoginQuiet = function (param) {
  return new Promise((resolve, reject) => {
    axios.post(apiConf.LOGIN_PASSWORD, {
      'mobile': param.phone,
      'password': param.passwd,
      'login_type': 1
    }, res => {
      store.dispatch('setStoresInfo', res.data)
      resolve(1)
    })
  })
}

// iOS初始化
const setupWebViewJavascriptBridge = (callback) => {
  if (window.WebViewJavascriptBridge) {
    // eslint-disable-next-line no-undef
    return callback(WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

export default {
  goBack,
  getScreenHeight,
  getAppToken,
  countDistance,
  getDistance,
  regPrice,
  phoneCall,
  dataURL2blob,
  dataURL2File,
  getUrlParam,
  getWeixinCode,
  goBeforeLoginUrl,
  toAppBaseFun,
  appLoginQuiet
}
