//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle:'消费记录',
    date: '2016-09'
  },

  modifyName:function(){
    wx.showToast({
      title: '修改成功'
    });
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },


  onLoad: function () {

  }

})
