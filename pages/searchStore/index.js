//index.js
//获取应用实例
var API = require('../../utils/api.js');
const app = getApp()

Page({
  data: {
    pageTitle: '搜索',
    storeList: [],
    showList: false
  },

  storeHeadPage:function(e){
    console.log(e);
    console.log(app.globalData.coreInfo.mid);
    console.log(app.globalData.coreInfo.mobile);
    if(e.currentTarget.dataset.sid){
      API.miniProgramGoto(e.currentTarget.dataset.sid, app.globalData.coreInfo.mid, app.globalData.coreInfo.mobile);
    }
  },

  searchStore: function (e) {
    var that = this,
    inputName = e.detail.value.inputName;

    if (inputName == '') {
      wx.showModal({
        title: '',
        content: '请输入搜索关键字',
        showCancel: false,
        confirmText: '确定'
      })
    } else {
      wx.request({
        url: 'https://api.yuyue58.cn/api/searchShops',
        method: "POST",
        data: {
          id: inputName
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        success(res) {
          console.log(res.data)
          if (res.data) {
            that.setData({
              showList: true,
              storeList:res.data
            })
          }

        }
      });
    }

  },

  onLoad: function () {

  }

})
