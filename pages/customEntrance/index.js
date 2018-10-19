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
    completedData: null,

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
    chooseModal: false,

    orderId: null,
    compeletingModalData: null,
    compeletedModalData:null,

    cellState:true
  },

  getPhoneNumber(e) {
    this.setData({
      cellState: false
    });
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
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
    console.log(e);
    var compeletedModalData = e.currentTarget.dataset.item;

    this.setData({
      compeletedModal: true,
      compeletedModalData:compeletedModalData
    })
  },

  compeletingModalShow: function (e) {
    var orderId = e.currentTarget.dataset.id;
    var compeletingModalData = e.currentTarget.dataset.item;

    console.log(compeletingModalData);
    this.setData({
      compeletingModal: true,
      orderId: orderId,
      compeletingModalData: compeletingModalData
    })
  },

  compeletingModalClose: function (e) {
    this.setData({
      compeletingModal: false
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
    });

    this.getCompletedData();
  },

  // 完成的订单
  getCompletedData: function (e) {
    var that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/completeOrder',
      method: "POST",
      data: {
        ID: 'a4b618628dfc466b81f02e8dd5f1dede'
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success(res) {
        res.data.sd.reverse();

        console.log(res.data);

        res.data.hc.forEach(function(x,y,z){


            var t1 = x.time.slice(x.time.indexOf(" ") + 1).split(":");
            var t2 = x.time1.slice(x.time1.indexOf(" ") + 1).split(":");

            var time = t1[0] + ':' + t1[1] + '-' + t2[0] + ':' + t2[1];
            
            var t3 = x.time.slice(0, x.time.indexOf(" ")).split("-");
            var rq = t3[1] + '-' + t3[2];

            console.log(t1);
            console.log(t2);
            x.time = time;
            x.time1 = rq;
        });

        that.setData({
          completedData: res.data
        });

        console.log(that.data.completedData);
      }
    });
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


  // 禁止冒泡
  forbidBubbling: function () {
    console.log('禁止button冒泡');
  },

  // 显示提示弹出层
  showChooseModal: function (e) {
    console.log('showChooseModal');

    var orderId = e.currentTarget.dataset.id;
    this.setData({
      chooseModal: true,
      orderId: orderId
    })

    console.log(orderId);
  },

  chooseModalClose: function () {
    console.log('chooseModalClose');
    this.setData({
      chooseModal: false
    })
  },

  cancelOrderModal: function (e) {

    var that = this;
    var orderId = this.data.orderId;
    if (orderId) {
      wx.request({
        url: 'https://api.yuyue58.cn/api/DelBooking',
        method: "POST",
        data: {
          id: orderId
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        success(res) {
          that.setData({
            compeletingModal: false
          });
          that.getCompletingData();
        }
      });
    }

  },
  // 取消订单(进行中的)
  cancelOrder: function (e) {
    console.log(this.data.orderId);
    var that = this;
    var orderId = this.data.orderId;

    if (orderId) {
      wx.request({
        url: 'https://api.yuyue58.cn/api/DelBooking',
        method: "POST",
        data: {
          id: orderId
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        success(res) {
          console.log(res);

          that.setData({
            chooseModal: false
          });
          that.getCompletingData();
        }
      });
    }

  },

  // 跳转常去店铺
  frequentedStore: function (e) {

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
      title: res.target.dataset.id,
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

  // 获取热榜数据
  getHotData: function () {
    var that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/hot',
      method: "POST",
      data: {
        ID: 'a4b618628dfc466b81f02e8dd5f1dede'
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success(res) {
        that.setData({
          hostListData: res.data
        })
      }
    });
  },
  // 获取进行中的数据列表
  getCompletingData: function () {
    var that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/InCompleteOrderList',
      method: "POST",
      data: {
        ID: 'a4b618628dfc466b81f02e8dd5f1dede'
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success(res) {
        var cData = complete.completing(res.data);
        that.setData({
          completingData: res.data,
          completingSeqData: cData.itemArray,
          completingTitleData: cData.titleB,
          completingTime: cData.timeArray
        })
      }
    });
  },

  // 删去经常访问的店家
  cancleFamiliarShop: function (e) {
    var mid = e.currentTarget.dataset.mid;
    var sid = e.currentTarget.dataset.sid;

    var that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/DelBookingShop',
      method: "POST",
      data: {
        mid: mid,
        sid: sid
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success(res) {
        console.log(res);

        that.getHotData();
      }
    });

  },

  onLoad: function () {
    this.getHotData();
    this.getCompletingData();

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