//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
const API = require('../../utils/api.js');
const REQUEST = require('../../utils/request.js');

Page({
	data: {
		timeArray: [
			{
				id: 0,
				time: '00:00'
			},
			{
				id: 1,
				time: '00:30'
			},
			{
				id: 2,
				time: '01:00'
			},
			{
				id: 3,
				time: '01:30'
			},
			{
				id: 4,
				time: '02:00'
			},
			{
				id: 5,
				time: '02:30'
			},
			{
				id: 6,
				time: '03:00'
			},
			{
				id: 7,
				time: '03:30'
			},
			{
				id: 8,
				time: '04:00'
			},
			{
				id: 9,
				time: '04:30'
			},
			{
				id: 10,
				time: '05:00'
			},
			{
				id: 11,
				time: '05:30'
			},
			{
				id: 12,
				time: '06:00'
			},
			{
				id: 13,
				time: '06:30'
			},
			{
				id: 14,
				time: '07:00'
			},
			{
				id: 15,
				time: '07:30'
			},
			{
				id: 16,
				time: '08:00'
			},
			{
				id: 17,
				time: '08:30'
			},
			{
				id: 18,
				time: '09:00'
			},
			{
				id: 19,
				time: '09:30'
			},
			{
				id: 20,
				time: '10:00'
			},
			{
				id: 21,
				time: '10:30'
			},
			{
				id: 22,
				time: '11:00'
			},
			{
				id: 23,
				time: '11:30'
			},
			{
				id: 24,
				time: '12:00'
			},
			{
				id: 25,
				time: '12:30'
			},
			{
				id: 26,
				time: '13:00'
			},
			{
				id: 27,
				time: '13:30'
			},
			{
				id: 28,
				time: '14:00'
			},
			{
				id: 29,
				time: '14:30'
			},
			{
				id: 30,
				time: '15:00'
			},
			{
				id: 31,
				time: '15:30'
			},
			{
				id: 32,
				time: '16:00'
			},
			{
				id: 33,
				time: '16:30'
			},
			{
				id: 34,
				time: '17:00'
			},
			{
				id: 35,
				time: '17:30'
			},
			{
				id: 36,
				time: '18:00'
			},
			{
				id: 37,
				time: '18:30'
			},
			{
				id: 38,
				time: '19:00'
			},
			{
				id: 39,
				time: '19:30'
			},
			{
				id: 40,
				time: '20:00'
			},
			{
				id: 41,
				time: '20:30'
			},
			{
				id: 42,
				time: '21:00'
			},
			{
				id: 43,
				time: '21:30'
			},
			{
				id: 44,
				time: '22:00'
			},
			{
				id: 45,
				time: '22:30'
			},
			{
				id: 46,
				time: '23:00'
			},
			{
				id: 47,
				time: '23:30'
			},
			{
				id: 48,
				time: '23:59'
			}
		],

		pageTitle: '添加预约',

		addSure: true,

		modState: false,
		orderId: null,

		serviceitem: '',
		empolyee: '',
		remarks: '',
		address: '',
		index: '',

		curDate: null,
		date: '日期',
		time1: '开始',
		time2: '结束',
		index1: 0,
		index2: 0,
		time1Array: null,
		time2Array: null,

		remarkState: false
	},

	// 跳转主页面
	gotoHome: function() {
		wx.redirectTo({
			url: '../customEntrance/index'
		});
	},
	
	// 选择日期
	// 1.设置日期值 2.初始化开始时间值
	bindDateChange: function(e) {
		console.log('bindDateChange');

		var today = util.getFormatDate();
		var diff = util.getDateDimdd(today, e.detail.value);
		var time1Array = [];
		var timeArray = this.data.timeArray;

		if (diff == 0) {
			var now = new Date();
			var hour = now.getHours();

			timeArray.forEach(function(x, y) {
				y > hour * 2 + 1 ? time1Array.push(x) : '';
			});
		} else {
			time1Array = timeArray;
		}

		// 加星期
		var week = util.getWeekByDay(e.detail.value);

		this.setData({
			date: e.detail.value + '('+ week +')',
			time1Array: time1Array,
			time1: '开始',
			time2: '结束',
			index1: 0,
			index2: 0
		});
	},

	// 开始时间
	// 1.设置开始时间 2.初始化结束时间值 3.与结束时间联动
	bindTimeChange1: function(e) {
		console.log('bindTimeChange1');
		// 时间列表
		var time1Array = this.data.time1Array;
		if(!time1Array) return;
		// 时间下标
		var index1 = parseInt(e.detail.value);
		// 时间内容
		var time2 = this.data.time2;
		var time2Array = [];

		time1Array.forEach(function(x, y) {
			if (y > index1) {
				time2Array.push(x);
			}
		});

		// 数据初始化
		if (time2 !== '结束') {
			var index2 = parseInt(this.data.index2);

			this.setData({
				index1: index1,
				time1: time1Array[index1].time,
				index2: index2,
				time2: time2Array[index2].time,
				time2Array: time2Array
			});
		} else {
			this.setData({
				index1: index1,
				time1: time1Array[index1].time,
				time2Array: time2Array
			});
		}
		
	},

	// 结束时间
	// 1.设置结束时间
	bindTimeChange2: function(e) {
		console.log('bindTimeChange2');
		var index2 = parseInt(e.detail.value);
		var time2Array = this.data.time2Array;
		if(!time2Array) return;
		// 数据初始化
		this.setData({
			index2: index2,
			time2: time2Array[index2].time
		});
	},

	// 添加预约
	addAppointment: function(e) {
		// 开始及结束时间
		var time1 = this.data.time1;
		var time2 = this.data.time2;
		// 去掉星期
		var dateSeq = e.detail.value.date.indexOf('(');
		var date;
		if(e.detail.value.date !== '日期'){
			date = e.detail.value.date.slice(0, dateSeq);
		} else {
			date = e.detail.value.date;
		}
		// remarks 为 undefined
		var remarks = e.detail.value.remarks ? e.detail.value.remarks : '';

		var data = {
			mid: app.globalData.peopleInfo.mid,
			date: date,
			time1: time1,
			time2: time2,
			serviceitem: e.detail.value.serviceitem,
			empolyee: e.detail.value.empolyee,
			address: e.detail.value.address,
			remarks: remarks,
			force: 0
		};

		if(!data.serviceitem || data.serviceitem == ''){
			this.self_showToast('请输入项目');
		} else if (data.date == '日期') {
			this.self_showToast('请输入日期');
		} else if (data.time1 == '开始') {
			this.self_showToast('请输入开始时间');
		} else if (data.time2 == '结束') {
			this.self_showToast('请输入结束时间');
		} else {
			this.doneAppointment(data);
		}

	},
	// =================
	// 数据源 start
	// =================

	// 预约
	doneAppointment: function(data) {
		console.log('doneAppointment');
		console.log(data);
		var that = this;

		that.setData({
			addSure: false
		});

		REQUEST.POST(API.addAppointment.manualInput, data, function(res) {
			console.log('doneAppointment');
			console.log('添加预约');
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
					success(res) {
						if (res.confirm) {
							data.force = 1;
							that.doneAppointment(data);
						} else if (res.cancel) {
							that.setData({
								addSure: true
							});
						}
					}
				});
			} else {
				wx.showModal({
					title: '紧急通知',
					content: '添加预约出现Bug啦！',
					showCancel: false,
					confirmText: '知道了',
					success(res) {
						if (res.confirm) {
							wx.redirectTo({ url: '../customEntrance/index' });
						}
					}
				});
			}
		});
	},

	// 修改预约
	// 1.修改预约 
	modAppointment: function(e) {
		var orderId = this.data.orderId;

		// 去掉星期
		var dateSeq = e.detail.value.date.indexOf('(');
		var date;
		if(e.detail.value.date !== '日期'){
			date = e.detail.value.date.slice(0, dateSeq);
		} else {
			date = e.detail.value.date;
		}
		// 开始及结束时间
		var time1 = this.data.time1;
		var time2 = this.data.time2;

		var data = {
			id: orderId,
			date: date,
			starttime: time1,
			stoptime: time2,
			serviceitem: e.detail.value.serviceitem,
			empolyee: e.detail.value.empolyee,
			address: e.detail.value.address,
			remarks: e.detail.value.remarks,
			force: 0
		};
		

		if(!data.serviceitem || data.serviceitem == ''){
			this.self_showToast('请输入项目');
		} else if (data.date == '日期') {
			this.self_showToast('请输入日期');
		} else if (data.starttime == '开始') {
			this.self_showToast('请输入开始时间');
		} else if (data.stoptime == '结束') {
			this.self_showToast('请输入结束时间');
		} else {
			this.doneModAppointment(data);
		}

	},

	// 预约
	doneModAppointment: function(data) {
		console.log('doneModAppointment');
		var that = this;
		that.setData({
			addSure: false
		});
	
		REQUEST.POST(API.addAppointment.ManualEdit, data, function(res) {

			if (res.data == '200') {
				wx.showToast({
					title: '修改成功',
					success: function() {
						wx.redirectTo({
							url: '../customEntrance/index'
						});
					}
				});
			} else if (res.data == '-5') {
				wx.showModal({
					title: '预约冲突',
					content: '继续添加此预约?',
					cancelText: '取消',
					confirmText: '确定',
					success(res) {
						if (res.confirm) {
							data.force = 1;
							that.doneModAppointment(data);
						} else if (res.cancel) {
							that.setData({
								addSure: true
							});
						}
					}
				});
			} else {
				wx.showModal({
					title: '紧急通知',
					content: '修改预约出现Bug啦！',
					showCancel: false,
					confirmText: '知道了',
					success(res) {
						if (res.confirm) {
							that.setData({
								addSure: true
							});
						}
					}
				});
			}

		});
	},

	// =================
	// 数据源 end
	// =================
	// 获取地址地图
	getMapAddress: function() {
		wx.navigateTo({
			url: '../getMapAddress/index'
		});
	},

	// 更多选择 切换
	remarkSwitch: function() {
		var state = this.data.remarkState;
		state = state ? false : true;
		this.setData({
			remarkState: state
		});
	},

	// 语音功能 提示
	voiceTip: function() {
		wx.showModal({
			title: '提示',
			content: '暂未上线,请选择手动输入！',
			showCancel: false,
			confirmText: '知道了',
			success(res) {
				// if (res.confirm) {
				//   console.log('用户点击确定')
				// } else if (res.cancel) {
				//   console.log('用户点击取消')
				// }
			}
		});
	},

	self_showToast:function(title){
		wx.showToast({
			title: title,
			image:'../../resource/images/common/caution3.png',
			success: function() {}
		});		
	},

	onShow:function(){
		console.log('添加预约页显示！');
	},

	onLoad: function(options) {
		// 日期初始值
		console.log('预约');
		console.log(options);
		var that = this;
		// 兼容小卡片分享
		// 修改预约
		if (options.id && options.scene !== '1007') {
			console.log('修改预约');
			var time1 = options.time.slice(0, options.time.indexOf('-'));
			var time2 = options.time.slice(options.time.indexOf('-') + 1);
			var index1;
			var index2;
			// 初始化日期及时间
			that.bindDateChange({
				detail: {
					value: options.rq
				}
			});

			var y1;
			var y2;

			var today = util.getFormatDate();
			var diff = util.getDateDimdd(today, options.rq);

			if(diff == 0){
				var now = new Date();
				var hour = now.getHours();

				that.data.timeArray.forEach(function(x, y) {
					if (x.time == time1) {
						y1 = y - hour*2 -2;
					};

					if (x.time == time2){
						y2 = y - hour*2 - 2;
					};
				});
	
			} else {
				that.data.timeArray.forEach(function(x, y) {
					if (x.time == time1) {
						y1 = y;
					};

					if (x.time == time2){
						y2 = y;
					};
				});
			}

			that.bindTimeChange1({
				detail: {
					value: y1
				}
			});	

			that.bindTimeChange2({
				detail: {
					value: y2 - y1 - 1
				}
			});

			if (!options.empolyee) options.empolyee = '';
			if (!options.saddress) options.saddress = '';
			if (!options.remarks) options.remarks = '';

			var week = util.getWeekByDay(options.rq);


			that.setData({
				serviceitem: options.serviceitem,
				empolyee: options.empolyee,
				address: options.saddress,

				curDate: util.getFormatDate(),
				date: options.rq + '(' + week +')',
				time1: time1,
				time2: time2,
				// index1:index1,
				// index2:index2,

				remarks: options.remarks,

				orderId: options.id,
				modState: true,
				remarkState: true
			});

		} else {
			that.setData({
				curDate: util.getFormatDate()
			});
		}
	}
});
