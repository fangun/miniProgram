//index.js
//获取应用实例
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

    tabState: 'doing',
    tabContentShow: 0,
    appointmentState: 0,
    st: false,
    showModal: true
  },

  selectDoing: function (e) {
    this.setData({
      tabState: e.currentTarget.dataset.id,
      tabContentShow: 0
    })
  },

  selectDone: function (e) {
    this.setData({
      tabState: e.currentTarget.dataset.id,
      tabContentShow: '-100%'
    })
  },

  searchPage: function (e) {
    wx.navigateTo({ url: '../searchStore/index' });
  },

  storePage: function (e) {
    wx.navigateTo({ url: '../storeHead/index' });
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
    var that = this;
    var show;
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

  submit: function () {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function () {

  },

  go: function () {
    this.setData({
      showModal: false
    })
  },

  onLoad: function () {
    // wx.hideTabBar()
  
    var that = this;

    wx.request({
      url: 'https://api.yuyue58.cn/api/hot',
      method: "POST",
      data: {
        ID: 'dabc5bf90a9145fbb06467e648286b5f'
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success(res) {
        console.log(res.data)

        that.setData({
          hostListData: res.data
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

})