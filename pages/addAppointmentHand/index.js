//index.js
//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');
var API = require('../../utils/api.js');
var REQUEST = require('../../utils/request.js');

Page({
	data: {
		pageTitle: '添加预约',

		serviceitem: '',
		remarkState: false,
		addSure: true,
		modState: false,
		orderId: null,
		empolyee: '',
		
		remarks: '',
		index: '',

		address: '',

		curDate: null,
		date: '日期',
		time1: '开始',
		time2: '结束',
		index1: 0,
		index2: 0,
		time1Array: null,
		time2Array: null,
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
		]
	},

	// 选择日期
	// 1.设置日期值 2.初始化开始时间值
	bindDateChange: function(e) {
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

		this.setData({
			date: e.detail.value,
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
		var time1Array = this.data.time1Array;
		var index1 = e.detail.value;
		var time2 = this.data.time2;

		if (time1Array) {
			var time2Array = [];
			time1Array.forEach(function(x, y) {
				if (y > index1) {
					time2Array.push(x);
				}
			});

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
			// time2Array.push('00:00');
		}
	},

	// 结束时间
	// 1.设置结束时间
	bindTimeChange2: function(e) {
		var time2Array = this.data.time2Array;

		if (time2Array) {
			this.setData({
				index2: e.detail.value,
				time2: time2Array[e.detail.value].time
			});
		}
	},

	// 添加预约
	addAppointment: function(e) {
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
		};

		if (!data.serviceitem) {
			wx.showToast({
				title: '请填写服务项目',
				success: function() {}
			});
		} else if (data.date == '日期' || data.time1 == '开始' || data.time2 == '结束') {
			wx.showToast({
				title: '请选择时间',
				success: function() {}
			});
		} else {
			this.doneAppointment(data);
		}
	},

	// =================
	// 数据源 start
	// =================

	// 预约
	doneAppointment: function(data) {
		var that = this;
		that.setData({
			addSure: false
		});
		REQUEST.POST(API.addAppointment.manualInput, data, function(res) {
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
			}
		});
	},

	modAppointment: function(e) {
		var orderId = this.data.orderId;
		var data = {
			id: orderId,
			date: e.detail.value.date,
			starttime: e.detail.value.time1,
			stoptime: e.detail.value.time2,
			serviceitem: e.detail.value.serviceitem,
			empolyee: e.detail.value.empolyee,
			address: e.detail.value.address,
			remarks: e.detail.value.remarks,
			force: 0
		};

		console.log(data);
		if (!data.serviceitem) {
			wx.showToast({
				title: '请填写服务项目',
				success: function() {}
			});
		} else if (data.date == '日期' || data.time1 == '开始' || data.time2 == '结束') {
			wx.showToast({
				title: '请选择时间',
				success: function() {}
			});
		} else {
			this.doneModAppointment(data);
		}
	},

	// 预约
	doneModAppointment: function(data) {
		var that = this;

		that.setData({
			addSure: false
		});
		
		REQUEST.POST(API.addAppointment.ManualEdit, data, function(res) {
			console.log(res);

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

	onShow:function(){
		console.log('添加预约页显示！');
	},

	onLoad: function(options) {
		// 日期初始值
		console.log('预约');
		console.log(options);
		// 兼容小卡片分享
		// 修改预约
		if (options.id && options.scene !== '1007') {
			this.setData({
				modState: true,
				orderId: options.id,
				remarkState: true
			});

			var t1 = options.time.slice(0, options.time.indexOf('-'));
			var t2 = options.time.slice(options.time.indexOf('-') + 1);
			var t1Seq, t2Seq;
			var rv = {
				detail: {
					value: options.rq
				}
			};

			this.bindDateChange(rv);
			this.data.time1Array.forEach(function(x, y) {
				if (x == t1) t1Seq = y;
			});
			var t1Obj = {
				detail: {
					value: t1Seq
				}
			};
			this.bindTimeChange1(t1Obj);

			this.data.time1Array.forEach(function(x, y) {
				if (x == t2) t2Seq = y;
			});
			var t2Obj = {
				detail: {
					value: t2Seq
				}
			};
			this.bindTimeChange2(t2Obj);

			if (!options.empolyee) options.empolyee = '';
			if (!options.saddress) options.saddress = '';
			if (!options.remarks) options.remarks = '';

			this.setData({
				serviceitem: options.serviceitem,
				date: options.rq,
				time1: t1,
				time2: t2,
				curDate: util.getFormatDate(),
				empolyee: options.empolyee,
				address: options.saddress,
				remarks: options.remarks
			});
		} else {
			this.setData({
				curDate: util.getFormatDate()
			});
		}
	}
});
