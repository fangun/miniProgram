//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '修改姓名',
    modifyName:true
  },

  modifyName: function (e) {
    var that = this;
    var inputName = e.detail.value.name;

    if (inputName == '') {
      wx.showModal({
        content: '请输入姓名',
        showCancel: false,
        confirmText: '确定'
      })
    } else {

      that.setData({
        modifyName: false
      });

      wx.request({
        url: 'https://api.yuyue58.cn/api/editMemberMessage',
        method: "POST",

        data: {
          id: app.globalData.peopleInfo.mid,
          Name: inputName
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
          wx.showToast({
            title: '修改失败',
            image:'../../resource/images/common/cross.png'
          });
          that.setData({
            modifyName: true
          });
        }
      });

    }


  },

  onLoad: function () { }

})
