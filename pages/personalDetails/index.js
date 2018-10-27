//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '个人中心',
    personalData: null,
    tabbarActive: true,
    gbModal: false
  },

  avatarPage: function() {
    wx.navigateTo({
      url: '../chooseAvatar/index'
    });
  },

  namePage: function() {
    wx.navigateTo({
      url: '../modifyName/index'
    });
  },

  passwordPage: function() {
    wx.navigateTo({
      url: '../modifyPassword/index'
    });
  },

  feedback: function() {
    wx.navigateTo({
      url: '../feedback/index'
    });
  },

  expenseCalendarPage: function() {
    wx.navigateTo({
      url: '../expenseCalendar/index'
    });
  },

  customPage: function() {
    wx.redirectTo({
      url: '../customEntrance/index'
    });
  },

  appointmentVoice: function(e) {
    wx.redirectTo({
      url: '../addAppointmentVoice/index'
    });
  },

  gbModalSwitch: function(e) {
    var state = this.data.gbModal ? false : true;
    this.setData({
      gbModal: state
    });
  },

  chosseAvatar: function(e) {
    var that = this;
    var gender = e.currentTarget.dataset.gender;
    wx.request({
      url: 'https://api.yuyue58.cn/api/editMemberMessage',
      method: "POST",

      data: {
        id: app.globalData.peopleInfo.mid,
        Gender: gender
      },

      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        wx.showToast({
          title: '修改成功',
          success: function() {
            setTimeout(function() {

              that.setData({
                gbModal: false
              });

              app.globalData.sex = gender;
              that.onShow();

            }, 1600);
          }
        });

      },
      fail() {
        wx.showToast({
          title: '修改失败'
        });
      }
    });
  },

  onShow: function() {
    var that = this;

    wx.request({
      url: 'https://api.yuyue58.cn/api/memberMessage',
      method: "POST",
      data: {
        id: app.globalData.peopleInfo.mid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {

        if (res.data) {
          that.setData({
            personalData: res.data[0]
          });

          app.globalData.sex = res.data[0].gender;
          app.globalData.havePassword = res.data[0].password;
        }

      }
    });
  },

  // 拨打电话
  makingCalls: function(e) {
    var phoneNumber = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },

  // 退出登录
  exitLogin: function(e) {

    wx.removeStorage({
      key: 'fangun-storeFront',
      success: function(res) {
        console.log('退出登录');
        console.log(res);
        app.globalData.loginCache = false;
        wx.showToast({
          title: '登录退出成功',
          success: function() {
            setTimeout(function() {
              // 授权页
              wx.redirectTo({
                url: '../customEntrance/index'
              });
            }, 1600);
          }
        });

      }
    });

  },

  onLoad: function() {

  }

})