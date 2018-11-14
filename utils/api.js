const API = {

  customEntrance: {
    getHotData: 'https://api.yuyue58.cn/api/hot',
    getCompletingData: 'https://api.yuyue58.cn/api/InCompleteOrderList',
    delBooking: 'https://api.yuyue58.cn/api/DelBooking',
    getCompletedData: 'https://api.yuyue58.cn/api/completeOrder',
    cancleFamiliarShop: 'https://api.yuyue58.cn/api/DelBookingShop',
    wxLogin: 'https://api.yuyue58.cn/api/wxLogin',
    userInfoRegister:'https://api.yuyue58.cn/api/userInfo'
  },

  searchStore: {
    search: 'https://api.yuyue58.cn/api/searchShops'
  },

  addAppointment: {
    manualInput: 'https://api.yuyue58.cn/api/ManualInput',
    ManualEdit:'https://api.yuyue58.cn/api/ManualEdit'
  },

  personalDetails:{
    memberMessage:'https://api.yuyue58.cn/api/memberMessage'
  }
}

module.exports = API;
