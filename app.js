//app.js

const ald = require('./utils/ald-stat.js');

App({
	onLaunch: function(options) {
		// 缓存登录信息
		var that = this;
		wx.getStorage({
			key: 'fangun-storeFront',
			success: function(res) {
				if (typeof res.data == 'object') {
					that.globalData.peopleInfo = res.data;
					// that.globalData.sid = res.data.sid;
					that.globalData.loginCache = true;
					//由于这里是网络请求，可能会在 Page.onLoad 之后才返回
					// 所以此处加入 callback 以防止这种情况
					if (that.loginCacheCallback) {
						that.loginCacheCallback(res.data);
					}
				} else {
					console.log('没缓存');
				}
			},
			fail: function(res) {
				console.log('没缓存');
			}
		});

		wx.getSystemInfo({
			success: function(res) {
				console.log(res);
				var version = res.SDKVersion;
				version = version.replace(/\./g, '');
				console.log(version);
				if (parseInt(version) < 120) {
					// 小于1.2.0的版本
				}
			}
		});
	},

	onShow: function(options) {
		var that = this;
		// =======================
		// 获取微信用户的基本信息
		// =======================
		// wx.getUserInfo({
		// 	success: function(res) {
		// 		// var userInfo = res.userInfo,
		// 		// 	nickName = userInfo.nickName,
		// 		// 	avatarUrl = userInfo.avatarUrl;
		// 		console.log(res);
		// 		that.globalData.userInfo = res.userInfo;
		// 	}
		// });
	},

	globalData: {
		code: null,
		loginCache: false,
		peopleInfo: null,

		sex: null,
		havePassword: false,
		userInfo: null
	}
});
