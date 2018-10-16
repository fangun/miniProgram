//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '个人中心'
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

  expenseCalendarPage:function () {
    wx.navigateTo({ url: '../expenseCalendar/index' });
  },

  onLoad: function () {

  }

})
