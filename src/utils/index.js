/*
 * @Author       : Lance Yi <latticeyi@gmail.com>
 * @Date         : 2020-12-24 16:04:29
 * @Description  : 全局挂载到Vue原型上
 */
import lodash from 'lodash'
import baseUtils from './baseUtils'
import wxApi from './wx-api'
import apiUri from '@/api/config'
import lance from './lance'

export default function (Vue, options) {
  // 直接构建自己的Vue插件
  Object.defineProperty(Vue.prototype, '_', { value: lodash })
  Object.defineProperty(Vue.prototype, '$baseUtils', { value: baseUtils })
  Object.defineProperty(Vue.prototype, '$apiUri', { value: apiUri })
  Object.defineProperty(Vue.prototype, '$wxApi', { value: wxApi })
  Object.defineProperty(Vue.prototype, '$lance', { value: lance })

  // 也可以使用下面这种方式挂载
  // Vue.$baseUtils = Vue.prototype.$baseUtils = baseUtils
}
