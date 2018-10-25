//index.js
const app = getApp()
Page({
  data: {
    switchShow1:true,
    switchShow2:false,
    tel:null,
    verCode:false
  },

  // 手机号获取
  searchInput: function(e){
    this.setData({
      tel: e.detail.value
    })
  },

  // 获取短息验证码
  getVerCode:function(e){
    var that = this;
    var mobile = this.data.tel;

    if(mobile){
      var mobileLength = mobile.split('').length;
      if(mobileLength == 11) {
        that.setData({
          verCode: true
        })

        wx.request({
          url: 'https://api.yuyue58.cn/api/GetVerifyCode',
          method: "POST",
          data: {
            mobile: mobile
          },
          header: { "content-type": "application/x-www-form-urlencoded" },
          success(res) {
          }
        });

        setTimeout(function(){
          that.setData({
            verCode: false
          })
        },30000);

      } else {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 1000
        })
      }
    } else {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1000
      })
    }

  },

  // 注册
  passwordFormSubmit: function (e) {
    console.log(e);

    // wx.request({
    //   url: 'https://api.yuyue58.cn/api/passwordLogin',
    //   method: "POST",
    //   data: {
    //     mobile: tel,
    //     password: password
    //   },
    //   header: { "content-type": "application/x-www-form-urlencoded" },
    //   success(res) {
    //     console.log(res.data);
    //     if (res.data) {
    //       app.globalData.loginCache = true;
    //       app.globalData.coreInfo = res.data;
    //       wx.showToast({
    //         title: '登录成功',
    //         success: function () {
    //           setTimeout(function () {
    //             wx.redirectTo({ url: '../customEntrance/index' });
    //           }, 1500);
    //         }
    //       });
    //     }
    //   }

    // });
  },

  // 切换密码是否可显示
  switchShow1:function(){
    var switchShow1 = this.data.switchShow1 ? false : true;
    this.setData({
      switchShow1: switchShow1
    })
  },

  switchShow2:function(){
    var switchShow2 = this.data.switchShow2 ? false : true;
    this.setData({
      switchShow2: switchShow2
    })
  },

  // 已有账号,去登录
  accountLogin:function(){
    wx.redirectTo({ url: '../accountLogin/index' });
  },

  onLoad: function () {
  }

})
