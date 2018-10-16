//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle:'添加预约'
  },

  appointmentByHand:function(){
    wx.navigateTo({ url: '../addAppointmentHand/index' });
  },

  onLoad: function () {

  }

})
