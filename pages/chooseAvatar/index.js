//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    pageTitle: '选择头像',
    avatarList: null,
    avatarList_b: [
      { 'src': '../../resource/images/personalDetails/013.png', 'key': 'cboyhead1.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/023.png', 'key': 'cboyhead3.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/033.png', 'key': 'cboyhead2.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/043.png', 'key': 'cboyhead4.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/053.png', 'key': 'cboyhead5.png', 'active': false }
    ],
    avatarList_g: [
      { 'src': '../../resource/images/personalDetails/113.png', 'key': 'chead1.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/123.png', 'key': 'chead2.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/133.png', 'key': 'chead3.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/143.png', 'key': 'chead4.png', 'active': false },
      { 'src': '../../resource/images/personalDetails/153.png', 'key': 'chead5.png', 'active': false }
    ],
    avtarSeq: null,
    modifyAvatar:true
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

  modifyAvatar: function (e) {
    var that = this;
    var seq = e.currentTarget.dataset.id;

    if (seq == null) {
      // wx.showModal({
      //   content: '请选择头像',
      //   showCancel: false,
      //   confirmText: '确定'
      // })
      // 返回上一页
      var pageInn = getCurrentPages();
      wx.navigateBack({
        delta: pageInn.length - 1
      })
    } else {
      var modifyAvatar = that.data.modifyAvatar;
      if(modifyAvatar){
        that.setData({
          modifyAvatar: false
        });
        wx.request({
          url: 'https://api.yuyue58.cn/api/editMemberMessage',
          method: "POST",
          data: {
            id: app.globalData.peopleInfo.mid,
            HeadPhoto: that.data.avatarList[seq].key
          },
          header: { "content-type": "application/x-www-form-urlencoded" },
          success(res) {
            wx.showToast({
              title: '修改成功',
              success: function () {
                setTimeout(function () {
                  // 返回上一页
                  var pageInn = getCurrentPages();
                  wx.navigateBack({
                    delta: pageInn.length - 1
                  })
                }, 1600);
              }
            });
          },
          fail(){
            that.setData({
              modifyAvatar: true
            });
          }
        });
      }

    }
  },

  onLoad: function () {
    var value;
    if (app.globalData.sex == 0) {
      value = this.data.avatarList_b;
    } else {
      value = this.data.avatarList_g;
    }

    value.forEach(function (x, y) {
      if (x.key == app.globalData.headPhoto) {
        x.active = true;
      }
    });

    this.setData({
      avatarList: value
    });
  }

})
