//index.js
//获取应用实例
const app = getApp()

Page({
  
  data: {
    pageTitle: '添加预约',
    remarkState: false
  },

  remarkSwitch: function () {

    var state = this.data.remarkState;
    state = state ? false : true;
    this.setData({
      remarkState: state
    });

  },

  onLoad: function () {

  }

})
