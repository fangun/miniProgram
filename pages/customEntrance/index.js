//index.js
//获取应用实例
const app = getApp();

var QQMapWX = require('../../resource/SDK/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
	key: 'JS7BZ-LOMH3-NVV3P-3656S-IC6N2-L7FXR'
});

var API = require('../../utils/api.js');
var REQUEST = require('../../utils/request.js');
var complete = require('../../utils/complete.js');
var UTIL = require('../../utils/util.js');

Page({
	data: {
		apiPrefix: 'https://www.yuyue58.cn/fileImage/',
		pageTitle: '预约吧',
		hotlistTitle: {
			c: '我的预约热榜',
			e: 'Appointment Trending'
		},
		diaryTitle: {
			c: '我的预约日记',
			e: 'Appointment Book'
		},

		hostListData: null,
		completedData: null,

		completingData: false,
		completingSeqData: false,
		completingTitleData: false,
		completingTime: false,

		tabState: 'doing',
		tabContentShow: true,
		appointmentState: 0,
		showModal: false,
		tabbarActive: true,

		compeletingModal: false,
		compeletedModal: false,
		chooseModal: false,
		compeletingDeleteModal: false,

		orderId: null,
		compeletingModalData: null,
		compeletedModalData: null,

		hotDeleteModal: false,

		depositModal: false,
		fullAmountModal: false,
		moneyModalBelong: null,

		hotDeletePar: {
			mid: null,
			sid: null
		},
		loginState: true,
		compeletingSelfModal: false,
		userInfoState:false,

		flag:0,
		text:'',
		lastX:0,
		lastY:0,
		officialHidden:true
	},

	// =================
	// 数据源
	// 获取热榜数据:getHotData
	//
	//
	// =================

	// 获取热榜数据
	getHotData: function() {
		var that = this;
		// 参数 url,data,callback
		REQUEST.POST(
			API.customEntrance.getHotData,
			{
				ID: app.globalData.peopleInfo.mid
			},
			function(res) {
				if (typeof res.data == 'object' && res.data.length > 0) {
					that.setData({
						hostListData: res.data
					});
				} else if(res.data.length == 0){
					that.setData({
						hostListData: []
					});
				} else {
					wx.showToast({
						title: '获取热榜数据失败',
						image:'../../resource/images/common/cross.png',
						success: function(e) {}
					});
				}
			}
		);
	},

	// 删去经常访问的店家
	cancleFamiliarShop: function(e) {
		var that = this;
		// 参数 url,data,callback
		REQUEST.POST(
			API.customEntrance.cancleFamiliarShop,
			{
				mid: that.data.hotDeletePar.mid,
				sid: that.data.hotDeletePar.sid
			},
			function(res) {
				if (res.data == '1') {
					that.getHotData();
					wx.showToast({
						title: '删除成功',
						success: function(e) {
							that.setData({
								hotDeleteModal: false
							});
						}
					});
				} else {
					wx.showToast({
						title: '删除失败',
						image:'../../resource/images/common/cross.png',
						success: function(e) {}
					});
				}
			}
		);
	},

	// 获取进行中的数据列表
	getCompletingData: function() {
		var that = this;
		// 参数 url,data,callback
		REQUEST.POST(
			API.customEntrance.getCompletingData,
			{
				ID: app.globalData.peopleInfo.mid
			},
			function(res) {
				if (typeof res.data == 'object') {
					var cData = complete.completing(res.data);

					res.data.forEach(function(x, y) {
						x.time = x.time.slice(0, x.time.indexOf(' '));
						x.time1 = cData.timeArray[y];
					});

					that.setData({
						completingData: res.data,
						completingSeqData: cData.itemArray,
						completingTitleData: cData.titleB,
						completingTime: cData.timeArray
					});
				} else {
					wx.showToast({
						title: '获取进行中的数据失败',
						image:'../../resource/images/common/cross.png',
						success: function(e) {}
					});
				}
			}
		);
	},

	// 完成的订单
	getCompletedData: function(e) {
		var that = this;

		REQUEST.POST(
			API.customEntrance.getCompletedData,
			{
				ID: app.globalData.peopleInfo.mid
			},
			function(res) {
				if (typeof res.data == 'object') {
					res.data.sd.forEach(function(x, y, z) {
						x.show = y == 0 ? true : false;
						x.data = y == 0 ? true : false;
					});

					res.data.hc.forEach(function(x, y, z) {
						var t1 = x.time.slice(x.time.indexOf(' ') + 1).split(':');
						var t2 = x.time1.slice(x.time1.indexOf(' ') + 1).split(':');
						var time = t1[0] + ':' + t1[1] + '-' + t2[0] + ':' + t2[1];
						var t3 = x.time.slice(0, x.time.indexOf(' ')).split('-');
						var rq = t3[0] + '-' + t3[1] + '-' + t3[2];
						var rq2 = t3[1] + '-' + t3[2];

						x.time = rq;
						x.time2 = rq2;
						x.time1 = time;
					});

					res.data.list = [];
					res.data.list[0] = res.data.hc;

					that.setData({
						completedData: res.data
					});
				} else {
					wx.showToast({
						title: '获取已完成的数据失败',
						image:'../../resource/images/common/cross.png',
						success: function(e) {}
					});
				}
			}
		);
	},

	// 定向获取已完成订单
	getCompletedData2: function(Year, Month, callback) {
		var that = this;
		REQUEST.POST(
			API.customEntrance.getCompletedData,
			{
				ID: app.globalData.peopleInfo.mid,
				Year: Year,
				Month: Month
			},
			function(res) {
				if (typeof res.data == 'object') {
					if (callback) {
						callback(res);
					}
				} else {
					wx.showToast({
						title: '数据异常',
						image:'../../resource/images/common/cross.png',
						duration: 1200
					});
				}
			}
		);
	},

	// 已完成切换
	foldSwitch: function(e) {
		var that = this;
		var completedData = this.data.completedData;
		var seq = e.currentTarget.dataset.seq;
		completedData.sd.forEach(function(x, y) {
			if (x.show) {
				x.show = false;
			} else {
				x.show = y == seq ? true : false;
			}
		});
		if (!completedData.sd[seq].data) {
			that.getCompletedData2(completedData.sd[seq].year, completedData.sd[seq].month, function(res) {
				res.data.hc.forEach(function(x, y, z) {
					var t1 = x.time.slice(x.time.indexOf(' ') + 1).split(':');
					var t2 = x.time1.slice(x.time1.indexOf(' ') + 1).split(':');
					var time = t1[0] + ':' + t1[1] + '-' + t2[0] + ':' + t2[1];
					var t3 = x.time.slice(0, x.time.indexOf(' ')).split('-');
					var rq = t3[0] + '-' + t3[1] + '-' + t3[2];
					var rq2 = t3[1] + '-' + t3[2];
					x.time = rq;
					x.time2 = rq2;
					x.time1 = time;
				});
				completedData.list[seq] = res.data.hc;
				completedData.sd[seq].data = true;

				that.setData({
					completedData: completedData
				});
			});
		} else {
			that.setData({
				completedData: completedData
			});
		}
	},

	cancelOrderModal: function(e) {
		var that = this;
		var orderId = this.data.orderId;
		if (!orderId) return;

		REQUEST.POST(
			API.customEntrance.delBooking,
			{
				id: orderId
			},
			function(res) {
				if (res) {
					that.getCompletingData();
					wx.showToast({
						title: '成功',
						
						duration: 1200,
						success: function(e) {
							that.setData({
								compeletingDeleteModal: false,
								compeletingModal: false
							});
						}
					});
				}
			}
		);
	},

	// 取消订单(进行中的)
	cancelOrder: function(e) {
		var that = this;
		var orderId = this.data.orderId;
		if (!orderId) return;

		REQUEST.POST(
			API.customEntrance.delBooking,
			{
				id: orderId
			},
			function(res) {
				if (res) {
					that.getCompletingData();
					wx.showToast({
						title: '成功',
						
						duration: 1200,
						success: function(e) {
							that.setData({
								chooseModal: false
							});
						}
					});
				}
			}
		);
	},

	// 修改私人预约
	compeletingSelfModalMod: function(e) {
		var item = e.currentTarget.dataset.item;
		wx.redirectTo({
			url: `../addAppointmentHand/index?id=${item.id}&serviceitem=${item.serviceitem}&rq=${item.time}&time=${item.time1}&empolyee=${item.empolyee}&saddress=${item.saddress}&remarks=${item.remarks}`
		});
	},

	// 用户授权信息 注册(存储到数据库)
	userInfoRegister: function(data) {
		var that = this;
		REQUEST.POST(
			API.customEntrance.userInfoRegister,
			data,
			function(res) {
				console.log(res);
			}
		);
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
								that.authorizeInit();
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

	// =================
	// 数据源
	// =================

	// =================
	// 弹出框 start
	// =================

	// 热榜 删去提示
	hotDeleteChooseModal: function(e) {
		var sid = e.currentTarget.dataset.sid;
		this.setData({
			hotDeleteModal: true,
			hotDeletePar: {
				mid: app.globalData.peopleInfo.mid,
				sid: sid
			}
		});
	},

	compeletingDeleteModalShow: function(e) {
		this.setData({
			compeletingDeleteModal: true
		});
	},

	compeletingDeleteModalClose: function(e) {
		this.setData({
			compeletingDeleteModal: false
		});
	},

	hotDeleteChooseModalClose: function(e) {
		this.setData({
			hotDeleteModal: false
		});
	},

	compeletedModalClose: function() {
		this.setData({
			compeletedModal: false
		});
	},

	compeletedModalShow: function(e) {
		var compeletedModalData = e.currentTarget.dataset.item;

		this.setData({
			compeletedModal: true,
			compeletedModalData: compeletedModalData
		});
	},

	compeletingSelfModalShow: function(e) {
		var compeletingModalData = e.currentTarget.dataset.item;
		this.setData({
			compeletingSelfModal: true,
			compeletingModalData: compeletingModalData
		});
	},

	compeletingSelfModalClose: function(e) {
		this.setData({
			compeletingSelfModal: false
		});
	},

	compeletingModalShow: function(e) {
		var orderId = e.currentTarget.dataset.id;
		var compeletingModalData = e.currentTarget.dataset.item;

		this.setData({
			compeletingModal: true,
			orderId: orderId,
			compeletingModalData: compeletingModalData
		});
	},

	compeletingModalClose: function(e) {
		this.setData({
			compeletingModal: false
		});
	},

	selectDoing: function(e) {
		this.setData({
			tabState: e.currentTarget.dataset.id,
			tabContentShow: true
		});
	},

	selectDone: function(e) {
		this.setData({
			tabState: e.currentTarget.dataset.id,
			tabContentShow: false
		});

		this.getCompletedData();
	},

	// 订金 全额 弹出框显示
	moneyModalShow: function(e) {
		var item = e.currentTarget.dataset.item;
		if (item.deposit) {
			this.setData({
				depositModal: true,
				moneyModalBelong: 'depositModal'
			});
		} else if (item.fullAmount) {
			this.setData({
				fullAmountModal: true,
				moneyModalBelong: 'fullAmountModal'
			});
		}
	},

	moneyModalClose: function() {
		var belong = this.data.moneyModalBelong;

		if (belong == 'depositModal') {
			this.setData({
				depositModal: false
			});
		} else {
			this.setData({
				fullAmountModal: false
			});
		}
	},

	// =================
	// 弹出框 end
	// =================

	// =================
	// 路由 start
	// =================

	searchPage: function(e) {
		wx.navigateTo({
			url: '../searchStore/index'
		});
	},

	storeBackEnd: function(e) {
		wx.redirectTo({
			url: '../storeBackEnd/index',
			success: function() {},
			fail: function() {},
			complete: function() {}
		});
	},

	// 跳转常去店铺
	frequentedStore: function(e) {
		app.globalData.peopleInfo.sid = e.currentTarget.dataset.id;
		wx.redirectTo({
			url: '../storeHead/index'
		});
	},

	appointmentVoice: function(e) {
		wx.redirectTo({
			url: '../addAppointmentVoice/index'
		});
	},

	minePage: function(e) {
		wx.redirectTo({
			url: '../personalDetails/index'
		});
	},

	// =================
	// 路由 end
	// =================

	// 扫一扫
	richScan: function() {
		wx.scanCode({
			success(res) {
				let url = res.result;
				//是否有转义了的 %3d
				let flag1 = url.indexOf('%3d');
				if (flag1 != -1) {
					let urlArr = url.split('%3d');
					//最后一个%3d 后面的，应该是sid, 32位
					let sid = urlArr[urlArr.length - 1];
					if (sid.length == 32) {
						app.globalData.peopleInfo.sid = sid;

						wx.navigateTo({
							url: '../storeHead/index'
						});
					}
				}
			}
		});
	},

	// 禁止冒泡
	forbidBubbling: function() {
		console.log('禁止button冒泡');
	},

	// 显示提示弹出层
	showChooseModal: function(e) {
		var orderId = e.currentTarget.dataset.id;
		this.setData({
			chooseModal: true,
			orderId: orderId
		});
	},

	chooseModalClose: function() {
		this.setData({
			chooseModal: false
		});
	},

	showModalFn: function() {
		this.setData({
			showModal: true
		});
	},

	modalClose: function() {
		this.setData({
			showModal: false
		});
	},

	// 拨打电话
	makingCalls: function(e) {
		var phoneNumber = e.currentTarget.dataset.tel;
		wx.makePhoneCall({
			phoneNumber: phoneNumber
		});
	},

	// 分享
	onShareAppMessage: function(res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target);
		}
		var item = res.target.dataset.item;
		var rq = res.target.dataset.rq;
		var time = res.target.dataset.time;
		var date = item.time;
		var week = UTIL.getWeekByDay(date);
		var logo;

		if(item.logo && item.logo !== ''){
			logo = this.data.apiPrefix + '' + item.logo;
		} else {
			logo = '../../resource/images/common/logo.png';
		}
		var pars = 'pages/messageCard/index?';
		if (item.type == 3) {
			[ 'name','serviceitem', 'saddress','empolyee','remarks','type'].forEach(function(x, y) {
				if (item[x]) {
					if (y == 0) {
						pars += x + '=' + item[x];
					} else {
						pars += '&' + x + '=' + item[x];
					}
				} else {
					if (y == 0) {
						pars += x + '=' + '';
					} else {
						pars += '&' + x + '=' + '';
					}
				}
			});
		} else {
			[ 'sid', 'name','empolyee', 'serviceitem', 'sName', 'saddress','type' ].forEach(function(x, y) {
				if (item[x]) {
					if (y == 0) {
						pars += x + '=' + item[x];
					} else {
						pars += '&' + x + '=' + item[x];
					}
				} else {
					if (y == 0) {
						pars += x + '=' + '';
					} else {
						pars += '&' + x + '=' + '';
					}
				}
			});
		}

		// 日期 星期 小时区间
		pars += '&date=' + date + '&rq=' + rq + '&time=' + time + '&week=' + week + '&logo=' + logo
		 + '&wxName=' + app.globalData.userInfo.nickName + '&wxAvatarUrl=' + app.globalData.userInfo.avatarUrl;

		var title = app.globalData.userInfo.nickName + '' + rq + '要去...';

		return {
			title: title,
			path: pars,
			imageUrl: '../../resource/images/messageCard/000.png',
			success: function(res) {
				// var shareTickets = res.shareTickets;
				// if (shareTickets.length == 0) {
				//     return false;
				// }
				// wx.getShareInfo({
				//     shareTicket: shareTickets[0],
				//     success: function(res){
				//         var encryptedData = res.encryptedData;
				//         var iv = res.iv;
				//         console.log('onShareAppMessage');
				//         console.log(encryptedData);
				//         console.log(iv);
				//     }
				// })
			},
			//## 转发操作失败/取消 后的回调处理，一般是个提示语句即可
			fail: function() {
				console.log('转发失败');
			}
		};
	},

	// 手机账号登录
	accountLogin: function() {
		wx.navigateTo({
			url: '../accountLogin/index'
		});
	},

	// 页面数据获取
	initPageData: function(e) {
		this.getHotData();
		this.getCompletingData();
	},

	// 授权 数据初始化
	authorizeInit: function() {
		if (app.globalData.loginCache) {
			this.setData({
				loginState: app.globalData.loginCache
			});
			this.initPageData();
		}

		// 获取微信头像及名字 如果有则不调用授权接口
		var that = this;
		if(!this.data.userInfoState && app.globalData.peopleInfo){
			// console.log(app.globalData.peopleInfo);
			var mid = app.globalData.peopleInfo.mid;
			REQUEST.POST(
				API.personalDetails.memberMessage,
				{
					id: mid
				},
				function(res) {
					console.log('userInfoState');
					
					if(res.data[0].avatarUrl && res.data[0].nickName){
						app.globalData.userInfo = res.data[0];
						that.setData({
							userInfoState: true
						});
					}

				}
			);
		}
	},

	// 存储微信授权的基本信息
	onGotUserInfo: function (e) {
		if(e.detail.errMsg == 'getUserInfo:ok'){
			wx.login({
				success: (res) => {
					app.globalData.userInfo = e.detail.userInfo;

					this.setData({
						userInfoState: true
					});
		
					var data = {
						mid:app.globalData.peopleInfo.mid,
						code:res.code,
						signature:e.detail.signature,
						app:'wxb',
						encryptedData:e.detail.encryptedData,
						iv:e.detail.iv,
						rawData:e.detail.rawData
					}
		
					this.userInfoRegister(data);
				}
			});
		}

		if(e.currentTarget.dataset.target == 'personalDetails')  {
			wx.redirectTo({
				url: '../personalDetails/index'
			});
		}

	},
	
	// 地址地图查看
	getMapAddress: function(e) {
		var that = this;
		var location = e.currentTarget.dataset.location;
		var address = {}; //坐标对象 lat经度 lng维度

		that.getMap(location, address);
	},

	getMap: function(location, address) {
		qqmapsdk.geocoder({
			address: location,
			success: function(res) {
				address = res.result.location;
				var latitude = address.lat;
				var longitude = address.lng;
				wx.openLocation({
					latitude: Number(latitude),
					longitude: Number(longitude),
					scale: 28
				});
			},
			fail: function(e) {
				wx.showToast({
					title: '暂时无法找到该位置',
					image:'../../resource/images/common/cross.png',
					duration: 2000
				});
			},
			complete: function(e) {}
		});
	},

	// 下拉显示关注公众号
	onPullDownRefresh(){
		var that = this;
		setTimeout(function(){
			if(!that.data.officialHidden){
				that.setData({
					officialHidden:true
				});
			}
            wx.stopPullDownRefresh();
        },400);
    },

	// 手势长按
	// longpress:function(e){
	// 	console.log(e);
	// 	officialHidden
	// 	if(this.data.flag == 4){
	// 		this.setData({
	// 			officialHidden : true
	// 		});
	// 	}
	// },

	//手势滑动
	handletouchmove: function(event) {
		console.log('handletouchmove');
		if (this.data.flag !== 0){
		  return
		}
		let currentX = event.touches[0].pageX;
		let currentY = event.touches[0].pageY;
		let tx = currentX - this.data.lastX;
		let ty = currentY - this.data.lastY;

		//左右方向滑动
		if (Math.abs(tx) > Math.abs(ty)) {
		  if (tx < 0) {
			console.log('向左滑动');
			this.setData({
				flag : 1
			});
			this.data.flag= 1;
		  } else if (tx > 0) {
			console.log('向右滑动');
			this.setData({
				flag : 2
			});
		  }
		} else {
		  if (ty < 0){
			console.log('向上滑动');
			this.setData({
				flag : 3,
				officialHidden:false
			});
		  } else if (ty > 0) {
			console.log('向下滑动');
			this.setData({
				flag : 4
			});
		  }
		}
		this.setData({
			lastX : currentX,
			lastY : currentY
		});
	  },

	  handletouchtart:function(event) {
		// this.setData({
		// 	lastX : event.touches[0].pageX,
		// 	lastY : event.touches[0].pageY
		// });
		if(this.data.officialHidden){
			this.setData({
				officialHidden:false
			});
		}

	  },

	  handletouchend:function(event) {
		// this.setData({
		// 	flag : 0
		// });
		this.setData({
			officialHidden:false
		});
	  },
	

	onShow: function(option) {
		// 登录
		wx.login({
			success: (res) => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				app.globalData.code = res.code;
			}
		});
	},

	onLoad: function(q) {
		var that = this;
		// 微信头像等授权状态

		if(app.globalData.userInfo){
			this.setData({
				userInfoState: true
			});
		};

		// 消息卡片分享
		if(q.messageCard && q.messageCard == 3){
			wx.showToast({
				title: '添加成功',
				duration:1500,
				success: function() {}
			});
		};

		// 判断是用户是否绑定了
		if (app.globalData.loginCache) {
			that.authorizeInit();
		} else {
			this.setData({
				loginState: false
			});

			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.loginCacheCallback = (peopleInfo) => {
				if (typeof peopleInfo == 'object') {
					app.globalData.peopleInfo = peopleInfo;
					app.globalData.loginCache = true;
					that.authorizeInit();
				}
			};
		};

	}
});
