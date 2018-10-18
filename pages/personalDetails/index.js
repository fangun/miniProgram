//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '个人中心',
    personalData: null,
    tabbarActive:true
  },
  
  avatarPage: function () {
    wx.navigateTo({ url: '../chooseAvatar/index' });
  },

  namePage: function () {
    wx.navigateTo({ url: '../modifyName/index' });
  },

  passwordPage: function () {
    wx.navigateTo({ url: '../modifyPassword/index' });
  },

  feedback: function () {
    wx.navigateTo({ url: '../feedback/index' });
  },

  expenseCalendarPage: function () {
    wx.navigateTo({ url: '../expenseCalendar/index' });
  },

  customPage:function(){
    wx.redirectTo({ url: '../customEntrance/index' });
  },

  appointmentVoice:function(e){
    wx.redirectTo({ url: '../addAppointmentVoice/index' });
  },
  
  onShow: function() {
    var that = this;

    wx.request({
      url: 'https://api.yuyue58.cn/api/memberMessage',
      method:"POST",
      data: {
        id: 'ac88d10cecaa44e6b45495fe3139b1a9'
      },
      header: { "content-type": "application/x-www-form-urlencoded" },

      success(res) {
        console.log(res.data);

        that.setData({
          personalData: res.data[0]
        });
      }
    });
  },

  onLoad: function () {

  }

})
