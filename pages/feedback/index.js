//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '意见反馈'
  },

  feedback: function(e) {
    var Content = e.detail.value.Content;
    var Contact = e.detail.value.Contact;
    if (!Content || Content == '') {
          wx.showToast({
            title: '请填写反馈内容',
            icon:'none',
            success: function() {
            }
          });
    } else {
      wx.request({
        url: 'https://api.yuyue58.cn/api/ProblemFeedback',
        method: "POST",
        data: {
          Page: 'pages/feedback/index',
          Content: Content,
          Contact: Contact,
          mid: app.globalData.peopleInfo.mid,
          title: '用户反馈'
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          wx.showToast({
            title: '提交成功',
            success: function() {
              setTimeout(function() {
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

  onLoad: function() {}

})