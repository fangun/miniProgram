// pages/storeHead/index.js
var QQMapWX = require('../../resource/SDK/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getData:"",
    storeId:"",
    vip:0,
    storeSet: {},       //vip等选项设置
		skin:"",
    storeData: {},      //店家具体数据
    otherShow:true,
    peopleData:{},    //登陆者的数据 生日，手机，姓名，座机
    peopleName:"",
    socials:[],       //外链
    serviceEmployee: [],  //店员 总表

    introLength:0,      //intro简介的长度
    storeIntro: false,  //intro简介 1.展开 0收起
    orderList: [],      //已有的预约  {date: "2018-09-04", time: "16:00", num: 1}数组
    holidayHourList:[], //员工请假的小时段
    currentYear: "",    
    currentMonth: "",
    selectYear:"",
    selectMonth:"",
    hoursPast:30,        //一格的时间

    selectedServices: [],     //已选的服务
    serviceTime: 0,           //总服务时间
    dingjin: 0,               //总订金
    totalMoney:0,             //总 金额

    modal_tip_show: 0,        //订金 全额 弹窗
    modal_tip_title: "",
    modal_tip_content: [],

    selectPeople: "",         //已选的技师
    selectPeopleStr: "",      //

    dayLong: 0,              //营业天数
    activityDay: [],          //该店可选择的(day和星期)  今天+天数
    peopleActivityDay: [],    //该人 的可选day          扣去 周休 和 具体休
    disabledDay: [],          //删掉的date    在日历里显示灰色背景 不可选
    
    hoursArr:[],              //小时们
    
    native_comp:false,//原生组件的hidden
    hourBlock:[] ,             //小时，起止  时间块
    factEndHour:"",           //实际结束时间点

    toDate:"",              // 日历自动滚动
    toblock:"",
    toProject:"serv0",           //项目的滚动
    toPeople:"peo0",        //服务人员的滚动

    //帮他人预约 客户信息 姓名
    inputShow:"white",
    valueShow:"black",
    otherName:"",
    otherSex:"1",


    orderForOther: false,       //勾选按钮
    history: [],            //为他人预约，历史
    orderOtherData:{},      //为他人预约，最终 姓名和性别

    modal_confirm:false, //modal 确认提交
    birth:"　　　　　　　　　　",
    zuoTel:"",
    beizhu:"",
    storeLogo:"",
    // id:"56327a2f0f164a59b9eff195ba4a4d15",
    Modal_tryNow:false, //立即体验 显示 
    tryNow_time:7, //立即体验 有效期 天
    topTip:"",

		textareaShow:false,
		TAfocus:true,

    selectDay:"", //已选的day
    selectOther:[
      {}
    ],
    
    modal_calendar_show:false,
    shortInfoShow:false,
    shortInfo:"",
    orderClashShow:false,
    orderClash:"",
    // lessOneShow:false,
    sendData:{},
    isfirstAction:true,             //确认提交的弹窗 最后的确定按钮 防止双击多次提交
   
		modalShow:false,	 						//模板的弹窗
		modalData:{},
		authorizeState:false,
		authorizeState2:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {





		
		console.log("onload")
		let that  = this;
		console.log(app.globalData)
		let loginCache = app.globalData.loginCache;
		let scene = app.globalData.scene;
		let sid ="d03c4a737be3462ba6218a6b494dafb7"
		console.log("option")
		console.log(option)
		// search页进来	1.sid 2.sid和mid
		
		if (scene != "1011") {			//为调试，改成分享卡片进入
			console.log("!!1011")
			 sid = app.globalData.peopleInfo.sid;
			console.log(sid)
			this.setData({
				storeId: sid,
				authorizeState:true	//search跳转，此处不做授权验证
			})
			//3 店家是否为vip，各板块是否开着
			this.getStoreSet();
			if(loginCache){
				this.setData({
					authorizeState2: true		//如已授权，关闭 提交 处的授权层
				})
				let mid = app.globalData.peopleInfo.mid;
				let mPhone = app.globalData.peopleInfo.mobile;

				//1 登陆者 的信息  名字 电话 性别 座机 头像 生日 等
				this.getMemberInfo();

				//2 登陆者 的 替他人预约历史
				this.getMemberHistory()
			}else{
				console.log("无授权跳转")
			}
		}
		//微信scan进来 ,判断一次授权
		if(scene =="1011"){
			console.log("1011")
			let url = option.q;
			sid = url.split("%3D")[1];
			console.log(sid)
			app.globalData.peopleInfo = {
				"sid":sid
			};
			// 1 店家是否为vip，各板块是否开着
			this.getStoreSet();

			//判断缓存
			wx.getStorage({
				key: 'fangun-storeFront',
				success: function (res) {
					//console.log(res.data.message)
					if (typeof res.data == 'object' && res.data.message != "发生错误。") {
						console.log("you")
						app.globalData.loginCache = true;
						app.globalData.peopleInfo = res.data;
						that.setData({
							authorizeState: true,
							authorizeState2: true
						},()=>{
							//1 登陆者 的信息  名字 电话 性别 座机 头像 生日 等
							that.getMemberInfo();

							//2 登陆者 的 替他人预约历史
							that.getMemberHistory()
						})
						
					} else {
						that.setData({
							authorizeState: true
						})
						app.globalData.loginCache = false;
					}
				},
				fail: function (res) {

				}
			})

			console.log(app.globalData)
		}

		this.setData({
			sid:sid
		})
    qqmapsdk = new QQMapWX({
			key: 'JS7BZ-LOMH3-NVV3P-3656S-IC6N2-L7FXR'
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
		console.log("onready")
    let that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/selecShop',
      method: "POST",
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: {
				id: app.globalData.peopleInfo.sid
      },
      success(res) {
        console.log(res.data);
        let logo = res.data.logo;
        if(logo == null){
          logo = "https://www.yuyue58.cn/images/tem3.png"
        }else{
          logo = "https://www.yuyue58.cn/fileImage/" + logo
        }
        that.setData({
          storeData: res.data,
          storeLogo: logo,
          introLength: res.data.profile.length,
          dayLong: res.data.bookingMonth*30
          // dayLong: 35
        });

        //立即体验
        that.checkTryNow();

        //复制人员总数组，做isAbled等处理
        that.setData({
          serviceEmployee: that.data.storeData.serviceEmployee,
        })

        wx.request({
          url: 'https://api.yuyue58.cn/api/bookingNum',
          method: "POST",
          header: { "content-type": "application/x-www-form-urlencoded" },
          data: {
						sid: app.globalData.peopleInfo.sid
          },
          success(res) {
            console.log(res.data);
            //已预定的日期，小时，给时段预约量
            that.setData({
              orderList: res.data,
            })
          }
        })

        wx.request({
          url: 'https://api.yuyue58.cn/api/Holiday',
          method: "POST",
          header: { "content-type": "application/x-www-form-urlencoded" },
          data: {
						sid: app.globalData.peopleInfo.sid
          },
          success(res) {
            console.log(res.data.holiday);
            that.setData({
              // orderList: res.data.nums,       //已预定的日期，小时，给时段预约量
              holidayHourList:res.data.holiday    //员工休假的 小时段
            })
            
          }
        })



        //今天 哪年哪月
        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth() + 1;
        that.setData({
          currentYear: currentYear,
          currentMonth: currentMonth
        })

        that.checkPeopleList();

        //生成日期
        let activityDay = [];
        let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        //总时长
        for (let i = 0; i < that.data.dayLong; i++) {
          let today = new Date();
          today.setDate(today.getDate() + i); //today向后设置一天
          let day = today.getDate();           //日
          let dayshow = "";
          if (day < 10) {
            dayshow = "0" + day
          } else {
            dayshow = day
          }
          let month = today.getMonth() + 1;      //月
          if (month < 10) {
            month = "0" + month
          }
          let weekIndex = today.getDay();   //0周日 1 周一  周
          let week = weeks[weekIndex];      //周几
          //后端传来的值 0为周一，6为周日
          weekIndex--;
          if (weekIndex == -1) { weekIndex = 6 }

          activityDay.push({
            "year": today.getFullYear(),
            "date": month + "-" + dayshow,
            "week": week,
            "weekIndex": weekIndex,
            "id": today.getFullYear() + "-" + month + "-" + dayshow
          })
        }
        that.setData({
          peopleActivityDay: activityDay
        })

        //生成默认hours
        let hourString = that.data.storeData.serviceTime; //默认的工作小时
        let hours = hourString.split("|");
        let hoursArr = [];
        for (let i = 0; i < hours.length;i++){
          hoursArr.push({
            time: hours[i],
            use: 0,
            selected: 0
          })
        }
        that.setData({
          hoursArr: hoursArr
        })

      }
    });
    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				app.globalData.code = res.code;
			}
		})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

	getPhoneNumber(e) {
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				app.globalData.code = res.code;
			}
		})
		let that = this;
		wx.request({
			url: 'https://api.yuyue58.cn/api/wxLogin',
			method: "POST",
			data: {
				app: 'wxe',
				// app: 'wxe',//店家 wxb1881cff7fde6cf6
				code: app.globalData.code,
				iv: e.detail.iv,
				encryptedData: e.detail.encryptedData
			},
			header: { "content-type": "application/x-www-form-urlencoded" },
			success(res) {
				if (typeof res.data == 'object' && res.data.mobile) {
					console.log(res.data)
					let data = res.data;
					//存储缓存
					wx.setStorage({
						key: "fangun-storeFront",
						data: data
					});
					//存app
					app.globalData.loginCache = true;
					app.globalData.peopleInfo = data;
					that.setData({
						authorizeState:true,
						authorizeState2: true
					})
					//1 登陆者 的信息  名字 电话 性别 座机 头像 生日 等
					that.getMemberInfo();

					//2 登陆者 的 替他人预约历史
					that.getMemberHistory()
				} else {
					
					wx.showToast({
						title: '授权失败',
						icon: 'none',
						success: function () {
						}
					});
					that.setData({
						authorizeState: true,
						authorizeState2: false
					})
				}
			}
		});
	},
	

  getStoreSet:function(){
    let that = this;
    let flag = 0; //试5次还错误，就是接口坏了
    wx.request({
      url: 'https://api.yuyue58.cn/api/VipJudgement',
      method: "POST",
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: {
				sid: app.globalData.peopleInfo.sid
      },
      success(res) {
				console.log("getStoreSet")
        console.log(res.data)
        
				if (res.data.firstvisit == 0 && res.data.reservationHelp == 0 && res.data.birthday == 0 && res.data.seatmachineswitch == 0 && res.data.nameswitch==0){
					that.setData({
						otherShow:false
					})
				}
				//换肤
				let skin = "";
				switch (res.data.skin) {
					case 0:
						skin = "sRed"
						break;
					case 1:
						skin = "sBlack"
						break;
				}
        that.setData({
          storeSet: res.data,
          vip: res.data.vip,
          // socials: socials,
					skin:skin
        })
      },
      fail(res) {
        console.log("getVipFail")
      }
    })
  },

  getMemberInfo:function(){
    let that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/memberMessage',
      method: "POST",
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: {
        id: app.globalData.peopleInfo.mid
      },
      success(res) {
        console.log(res.data.length)
        if(res.data.length == 0){
          console.log("getMemberInfo_data0")
        }else{
					console.log(res.data)
          let birth = ""
          if (res.data[0].birthday == null) {
            birth = "　　　　　　　　　　" //10格
          } else {
            birth = res.data[0].birthday
          }
					console.log(birth)
          that.setData({
            peopleData: res.data[0],
            zuoTel: res.data[0].seatMachine,
            peopleName: res.data[0].name,
            birth: birth
          })
        }
      },
      fail(res){
        console.log('getMenberInfoFail')
        that.getMemberInfo()
      }
    })
  },

  getMemberHistory:function(){
    let that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/CustomerMessage',
      method: "POST",
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: {
        mid: app.globalData.peopleInfo.mid
      },
      success(res) {
        console.log(res)
        let history = res.data
        that.setData({
          history: history
        })
      },
      fail(res){
        console.log("getHistoryFail");
        that.getMemberHistory()
      }
    })
  },






  //立即体验 蒙版 是否显示
  //7天     测试1分钟
  checkTryNow:function(){
    let that = this;
    let now =  Date.parse(new Date());

    let plusTime = this.data.tryNow_time*24*60*60*1000;
    // let plusTime =60*1000*60*24*7;     
    let newLastTime = now + plusTime;
    //console.log("now:"+now)
    //console.log("newLastTime"+newLastTime)
    wx.getStorage({
      key: 'sjrk',  //商家入口 立即体验 7天有效  //
      success: function (res) {
        let lastTime = "";//上次登陆的时间戳
        lastTime = res.data;
        //console.log("lastTime"+lastTime)
        if (lastTime + plusTime<now){   //now 超出了 上次登录+有效期
          that.setData({
            Modal_tryNow: true
          })
        }
      },
      fail: function (res) {
        that.setData({
          Modal_tryNow: true
        })
        
      },
      complete:function(res){
        wx.setStorage({
          key: 'sjrk',
          data: newLastTime
        })
      }
    })
  },

  btn_tryNow:function(){
    console.log("close")
    this.setData({
      Modal_tryNow:false
    })
  },

  //简介  展开/收起
  switchIntro:function(){
    this.setData({
      storeIntro: !this.data.storeIntro
    })
  },

  openMap:function(e){
    let that = this;
    let location = e.currentTarget.dataset.location;
    let address = {};  //坐标对象 lat经度 lng维度
    qqmapsdk.geocoder({
      address: location,
      success: function (res) {
        address = res.result.location;
        let latitude = address.lat;
        let longitude = address.lng;
        console.log(latitude)
        console.log(longitude)        
        wx.openLocation({
          latitude: Number(latitude),
          longitude: Number(longitude),
          scale: 28
        })
      },
      fail: function (res) {
				console.log(res)
        that.setData({
          topTip:"暂时无法找到该位置"
        });
        that.toptip()
      }
    });
  },

  tel:function(e){
    let tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel, //此号码仅用于测试 。
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }

    })
  },
  
  topPerson:function(){
    wx.navigateTo({
      url: '../customEntrance/index'
    })
  },

  //顶部条伸出
  toptip: function () {
    let that = this;
    this.setData({
      show: 1
    })
    setTimeout(function () {
      that.setData({
        show: 2
      })
    }, 1000)
  },


  //点击 单个项目
  selectProject: function (e) {
		// if (app.globalData.loginCache==false){

		// }


    let that = this;
    let projectId = e.currentTarget.dataset.id;
    let serviceItems = this.data.storeData.serviceItems.slice(0);
    let serviceTime = 0;
    let dingjin = 0;
    let totalMoney = 0;
    let selectedServices = [];
    let hoursArr = this.data.hoursArr.slice(0);
    // console.log(hoursArr)
    for(let a = 0;a<hoursArr.length;a++){
      hoursArr[a].selected=0
    }
    this.setData({ hoursArr: hoursArr})
    for(let i=0;i<serviceItems.length;i++){
      //1.找到点击项，修改isselected
      if (serviceItems[i].id == projectId){ 
        let status = serviceItems[i].isSelected;
        let parm = 'storeData.serviceItems['+i+'].isSelected' //没有isSelected项，会直接生成一个 用于页面状态切换
        that.setData({
          [parm]: !status
        })
      }else{
        //能否多选
        if (this.data.storeData.frontdesk!=1){
          let parm = 'storeData.serviceItems[' + i + '].isSelected'
          that.setData({
            [parm]: false
          })
        }
      }
      //2.提取已选项的价格之和，订金，总金 
      if (serviceItems[i].isSelected){            
        selectedServices.push({                         //已选的 项目 数组，用于待发送
          "id" : serviceItems[i].id,
          "name": serviceItems[i].name
        })
        serviceTime += serviceItems[i].hour;
        dingjin += serviceItems[i].deposit;
        totalMoney += serviceItems[i].fullAmount;
      }
    }
    this.setData({
      selectedServices: selectedServices,
      serviceTime: serviceTime,
      dingjin: dingjin,
      totalMoney: totalMoney,
      selectDay: "",
      hourBlock: []
    })
    this.checkPeopleList()
  },

  projectLeft:function(e){
    let toProject = this.data.toProject;  //serv0
    let index = toProject.split("serv")[1];
    if(index>0){
      index = index - 1
    }
    let newToP = "serv" + index
    this.setData({
      toProject:newToP
    })
  },
  projectRight: function (e) {
    let toProject = this.data.toProject;  //serv0
    let index = parseInt(toProject.split("serv")[1]);
    let length = this.data.storeData.serviceItems.length;
    if (index < (length - 1)) { index = index + 1}
    let newToP = "serv" + index
    this.setData({
      toProject: newToP
    })
  },
  peopleLeft: function (e) {
    let toPeople = this.data.toPeople;  //serv0
    let index = toPeople.split("peo")[1];
    if (index > 0) {
      index = index - 1
    }
    let newToP = "peo" + index
    this.setData({
      toPeople: newToP
    })
  },
  peopleRight: function (e) {
    let toPeople = this.data.toPeople;  //peo0
    let index = parseInt(toPeople.split("peo")[1]);
    let length = this.data.storeData.serviceEmployee.length;
    if (index < (length - 1)) { index = index + 1 }
    let newToP = "peo" + index
    this.setData({
      toPeople: newToP
    })
  },
  //选择 项目 后，人员的变化
  checkPeopleList:function(){
    //循环选中的项目列表   循环人列表，循环人的项目，无匹配，则为false  有该项目的人列表，比较下一个项目
    let peopleAll = this.data.serviceEmployee.slice(0);
    // console.log(peopleAll);
    let projectSelect = this.data.selectedServices.slice(0);
    console.log(projectSelect)
    if(projectSelect.length==0){  //一个项目都没选
      for (let i = 0; i < peopleAll.length;i++){
        peopleAll[i].isAbled = false
      }
    }else{
      for (let i = 0; i < peopleAll.length;i++){
        let flag = true;
				let disabledType = ""
        for (let j = 0; j < projectSelect.length;j++){
          let selId = projectSelect[j].id;
          let have = peopleAll[i].good.indexOf(selId);
          if(have==-1){
            flag= false;
						disabledType="service"
          }
					if (peopleAll[i].holiday == "0,1,2,3,4,5,6"){
						flag = false;
						disabledType = "holiday"
					}
        }
        peopleAll[i].isAbled = flag;
				peopleAll[i].disabledType = disabledType;
      }
    }

    // let parm = "serviceEmployee[" + i + "].isAbled";
    this.setData({
      serviceEmployee: peopleAll,
      selectPeople: "",        //每次改变项目，selectPeople初始化
      selectPeopleStr: ""
    })
    
    //sconsole.log(peopleAll)
  },

  //点击 不可选 的 人员
  selectDisablePeople:function(){
    if (this.data.selectedServices.length==0){
      let unselect = (this.data.storeData.description1 == null ? "服务项目" : this.data.storeData.description1)
      this.setData({
        topTip: "请先选择" + unselect
      })
      
    }else{
      this.setData({
        topTip:"该人员未开通此服务"
      })
    }
    this.toptip();
  },
  //点击可选的人
  selectPeople:function(e){
		//console.log(e)
		if (e.currentTarget.dataset.distype==""){
			let peopleId = e.currentTarget.dataset.id;
			let peoplename = e.currentTarget.dataset.name;
			console.log(peopleId);
			let hoursArr = this.data.hoursArr;
			for (let i = 0; i < hoursArr.length; i++) {
				hoursArr[i].selected = 0
			}
			this.setData({
				selectPeople: peopleId,
				selectPeopleStr: peoplename,
				selectDay: "",
				hoursArr: hoursArr,
				hourBlock: []

			})
			//删除 横滚条中 休假的 周几
			//删店家的休息holiday 和 个人的休息 specialdate
			let holiday = ''; //0 周一    "0,1,2"  //此人的休假 按周
			let spDates = [];                     //此人的休假 具体某日
			let serviceEmployee = this.data.serviceEmployee.slice(0);
			for (let k = 0; k < serviceEmployee.length; k++) {
				if (serviceEmployee[k].id == peopleId) {
					holiday = serviceEmployee[k].holiday;
					spDates = serviceEmployee[k].specialdate.slice(0)
				}
			}
			console.log(spDates)

			let activityDay = [];
			let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
			//总时长
			for (let i = 0; i < this.data.dayLong; i++) {
				let today = new Date();
				today.setDate(today.getDate() + i); //today向后设置一天
				let day = today.getDate();           //日
				let dayshow = "";
				if (day < 10) {
					dayshow = "0" + day
				} else {
					dayshow = day
				}
				let month = today.getMonth() + 1;      //月
				if (month < 10) {
					month = "0" + month
				}
				let weekIndex = today.getDay();   //0周日 1 周一  周
				let week = weeks[weekIndex];      //周几
				//后端传来的值 0为周一，6为周日
				weekIndex--;
				if (weekIndex == -1) { weekIndex = 6 }

				activityDay.push({
					"year": today.getFullYear(),
					"date": month + "-" + dayshow,
					"week": week,
					"weekIndex": weekIndex,
					"id": today.getFullYear() + "-" + month + "-" + dayshow
				})
			}

			let deleteDay = [];
			for (let j = 0; j < activityDay.length; j++) {
				let flag = 0;
				//按周删
				let weekIndex = activityDay[j].weekIndex;
				if (holiday.indexOf(weekIndex) != -1) {
					deleteDay.push(activityDay[j])
					// activityDay.splice(j,1)
					// j--
					flag = 1
				}
				if (spDates.length != 0 && spDates[0] != null) {
					// 按特殊日删
					for (let n = 0; n < spDates.length; n++) {
						let day = spDates[n].split(" ")[0];
						if (day == activityDay[j].id) {
							deleteDay.push(activityDay[j])
							// activityDay.splice(j, 1)
							// j--
							flag = 1
						}
					}
				}
				if (flag == 1) {
					activityDay.splice(j, 1)
					j--
				}
			}
			console.log(deleteDay)
			console.log("activityDay:")
			console.log(activityDay)

			if (activityDay.length != 0) {
				//今天是否被删

				// new Date(Date.parse(timeStr)).toString() 
				let today = new Date(); //"2018/10/23 下午8:02:01"
				// let n = 
				// let todayDate = today.split(" ")[0].replace(/\//g, "-")
				// console.log("today"+today)
				let year = today.getFullYear();
				let month = today.getMonth();
				month = month + 1;
				if (month < 10) { month = "0" + month }
				let date = today.getDate();
				if (date < 10) { date = "0" + date }
				console.log("today:");
				let todayStr = year + "-" + month + "-" + date;
				console.log(todayStr)
				let flag = false;
				console.log(deleteDay);
				for (let n = 0; n < deleteDay.length; n++) {
					if (deleteDay[n].id == todayStr) {
						flag = true;
						this.setData({
							topTip: "注意：此服务人员今天休假"
						})
						this.toptip()
					}
				}

				//剩下的第一天为默认
				let firstDay = activityDay[0].id;

				this.setData({
					toDate:"i"+firstDay,
					peopleActivityDay: activityDay,
					disabledDay: deleteDay,
					selectDay: firstDay,
					hourBlock: []
				})
				this.makeHours()
			}
		}
		if (e.currentTarget.dataset.distype == "service"){
			{
				this.setData({
					topTip: "该人员未开通此服务"
				})
			}
			this.toptip();
		}
		if (this.data.selectedServices.length == 0) {
			let unselect = (this.data.storeData.description1 == null ? "服务项目" : this.data.storeData.description1)
			this.setData({
				topTip: "请先选择" + unselect
			})
			this.toptip();
		}
		if (e.currentTarget.dataset.distype == "holiday"){
			 {
				this.setData({
					topTip: "该人员休息"
				})
			}
			this.toptip();
		}
    
  },


  //点击横滚条的day
  selectDay:function(e){
    if(this.data.selectPeople!=""){
      let selectTimeId = e.currentTarget.dataset.timeid;
      let selectYear = selectTimeId.split("-")[0]
      let selectMonth = selectTimeId.split("-")[1]
      this.setData({
        selectDay: selectTimeId,
        hourBlock: [],
        selectYear: selectYear,
        selectMonth: selectMonth
      })
      console.log(selectTimeId)
      this.makeHours()
    } else if (this.data.selectedServices.length==0){
      this.setData({
        topTip:"请先选择 服务项目 服务人员"
      })
      this.toptip();
    }else{
      this.setData({
        topTip: "请先选择服务人员"
      })
      this.toptip();
    }
  },

  //横滚条右侧的 日历 产开弹窗
  rightCalendar:function(){
    if (this.data.selectPeople != "") {
      console.log("showCalendar");
      this.setData({
        native_comp: true,
        modal_calendar_show: true
      })
    } else if (this.data.selectedServices.length==0){
      this.setData({
        topTip:"请先选择 服务项目 服务人员"
      })
      this.toptip();
    }else{
      this.setData({
        topTip: "请先选择 服务人员"
      })
      this.toptip();
    }
    
  },
	//弹出的日历，点击上半部分，收回
	modalBack:function(e){
		this.setData({
			modal_calendar_show:false
		})
	},

  getCalendarData:function(e) { // 监听日历数据
    console.log(e.detail)
  },

  onMyEvent: function (e) {
    this.setData({
      selectDay: e.detail.selectDay,
      modal_calendar_show:false,
      hourBlock:[],
      toDate: "i" + e.detail.selectDay
    })
    this.makeHours()
  },

  selectRestDay:function(e){
    // this.setData({
    //   topTip: "此服务人员今天休息"
    // })
    // this.toptip()
		wx.showToast({
			title: '此服务人员今天休息',
			icon: 'none',
			success: function () {}
		});
  },

  //整个selectHour的判断
  //项目 人 日期 少啥，提示啥
  hourTip:function(){
    let topTip ="";
    console.log(this.data.selectPeople)
    let service = this.data.selectedServices[0];
    
    let people = this.data.selectPeople;
    let date = this.data.selectDay;
    if (service==undefined){
      topTip = "请先选择 服务项目 服务人员"
    } else if ( people==""){
      // this.setData({topTip:"请先选择服务项目"})
      topTip = "请先选择 服务人员"
    } else if ( date==""){
      topTip ="请先选择服务日期"
    }
    if(topTip!=""){
      this.setData({
        topTip: topTip
      })
      this.toptip()
    }
  },
  //根据选择的day selelctDay 生成hours
  makeHours:function(){
    let hourString = this.data.storeData.serviceTime; //默认的工作小时
    let hoursArr = [];          //{hour:09:00,disabled:1,selected;1}
    let hours=[]          //纯时间数组
    //timeswitch  是否用各天的休息
    if(this.data.storeData.timeSwitch==0){
      hours = hourString.split("|")
    } else if (this.data.storeData.timeSwitch ==1){
      let selectDay = this.data.selectDay;
      let weekIndex = new Date(Date.parse(selectDay)).getDay();
      let weeks = ["sun", "mon", "tues", "wed", "thur", "fri", "sat"];
      let weekKey = weeks[weekIndex];
      let hourstring1 = this.data.storeData[weekKey];   //某天的工作时间
      if (hourstring1 == null) { hourstring1=hourString}
      hours = hourstring1.split("|")
    }
    console.log(hours)                          //工作时间      
    let people = this.data.selectPeople;
    let date = this.data.selectDay;
    let holidayHourList = this.data.holidayHourList; //
    let peopleDayHoli = ""
    for (let i = 0; i < holidayHourList.length; i++) {
      if (holidayHourList[i].eid == people && holidayHourList[i].date == date) {
        peopleDayHoli = peopleDayHoli + holidayHourList[i].time + "|"
      }
    }
    peopleDayHoli = peopleDayHoli.substring(0, peopleDayHoli.length - 1);
    //let peopleDayHoliArr = peopleDayHoli.split("|")
    console.log(peopleDayHoli)  //14:00|14:30|21:30|18:00


    // 1.已满人的hour，2.超过今天已故时间
    let orderList = this.data.orderList.slice(0);
    console.log(orderList)
    for (let i = 0; i < hours.length;i++){
      let flag = 1;
      let time = this.data.selectDay + " " + hours[i] + ":00";   //格式 2018-11-4 12:00:00   此天某个hour的时间
      let timeStr = time.replace(/-/g, "/");                     //格式化 2018/10/23 09:00:00 ios只认这个格式
      let timestamp = new Date(Date.parse(timeStr)).toString()     //格式 Sun Nov 04 2018 12:00:00 GMT+0800 (中国标准时间)
      for (let j = 0; j < orderList.length;j++){
        let timeO = orderList[j].date + " " + orderList[j].time + ":00";
        let timeOStr = timeO.replace(/-/g, "/"); 
        let timeOStamp = new Date(Date.parse(timeOStr)).toString()   
        // console.log(timeOStamp)
        if (timeOStamp == timestamp && orderList[j].num == this.data.storeData.serviceplace){
          flag = 0
        }
      }
      let timenum = new Date(timeStr).valueOf();          //时间戳 1540256400000
      let timeNownum = new Date().valueOf();     //现在的时间 xxxxxxxxx

      if(timenum-timeNownum<1000*60*30){flag=0}

      //员工休息的小时
      let a = hours[i];
      if (peopleDayHoli.indexOf(a) != -1) {
        flag = 0;
      }

      hoursArr.push({
        time: hours[i],
        use:flag,
        selected:0  
      })
    }
    console.log(hoursArr)

    this.setData({
      hoursArr:hoursArr
    })
  },

  //点击hour，检查是否连贯可用
  selectHour:function(e){
    //判断 1项目 2人 3日子 选了没
    // if()
    if(this.data.selectDay==""){
      this.setData({
        topTip:" 请先选择日期"
      })
      this.toptip()
    }else{
      let startHour = e.currentTarget.dataset.hour;
      let startHourIndex = e.currentTarget.dataset.index;
      let startHourNumber = parseInt(startHour.split(":")[0]) + parseInt(startHour.split(":")[1]) / 60;   //14:30转14.5   //
      console.log(startHourNumber)  //14.5  9.5

      //时间间隔 30分钟 一格
      let hoursPast = 30;  //默认
      let timeSetting = this.data.storeData.timeSetting;
      switch (timeSetting) {
        case 0:
          hoursPast = 30;
          break;
        case 1:
          hoursPast = 60;
          break;
      }
      this.setData({
        hoursPast : hoursPast
      })

      let past = hoursPast / 60; //时间间隔 转为小数     0.5 为一个间隔
      console.log("past"+past)
      let serviceTime = this.data.serviceTime; //所选服务总时长
      let number = serviceTime / past;    //应当 占 几格
      let flag = 1; //可选

      //1.最后一格是否匹配
      let tableEnd = this.data.hoursArr[startHourIndex + number - 1]; //时间表上，向后x格的时间
      console.log(tableEnd)
      let realEndNumber = startHourNumber + serviceTime - past;
      console.log(realEndNumber)

      let realEnd = ""
      //可能整数 可能小数
      if (String(realEndNumber).indexOf(".") == -1) {  //整数
        let x = "";
        if (realEndNumber < 10) {
          x = "0" + realEndNumber
        } else {
          x = realEndNumber
        }
        realEnd = x + ":00";
        console.log(realEnd)
      } else {  //小数
        let realEndNumberArr = String(realEndNumber).split(".");
        let x = ""; //小时数 小于10 前面补0
        if (realEndNumberArr[0].length == 1) {
          x = "0" + realEndNumberArr[0]
        } else {
          x = realEndNumberArr[0]
        }
        realEnd = x + ":" + realEndNumberArr[1] * 6;
        console.log(realEnd)
      }
      if(tableEnd==undefined){
        flag = 0;
        // this.setData({
        //   shortInfoShow:true,
        //   shortInfo: "所选服务超出剩余时间"
        // })
				let modalData = {
					"text": [
						"所选服务超出剩余时间"
					],
					"btns": [
						{ "name": "确定", "type": "close" }
					]
				}
				this.setData({
					//modal_confirm: true
					modalData: modalData,
					modalShow: true
				})
      }
      console.log(tableEnd.time)
      console.log(realEnd)
      if (tableEnd.time != realEnd) {
        // this.setData({
        //   shortInfoShow: true,
        //   shortInfo: "所选时间不足"
        // })
				let modalData={
					text:["所选时间不足"],
					btns: [{ "name": "确定", "type": "close", "event": "testEvent" }]
				}
				this.setData({
					modalShow:true,
					modalData:modalData
				})
        flag = 0
      }

      //2.中间每项是否有useless灰色 
      if (flag == 1) {
        for (let i = 0; i < number; i++) {
          if (this.data.hoursArr[startHourIndex + i].use == 0) {
            // this.setData({
            //   shortInfoShow: true,
            //   shortInfo: "所选时间不足"
            // })
						let modalData = {
							text: ["所选时间不足"],
							btns: [{ "name": "确定", "type": "close", "event": "testEvent" }]
						}
						this.setData({
							modalShow: true,
							modalData: modalData
						})
            flag = 0;
          }
        }
      }

      //显示选中样式 显示剩下的板块 页面上划一点
      if (flag == 1) {
        let hoursArr = this.data.hoursArr.slice(0);
        console.log("startHourIndex:" + startHourIndex)
        console.log(number)
        let hoursSelect = [];
        let startHour = ""; //开始的时间块
        let endHour = "";   //最后一个时间块
        let factEndHour = "";   //实际结束时间点
        for (let i = 0; i < hoursArr.length; i++) {
          if (i >= startHourIndex && i < (number + startHourIndex)) {
            hoursArr[i].selected = 1;
          } else {
            hoursArr[i].selected = 0;
          }
          if (i == startHourIndex) {
            startHour = hoursArr[i].time
          }
          if (i == number + startHourIndex - 1) {
            endHour = hoursArr[i].time
            factEndHour = hoursArr[i].time
          }
        }
        //factEndHour现在仍是 末尾时间块的起点，需要加一格    例 14:30  +  40
        let factEndHourArr = factEndHour.split(":");

        let fenzhong = parseInt(factEndHourArr[1]) + parseInt(hoursPast);
        let xiaoshi = parseInt(factEndHourArr[0]);

        xiaoshi = xiaoshi + parseInt(fenzhong/60);
        fenzhong = parseInt(fenzhong) % parseInt(hoursPast);

        if(xiaoshi<10){xiaoshi = "0"+xiaoshi}
        if (fenzhong < 10){fenzhong = "0"+fenzhong}
        factEndHour = xiaoshi + ":" + fenzhong;

        console.log(startHour + endHour)
        this.setData({
          hoursArr: hoursArr,
          hourBlock: [startHour, endHour],
          factEndHour: factEndHour
        })
        this.setData({
          toblock: "selectTime"
        })
      }

      console.log(flag) //1能约

    }
  },

  firstArrivalCheck:function(){
    this.setData({
      firstArrival: !this.data.firstArrival
    })
  },
  orderForOther:function(){
    this.setData({
      orderForOther: !this.data.orderForOther,
      native_comp:true
    })
    if (this.data.orderForOther){
      this.setData({
        modal_orderOther:true
      })
    }
  },

  //返回 按钮
  closeModal_orderOther: function () {
    this.setData({
      modal_orderOther: 0,
      orderForOther:0,
      native_comp:false
    })
  },

  modal_sex:function(){
    let sex = this.data.otherSex;
    if(sex==0){
      sex=1
    }else{
      sex=0
    }
    this.setData({
      otherSex: sex
    })
  },

  selectForOther:function(e){
    let name = e.currentTarget.dataset.name;
    let sex = e.currentTarget.dataset.sex
    this.setData({
      otherName: name,
      otherSex:sex
    })
  },

  typeOtherName:function(e){
    let name = e.detail.value;
    this.setData({
      otherName : name
    })
    
  },
  inputZuoTel:function(e){
    let zuoTel = e.detail.value;
    this.setData({
      zuoTel:zuoTel
    })
    
  },
  //为他人预约的信息表 确定
  formSubmit:function(){
    let name = this.data.otherName;
    if(name==""){
      // this.setData({
      //   topTip:"姓名不能为空"
      // })
      // this.toptip()
			wx.showToast({
				title: '姓名不能为空',
				icon: 'none'
			})
    }else{
      this.setData({
        modal_orderOther: 0
      })
    }
    
  },

  bindBirthChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birth: e.detail.value
    })
  },
  //订金 全款 的 问号， 显示/关闭
  modalTip:function(e){
    let type = e.currentTarget.dataset.id;
    if (this.data.modal_tip_show == 0){
      if (type == "dingjin"){
        this.setData({
          modal_tip_show: 1,
          modal_tip_title: "服务费用说明",
          modal_tip_content: [
            "1.服务开始前1小时，可随时取消订单，并退还押金；",
            "2.消费后订金会作为消费金额折扣；",
            "3.到店后商家若未按时服务，订金将翻倍返还;",
            "4.未提交前与商家协商的情况下，未按时到店，订金将归商家，不予退还。"
          ]
        })
      }
      if(type=="totalMoney"){
        this.setData({
          modal_tip_show: 1,
          modal_tip_title: "服务费用说明",
          modal_tip_content: [
            "1.服务开始前12小时，可随时取消订单，金额原路返还；",
            "2.未提前与商家协商的情况下，未按时到场或未到的情况下，金额将归商家所有，不予退还；"
          ]
        })
      }
    }else{
      this.setData({
        modal_tip_show: 0
      })
    }
  },
  inputPeopleName:function(e){
    let peopleName = e.detail.value;
    this.setData({
      peopleName: peopleName
    })
  },
	//虚拟textarea
	cliSimTA:function(){
		let beizhu = this.data.beizhu;
		if(beizhu=="请填写备注"){
			this.setData({
				beizhu:"",
			})
		}
		this.setData({
			textareaShow:true
		})
	},
	//textarea失焦
	blurTA:function(){
		this.setData({
			textareaShow: false
		})
	},
	pulldown:function(e){
		console.log(e)
		this.setData({
			TAfocus:false
		})
	},

  //提交预约 按钮
  openModal_confirm(){
    let flag = 1;
    //如果生日开着
    if (this.data.storeSet.birthday == 1){
      let birth = this.data.birth;
      if (birth == "　　　　　　　　　　"||birth=="") {
        flag = 0;
        this.setData({
          topTip: "请选择生日"
        })
        this.toptip()
      }     
    }
    //如果 座机 开着
    if(this.data.storeSet.seatmachineswitch==1){
      let zuoTel = this.data.zuoTel;
      if(zuoTel==null||zuoTel.length==0){
        flag = 0;
        this.setData({
          topTip: "请填写座机"
        })
        this.toptip()
      }
    }
    //如果 姓名 开着
    if (this.data.storeSet.nameswitch == 1) {
      let peopleName = this.data.peopleName;
      if (peopleName == null || peopleName.length == 0) {
        flag = 0;
        this.setData({
          topTip: "请填写姓名"
        })
        this.toptip()
      }
    }

		//不做距离不足一小时的判断
		if(flag==1){
			let selectedServices = this.data.selectedServices;
			let selectedServicesArr = ""
			for (let i = 0; i < selectedServices.length;i++){
				selectedServicesArr = selectedServicesArr + selectedServices[i].name;
				if (i != selectedServices.length-1){
					selectedServicesArr = selectedServicesArr + "、"
				}
			}
			let modalData = {
				"header":{
					"title":{
						"text":"确认提交"
					}
				},
				"list":[
					{ 'entry': "店家", "value": [{ "v": this.data.storeData.name}]},
					{ 'entry': "服务人员", "value": [{ "v": this.data.selectPeopleStr}] },
					{ 'entry': "服务项目", "value": [{ "v": selectedServicesArr,"vClass":"mctext"}] },
					{ 'entry': "服务时间", "value": [{ "v": this.data.selectDay + ' ' + this.data.hourBlock[0] +"-"+ this.data.factEndHour, "vClass": "mctext"}] },
					{ 'entry': "共需订金", "showState": this.data.storeSet.deposit,"value": [{ "v": this.data.dingjin, "vClass": "mctext" }, { "v": "元", "vClass": "mctext2" }], "show":"storeSet.seposit==1"}
				],
				"remind":"该商家有权经双方协商后取消此笔订单",
				"btns":[
					{ "name": "返回", "type": "close"},
					{ "name": "确定", "type": "action", "event": "testEvent" }
				]
			};

			this.modalAction = function(){
				this.confirm_orderOther()
			}
			
			this.setData({
				//modal_confirm: true
				modalData: modalData,
				modalShow:true
			})
		}
		
    
  },
  closeModal_confirm(){
    this.setData({
      modal_confirm:false
    })
  },

  inputTip:function(e){
    let name = e.detail.value;
    this.setData({
      beizhu: name
    })
  },
  confirm_orderOther:function(){
		this.setData({
			modalData: {},
			modalShow: false,
		})
    if(this.data.isfirstAction){
      console.log("tijiao");
      let that =this;
      this.setData({
        isfirstAction: false,
      },function(){
        let data = {};
        data.gender = that.data.otherSex;
        // data.mid = this.data.peopleData.gender;
        data.mid = app.globalData.peopleInfo.mid;
        data.eid = that.data.selectPeople;
        let ids = "";
        for (let i = 0; i < that.data.selectedServices.length; i++) {
          ids = ids + that.data.selectedServices[i].id
          if (i != that.data.selectedServices.length - 1) {
            ids = ids + ","
          }
        }
        data.ids = ids;
        data.date = that.data.selectDay;
        let time = "";
        for (let i = 0; i < that.data.hoursArr.length; i++) {
          if (that.data.hoursArr[i].selected == 1) {
            time = time + that.data.hoursArr[i].time + "|"
          }
        }
        time = time.substring(0, time.length - 1);
        data.time = time;
        data.hour = that.data.serviceTime;
        data.name = that.data.otherName;
				data.sid = app.globalData.peopleInfo.sid;
        let isFirst = 0;
        if (that.data.firstArrival) { isFirst = 1 }
        data.isFirst = isFirst;
        let isHelp = 0;
        if (that.data.orderForOther) { isHelp = 1 }
        data.isHelp = isHelp;
        let beizhu = that.data.beizhu;
				if(beizhu=="请填写备注"){beizhu=""}
				data.remarks = beizhu;
        data.serviceEmployee = that.data.selectPeopleStr;
        let serviceItem = "";
        for (let i = 0; i < that.data.selectedServices.length; i++) {
          serviceItem = serviceItem + that.data.selectedServices[i].name + ","
        }
        serviceItem = serviceItem.substring(0, serviceItem.length - 1);
        data.serviceItem = serviceItem;
        data.birthday = that.data.birth;
        data.nameswitch = that.data.peopleName;
        data.seatMachine = that.data.zuoTel;

        console.log(data)
        that.setData({
          sendData: data
        })

        wx.request({
          url: 'https://api.yuyue58.cn/api/submitBookingList',
          method: "POST",
          header: { "content-type": "application/x-www-form-urlencoded" },
          data: data,
          success(res) {
            that.setData({
              isfirstAction: true
            })
            console.log(res);
            let status = res.data;
            if (status >= 0) {
              that.setData({
                // modal_confirm: false,
								modalShow: false,
              })
              wx.redirectTo({
                url: '../orderSuccess/index'
              })
            } else if (status == "-2") {
              // that.setData({
              //   shortInfoShow: true,
              //   shortInfo: "该会员信息不存在",
              //   modal_confirm: false
              // })
							let modalData = {
								"text": [
									"该会员信息不存在"
								],
								"btns": [
									{ "name": "确定", "type": "close" }
								]
							}
							that.setData({
								//modal_confirm: true
								modalData: modalData,
								modalShow: true
							})
            } else if (status == "-3") {
              // that.setData({
              //   shortInfoShow: true,
              //   shortInfo: "该店家信息不存在",
              //   modal_confirm: false
              // })
							let modalData = {
								"text": [
									"该店家信息不存在"
								],
								"btns": [
									{ "name": "确定", "type": "close" }
								]
							}
							that.setData({
								//modal_confirm: true
								modalData: modalData,
								modalShow: true
							})
            } else if (status == "-4") {
              // that.setData({
              //   shortInfoShow: true,
              //   shortInfo: "该时段已满",
              //   modal_confirm: false
              // })
							let modalData = {
								"text": [
									"该时段位置已满"
								],
								"btns": [
									{ "name": "确定", "type": "close" }
								]
							}
							that.setData({
								//modal_confirm: true
								modalData: modalData,
								modalShow: true
							})
            } else if (status == "-5") {
              // that.setData({
              //   shortInfoShow: true,
              //   shortInfo: "此时间段已存在员工被预约记录!",
              //   modal_confirm: false
              // })
							let modalData = {
								"text": [
									"此时间段已存在员工被预约记录!"
								],
								"btns": [
									{ "name": "确定", "type": "close" }
								]
							}
							that.setData({
								//modal_confirm: true
								modalData: modalData,
								modalShow: true
							})
            } else if (status == "-7") {
              // that.setData({
              //   shortInfoShow: true,
              //   shortInfo: "很抱歉！同一家店无法预约超过三笔，包含自己一笔及帮别人预约二笔",
              //   modal_confirm: false
              // })
							let modalData = {
								"text": [
									"很抱歉！同一家店无法预约超过三笔，包含自己一笔及帮别人预约二笔"
								],
								"btns": [
									{ "name": "确定", "type": "close" }
								]
							}
							that.setData({
								//modal_confirm: true
								modalData: modalData,
								modalShow: true
							})
            } else if (status == "-8") {
              // that.setData({
              //   shortInfoShow: true,
              //   shortInfo: "很抱歉！同一家店无法预约超过三笔，包含自己一笔及帮别人预约二笔",
              //   modal_confirm: false
              // })
							let modalData = {
								"text": [
									"很抱歉！同一家店无法预约超过三笔，包含自己一笔及帮别人预约二笔"
								],
								"btns": [
									{ "name": "确定", "type": "close" }
								]
							}
							that.setData({
								//modal_confirm: true
								modalData: modalData,
								modalShow: true
							})
            } else if (status == "-9" && that.data.storeSet.reservationHelp == 0) {
              // that.setData({
              //   shortInfoShow: true,
              //   shortInfo: "该商家只允许预约一次，如有需求，可以联系商家开通帮人预约功能",
              //   modal_confirm: false
              // })
							let modalData = {
								"text": [
									"该商家只允许预约一次，如有需求，可以联系商家开通帮人预约功能"
								],
								"btns": [
									{ "name": "确定", "type": "close" }
								]
							}
							that.setData({
								//modal_confirm: true
								modalData: modalData,
								modalShow: true
							})
            } else if (status == "-9" && that.data.storeSet.reservationHelp == 1) {
              // that.setData({
              //   shortInfoShow: true,
              //   shortInfo: "您已经在本店有过预约，不可再次预约，如需帮他人预约，请点选【帮别人预定】",
              //   modal_confirm: false
              // })
							let modalData = {
								"text": [
									"您已经在本店有过预约，不可再次预约，如需帮他人预约，请点选【帮别人预定】"
								],
								"btns": [
									{ "name": "确定", "type": "close" }
								]
							}
							that.setData({
								//modal_confirm: true
								modalData: modalData,
								modalShow: true
							})

            } else if (status == "-10") {
              // that.setData({
              //   selfClanShow: true,
              //   modal_confirm: false
              // })
							let modalData = {
								"text": [
									"您的预约与【私人预约】冲突，是否确定继续预约？"
								],
								"btns": [
									{ "name": "我再想想", "type": "close" },
									{ "name": "确定", "type": "ModalAction" }
								]
							}
							that.setData({
								//modal_confirm: true
								modalData: modalData,
								modalShow: true
							})
							that.modalAction = function(){
								that.openModal_confirm()
							}
            } else {
              //返回字符串 店名
              // that.setData({
              //   orderClashShow: true,
              //   orderClash: status,
              //   modal_confirm: false
              // })
							let modalData = {
								"header": {
									"title": {
										"text": "预约冲突"
									}
								},
								"text":[
									"此时间段您已经在【" + status +"】有过预约，请选择其他时间"
								],
								"remind": "若仍想预约此时段，请先到会员首页取消该笔订单",
								"btns": [
									{ "name": "去取消之前订单", "type": "modalAction", "event": "testEvent" },
									{ "name": "确定", "type": "close"}
								]
							}
							that.setData({
								//modal_confirm: true
								modalData: modalData,
								modalShow: true
							})
							that.modalAction = function(){
								that.gotoIndex()
							}
            }
          }
        })
      })
      
    }
    
  },
  
  shortInfoClose:function(){
    this.setData({
      shortInfoShow:false
    })
  },

  gotoV:function(){
    wx.navigateTo({
      url: '../web-view/index'
    })
  },

  // lessOneClose:function(){
  //   this.setData({
  //     lessOneShow: false
  //   })
  // },
  // lessOneConti:function(){
  //   this.setData({
  //     lessOneShow: false,
  //     modal_confirm:true
  //   })
  // },
  orderClashClose:function(){
    this.setData({
      orderClashShow:false
    })
  },
  gotoIndex:function(){
    wx.redirectTo({ url: '../customEntrance/index' });
  },
  selfClanclose:function(){
    this.setData({
      selfClanShow: false
    })
  },
  selfConti:function(){
    let data = this.data.sendData;
    data.force = 1;
    wx.request({
      url: 'https://api.yuyue58.cn/api/submitBookingList',
      method: "POST",
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: data,
      success(res) {
        that.setData({
          modal_confirm: false
        })
        wx.navigateTo({
          url: '../orderSuccess/index'
        })
      }
    })
  },




	//modal
	closeModal: function (e) {
		this.setData({
			modalShow: false
		})
	},
	modalAction:function(e){

	}  
  
})