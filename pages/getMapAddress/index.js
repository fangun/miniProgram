//index.js
//获取应用实例
const app = getApp();
Page({
	data: {},

  // 返回上一页
  backPage:function(res){
    console.log(res);

    let pages = getCurrentPages(); 
    //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

    prevPage.setData({
      // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      address:res.address
    });

    //上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。
    //最后就是返回上一个页面。
    wx.navigateBack({
      delta: 1 // 返回上一级页面。
    });

  },

	onLoad: function() {
    var that = this;
		wx.chooseLocation({
			success: function(res) {
        console.log(res);
        that.backPage(res);
			}
    });
	}
});
