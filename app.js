//app.js
App({
  onLaunch: function(options) {
    console.log('onLaunch');
    console.log(options);
    
    var that = this;

    // 缓存登录信息
    wx.getStorage({
      key: 'fangun-storeFront',
      success: function(res) {
        console.log(res)
        if (typeof res.data == 'object') {
          that.globalData.peopleInfo = res.data;
          // that.globalData.sid = res.data.sid;
          that.globalData.loginCache = true;
          //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (that.loginCacheCallback) {
            that.loginCacheCallback(res.data);
          }
        } else {
          console.log('没缓存');
        }

      },
      fail: function(res) {
        console.log('没缓存');
      }
    });

  },

  globalData: {
    code: null,
    loginCache: false,
    peopleInfo: null,

    sex: null,
    havePassword: false
  }
})