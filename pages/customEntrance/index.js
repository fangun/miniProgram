//index.js
//获取应用实例
var complete = require('../../utils/complete.js');
var QQMapWX = require('../../resource/SDK/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'RILBZ-DTEAF-TZ6J2-JYDOW-DVRQT-G6FGZ' //我个人的key
});
var API = require('../../utils/api.js');
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
    showModal: false,
    tabbarActive: true,

    compeletingModal: false,
    compeletedModal: false,
    chooseModal: false,

    orderId: null,
    compeletingModalData: null,
    compeletedModalData: null,

    hotDeleteModal: false,

    hotDeletePar: {
      mid: null,
      sid: null
    },
    loginState: true
  },

  // 删去经常访问的店家
  cancleFamiliarShop: function(e) {
    var that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/DelBookingShop',
      method: "POST",
      data: {
        mid: that.data.hotDeletePar.mid,
        sid: that.data.hotDeletePar.sid
      },

      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        wx.showToast({
          title: '删除成功'
        });

        that.setData({
          hotDeleteModal: false,
        });

        that.getHotData();
      }
    });
  },

  // 热榜 删去 提示
  hotDeleteChooseModal: function(e) {
    var sid = e.currentTarget.dataset.sid;
    this.setData({
      hotDeleteModal: true,
      hotDeletePar: {
        mid: app.globalData.peopleInfo.mid,
        sid: sid
      }
    });
  },

  hotDeleteChooseModalClose: function(e) {
    this.setData({
      hotDeleteModal: false
    })
  },

  compeletedModalClose: function() {
    this.setData({
      compeletedModal: false
    })
  },

  compeletedModalShow: function(e) {
    var compeletedModalData = e.currentTarget.dataset.item;

    this.setData({
      compeletedModal: true,
      compeletedModalData: compeletedModalData
    })
  },

  compeletingModalShow: function(e) {
    var orderId = e.currentTarget.dataset.id;
    var compeletingModalData = e.currentTarget.dataset.item;
    this.setData({
      compeletingModal: true,
      orderId: orderId,
      compeletingModalData: compeletingModalData
    })
  },

  compeletingModalClose: function(e) {
    this.setData({
      compeletingModal: false
    })
  },

  selectDoing: function(e) {
    this.setData({
      tabState: e.currentTarget.dataset.id,
      tabContentShow: true
    })
  },

  selectDone: function(e) {
    this.setData({
      tabState: e.currentTarget.dataset.id,
      tabContentShow: false
    });

    this.getCompletedData();
  },

  // 完成的订单
  getCompletedData: function(e) {
    var that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/completeOrder',
      method: "POST",
      data: {
        ID: app.globalData.peopleInfo.mid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {

        res.data.sd.forEach(function(x, y, z) {
          x.show = y == 0 ? true : false;
          x.data = y == 0 ? true : false;
        });

        res.data.hc.forEach(function(x, y, z) {
          var t1 = x.time.slice(x.time.indexOf(" ") + 1).split(":");
          var t2 = x.time1.slice(x.time1.indexOf(" ") + 1).split(":");
          var time = t1[0] + ':' + t1[1] + '-' + t2[0] + ':' + t2[1];
          var t3 = x.time.slice(0, x.time.indexOf(" ")).split("-");
          var rq = t3[1] + '-' + t3[2];

          x.time = time;
          x.time1 = rq;
        });

        console.log('res.data');
        res.data.list = [];
        res.data.list[0] = res.data.hc;
        console.log(res.data);

        that.setData({
          completedData: res.data
        });

      }
    });
  },

  // 定向获取已完成订单
  getCompletedData2: function(Year, Month, callback) {

    var that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/completeOrder',
      method: "POST",
      data: {
        ID: app.globalData.peopleInfo.mid,
        Year: Year,
        Month: Month
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if(typeof res.data == 'object'){
          if (callback) {
            callback(res);
          }
        } else {
          wx.showToast({
            title: '数据异常',
            icon: 'none',
            duration: 1200
          });
        }
      },
      fail(e){
        wx.showToast({
          title: '数据获取失败',
          icon: 'none',
          duration: 1200
        });       
      }
    });

  },

  foldSwitch: function(e) {
    var that = this;
    var completedData = this.data.completedData;
    var seq = e.currentTarget.dataset.seq;

    completedData.sd.forEach(function(x, y) {

      if (x.show) {
        x.show = false;
      } else {
        x.show = y == seq ? true : false;
      }
    });

    if (!completedData.sd[seq].data) {

      that.getCompletedData2(completedData.sd[seq].year, completedData.sd[seq].month, function(res) {
        res.data.hc.forEach(function(x, y, z) {
          var t1 = x.time.slice(x.time.indexOf(" ") + 1).split(":");
          var t2 = x.time1.slice(x.time1.indexOf(" ") + 1).split(":");
          var time = t1[0] + ':' + t1[1] + '-' + t2[0] + ':' + t2[1];
          var t3 = x.time.slice(0, x.time.indexOf(" ")).split("-");
          var rq = t3[1] + '-' + t3[2];

          x.time = time;
          x.time1 = rq;
        });

        completedData.list[seq] = res.data.hc;
        completedData.sd[seq].data = true;

        that.setData({
          completedData: completedData
        });

      });
    } else {
      that.setData({
        completedData: completedData
      });
    }


  },

  searchPage: function(e) {
    wx.navigateTo({
      url: '../searchStore/index'
    });
  },

  storeBackEnd: function(e) {
    wx.navigateTo({
      url: '../storeBackEnd/index',
      success: function() {},
      fail: function() {},
      complete: function() {}
    })
  },

  // 跳转常去店铺
  frequentedStore: function(e) {
    console.log(e);
    app.globalData.peopleInfo.sid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../storeHead/index'
    });
  },

  appointmentVoice: function(e) {
    wx.redirectTo({
      url: '../addAppointmentVoice/index'
    });
  },

  minePage: function(e) {
    wx.redirectTo({
      url: '../personalDetails/index'
    });
  },

  // 扫一扫
  richScan: function() {
    wx.scanCode({
      success(res) {
        let url = res.result;
        //是否有转义了的 %3d
        let flag1 = url.indexOf("%3d");
        if(flag1!=-1){
          let urlArr = url.split("%3d");
          //最后一个%3d 后面的，应该是sid, 32位
          let sid = urlArr[urlArr.length-1];
          if(sid.length==32){
            app.globalData.peopleInfo.sid = sid
            wx.navigateTo({
              url: '../storeHead/index'
            })
          }
        }
      }
    })
  },
  // 禁止冒泡
  forbidBubbling: function() {
    console.log('禁止button冒泡');
  },

  // 显示提示弹出层
  showChooseModal: function(e) {
    var orderId = e.currentTarget.dataset.id;
    this.setData({
      chooseModal: true,
      orderId: orderId
    })
  },

  chooseModalClose: function() {
    this.setData({
      chooseModal: false
    })
  },

  cancelOrderModal: function(e) {
    var that = this;
    var orderId = this.data.orderId;
    if (orderId) {
      wx.request({
        url: 'https://api.yuyue58.cn/api/DelBooking',
        method: "POST",
        data: {
          id: orderId
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {

          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          });

          that.setData({
            compeletingModal: false
          });

          that.getCompletingData();
        }
      });
    }
  },

  // 取消订单(进行中的)
  cancelOrder: function(e) {
    var that = this;
    var orderId = this.data.orderId;

    if (orderId) {
      wx.request({
        url: 'https://api.yuyue58.cn/api/DelBooking',
        method: "POST",
        data: {
          id: orderId
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          });

          that.setData({
            chooseModal: false
          });
          that.getCompletingData();
        }
      });
    }
  },

  showModalFn: function() {
    this.setData({
      showModal: true
    })
  },

  modalClose: function() {
    this.setData({
      showModal: false
    })
  },

  // 获取热榜数据
  getHotData: function() {

    var that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/hot',
      method: "POST",
      data: {
        ID: app.globalData.peopleInfo.mid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data) {
          that.setData({
            hostListData: res.data
          })
        }
        // if(res.data) {
        //   setTimeout(function(){
        //     that.getHotData();
        //   },1000);
        // }else{
        //   console.log('无值')
        //   console.log(res.data)
        // }


      }
    });

  },
  // 获取进行中的数据列表
  getCompletingData: function() {
    var that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/InCompleteOrderList',
      method: "POST",
      data: {
        ID: app.globalData.peopleInfo.mid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data) {
          var cData = complete.completing(res.data);

          that.setData({
            completingData: res.data,
            completingSeqData: cData.itemArray,
            completingTitleData: cData.titleB,
            completingTime: cData.timeArray
          });
        }
        // if(res.data) {
        //   setTimeout(function(){
        //     that.getCompletingData();
        //   },1000);
        // }else{
        //   console.log('无值')
        //   console.log(res.data)
        // }

      },
      fail(e) {
        console.log('获取进行中数据失败');
      }
    });
  },

  // 调用地图
  getMapAddress: function(e) {
    var that = this;
    var location = e.currentTarget.dataset.location;
    var address = {}; //坐标对象 lat经度 lng维度

    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        var statu = res.authSetting;
        if (!statu['scope.userLocation']) {

          wx.openSetting({
            success(res) {
              that.getMap(location, address);
            }
          })
        } else {
          that.getMap(location, address);
        }
      }
    })
  },

  getMap: function(location, address) {
    qqmapsdk.geocoder({
      address: location,
      success: function(res) {
        address = res.result.location;
        var latitude = address.lat;
        var longitude = address.lng;
        wx.openLocation({
          latitude: Number(latitude),
          longitude: Number(longitude),
          scale: 28
        })
      },
      fail: function(e) {
        wx.showToast({
          title: '暂时无法找到该位置',
          icon: 'fail',
          duration: 2000
        });
      },
      complete: function(e) {}
    });
  },
  // 拨打电话
  makingCalls: function(e) {
    var phoneNumber = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },

  // 分享
  onShareAppMessage: function(res) {
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

  // 获取电话授权
  getPhoneNumber(e) {
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      // wx.showModal({  
      //     title: '提示',  
      //     showCancel: false,  
      //     content: '未授权',  
      //     success: function (res) { }  
      // })  
    } else {
      wx.request({
        url: 'https://api.yuyue58.cn/api/wxLogin',
        method: "POST",
        data: {
          app: 'wxb',
          code: app.globalData.code,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res.data)
          if (typeof res.data == 'object') {
            app.globalData.peopleInfo = res.data;

            wx.setStorage({
              key: "fangun-storeFront",
              data: res.data,
              success(res) {
                app.globalData.loginCache = true;
                that.authorizeInit();
              }
            });
          } else {
            wx.showToast({
              title: '授权接口异常',
              success: function() {}
            });
          }

        },
        fail(res) {
          wx.showToast({
            title: '授权接口异常',
            success: function() {}
          });
        }
      });
    }
  },

  // 手机账号登录
  accountLogin: function() {
    wx.navigateTo({
      url: '../accountLogin/index'
    });
  },

  // 页面数据获取
  initPageData: function(e) {
    this.getHotData();
    this.getCompletingData();
  },
  // 授权 数据初始化
  authorizeInit: function() {
    console.log('authorizeInit');
    console.log(app.globalData);
    
    if (app.globalData.loginCache) {
      this.setData({
        loginState: app.globalData.loginCache
      });
      this.initPageData();
    }
  },

  onShow: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        app.globalData.code = res.code;
      }
    })
  },

  onLoad: function(options) {
    console.log('onLoad');
    var that = this;
    //判断是用户是否绑定了
    if (app.globalData.loginCache) {
      console.log('cache:true');
      that.authorizeInit();
    } else {
      console.log('cache:false');
      this.setData({
        loginState: false
      });
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况

      app.loginCacheCallback = peopleInfo => {
        if (typeof peopleInfo == 'object') {
          app.globalData.peopleInfo = peopleInfo;
          app.globalData.loginCache = true;
          that.authorizeInit();
        }
      }

    }
  }
});