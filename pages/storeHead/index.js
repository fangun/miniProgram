// pages/storeHead/index.js
var QQMapWX = require('../../resource/SDK/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:"d03c4a737be3462ba6218a6b494dafb7",
    Modal_tryNow:false, //立即体验 显示 
    tryNow_time:7, //立即体验 有效期 天
    topTip:"",
    vip:1,
    storeData:{
      "loginname": "13916494256",
      "name": "预约吧Family",
      "profile": "介绍介绍介绍介绍介绍介绍介绍介绍介绍介介绍介绍介绍介绍介绍介绍介绍介绍介绍介",      //简介
      "pca": "上海市-东方明珠",     //上下接起来
      "address": "",
      "phone": "",
      "logo": "20180504105256.jpg",      //地址    null或“”     todo
      "description1":null,
      "description2":"选择服务技师",
      "bookingMonth":3,     //服务时间，向后共计3个月
      "bookingday":23,
      "frontdesk":1,        //选择项目 1可多选 0单选
      "serviceItems": [				//服务项目
        {
          "id": "4e5d6c6c4ed24b2b82ed896368e41d28",
          "name": "Js交互",
          "hour": 1,
          "type": 0,     //前后台项目
          "sort": 0,
          "deposit": 0.02,   //订金
          "fullAmount": 0.01,     //全额付款
          "isSelected":true
        },
        {
          "id": "e7661f018521457ba605f93c1d96e6f6",
          "name": "Css样式修改",
          "hour":1.5,
          "type": 0,
          "sort": 1,
          "deposit": 0,
          "fullAmount": 0,
          "isSelected": false
        },
        {
          "id": "eedc49feca8c42119b9e8a08eb5bbe69",
          "name": "Html页面设计",
          "hour": 2,
          "type": 0,
          "sort": 2,
          "deposit": 0.01,
          "fullAmount": 0.08,
          "isSelected": false
        },
        {
          "id": "5a38562cdf3e44b7930e2af8c695eab1",
          "name": "功能新增",
          "hour": 1,
          "type": 0,
          "sort": 3,
          "deposit": 20,
          "fullAmount": 0.06,
          "isSelected": false
        },
        {
          "id": "a9d97a98bcd845959dc9f33e1872f917",
          "name": "旧功能修改",
          "hour": 1.5,
          "type": 0,
          "sort": 4,
          "deposit": 0,
          "fullAmount": 699,
          "isSelected": false
        },
        {
          "id": "12dc576e0a674987b3363f96a0e56be6",
          "name": "功能测试",
          "hour": 0.5,
          "type": 0,
          "sort": 5,
          "deposit": 0,
          "fullAmount": 0.02,
          "isSelected": false
        },
        {
          "id": "ad19c8ae71e7438094c086a1b2f2bd21",
          "name": "用户问题反馈",
          "hour": 1,
          "type": 0,
          "sort": 6,
          "deposit": 0,
          "fullAmount": 0,
          "isSelected": false
        },
        {
          "id": "8ccf2fa6ec2144888588aa02a99f491b",
          "name": "其他(请备注)",
          "hour": 1,
          "type": 0,
          "sort": 7,
          "deposit": 0,
          "fullAmount": 0,
          "isSelected": false
        },
        {
          "id": "1e0b93f0acfd464a8eb60550530eb0e8",
          "name": "Ui",
          "hour": 2,
          "type": 0,
          "sort": 8,
          "deposit": 0,
          "fullAmount": 0,
          "isSelected": false
        }
      ],
      "serviceEmployee": [
        {
          "id": "8b2d3e2d384449fe85896ef19fa1db74",
          "name": "张翔",
          "gender": 0,     //性别 //男
          "sort": 0,
          "good": "4e5d6c6c4ed24b2b82ed896368e41d28,e7661f018521457ba605f93c1d96e6f6, eedc49feca8c42119b9e8a08eb5bbe69, 5a38562cdf3e44b7930e2af8c695eab1, a9d97a98bcd845959dc9f33e1872f917, 926cc99416f444cda2fc54cf2dbea1f0, 12dc576e0a674987b3363f96a0e56be6",
            "holiday": "0,3,4,5",
          "specialdate": null,
          "isAbled" : true
        },
        {
          "id": "22f928d9114241edabf7c81113e13f5f",
          "name": "秦雷醒",
          "gender": 0,
          "sort": 1,
          "good": "4e5d6c6c4ed24b2b82ed896368e41d28,e7661f018521457ba605f93c1d96e6f6,eedc49feca8c42119b9e8a08eb5bbe69,5a38562cdf3e44b7930e2af8c695eab1,a9d97a98bcd845959dc9f33e1872f917,926cc99416f444cda2fc54cf2dbea1f0,12dc576e0a674987b3363f96a0e56be6,8ccf2fa6ec2144888588aa02a99f491b",
          "holiday": "5,6",    //休息的星期
          "specialdate": null,
          "isAbled": true
        },
        {
          "id": "bede5122d41e4bfc92120c5d47474797",
          "name": "VIP",
          "gender": 0,    
          "sort": 2,
          "good": "4e5d6c6c4ed24b2b82ed896368e41d28,e7661f018521457ba605f93c1d96e6f6,eedc49feca8c42119b9e8a08eb5bbe69,8ccf2fa6ec2144888588aa02a99f491b",
          "holiday": "6",
          "specialdate": null,
          "isAbled": true
        },
        {
          "id": "e3888543ca364c11bdf7b2ef2b45f77a",
          "name": "袁征",
          "gender": 0,
          "sort": 3,
          "good": "5a38562cdf3e44b7930e2af8c695eab1,a9d97a98bcd845959dc9f33e1872f917,926cc99416f444cda2fc54cf2dbea1f0,12dc576e0a674987b3363f96a0e56be6,8ccf2fa6ec2144888588aa02a99f491b",
          "holiday": "0,1,2,3,4,5,6",
          "specialdate": null,
          "isAbled": true
        },
        {
          "id": "c091b4cf9e0b40408cfa57dd9ce83b59",
          "name": "凯特",
          "gender": 0,
          "sort": 4,
          "good": "4e5d6c6c4ed24b2b82ed896368e41d28,e7661f018521457ba605f93c1d96e6f6,eedc49feca8c42119b9e8a08eb5bbe69,5a38562cdf3e44b7930e2af8c695eab1,12dc576e0a674987b3363f96a0e56be6,ad19c8ae71e7438094c086a1b2f2bd21,8f00c806cf194ecf931296393f43678e,8ccf2fa6ec2144888588aa02a99f491b",
          "holiday": "",
          "specialdate": null,
          "isAbled": true
        },
        {
          "id": "d2d554015875499594d09bc90b05bf63",
          "name": "刘众楷",
          "gender": 0,
          "sort": 5,
          "good": "5a38562cdf3e44b7930e2af8c695eab1,12dc576e0a674987b3363f96a0e56be6,ad19c8ae71e7438094c086a1b2f2bd21,8ccf2fa6ec2144888588aa02a99f491b",
          "holiday": "",
          "specialdate": null,
          "isAbled": true
        },
        {
          "id": "7baf4b092aa149bcb9533c4e99d83bb9",
          "name": "王贝贝",
          "gender": 1,
          "sort": 6,
          "good": "8f00c806cf194ecf931296393f43678e,8ccf2fa6ec2144888588aa02a99f491b",
          "holiday": "",
          "specialdate": null,
          "isAbled": true
        }
      ]
    },
    selectedServices: [], 
    serviceTime:0,
    dingjin:0,
    peopleList:[], //能选的技师 列表
    dayLong:34, //这个店只用34天
    serviceEmployee:[],
    activityDay:[],//可选择的day和星期 
    selectPeople:"",//已选的技师
    selectDay:"", //已选的day
    selectOther:[
      {}
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //实例化 腾讯的sdk  //https://lbs.qq.com/qqmap_wx_jssdk/method-geocoder.html
    //todo：换公司的企业账号，解除限制
    //日调用量：1万次 / Key
    //并发数：5次 / key / 秒 。
    qqmapsdk = new QQMapWX({
      key: 'RILBZ-DTEAF-TZ6J2-JYDOW-DVRQT-G6FGZ' //我个人的key
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //立即体验
    this.checkTryNow();

    let data = { "id": this.data.id }
    console.log(data)
    // wx.request({
    //   url: 'https://api.yuyue58.cn/api/selecShop',
    //   method: "POST",
    //   data: data,
    //   header: {
    //     'content-type': 'multipart/form-data'
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })


    //
    this.setData({
      serviceEmployee:this.data.storeData.serviceEmployee
    })
    //默认选择第一个 项目
    let id = this.data.storeData.serviceItems[0].id;
    let name = this.data.storeData.serviceItems[0].name;
    this.setData({
      selectedServices:[{
        "id":id,
        "name":name
      }],
      serviceTime: this.data.storeData.serviceItems[0].hour,
      dingjin: this.data.storeData.serviceItems[0].deposit,
    })

    //第一个项目默认的人 根据默认的第一个项目，筛人
    this.checkPeopleList()
    //生成服务时间 当前日期+服务天数
    let activityDay = [];
    let weeks = ["周日", "周一","周二", "周三", "周四", "周五", "周六"];
    for (let i = 0; i < this.data.storeData.bookingday;i++){
      let now = new Date();
      now.setDate(now.getDate() + i);
      let day = now.getDate();

      //首天显示“今天”
      let week = ""; "周几"
      if(i!=0){
        week = weeks[now.getDay()];
      } else if (i == 0){
        week = "今天"
      }
      //console.log(week)
      //月-日
      let month = now.getMonth();
      if(month<9){
        month = "0" + (month+1)
      }else(
        month++
      )

      activityDay.push({
        "year":now.getFullYear(),
        "date":month + "-" + day,
        "week":week,
        "id": now.getFullYear() + "-" + month + "-" + day
      })
      // console.log(activityDay)
      this.setData({
        activityDay: activityDay
      })
      //console.log(this.data.activityDay)
      
      
    }

    //默认 选择 第一天
    let selectDay = activityDay[0].id;
    this.setData({
      selectDay:selectDay
    })
    console.log(this.data.selectDay)
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  //立即体验 蒙版 是否显示
  //7天     测试1分钟
  checkTryNow:function(){
    let that = this;
    let now =  Date.parse(new Date());

    // let plusTime = this.data.tryNow_time*24*60*60*1000;
    let plusTime = 0.5*60*1000;     //有效期 1分钟
    let newLastTime = now + plusTime;
    console.log("now:"+now)
    console.log("newLastTime"+newLastTime)
    wx.getStorage({
      key: 'sjrk',  //商家入口 立即体验 7天有效  //试用半分钟
      success: function (res) {
        let lastTime = "";//上次登陆的时间戳
        lastTime = res.data;
        console.log("lastTime"+lastTime)
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
    this.setData({
      Modal_tryNow:false
    })
  },

  openMap:function(e){
    let location = e.currentTarget.dataset.location;
    let address = {};  //坐标对象 lat经度 lng维度
    qqmapsdk.search({
      keyword: location,
      success: function (res) {
        address = res.data[0].location;
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
        this.setData({
          topTip:"暂时无法找到该位置"
        });
      }
    });
    // console.log(latitude+"."+longitude)
    // wx.openLocation({
    //   latitude,
    //   longitude,
    //   scale: 28
    // })
  },

  //点击 单个项目
  selectProject: function (e) {
    let that = this;
    let projectId = e.currentTarget.dataset.id;
    let serviceItems = this.data.storeData.serviceItems;
    let serviceTime = 0;
    let dingjin = 0;
    let selectedServices = [];
    for(let i=0;i<serviceItems.length;i++){
      //1.找到点击项，修改isselected
      if (serviceItems[i].id == projectId){ 
        let status = serviceItems[i].isSelected;
        let parm = 'storeData.serviceItems['+i+'].isSelected'
        that.setData({
          [parm]: !status
        })
      }
      //2.提取已选项的价格之和，并生成选择项数组，待发送
      if (serviceItems[i].isSelected){
        selectedServices.push({
          "id" : serviceItems[i].id,
          "name": serviceItems[i].name
        })
        serviceTime += serviceItems[i].hour;
        dingjin += serviceItems[i].deposit;
      }
    }
    this.setData({
      selectedServices: selectedServices,
      serviceTime: serviceTime,
      dingjin: dingjin
    })
    //console.log(this.data.selectedServices)
    for(let i=0;i<this.data.storeData.serviceEmployee.length;i++){
      let parm = "storeData.serviceEmployee[" + i + "].isAbled";
      this.setData({
        [parm]:true
      })
    }
    
    this.setData({
      serviceEmployee: this.data.storeData.serviceEmployee
      
    })
    this.checkPeopleList()
  },

  //选择 项目 后，人员的变化
  checkPeopleList:function(){
    //循环选中的项目列表   循环人列表，循环人的项目，无匹配，则为false  有该项目的人列表，比较下一个项目
    let peopleAll = this.data.serviceEmployee;
    //console.log(peopleAll);
    let projectSelect = this.data.selectedServices;
    if(projectSelect.length==0){  //一个项目都没选
      for (let i = 0; i < this.data.storeData.serviceEmployee.length;i++){
        let parm = "storeData.serviceEmployee["+i+"].isAbled";
        this.setData({
          [parm]:false
        })
      }
    }else{
      for (let i = 0; i < projectSelect.length; i++) {
        let id = projectSelect[i].id;//选中的id
        // console.log(id);
        for (let j = 0; j < peopleAll.length; j++) {   //总人表
          let flag = peopleAll[j].good.indexOf(id);
          if (flag == -1) {
            peopleAll.splice(j, 1)    //peopleAll 删掉一项，下个循环的j还是这个j
            let parm = "storeData.serviceEmployee[" + i + "].isAbled";
            this.setData({
              [parm]: false
            })
            j = j - 1;
          }
        }
      }
    }
    
    console.log(peopleAll)
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
  },
  //点击可选的人
  selectPeople:function(e){
    let peopleId = e.currentTarget.dataset.id;
    console.log(peopleId)
  },

  //点击横滚条的day
  selectDay:function(e){
    let selectTimeId = e.currentTarget.dataset.timeid;
    this.setData({
      selectDay: selectTimeId
    })
  },

  //横滚条右侧的 日历 产开弹窗
  rightCalendar:function(){

  }
})