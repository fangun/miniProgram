//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '个人中心',
    personalData: null,
  },
  avatarPage: function () {
    wx.navigateTo({ url: '../chooseAvatar/index' });
  },

  namePage: function () {
    wx.navigateTo({ url: '../modifyName/index' });
  },

  passwordPage: function () {
    wx.navigateTo({ url: '../modifyPassword/index' });
  },

  feedback: function () {
    wx.navigateTo({ url: '../feedback/index' });
  },

  expenseCalendarPage: function () {
    wx.navigateTo({ url: '../expenseCalendar/index' });
  },

  onShow: function() {
    var that = this;

    wx.request({
      url: 'https://api.yuyue58.cn/api/memberMessage',
      method:"POST",
      data: {
        id: 'a4b618628dfc466b81f02e8dd5f1dede'
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success(res) {
        console.log(res.data);

        that.setData({
          personalData: res.data[0]
        });
      }
    });
  },

  onLoad: function () {

  }

})
