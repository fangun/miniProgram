//index.js
//获取应用实例
const app = getApp();
// 引入SDK核心类
var QQMapWX = require('../../resource/SDK/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
	key: 'RILBZ-DTEAF-TZ6J2-JYDOW-DVRQT-G6FGZ' //我个人的key
});
Page({
	data: {
		markers:null
	},

	// 事件触发，调用接口
	nearby_search: function(e) {
		var _this = this;
		// 调用接口
		qqmapsdk.search({
			keyword: 'kfc', //搜索关键词
			success: function(res) {
				//搜索成功后的回调
				var mks = [];
				for (var i = 0; i < res.data.length; i++) {
					mks.push({
						// 获取返回结果，放到mks数组中
						title: res.data[i].title,
						id: res.data[i].id,
						latitude: res.data[i].location.lat,
						longitude: res.data[i].location.lng,
						iconPath: '/resources/my_marker.png', //图标路径
						width: 20,
						height: 20
					});
				}
				_this.setData({
					//设置markers属性，将搜索结果显示在地图中
					markers: mks
				});
			},
			fail: function(res) {
				console.log(res);
			},
			complete: function(res) {
				console.log(res);
			}
		});
	},
	onLoad: function() {}
});
