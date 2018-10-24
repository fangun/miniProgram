//app.js
App({
  onLaunch: function () {
    var that = this;

    // // 缓存登录信息
    wx.getStorage({
      key: 'fangun-coreInfo',
      success: function (res) {
        console.log('coreInfo');
        that.globalData.coreInfo = res.data;
        that.globalData.loginCache = true;
        console.log(res.data);
        console.log(that.globalData.loginCache);
      },
      fail: function (res) {
        console.log('没缓存');
      }
    });

    // try {
    //   var value = wx.getStorageSync('coreInfo');
    //   console.log('getStorageSync');
    //   console.log(value);
    //   console.log(typeof value);
    //   if (value) {
    //     that.globalData.coreInfo = res.data;
    //     that.globalData.loginCache = true;
    //   }
    // } catch (e) {
    //   console.log('没缓存');
    // }


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        that.globalData.code = res.code;
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    loginCache: false,
    code: null,
    coreInfo: null,
    sex: null
  }
})