//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    pageTitle: '预约吧',
    hotlistTitle:'我的预约热榜',
    diaryTitle:'我的预约日记',

    hostListData:[{'src':'../../resource/images/customEntrance/test.png','text':'11'}, 
    {'src':'../../resource/images/customEntrance/test.png','text':'22'}, 
    {'src':'../../resource/images/customEntrance/test.png','text':'33'},
    {'src':'../../resource/images/customEntrance/test.png','text':'44'}, 
    {'src':'../../resource/images/customEntrance/test.png','text':'55'}, 
    {'src':'../../resource/images/customEntrance/test.png','text':'66'},
    {'src':'../../resource/images/customEntrance/test.png','text':'77'},
    {'src':'../../resource/images/customEntrance/test.png','text':'88'}]
  },
 
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }

})
