//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle:'修改密码'
  },

  modifyPassword:function(){
    wx.showToast({
      title: '修改成功'
    });
  },

  onLoad: function () {

  }

})
