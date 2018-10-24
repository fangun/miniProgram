//index.js
const app = getApp()
Page({
  data: {},
  getPhoneNumber(e) {
    wx.request({
      url: 'https://api.yuyue58.cn/api/wxLogin',
      method: "POST",
      data: {
        app:'wxb',
        code: app.globalData.code,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success(res) {
        app.globalData.coreInfo = res.data;

        wx.setStorage({
          key: "fangun-coreInfo",
          data: res.data,
          success(res){
            app.globalData.loginCache = true;
            wx.redirectTo({ url: '../customEntrance/index' });
          }
        });
      }
    });
  },
  onLoad: function () {}

})
