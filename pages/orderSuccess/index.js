// pages/orderSuccess/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  onShareAppMessage: function () {

  },
  openOrder:function(){
    wx.redirectTo({ url: '../customEntrance/index' });
  },
  scanImg:function(e){
    let src = e.currentTarget.dataset.src;
    let srcArr = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540530806500&di=57bb1ff49358390796a4b66079c5b43f&imgtype=0&src=http%3A%2F%2Fy3.ifengimg.com%2Fnews_spider%2Fdci_2013%2F09%2Fb85234c4801f8b2d7771353867a7a0f8.jpg"];
    // let srcArr = [src]
    wx.previewImage({
      // current: src, // 当前显示图片的http链接
      urls: srcArr // 需要预览的图片http链接列表
    })
    
  },
  goto:function(e){
    wx.navigateTo({
      url: '../web-view/index'
    })
  }
})