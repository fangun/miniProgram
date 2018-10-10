//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    apiPrefix: 'https://www.yuyue58.cn/fileImage/',
    pageTitle: '预约吧',
    hotlistTitle: {
      'c': '我的预约热榜',
      'e': 'Appointment Trending'
    },
    diaryTitle: {
      'c': '我的预约日记',
      'e': 'Appointment Book'
    },

    hostListData: [
      {
        "name": "预约吧Family",
        "sid": "d03c4a737be3462ba6218a6b494dafb7",
        "pca": "上海市-上海市-黄浦区",
        "count": 46,
        "address": "上海市黄浦区蒙自路",
        "logo": "20180504105256.jpg"
      },
      {
        "name": "翻滚律师事务所",
        "sid": "aa2af16f3ef241d09d8f0dcba937fb09",
        "pca": "上海市-上海市-黄浦区",
        "count": 13,
        "address": "水城路万科南楼17号",
        "logo": "20180330095804.jpg"
      },
      {
        "name": "兴旺台球",
        "sid": "40fde5448673476cbbab8ad9cebf114c",
        "pca": "上海市-市辖区-普陀区",
        "count": 6,
        "address": "1023弄",
        "logo": ""
      },
      {
        "name": "翻滚美发",
        "sid": "5bc9ea257d7548f3b7dcd22a95d9fe2f",
        "pca": "上海市-市辖区-长宁区",
        "count": 4,
        "address": "水城南路17号1002室",
        "logo": "20171229162227.jpg"
      },
      {
        "name": "翻滚美术",
        "sid": "56327a2f0f164a59b9eff195ba4a4d15",
        "pca": "上海市-上海市-普陀区",
        "count": 4,
        "address": "桃浦六村",
        "logo": "20180905083740.jpg"
      },
      {
        "name": "上海翻滚面试专区",
        "sid": "9dd68790e1f1434787bc08a2c8a2e578",
        "pca": "上海市-上海市-黄浦区",
        "count": 2,
        "address": "蒙自路223号2楼218室",
        "logo": "20180423154001.jpg"
      },
      {
        "name": "武夷山大王峰国际青旅",
        "sid": "3fd07e7a6dcc404c902a2ccff493aded",
        "pca": "上海市-上海市-长宁区",
        "count": 1,
        "address": "水城南路17号",
        "logo": "20171125202418.jpg"
      },
      {
        "name": "禅医精舍",
        "sid": "bc68714979764bc5a961f24c8c441529",
        "pca": "北京市-市辖区-朝阳区",
        "count": 1,
        "address": "欧陆大厦A座2303",
        "logo": "20180627103538.jpg"
      },
      {
        "name": "造型美发",
        "sid": "388b2089c199492e86924d22d322f840",
        "pca": "上海市-市辖区-黄浦区",
        "count": 1,
        "address": "xxx路xx弄xx号",
        "logo": "20170512092943260.JPG"
      },
      {
        "name": "水果店铺",
        "sid": "6e26c148d6004f38aef506aed612a410",
        "pca": "上海市-市辖区-浦东新区",
        "count": 1,
        "address": "东方路2980号",
        "logo": null
      },
      {
        "name": "翻滚驾校",
        "sid": "abddd4d74602414490ed2d9f27d5df6f",
        "pca": "上海市-市辖区-黄浦区",
        "count": 1,
        "address": "蒙自路223号",
        "logo": "20180527110141.jpg"
      },
      {
        "name": "罗朵云",
        "sid": "f8a1b5e38e1b42ee8aa0542845125a1b",
        "pca": "上海市-市辖区-徐汇区",
        "count": 1,
        "address": "水城路",
        "logo": null
      },
      {
        "name": "聂的店",
        "sid": "66c3b14635da4ad8bb73829b60c6ee99",
        "pca": "上海市-市辖区-浦东新区",
        "count": 1,
        "address": "聂的店的地址",
        "logo": "20181008111109.jpg"
      },
      {
        "name": "曲微茫",
        "sid": "54808704e7064f3cbd0b991694123a55",
        "pca": "上海市-市辖区-宝山区",
        "count": 1,
        "address": "虹口",
        "logo": "20181008111030.jpg"
      }
    ],

    tabState: 'doing',
    tabContentShow: 0
  },

  selectDoing: function (e) {
    this.setData({
      tabState: e.currentTarget.dataset.id,
      tabContentShow: 0
    })
  },

  selectDone: function (e) {
    this.setData({
      tabState: e.currentTarget.dataset.id,
      tabContentShow: '-100%'
    })
  },

  onLoad: function () {
    var that = this;

    wx.request({
      url: 'https://api.yuyue58.cn/api/hot',
      method:"POST",
      data: {
        ID: 'dabc5bf90a9145fbb06467e648286b5f'
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success(res) {
        console.log(res.data)
      }
    });

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }

  }

})