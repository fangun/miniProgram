//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    pageTitle: '添加预约',
    remarkState: false,
    eTimeS: null,
    date: '日期',
    sTime: '开始',
    eTime: '结束'
  },

  remarkSwitch: function () {

    var state = this.data.remarkState;
    state = state ? false : true;
    this.setData({
      remarkState: state
    });

  },
  // 提示
  voiceTip: function () {
    wx.showModal({
      title: '提示',
      content: '暂未上线,请选择手动输入！',
      showCancel: false,
      confirmText: '知道了',
      confirmColor: 'rgba(243,67,67,1)',
      success(res) {
        // if (res.confirm) {
        //   console.log('用户点击确定')
        // } else if (res.cancel) {
        //   console.log('用户点击取消')
        // }
      }
    })
  },

  bindDateChange: function (e) {
    console.log(e);
    this.setData({
      date: e.detail.value
    });
  },

  bindTimeChange: function (e) {
    console.log(e);
    this.setData({
      sTime: e.detail.value
    });
  },

  bindTimeChange1: function (e) {
    console.log(e);
    this.setData({
      eTime: e.detail.value
    });
  },

  onLoad: function () {

  }

})
