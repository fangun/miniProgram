// pages/serach/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText:'',  //搜索框的值
    searchResultArr:[],
    // authorizeState: false,		//是否授权						//存 全局
		authorize:false,				//透明授权按钮层 是否显示	//存 本页 
		modalData: {},
		modalShow:false
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
        console.log(res.data)
        if (typeof res.data == 'object'){
          console.log("you")
          app.globalData.loginCache = true;
          app.globalData.peopleInfo = res.data;
          that.setData({
						authorize: true,
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
		// this.setData({
		// 	modalData: {
		// 		"text": [
		// 			"所选服务超出剩余时间"
		// 		],
		// 		"btns": [
		// 			{ "name": "确定", "type": "close" }
		// 		]
		// 	}
		// })
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
            authorize: true,
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
					console.log(app.globalData)
        }else{
					that.setData({
						authorize: true
					})
          wx.showToast({
            title: '授权失败',
            icon: 'none',
            success: function () {
							app.globalData.peopleInfo = {}
							app.globalData.loginCache = false;
							console.log(app.globalData)
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
  },

	closeModal:function(e){
		let data = e.detail.data
		this.setData({
			modalShow:false
		})
	},

	modalAction:function(e){
		let data = e.detail.data;
		console.log("modalAction")
	},

	modalTest:function(){
		this.setData({
			modalShow: true
		})
	}


})