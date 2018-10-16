//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle:'意见反馈'
  },

  feedback:function(){
    wx.showToast({
      title: '提交成功'
    });
  },

  onLoad: function () {

  }

})
