import wx from 'weixin-js-sdk'

// 发起支付
const wxPay = (data, callback, errorCallback) => {
  // 获取后台传入的数据
  let appId = data.appId
  let timestamp = data.timeStamp
  let nonceStr = data.nonceStr
  let signature = data.paySign
  let packages = data.package
  let signType = data.signType
  let paySign = data.paySign
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature, // 必填，签名，见附录1
    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
  wx.ready(function () {
    wx.chooseWXPay({
      timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
      package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: paySign, // 支付签名
      success: function (res) {
        // 支付成功后的回调函数
        callback(res)
      },
      fail: function (res) {
        // 失败回调函数
        errorCallback(res)
      }
    })
  })
  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  })
}
// 微信分享
const wxShare = (goods, data, callback, errorCallback) => {
  // 获取后台传入的数据
  let appId = data.appId
  let timestamp = data.timestamp
  let nonceStr = data.nonceStr
  let signature = data.signature
  let url = data.url
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature, // 必填，签名
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
  })
  // 拼接当前地址
  // let shareUrl = window.location.href.split('#')[0] + '#' + window.location.href.split('#')[1]
  // shareUrl = shareUrl.split('#')[0] + '/redirect.html?appRedirect=' + encodeURIComponent(shareUrl)
  let shareUrl = url + '#' + window.location.href.split('#')[1] + '&type=share'
  shareUrl = url + 'redirect.html?appRedirect=' + encodeURIComponent(shareUrl)
  wx.ready(function () {
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: goods.title,
      desc: goods.desc,
      link: shareUrl,
      imgUrl: goods.imgUrl,
      success: function (res) {
        callback(res)
        console.log('分享成功')
      },
      cancel: function (res) {
        errorCallback(res)
        console.log('分享失败！')
      }
    })
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: goods.title,
      link: shareUrl,
      imgUrl: goods.imgUrl,
      success: function (res) {
        callback(res)
        console.log('分享成功')
      },
      cancel: function (res) {
        errorCallback(res)
        console.log('分享失败！')
      }
    })
  })
}
export default {
  wxPay,
  wxShare,
  wx
}
