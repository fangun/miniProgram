//index.js
//获取应用实例
const app = getApp();
const API = require('../../utils/api.js');
const REQUEST = require('../../utils/request.js');
const util = require('../../utils/util.js');

Page({
	data: {
		pageTitle: '日程卡',
		options: null,
		authorizeState: false
	},

	onShow: function() {
		var that = this;
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
		console.log(e);
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
								console.log('授权成功');
								app.globalData.loginCache = true;
								that.setData({
									authorizeState: true
								});

								if(e.currentTarget.dataset.name && e.currentTarget.dataset.name == "addAppointment"){
									that.cardAppointment();
								} else if (e.currentTarget.dataset.name && e.currentTarget.dataset.name == "userCenter") {
									wx.navigateTo({
										url: '../customEntrance/index'
									});
								}
							}
						});
					} else {
						wx.showToast({
							title: '授权失败',
							image:'../../resource/images/common/cross.png',
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

	// 跳转主页面
	gotoHome: function() {
		wx.navigateTo({
			url: '../customEntrance/index'
		});
	},

	// 卡片预约业务逻辑
	cardAppointment: function() {
		var that = this;
		var options = this.data.options;

		if (options.type == 3) {
			var t1 = options.time.slice(0, options.time.indexOf('-'));
			var t2 = options.time.slice(options.time.indexOf('-') + 1);

			var today = util.getFormatDate();
			var diff = util.getDateDimdd(today,options.date);
			var intT1 = parseInt(t1);
			var now = new Date();
			var hour = now.getHours();

			//（BUG）之前分享过的行程卡片，时间已经过了后，再点击后，还是可以添加到行程！
			if(diff == 0 && intT1 < hour){
				wx.showModal({
					title: '紧急通知',
					content: '已过可预约时间！',
					showCancel: false,
					confirmText: '知道了',
					success(res) {
						if (res.confirm) {}
					}
				});
			} else {
				var data = {
					mid: app.globalData.peopleInfo.mid,
					date: options.date,
					time1: t1,
					time2: t2,
					serviceitem: options.serviceitem,
					empolyee: options.empolyee,
					address: options.saddress,
					remarks: options.remarks,
					force: 0
				};
				
				that.doneAppointment(data);
			}

		} else {
			app.globalData.peopleInfo.sid = options.sid;
			wx.navigateTo({
				url: '../storeHead/index'
			});
		}
	},

	// 预约
	doneAppointment: function(data) {
		var that = this;
		REQUEST.POST(API.addAppointment.manualInput, data, function(res) {
			if (res.data == '1') {
				wx.showToast({
					title: '预约成功',
					success: function() {
						wx.redirectTo({
							url: '../customEntrance/index?messageCard=3'
						});
					}
				});
			} else if (res.data == '-6') {
				wx.showModal({
					title: '预约冲突',
					content: '继续添加此预约?',
					cancelText: '取消',
					confirmText: '确定',
					success(res) {
						if (res.confirm) {
							data.force = 1;
							that.doneAppointment(data);
						} else if (res.cancel) {

						}
					}
				});
			} else {
				wx.showModal({
					title: '紧急通知',
					content: '卡片预约出现Bug啦！',
					showCancel: false,
					confirmText: '知道了',
					success(res) {
						if (res.confirm) {
							
						}
					}
				});
			}

		});
	},

	onLoad: function(options) {
		console.log('日程卡');
		console.log(options);
		var that = this;
		if (options && JSON.stringify(options) !== "{}") {
			var rq = options.rq.split('/');
			options.rq = rq[0] + '月' + rq[1] + '日';
			options.week = '星期' + options.week;

			this.setData({
				options: options
			});
		}

		wx.getStorage({
			key: 'fangun-storeFront',
			success: function(res) {
				console.log(res);
				if (typeof res.data == 'object') {
					app.globalData.peopleInfo = res.data;
					app.globalData.loginCache = true;

					that.setData({
						authorizeState: true
					});

				} else {
					console.log('没缓存');
				}
			},
			fail: function(res) {
				console.log('没缓存');
			}
		});
	}
});
