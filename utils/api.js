const searchStore =  {
  search:'https://api.yuyue58.cn/api/searchShops'
}

const customEntrance =  {
  getHotData:'https://api.yuyue58.cn/api/hot',
  getCompletingData:'https://api.yuyue58.cn/api/InCompleteOrderList',
  DelBooking:'https://api.yuyue58.cn/api/DelBooking',
  getCompletedData:'https://api.yuyue58.cn/api/completeOrder',
  cancleFamiliarShop:'https://api.yuyue58.cn/api/DelBookingShop'
}

const miniProgramGoto = function(sid,mid,mobile){
  console.log(sid);
  console.log(mid);
  console.log(mobile);
  wx.navigateToMiniProgram({
    appId: 'wxb1881cff7fde6cf6',
    path: 'pages/storeHead/index',
    extraData: {
      'type':'miniappGo',
      'sid':sid,
      'mid':mid,
      'mobile':mobile
    },
    envVersion: 'trial',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
}

module.exports = {
  searchStore: searchStore,
  customEntrance:customEntrance,
  miniProgramGoto:miniProgramGoto
}
