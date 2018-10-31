// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */ 
  properties: {
    modalData: { // 属性名
      type: Object,  
      value: {},
      observer: function (newVal, oldVal, changedPath) {
				if(newVal.header!=undefined){
					let modalData = newVal;

					//1.处理不足四个字的 项目名称
					for (let i = 0; i < modalData.list.length; i++) {
						if (modalData.list[i].entry.length != 4) {
							let newText = modalData.list[i].entry;
							let newTextArr = newText.split("");
							newText = newTextArr[0] + "　　" + newTextArr[1];
							modalData.list[i].entry = newText;
						}
					}

					
					this.setData({
						modalData: modalData
					})
				}
      }
    }
  },

	//灰字24rpx

  /**
   * 组件的初始数据
   */
  data: {
		modalShow:true
  },

	ready(){

	},

  /**
   * 组件的方法列表
   */
  methods: {
		closeModal(){
			this.setData({
				modalShow:false
			})
		}
  }
})
