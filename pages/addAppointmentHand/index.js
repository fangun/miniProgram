//index.js
//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');

Page({

  data: {
    pageTitle: '添加预约',
    remarkState: false,

    curDate: null,
    time1Array: null,
    time2Array: null,

    timeArray: ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
      '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
      '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
    ],

    date: '日期',
    time1: '开始',
    time2: '结束'
  },

  remarkSwitch: function() {
    var state = this.data.remarkState;
    state = state ? false : true;
    this.setData({
      remarkState: state
    });

  },

  // 提示

  voiceTip: function() {
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

  // 日期
  bindDateChange: function(e) {
    console.log(e);

    var today = util.getFormatDate();
    var diff = util.getDateDimdd(today, e.detail.value);
    var time1Array = [];
    var timeArray = this.data.timeArray;
    if (diff == 0) {
      var now = new Date();
      var hour = now.getHours();
      timeArray.forEach(function(x, y) {
        var seq = hour * 2 + 1;
        if (y > seq) {
          time1Array.push(x);
        }
      });
    } else{
      time1Array = timeArray;
    }

    this.setData({
      date: e.detail.value,
      time1Array:time1Array
    });

  },

  // 开始时间
  bindTimeChange1: function(e) {
    console.log(e);

    var timeArray = this.data.time1Array;
    var time2Array = [];

    timeArray.forEach(function(x, y) {
      if (y > e.detail.value) {
        time2Array.push(x)
      }
    })

    this.setData({
      time1: this.data.time1Array[e.detail.value],
      time2Array: time2Array
    });
  },

  // 结束时间
  bindTimeChange2: function(e) {
    console.log(e);
    this.setData({
      time2: this.data.time2Array[e.detail.value]
    });
  },

  addAppointment: function(e) {
    console.log(e);
    var data = {
      mid: app.globalData.peopleInfo.mid,
      date: e.detail.value.date,
      time1: e.detail.value.time1,
      time2: e.detail.value.time2,
      serviceitem: e.detail.value.serviceitem,
      empolyee: e.detail.value.empolyee,
      address: e.detail.value.address,
      remarks: e.detail.value.remarks,
      force: 0
    }

    if (!data.serviceitem) {
      wx.showToast({
        title: '请填写服务项目',
        icon: 'none',
        success: function() {}
      });
    } else if (data.date == '日期' || data.time1 == '开始' || data.time2 == '结束') {
      wx.showToast({
        title: '请选择时间',
        icon: 'none',
        success: function() {}
      });
    } else {
      this.doneAppointment(data);
    }
  },

  // 预约
  doneAppointment: function(data) {
    var that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/ManualInput',
      method: "POST",
      data: data,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res);
        if (res.data == '1') {
          wx.showToast({
            title: '预约成功',
            success: function() {
              wx.redirectTo({
                url: '../customEntrance/index'
              });
            }
          });

        } else if (res.data == '-6') {
          wx.showModal({
            title: '预约冲突',
            content: '继续添加此预约?',
            cancelText: '取消',
            confirmText: '确定',
            confirmColor: 'rgb(243,67,67)',
            success(res) {
              data.force = 1;
              that.doneAppointment(data);
            }
          })
        }
      }
    });
  },

  onLoad: function() {
    // 日期初始值
    this.setData({
      curDate: util.getFormatDate()
    });



  }

})