import _ from 'lodash'

// ?  街市订单状态map对象
export const STREET_ORDER_STATUS = {
  WAIT_BUYER_PAY: '待付款',
  WAIT_BUYER_USE: '待使用',
  TRADE_FINISHED: '已完成',
  TRADE_CLOSED_BY_USER: '已取消',
  TRADE_CLOSED_BY_SYSTEM: '交易被系统关闭',
  REFUND_WAIT_SELLER_CONFIRM: '退款等待商家确认',
  REFUND_SUCC: '退款成功',
  SELLER_REJECT_BUYER_REFUND: '商家拒绝退款'
}

// ?  订单状态map对象
export const ORDER_STATUS = {
  wait_buyer_pay: '待付款',
  wait_seller_send_goods: '待发货',
  wait_buyer_confirm_goods: '待收货',
  trade_finished: '交易已完成',
  trade_closed_by_user: '交易主动关闭',
  trade_closed_by_system: '交易被系统关闭',
  refund_wait_seller_confirm: '退款等待商家确认',
  refund_succ: '退款成功',
  seller_reject_buyer_refund: '商家拒绝用户退款'
}

// ?  支付方式
export const PAY_WAY = {
  ZFFS_01: '支付宝支付',
  ZFFS_02: '微信支付',
  ZFFS_05: '零钱支付',
  ZFFS_07: '贝壳支付',
  ZFFS_08: '红包支付',
  ZFFS_09: '金币支付'
}

/**
 * *  订单String字符串转对象
 * @param {*} string
 */
export const jsonPrase = (string) => {
  if (_.isEmpty(string)) {
    return ''
  } else {
    return JSON.parse(string)
  }
}

/**
 * *  街市订单列表tab Array 参数值
 */
export const STREET_ORDER_STATUS_ARRAY = ['', 'WAIT_BUYER_PAY', 'WAIT_BUYER_USE', 'REFUND_WAIT_SELLER_CONFIRM', 'TRADE_FINISHED']
/**
 * *  商品订单列表tab Array 参数值
 */
export const ORDER_STATUS_ARRAY = ['', 'wait_buyer_pay', 'wait_seller_send_goods', 'trade_finished']
