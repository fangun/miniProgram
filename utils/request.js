const REQUEST = {
  POST: function (url, data, callback) {
    wx.request({
      url: url,
      method: "POST",
      data: data,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        callback(res);
      },
      fail: function (res) {
        callback(res);
      }
    });
  }


}

module.exports = REQUEST;
