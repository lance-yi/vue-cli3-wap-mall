import lodash from 'lodash'
import jsMD5 from 'js-md5'
import baseUtils from './baseUtils'
import dateUtils from './DateUtils'
import wxConfig from './wxConfig'
import apiConfig from '@/api/config'
import Html2canvas from 'html2canvas'

export default function (Vue, options) {
  // 直接构建自己的Vue插件
  Object.defineProperty(Vue.prototype, '_', { value: lodash })
  Object.defineProperty(Vue.prototype, '$md5', { value: jsMD5 })
  Object.defineProperty(Vue.prototype, '$baseUtils', { value: baseUtils })
  Object.defineProperty(Vue.prototype, '$apiConf', { value: apiConfig })
  Object.defineProperty(Vue.prototype, '$wx', { value: wxConfig })
  Object.defineProperty(Vue.prototype, '$dateUtils', { value: dateUtils })
  Object.defineProperty(Vue.prototype, '$html2canvas', { value: Html2canvas })

  // 也可以使用下面这种方式挂载
  // Vue.$baseUtils = Vue.prototype.$baseUtils = baseUtils
}
