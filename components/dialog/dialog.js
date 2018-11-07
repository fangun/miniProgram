// components/dialog/dialog.js
/*
*modalData
	2 header
		2.1 title:object	标题
				2.1.1 text:string 提示框的标题
				2.1.2 border_b:int 0/1 提示框的标题 下方 是否有横隔线
		2.2 headImageSrc:string 头像的地址
		2.3 headName:string 头像的名字
	3 list:array
		ex：{ 'entry': "服务项目", "value": [{ "v": "洗吹", "vClass": "black" }], "end": "1" },
		3.1 entry:string 列表的左侧
		3.2 value:array 列表右侧的值
				ex:{ "v": "洗吹", "vClass": "black" }
				3.2.1 v:string 值
				3.2.2 vClass:string 该值的样式名
		3.3	end:int 0/1 是否有大间隔
	4 listEntryColor:string 列表名的颜色
	5 text:array	提示类弹窗的文字内容
	6 remind:string 按钮上方的提示性文字
	7 btns:array 一个或两个按钮
		ex:{ "name": "确定", "type": "action", "event": "testEvent" }
		7.1 name:string 按钮文字
		7.2 type:string action/close 按钮事件类型：事件名/关闭弹窗
		7.3 event:string action按钮的事件名
	8 "BtnLong":string 单按钮的长度
*/
Component({
  /**
   * 组件的属性列表
   */ 
  properties: {
    modalData: { // 属性名
      type: Object,  
      value: {
				"header": {
					"title": { "text": "标题尚未填写", "border-b": "0" }
				},
				"list":[],
				//"text":[],
				"listEntryColor": "rgb(152,152,152)",
				"btns":[]

			},
      observer: function (newVal, oldVal, changedPath) {
				if(newVal.header!=undefined){
					let modalData = newVal;

					//1.处理不足四个字的 项目名称
					if (modalData.list!=undefined){
						for (let i = 0; i < modalData.list.length; i++) {
							if (modalData.list[i].entry.length != 4) {
								let newText = modalData.list[i].entry;
								let newTextArr = newText.split("");
								newText = newTextArr[0] + "　　" + newTextArr[1];
								modalData.list[i].entry = newText;
							}
						}
					}
					

					//2.默认颜色
					if(modalData.mainColor==undefined || modalData.mainColor == ""){
						modalData.mainColor = "rgb(243, 67, 67)"
					}

					
					this.setData({
						modalData: modalData
					})
					console.log("zujian_modalData");
					console.log(this.data.modalData)
				}
      }
    },
		skin:{
			type:String,
			value:"0",
			observer: function (newVal, oldVal, changedPath){
				console.log("skin:"+ newVal)
			}
		}
  },

	//灰字24rpx

  /**
   * 组件的初始数据
   */
  data: {
		skin:""
  },

	ready(){
			console.log(this.data.skin)
			switch (this.data.skin) {
				case "0":
				this.setData({
					"skin":"sRed"
				})
					break;
				case "1":
					this.setData({
						"skin": "sBlack"
					})
					break;
			}
	},

  /**
   * 组件的方法列表
   */
  methods: {
		closeModal(){
			let data = {}
			this.triggerEvent('closeModal',data)
		},
		modalAction(){
			let data = {}
			this.triggerEvent("modalAction",data)
		}
  }
})
