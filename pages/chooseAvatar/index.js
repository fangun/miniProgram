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
    ],
    avtarSeq: null

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
      avatarList: newAl,
      avtarSeq: seq
    });
  },

  modifyAvatar:function(e){
    var that = this;
    var seq = e.currentTarget.dataset.id;
    
    console.log(seq);
    console.log(that.data.avatarList[seq].src);
    if (seq == null) {
      wx.showModal({
        content: '请选择头像',
        showCancel: false,
        confirmText: '确定'
      })
    } else {
      wx.request({
        url: 'https://api.yuyue58.cn/api/editMemberMessage',
        method: "POST",
        data: {
          id: 'a4b618628dfc466b81f02e8dd5f1dede',
          HeadPhoto: that.data.avatarList[seq].src
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        success(res) {
          console.log(res);

          wx.showToast({
            title: '修改成功'
          });
        }
      });
    }

  },

  onLoad: function () {

  }

})
