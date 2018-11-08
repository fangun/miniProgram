//index.js
//获取应用实例
const app = getApp();
var API = require('../../utils/api.js');
var REQUEST = require('../../utils/request.js');

Page({
	data: {
    pageTitle: '日程卡',
    options:null
  },
  onShow: function() {
		// 登录
		wx.login({
			success: (res) => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				app.globalData.code = res.code;
			}
		});
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
			REQUEST.POST(
				API.customEntrance.wxLogin,
				{
					app: 'wxb',
					code: app.globalData.code,
					iv: e.detail.iv,
					encryptedData: e.detail.encryptedData
				},
				function(res) {
					if (typeof res.data == 'object' && res.data.mobile) {
						app.globalData.peopleInfo = res.data;
						wx.setStorage({
							key: 'fangun-storeFront',
							data: res.data,
							success(res) {
								app.globalData.loginCache = true;
								
								var pars = that.data.options;
								
								if(pars.type == 3){
                  wx.navigateTo({
                    url: '../addAppointmentVoice/index'
                  })
								} else {
									app.globalData.peopleInfo.sid = pars.sid;
                  wx.navigateTo({
                    url: '../storeHead/index'
                  })
								}

							}
						});
					} else {
						wx.showToast({
							title: '授权失败',
							icon: 'none',
							success: function() {
								// 登录
								wx.login({
									success: (res) => {
										// 发送 res.code 到后台换取 openId, sessionKey, unionId
										app.globalData.code = res.code;
									}
								});
							}
						});
					}
				}
			);
		}
  },
  
	onLoad: function(options) {
		console.log('日程卡');
    console.log(options);
    if(options){
      this.setData({
        options: options
      });
    }

	}
});
