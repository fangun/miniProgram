//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '搜索',
    storeList: [
      {
        "ID": "03a2723b1d5e4b81981bec21ac82e034",
        "Name": "预约吧设计师",
        "Logo": "20170626091539.jpg",
        "PCA": "上海市-市辖区-长宁区",
        "Address": "水城南路17号万科南楼1002",
        "vip": 0,
        "starttime": null,
        "stoptime": null,
        "svip": 0
      },
      {
        "ID": "1d872a887fd7422a95a62c29eedc187d",
        "Name": "我爱我家实堪预约",
        "Logo": null,
        "PCA": "河南省-郑州市-金水区",
        "Address": "花园路与东风路我爱我家",
        "vip": 0,
        "starttime": null,
        "stoptime": null,
        "svip": 0
      },
      {
        "ID": "1f38f3ca484d4b878ba48e99338b2d49",
        "Name": "猎宝网会议室预约",
        "Logo": null,
        "PCA": "江苏省-南京市-玄武区",
        "Address": "玄武大道699-8号研发一区2栋2层",
        "vip": 0,
        "starttime": null,
        "stoptime": null,
        "svip": 0
      }],

      showList:true
  },

  onLoad: function () {

  }

})
