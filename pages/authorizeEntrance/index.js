//index.js
const app = getApp()
Page({
  data: {},
  getPhoneNumber(e) {

    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({  
          title: '提示',  
          showCancel: false,  
          content: '未授权',  
          success: function (res) { }  
      })  
    } else {
      wx.request({
        url: 'https://api.yuyue58.cn/api/wxLogin',
        method: "POST",
        data: {
          app: 'wxb',
          code: app.globalData.code,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res.data)
          if (typeof res.data == 'object') {
            app.globalData.peopleInfo = res.data;

            wx.setStorage({
              key: "fangun-storeFront",
              data: res.data,
              success(res) {
                app.globalData.loginCache = true;
                wx.redirectTo({
                  url: '../customEntrance/index'
                });
              }
            });
          } else {
            wx.showToast({
              title: '授权接口异常',
              success: function() {}
            });
          }

        },
        fail(res) {
          wx.showToast({
            title: '授权接口异常',
            success: function() {}
          });
        }
      });
    }
  },
  onLoad: function() {

    if (app.globalData.loginCache) {
      wx.redirectTo({
        url: '../customEntrance/index'
      });
    }

  }

})