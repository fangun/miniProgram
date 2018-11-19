//index.js
const app = getApp()
Page({
  data: {
    switchShow1: true,
    switchShow2: true,
    tel: null,
    verCode: false,
    verCodeValue: null,
    verCodeTime: '获取验证码',
    register: true
  },

  // 手机号获取
  searchInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },

  // 获取短息验证码
  getVerCode: function (e) {
    var that = this;
    var mobile = this.data.tel;

    if (mobile) {
      var mobileLength = mobile.split('').length;
      if (mobileLength == 11) {
        that.setData({
          verCode: true,
          verCodeTime: 60 + 's'
        })
        var time = 59;
        var vct = setInterval(function () {
          if (time > 0) {
            that.setData({
              verCodeTime: time + 's'
            })
            time--;
          } else {
            clearInterval(vct);
            that.setData({
              verCode: false,
              verCodeTime: '获取验证码'
            })
          }
        }, 1000);

        wx.request({
          url: 'https://api.yuyue58.cn/api/GetVerifyCode',
          method: "POST",
          data: {
            mobile: mobile
          },
          header: { "content-type": "application/x-www-form-urlencoded" },
          success(res) {
            if (res.statusCode == 200) {
              that.setData({
                verCodeValue: res.data
              })

              var date = new Date();
              wx.setStorage({
                key: "fangun-verCode",
                data: {
                  'time': date.getTime(),
                  'verCode': res.data
                },
                success(res) {
                  if (res.errMsg) {
                    console.log('验证码缓存设置成功');
                  }
                }
              });
            }
          },
          fail() {
            wx.showToast({
              title: '验证码获取失败',
              image:'../../resource/images/common/cross.png'
            })
          }
        });

      } else {
        wx.showToast({
          title: '请输入正确的手机号',
          image:'../../resource/images/common/cross.png'
        })
      }
    } else {
      wx.showToast({
        title: '请输入手机号',
        image:'../../resource/images/common/cross.png'
      })
    }
  },

  // 注册
  passwordFormSubmit: function (e) {
    var that = this;
    var tel = e.detail.value.tel;
    var password = e.detail.value.password;
    var passwordCopy = e.detail.value.passwordCopy;
    var verCode = e.detail.value.verCode;
    var verCodeValue = this.data.verCodeValue;
    if (!tel || tel == '') {
      wx.showToast({
        title: '请输入手机号',
        
        success: function () { }
      });

    } else if (!password || password == '') {
      wx.showToast({
        title: '请输入密码',
        
        success: function () { }
      });
    } else if (passwordCopy !== password) {
      wx.showToast({
        title: '密码不一致',
        
        success: function () { }
      });
    } else if (!verCode || verCode == '') {
      wx.showToast({
        title: '请输入验证码',
        
        success: function () { }
      });
    } else if (!verCodeValue) {
      wx.showToast({
        title: '请先获取验证码',
        
        success: function () { }
      });
    } else if (verCode !== verCodeValue) {
      wx.showToast({
        title: '验证码不一致',
        
        success: function () { }
      });
    } else {
      that.setData({
        register: false
      });
      wx.request({
        url: 'https://api.yuyue58.cn/api/memberMessage',
        method: "POST",
        data: { mobile: tel },
        header: { "content-type": "application/x-www-form-urlencoded" },
        success(res) {
          if (res.data) {
            wx.request({
              url: 'https://api.yuyue58.cn/api/editMemberMessage',
              method: "POST",
              data: {
                id: res.data[0].id,
                mobile: tel,
                Password: password
              },
              header: { "content-type": "application/x-www-form-urlencoded" },
              success(res) {
                if (res.data) {
                  wx.showToast({
                    title: '密码修改成功',
                    icon: 'success',
                    duration: 1200,
                    success: function () {
                      setTimeout(function () {
                        wx.redirectTo({ url: '../accountLogin/index' });
                      }, 1300);
                    }
                  });
                } else {
                  that.setData({
                    register: true
                  });
                }
              },
              fail() {
                that.setData({
                  register: true
                });
              }
            });
          }
        }
      });
    };
  },

  // 切换密码是否可显示
  switchShow1: function () {
    var switchShow1 = this.data.switchShow1 ? false : true;
    this.setData({
      switchShow1: switchShow1
    })
  },

  switchShow2: function () {
    var switchShow2 = this.data.switchShow2 ? false : true;
    this.setData({
      switchShow2: switchShow2
    })
  },

  // 已有账号,去登录
  accountLogin: function () {
    wx.redirectTo({ url: '../accountLogin/index' });
  },

  onLoad: function () {
    var that = this;
    // 缓存登录信息
    wx.getStorage({
      key: 'fangun-verCode',
      success: function (res) {
        if (res.data) {
          var date = new Date();
          var date2 = date.getTime() - parseInt(res.data.time);
          var leave = date2 % (24 * 3600 * 1000);
          var hours = Math.floor(leave / (3600 * 1000));
          if (hours < 5) {
            that.setData({
              verCodeValue: res.data.verCode
            })
          } else {
            console.log('验证码已过缓存期');
          }
        }

      },
      fail: function (res) {
        console.log('获取验证码缓存失败');
      }
    });

  }

})
