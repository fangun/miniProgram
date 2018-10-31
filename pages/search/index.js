// pages/serach/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText:'',  //搜索框的值
    searchResultArr:[],
    authorizeState: false,
		modalData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    //测试用的 每次就必然清楚缓存
    // wx.clearStorage()




    wx.getStorage({
      key: 'fangun-storeFront',
      success: function(res) {
        //console.log(res.data.message)
        if (typeof res.data == 'object' && res.data.message !="发生错误。"){
          console.log("you")
          app.globalData.loginCache = true;
          app.globalData.peopleInfo = res.data;
          that.setData({
            authorizeState: true
          })
        }else{
          console.log('cuowu')
        }
      },
      fail:function(res){

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
		this.setData({
			modalData: {
				"mainColor": "rgb(243, 67, 67)",
				"header": {
					"title": { "text": "确认提交", "border-b": "0" },//1},
					"headImageSrc": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540978083927&di=1d0461234e4edac5149cc849a19faff8&imgtype=0&src=http%3A%2F%2Fimg.houxue.com%2Fnewsimg%2Fyasi%2F10.jpg",
					"headName": "新大地发艺",
				},
				"list": [
					{ "entry": "店家", "value": [{ "v": "翻滚美发", "vClass": "black" }] },
					{ 'entry': "服务人员", "value": [{ "v": "梁汉妮", "vClass": "black" }] },
					{ 'entry': "服务项目", "value": [{ "v": "洗吹", "vClass": "black" }], "end": "1" },
					{ 'entry': "服务时间", "value": [{ "v": "2018-09-22", "vClass": "red" }, { "v": "19:00-19:30", "vClass": "red" }] },
					{ 'entry': "共需订金", "value": [{ "v": "0.00", "vClass": "red" }, { "v": "元", "vClass": "black" }] }
				],
				"listEntryColor": "rgb(152,152,152)",
				"text": ["1.服务开始前一小时，可随时取消订单，并退还押金"],
				"remind": "该商家有权经双方协商后取消此笔订单",
				"btns": [{ "name": "返回", "type": "close"}, { "name": "确定", "type": "action", "event": "testEvent" }],
				"BtnLong":"" 
			}
		})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    // 登录
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
    let that = this;
    wx.request({
      url: 'https://api.yuyue58.cn/api/wxLogin',
      method: "POST",
      data: {
        app:'wxe',
        // app: 'wxe',//店家 wxb1881cff7fde6cf6
        code: app.globalData.code,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success(res) {
        if (typeof res.data == 'object' && res.data.mobile) {
          that.setData({
            authorizeState: true
          })
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
        }else{
          wx.showToast({
            title: '授权失败',
            icon: 'none',
            success: function () {
              // 登录
              wx.login({
                success: res => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  app.globalData.code = res.code;
                }
              })
            }
          });
        }
      }
    });
  },

  scan:function(){
    let that = this;
    wx.scanCode({
      success(res) {
        let url = res.result;
        //是否有转义了的 %3d
        let flag1 = url.indexOf("%3d");
        if(flag1!=-1){
          let urlArr = url.split("%3d");
          //最后一个%3d 后面的，应该是sid, 32位
          let sid = urlArr[urlArr.length-1];
          if(sid.length==32){
            app.globalData.peopleInfo.sid = sid
            wx.navigateTo({
              url: '../storeHead/index'
            })
          }
        }
      }
    })
  },

  searchInput:function(e){
    let text = e.detail.value;
    this.setData({
      searchText:text
    })
  },

  search:function(){
    let text = this.data.searchText;
    let that = this;
    if(text!=""){
      wx.request({
        url: 'https://api.yuyue58.cn/api/searchShops',
        method: "POST",
        header: { "content-type": "application/x-www-form-urlencoded" },
        data: {
          id: text
        },
        success(res) {
          that.setData({
            searchResultArr: res.data
          })
        }
      })
    }
  },

  selectStore:function(e){
    let sid = e.currentTarget.dataset.sid;
    app.globalData.peopleInfo.sid = sid
    //console.log(app.globalData.peopleInfo.mid)
    wx.navigateTo({
      url: '../storeHead/index'
    })
		this.setData({
			searchResultArr:[],
			searchText:""
		})
  }


})