//app.js
App({
	onLaunch: function(options) {
		console.log('onLaunch');
		console.log(options);
		// 缓存登录信息
		var that = this;
		wx.getStorage({
			key: 'fangun-storeFront',
			success: function(res) {
				console.log(res);
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
	},

	onShow: function(options) {
		console.log('onShow');
		console.log(options);
		// if (options.scene == '1007') {
		// 	var pars = 'pages/messageCard/index';
		// 	[ 'mid', 'empolyee', 'serviceitem', 'sName', 'saddress' ].forEach(function(x, y) {
		// 		if (options.query[x] && options.query[x] !== '') {
		// 			if(y == 0){
		// 				pars += '?' + x + '=' + options.query[x];
		// 			}else {
		// 				pars += '&' + x + '=' + options.query[x];
		// 			}
					
		// 		}
		// 	});

		// 	var url = pars + '&scene=' + options.scene;
		// 	console.log(url);
		// 	wx.navigateTo({
		// 		url: url
		// 	});
		// }
	},
	globalData: {
		code: null,
		loginCache: false,
		peopleInfo: null,

		sex: null,
		havePassword: false
	}
});
