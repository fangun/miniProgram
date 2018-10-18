//index.js
//获取应用实例
var complete = require('../../utils/complete.js');

const app = getApp()

Page({
  data: {
    apiPrefix: 'https://www.yuyue58.cn/fileImage/',
    pageTitle: '预约吧',
    hotlistTitle: {
      'c': '我的预约热榜',
      'e': 'Appointment Trending'
    },
    diaryTitle: {
      'c': '我的预约日记',
      'e': 'Appointment Book'
    },

    hostListData: null,
    completedData: true,

    completingData: false,
    completingSeqData: false,
    completingTitleData: false,
    completingTime: false,

    tabState: 'doing',
    tabContentShow: true,
    appointmentState: 0,
    st: false,
    showModal: false,
    tabbarActive: true,

    compeletingModal: false,
    compeletedModal: false,


  },

  // 再次预约
  appointmentAgain: function (e) {

  },

  compeletedModalClose: function () {
    this.setData({
      compeletedModal: false
    })
  },

  compeletedModalShow: function (e) {
    this.setData({
      compeletedModal: true
    })
  },

  compeletingModalShow: function (e) {
    this.setData({
      compeletingMoal: true
    })
  },

  compeletingModalClose: function (e) {
    this.setData({
      compeletingMoal: false
    })
  },

  selectDoing: function (e) {
    this.setData({
      tabState: e.currentTarget.dataset.id,
      tabContentShow: true
    })
  },

  selectDone: function (e) {
    this.setData({
      tabState: e.currentTarget.dataset.id,
      tabContentShow: false
    })
  },

  searchPage: function (e) {
    wx.navigateTo({ url: '../searchStore/index' });
  },

  storePage: function (e) {
    wx.navigateTo({ url: '../storeHead/index' });
  },

  appointmentVoice: function (e) {
    wx.redirectTo({ url: '../addAppointmentVoice/index' });
  },

  minePage: function (e) {
    wx.redirectTo({ url: '../personalDetails/index' });
  },

  foldSwitch: function (e) {
    console.log('ok');
    var that = this.data.st;
    that = that ? false : true;
    this.setData({
      st: that
    })

  },
  // 扫一扫
  richScan: function () {
    wx.scanCode({
      success: (res) => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  },

  // 跳转常去店铺
  frequentedStore: function (e) {
    console.log(e);
    if (e.currentTarget.dataset.id) {
      app.globalData.storeID = e.currentTarget.dataset.id;
    }
    wx.navigateTo({ url: '../storeHead/index' });
  },

  // 分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '预约吧',
      path: 'pages/customEntrance/index',
      imageUrl: '../../resource/images/common/logo.png'
    }
  },

  showModalFn: function () {
    this.setData({
      showModal: true
    })
  },

  modalClose: function () {
    this.setData({
      showModal: false
    })
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/hot',
      method: "POST",
      data: {
        ID: 'ac88d10cecaa44e6b45495fe3139b1a9'
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success(res) {
        that.setData({
          hostListData: res.data
        })
      }
    });

    // 进行中的数据列表
    wx.request({
      url: 'https://api.yuyue58.cn/api/InCompleteOrderList',
      method: "POST",
      data: {
        ID: 'a4b618628dfc466b81f02e8dd5f1dede'
      },
      header: { "content-type": "application/x-www-form-urlencoded" },

      success(res) {
        console.log(res.data);
        // console.log(res.data[0].time);
        // console.log(util.formatDate(new Date()));

        var cData = complete.completing(res.data);

        that.setData({
          completingData: res.data,
          completingSeqData: cData.itemArray,
          completingTitleData: cData.titleB,
          completingTime: cData.timeArray
        })
      }

    });

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  }
});