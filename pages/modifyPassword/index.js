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
          id: 'a4b618628dfc466b81f02e8dd5f1dede',
          Password: np
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
