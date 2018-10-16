//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '个人中心',
    personalData: {
      "ID": "a4b618628dfc466b81f02e8dd5f1dede",
      "Loginname": "17152146806",
      "name": "李冲",
      "gender": 1,
      "mobile": "17152146806",
      "openid": "oEfd2waZ69WWbjJ-8tYJqoKyos6U",
      "headPhoto": null,
      "job": null,
      "birthday": null,
      "seatMachine": null
    }
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

  onLoad: function () {

  }

})
