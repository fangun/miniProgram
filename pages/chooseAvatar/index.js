//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    pageTitle: '选择头像',
    avatarList: [
      { 'src': '../../resource/images/personalDetails/013.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/023.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/033.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/043.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/053.png', 'active': false }
    ]
  },

  modifyAvatar: function () {
    wx.showToast({
      title: '修改成功'
    });
  },

  chooseAvatar: function (e) {
    var seq = e.target.dataset.id;
    var newAl = this.data.avatarList;

    newAl.forEach(function (x, y, z) {
      z[y].active = seq == y ? true : false;
    });

    this.setData({
      avatarList: newAl
    });
  },

  onLoad: function () {

  }

})
