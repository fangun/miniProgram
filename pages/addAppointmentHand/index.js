//index.js
//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');
var API = require('../../utils/api.js');
var REQUEST = require('../../utils/request.js');

Page({
	data: {
		pageTitle: '添加预约',
		remarkState: false,
		curDate: null,
		time1Array: null,
		time2Array: null,
		timeArray: [
			'00:00',
			'00:30',
			'01:00',
			'01:30',
			'02:00',
			'02:30',
			'03:00',
			'03:30',
			'04:00',
			'04:30',
			'05:00',
			'05:30',
			'06:00',
			'06:30',
			'07:00',
			'07:30',
			'08:00',
			'08:30',
			'09:00',
			'09:30',
			'10:00',
			'10:30',
			'11:00',
			'11:30',
			'12:00',
			'12:30',
			'13:00',
			'13:30',
			'14:00',
			'14:30',
			'15:00',
			'15:30',
			'16:00',
			'16:30',
			'17:00',
			'17:30',
			'18:00',
			'18:30',
			'19:00',
			'19:30',
			'20:00',
			'20:30',
			'21:00',
			'21:30',
			'22:00',
			'22:30',
			'23:00',
			'23:30',
			'23:59'
		],
		date: '日期',
		time1: '开始',
		time2: '结束',
		addSure: true,
		serviceitem: '',
		modState: false,
		orderId: null,

		empolyee:'',
		address:'',
		remarks:''
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
			success(res) {
				// if (res.confirm) {
				//   console.log('用户点击确定')
				// } else if (res.cancel) {
				//   console.log('用户点击取消')
				// }
			}
		});
	},

	// 日期
	bindDateChange: function(e) {
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
		} else {
			time1Array = timeArray;
		}

		this.setData({
			date: e.detail.value,
			time1Array: time1Array,
			time1: '开始',
			time2: '结束'
		});
	},

	// 开始时间
	bindTimeChange1: function(e) {
		var time1Array = this.data.time1Array;
		if (!time1Array) {
			return;
			// wx.showModal({
			//   title: '',
			//   content: '请先选择日期',
			//   showCancel:false,
			//   confirmText:'确定',
			//   success (res) {
			//   }
			// })
		} else {
			var time2Array = [];
			time1Array.forEach(function(x, y) {
				if (y > e.detail.value) {
					time2Array.push(x);
				}
			});

			time2Array.push('00:00');
			this.setData({
				time1: this.data.time1Array[e.detail.value],
				time2Array: time2Array,
				time2: '结束'
			});
		}
	},

	// 结束时间
	bindTimeChange2: function(e) {
		var time2Array = this.data.time2Array;

		if (!time2Array) {
			return;
			// wx.showModal({
			//   title: '',
			//   content: '请先选择日期',
			//   showCancel:false,
			//   confirmText:'确定',
			//   success (res) {
			//   }
			// })
		} else {
			this.setData({
				time2: this.data.time2Array[e.detail.value]
			});
		}
	},

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

	onLoad: function(options) {
		// 日期初始值

		if (options.serviceitem) {
			this.setData({
				modState: true,
				orderId: options.id,
				remarkState:true
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

			if(!options.empolyee) options.empolyee = '';
			if(!options.saddress) options.saddress = '';
			if(!options.remarks) options.remarks = '';

			this.setData({
				serviceitem: options.serviceitem,
				date: options.rq,
				time1: t1,
				time2: t2,
				curDate: util.getFormatDate(),
				empolyee:options.empolyee,
				address:options.saddress,
				remarks:options.remarks
			});
		} else {
			this.setData({
				curDate: util.getFormatDate()
			});
		}
	}
});
