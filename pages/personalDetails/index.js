//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  avatarPage:function(){
    wx.navigateTo({url: '../chooseAvatar/index'});
  },

  namePage: function () {
    wx.navigateTo({url: '../modifyName/index'});
  },

  onLoad: function () {

  }

})
