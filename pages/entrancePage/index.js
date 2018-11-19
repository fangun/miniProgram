//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '预约吧'
  },

  customEntrance: function() {
    wx.navigateTo({
      url: `../customEntrance/index`
    })
  },
  
  storeEntrance: function() {
    wx.navigateTo({
      url: `../storeHead/index`
    })
  },

  onLoad: function () {}

})
