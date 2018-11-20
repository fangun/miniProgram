//index.js
const app = getApp();

const API = require('../../utils/api.js');
const REQUEST = require('../../utils/request.js');
Page({
	data: {
		switchShow: true,
		login: true
	},
	// 登录
	loginFormSubmit: function(e) {
		var that = this;
		var tel = e.detail.value.tel;
		var password = e.detail.value.password;

		if (tel == '' || tel == 'undefined') {
			wx.showToast({
				title: '请输入手机号码',
				icon: 'none'
			});
		} else if (password == '' || password == 'undefined') {
			wx.showToast({
				title: '请输入密码',
				icon: 'none'
			});
		} else {
			that.setData({
				login: false
			});

			REQUEST.POST(
				API.accountLogin.passwordLogin,
				{
					mobile: tel,
					password: password
				},
				function(res) {
					if (typeof res.data == 'object') {
						app.globalData.peopleInfo = res.data;
						app.globalData.loginCache = true;
						wx.setStorage({
							key: 'fangun-storeFront',
							data: res.data,
							success(res) {
								wx.showToast({
									title: '登录成功',
									success: function() {
										setTimeout(function() {
											wx.redirectTo({
												url: '../customEntrance/index'
											});
										}, 1500);
									}
								});
							}
						});
					} else {
						wx.showToast({
							title: '登录错误',
							icon: 'none',
							success: function() {}
						});

						that.setData({
							login: true
						});
					}
				}
			);
		}
	},

	// 免费开通
	freeOpen: function(e) {
		wx.navigateTo({
			url: '../freeOpen/index',
			success: function() {},
			fail: function() {},
			complete: function() {}
		});
	},

	// 切换密码是否可显示
	switchShow: function() {
		var switchShow = this.data.switchShow ? false : true;
		this.setData({
			switchShow: switchShow
		});
	},

	// 忘记密码
	forgetPassword: function() {
		wx.navigateTo({
			url: '../forgetPassword/index'
		});
	},

	onLoad: function() {}
});
