// pages/entry/entry.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    its:"dsfsdf",
    item:"https://www.yuyue58.cn/qtest/bottom.png",
    pic:"https://www.yuyue58.cn/qtest/1.png",
    pic2:"https://www.yuyue58.cn/qtest/2.png",
    sao:"https://www.yuyue58.cn/qtest/saosao.png",
    flag: true,
 
  
  },

  saosao: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        /**
         * 使用字符串的分割用=号分割
         * 
         * 目前发布的二维码
         *  https://www.yuyue58.cn/Public.ashx?page=ShopHome.aspx%3fid%3dd5a130a6af9c490bb1f511e0b4c4b5e3
         * 
         * 
         * https://www.yuyue58.cn/ShopHome.aspx?id=aa2af16f3ef241d09d8f0dcba937fb09
         * 
         * 
         */
        console.log(res.result)
        var arr = res.result.split(".")
        console.log(arr)
        console.log(arr[4])

       wx: wx.navigateTo({

          url:'../saosao/saosao?u='+arr[4]
      

        })





    

      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'success',
          duration: 2000
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  onShareAppMessage: function (e) {
   
    console.log(e)
    return {
      title: '预约吧',
      desc: '线上预约吧',

    }

  
  },

  openShop:function(){
      wx.navigateTo({
        url: '../openShop/openShop',
      })
  },

  self:function(){
    wx.navigateTo({
      url: '../self/self',
    })
  },
  
  shop:function(){
    wx.navigateTo({
      url: '../shop/shop',
    })

  },
  /**
   * 点击出来弹出层关注公众号
   */
  show:function(){
   
      this.setData({

          flag:false

      })


  },
  hide:function(){
         
    this.setData({

        flag: true

    })
  },
  /**
   * 到另一个页面
   */
  show1:function(){

          wx.navigateTo({

            url: '../other/other',
      
          })
  

  }


    
})