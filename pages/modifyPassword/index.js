//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '修改密码'
  },

  modifyPassword: function (e) {

    console.log(e);
    var op = e.detail.value.oPassword;
    var np = e.detail.value.nPassword;
    var sp = e.detail.value.sPassword;


    if (op == '' || np == '' || sp == '') {
      wx.showModal({
        content: '请输入完整',
        showCancel: false,
        confirmText: '确定'
      })
    } else if (np !== sp) {
      wx.showModal({
        content: '新密码不一致',
        showCancel: false,
        confirmText: '确定'
      })
    } else {

      wx.request({
        url: 'https://api.yuyue58.cn/api/editMemberMessage',
        method: "POST",
        data: {
          id: app.globalData.coreInfo.mid,
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
        }
      });

    }

  },

  onLoad: function () {

  }

})
