const API = {
  // 首页
  customEntrance: {
    getHotData: 'https://api.yuyue58.cn/api/hot',
    getCompletingData: 'https://api.yuyue58.cn/api/InCompleteOrderList',
    delBooking: 'https://api.yuyue58.cn/api/DelBooking',
    getCompletedData: 'https://api.yuyue58.cn/api/completeOrder',
    cancleFamiliarShop: 'https://api.yuyue58.cn/api/DelBookingShop',
    wxLogin: 'https://api.yuyue58.cn/api/wxLogin',
    userInfoRegister:'https://api.yuyue58.cn/api/userInfo'
  },

  // 搜索页
  searchStore: {
    search: 'https://api.yuyue58.cn/api/searchShops'
  },

  // 手动添加预约页
  addAppointment: {
    manualInput: 'https://api.yuyue58.cn/api/ManualInput',
    ManualEdit:'https://api.yuyue58.cn/api/ManualEdit'
  },

  // 个人中心页
  personalDetails:{
    memberMessage:'https://api.yuyue58.cn/api/memberMessage'
  },

  // 手机账号登录页
  accountLogin:{
    passwordLogin:'https://api.yuyue58.cn/api/passwordLogin'
  }

}

module.exports = API;
