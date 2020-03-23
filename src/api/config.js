'use strict'

// 本地
// const BASE_URL = '/dev-api'

// 测试
// const BASE_URL = 'https://api.lanceyi.com'
// const WEBSITE_URL = 'https://lanceyi.com/dist/'
// const HOST = 'https://lanceyi.com'

// 正式 (正式商户通java和商户通pc端有差异)
const BASE_URL = 'https://m.lanceyi.com'
const WEBSITE_URL = 'https://lanceyi.com/dist/'
const HOST = 'https://lanceyi.com'

export default {
  WEBSITE_URL,
  HOST,
  /** ======================================java 接口========================================= */
  // 判断是否注册过app
  CHECK_REGISTER_APP: { type: 'formData', baseUrl: BASE_URL, api: '/member/router/findMember' },
  // 添加商品
  ADD_GOODS: { type: 'json', baseUrl: BASE_URL, api: '/merchants/tong/add' }
}
