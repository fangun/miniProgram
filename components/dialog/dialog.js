// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */ 
  properties: {
    modalData: { // 属性名
      type: Array, 
      value: {
        "title":"服务费用说明",
        "headImage":"",
        "headName":"新大地发艺",
        "list": [
          { 'item': "店家", "value": [{ "v": "翻滚美发" }, { "vClass": "black" }] },
          { 'item': "服务人员", "value": [{ "v": "梁汉妮" }, { "vClass": "black" }] },
          { 'item': "服务项目", "value": [{ "v": "洗吹" }, { "vClass": "black" }] },
          {
            'item': "服务时间", "value": [{ "v": "2018-09-22", "vClass": "red" },
            { "v": "19:00-19:30", "vClass": "red" }]
          },
          {
            'item': "共需订金", "value": [{ "v": "0.00", "vClass": "red" },
            { "v": "元", "vClass": "black" }]
          }
        ],
        "remind":"该商家有权经双方协商后取消此笔订单",
        "btns": [{ "name": "返回", "type": "close", "event": "testEvent"},
                  { "name": "确定", "type": "action", "event": "testEvent"}
        ]
      },
      observer: function (newVal, oldVal, changedPath) {
        
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
