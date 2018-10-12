//index.js
//获取应用实例
const app = getApp()

Page({
  
  data: {
    pageTitle: '选择头像',
    avatarList:[
      {'src':'../../resource/images/personalDetails/013.png'},
      {'src':'../../resource/images/personalDetails/023.png'},
      {'src':'../../resource/images/personalDetails/033.png'},
      {'src':'../../resource/images/personalDetails/043.png'},
      {'src':'../../resource/images/personalDetails/053.png'}
    ]

  },

  modifyAvatar:function(){

  },

  chooseAvatar:function(e){
      console.log(this);
      console.log(e);
  },

  onLoad: function () {

  }

})
