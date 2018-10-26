//index.js
const app = getApp()
Page({
  data: {
    switchShow:false
  },
  // 登录
  loginFormSubmit: function (e) {
    var tel = e.detail.value.tel;
    var password = e.detail.value.password;

    wx.request({
      url: 'https://api.yuyue58.cn/api/passwordLogin',
      method: "POST",
      data: {
        mobile: tel,
        password: password
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success(res) {
        console.log(res.data);
        if (res.data) {
          app.globalData.loginCache = true;
          app.globalData.peopleInfo = res.data;
          wx.showToast({
            title: '登录成功',
            success: function () {
              setTimeout(function () {
                wx.redirectTo({ url: '../customEntrance/index' });
              }, 1500);
            }
          });
        }
      }

    });
  },

  // 免费开通
  freeOpen: function (e) {
    wx.navigateTo({
      url: '../freeOpen/index',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },

  // 切换密码是否可显示
  switchShow:function(){
    var switchShow = this.data.switchShow ? false : true;
    this.setData({
      switchShow: switchShow
    })
  },

  // 忘记密码
  forgetPassword:function(){
    wx.navigateTo({ url: '../forgetPassword/index' });
  },

  onLoad: function () {
  }

})
