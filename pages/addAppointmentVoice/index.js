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

  customPage:function(){
    wx.redirectTo({ url: '../customEntrance/index' });
  },

  minePage:function(){
    wx.redirectTo({ url: '../personalDetails/index' });
  },

  // 提示
  voiceTip: function () {
    wx.showModal({
      title: '提示',
      content: '暂未上线,请选择手动输入！',
      showCancel:false,
      confirmText:'知道了',
      confirmColor:'rgba(243,67,67,1)',
      success (res) {
      }
    }) 
  },
  onLoad: function () {

  }

})
