//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '修改姓名'
  },

  modifyName: function (e) {
    var inputName = e.detail.value.name;
 
    if (inputName == '') {
      wx.showModal({
        content: '请输入姓名',
        showCancel: false,
        confirmText: '确定'
      })
    } else {

      wx.request({
        url: 'https://api.yuyue58.cn/api/editMemberMessage',
        method: "POST",

        data: {
          id: 'a4b618628dfc466b81f02e8dd5f1dede',
          Name: inputName
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
