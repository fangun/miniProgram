//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '修改密码',
    havePassword: false,
    modifyPassword: true,
    state: false,
    state1: false,
    state2: false
  }, 
  clickFocus:function(e){
    console.log(e);
    var state = e.currentTarget.dataset.focus;

    if(state == 'state'){
      this.setData({
        state: true
      });
    } else if(state == 'state1') {
      this.setData({
        state1: true
      });
    } else {
      this.setData({
        state2: true
      });
    }
  },

  modifyPassword: function (e) {
    console.log(e);
    var that = this;
    var op = e.detail.value.oPassword;
    var np = e.detail.value.nPassword;
    var sp = e.detail.value.sPassword;
    if (op == '' || np == '' || sp == '') {
      wx.showModal({
        content: '请输入完整',
        showCancel: false,
        confirmText: '确定'
      })
    } else if (op !== app.globalData.havePassword) {
      wx.showToast({
        title: '原密码错误',
        image:'../../resource/images/common/cross.png',
        success: function () { }
      });
    } else if (np !== sp) {
      wx.showModal({
        content: '新密码不一致',
        showCancel: false,
        confirmText: '确定'
      })
    } else {

      that.setData({
        modifyPassword: false
      });

      wx.request({
        url: 'https://api.yuyue58.cn/api/editMemberMessage',
        method: "POST",
        data: {
          id: app.globalData.peopleInfo.mid,
          Password: np
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
        fail() {
          that.setData({
            modifyPassword: true
          });
        }
      });

    }

  },

  onLoad: function () {
    this.setData({
      havePassword: app.globalData.havePassword
    });
  }

})
