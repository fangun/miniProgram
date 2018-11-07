// components/calendar/calendar.js
Component({
    /**
     * 组件的属性列表
     */
	properties: {
		skin: {
			type: String,
			value: "0",
			observer: function (newVal, oldVal, changedPath) {
				console.log("日历skin:" + newVal)
			}
		},

		currentYear: { // 当前显示的年
			type: Number,
			value: new Date().getFullYear(),
      observer: function (newVal, oldVal, changedPath) {
      }
		},

		currentMonth: { // // 当前显示的月
			type: Number,
			value: new Date().getMonth() + 1,
      observer: function (newVal, oldVal, changedPath) {
      }
		},

    disabledDay:{
      type:Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        //选人后，disabledDay相应改变，生成allArr
        this.getAllArr()
        console.log(this.data.disabledDay)
      }
		},
		
    selectDay:{
      type:String,
      value:"",
      observer: function (newVal, oldVal, changedPath) {
        console.log(newVal)
        this.setData({
          selectDay:newVal
        })
        
      }
		},
		
    peopleActivityDay:{
      type:Array,
      value:[],
      observer: function (newVal, oldVal, changedPath) {
        console.log(newVal)
      }
		}
		
	},

    /**
     * 组件的初始数据
     */
	data: {
		currentMonthDateLen: 0, // 当月天数
		preMonthDateLen: 0, // 当月中，上月多余天数
		allArr:[], // 当月所有数据
    //test:"test2"
    disabledDay:[],
    today:"",  //xxxx-xx-xx
    selectDay:"",
    todayDay:'', //今天几号
    nowMonth: new Date().getMonth() + 1,
    yearmonthStart:0,
    yearmonthEnd:0,
    preShow:true,
    nextShow:true,

		skin: ""
	},
	ready(){
		console.log(this.data.skin)
		switch (this.data.skin) {
			case "0":
				this.setData({
					"skin": "sRed"
				})
				break;
			case "1":
				this.setData({
					"skin": "sBlack"
				})
				break;
		}

		this.getAllArr();

    // this.gotoNextMonth();
    // this.gotoNextMonth()
    let selD = this.data.selectDay;
    console.log(selD);
    let selMonth = parseInt(selD.split("-")[1]);
    let selYear = parseInt(selD.split("-")[0]);
    let nowMonth = parseInt(this.data.currentMonth);
    let nowyear = parseInt(this.data.currentYear);

    let spanMonth = (selYear - nowyear)*12+selMonth-nowMonth;  //需要向后跳一个月 跳几下
    for(let i=0;i<spanMonth;i++){
      this.gotoNextMonth()
    }
	},

    /**
     * 组件的方法列表
     */
	methods: {
		// 获取某年某月总共多少天
		getDateLen(year, month) { 
			let actualMonth = month - 1;
			let timeDistance = +new Date(year, month) - +new Date(year, actualMonth);
			return timeDistance / (1000 * 60 * 60 * 24);
		},
		// 获取某月1号是周几
		getFirstDateWeek(year, month) { 
			return new Date(year, month - 1, 1).getDay()
		},
		// 上月 年、月
		preMonth(year, month) { 
			if (month == 1) {
				return {
					year: --year,
					month: 12
				}
			} else {
				return {
					year: year,
					month: --month
				}
			}
		},
		// 下月 年、月
		nextMonth(year, month) { 
			if (month == 12) {
				return {
					year: ++year,
					month: 1
				}
			} else {
				return {
					year: year,
					month: ++month
				}
			}
		},
		// 获取当月数据，返回数组
		getCurrentArr(){ 
			let currentMonthDateLen = this.getDateLen(this.data.currentYear, this.data.currentMonth) // 获取当月天数
			let currentMonthDateArr = []; // 定义空数组
      let peopleActivityDay = this.data.peopleActivityDay.slice(0);  //日历1 可选的 日子
      console.log(peopleActivityDay)
      let disabledDay = this.data.disabledDay.slice(0) //日历1删掉的日  日历2灰色
      if (currentMonthDateLen > 0) {
				for (let i = 1; i <= currentMonthDateLen; i++) {
          let i2 = 0;//i<10的问题
          if(i<10){i2 = "0"+i}else{i2 = i}
          let month2 = this.data.currentMonth;
          if(month2<10){month2 = "0"+month2}
          let dayId = this.data.currentYear + "-" + month2 + "-" + i2;
          // console.log(dayId)
          //判断 activityDay
          let peopleActivity = 0;
          for (let j = 0; j < peopleActivityDay.length;j++){
            if (dayId == peopleActivityDay[j].id){
              peopleActivity = 1;
              // console.log(dayId)
            }
          }

          //判断 disabledDay
          let disable = 0;
          if(peopleActivity==0){
            for (let k = 0; k < disabledDay.length;k++){
              if (dayId == disabledDay[k].id){
                disable = 1;
              }
            }
          }
          

					currentMonthDateArr.push({
						month: 'current', // 只是为了增加标识，区分上下月
            monthNumber:this.data.currentMonth,
						date: i,
            dayId:dayId,
            activity: peopleActivity,
            disabled: disable
					})
        }
			}
      //console.log(this.data.peopleActivityDay)
      //console.log(this.data.disabledDay)
      let today = this.data.currentYear + "-" + this.data.currentMonth + "-" + new Date().getDate();
      let todayDay = new Date().getDate();

      //头年月 尾年月
      let yearmonthStart="";
      let yearmonthEnd="";
      if(peopleActivityDay.length!=0){
        yearmonthStart = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
        yearmonthEnd = {
          month : peopleActivityDay[peopleActivityDay.length-1].date.split("-")[0],
          year: peopleActivityDay[peopleActivityDay.length - 1].year
        }
      }
      
			this.setData({
				currentMonthDateLen,
        today:today,
        todayDay,
        yearmonthStart: yearmonthStart,
        yearmonthEnd: yearmonthEnd
			})
      

			return currentMonthDateArr
		},
		// 获取当月中，上月多余数据，返回数组
		getPreArr(){ 
			let preMonthDateLen = this.getFirstDateWeek(this.data.currentYear, this.data.currentMonth) // 当月1号是周几 == 上月残余天数）
            let preMonthDateArr = [] // 定义空数组
			if (preMonthDateLen > 0) {
				let { year, month } = this.preMonth(this.data.currentYear, this.data.currentMonth) // 获取上月 年、月
				let date = this.getDateLen(year, month) // 获取上月天数
				for (let i = 0; i < preMonthDateLen; i++) {
					preMonthDateArr.unshift({ // 尾部追加
            month: 'pre', // 只是为了增加标识，区分当、下月
						date: date
					})
					date--
				}
			}
			this.setData({
				preMonthDateLen
			})
			return preMonthDateArr
		},
		// 获取当月中，下月多余数据，返回数组
		getNextArr() { 
			let nextMonthDateLen = 42 - this.data.preMonthDateLen - this.data.currentMonthDateLen // 下月多余天数
			let nextMonthDateArr = [] // 定义空数组
			if (nextMonthDateLen > 0) {
				for (let i = 1; i <= nextMonthDateLen; i++) {
					nextMonthDateArr.push({
            month: 'next',// 只是为了增加标识，区分当、上月
						date: i
					})
				}
			}
			return nextMonthDateArr
		},
		// 整合当月所有数据
		getAllArr(){ 
			let preArr = this.getPreArr()
			let currentArr = this.getCurrentArr()
			let nextArr = this.getNextArr()
			let allArr = [...preArr, ...currentArr, ...nextArr]
      let selectDay
			this.setData({
				allArr
			})
      console.log(this.data.allArr)
			let sendObj = {
				currentYear: this.data.currentYear,
				currentMonth: this.data.currentMonth,
				allArr: allArr
			}


      let activityDay = this.data.peopleActivityDay;
      let firstDayM = activityDay[0].date.split("-")[0]                     //能选的最早的月
      let firstDayY = activityDay[0].year                                   //能选的最早的年
      let lastDayM = activityDay[activityDay.length-1].date.split("-")[0];  //能选的最晚的月
      let lastDayY = activityDay[activityDay.length - 1].year;              //能选的最晚的年

      // console.log(this.data.currentMonth) //当前日历 显示页 的 月份
      // console.log(this.data.currentYear)

      if (this.data.currentMonth == firstDayM && this.data.currentYear == firstDayY){
        this.setData({
          preShow:false
        })
      }else{
        this.setData({
          preShow: true
        })
      }
      if (this.data.currentMonth == lastDayM && this.data.currentYear == lastDayY){
        this.setData({
          nextShow:false
        })
      }else{
        this.setData({
          nextShow: true
        })
      }

			// console.log(sendObj)
			this.triggerEvent('sendObj', sendObj)
		},
		// 点击 上月
		gotoPreMonth(){ 
			let { year, month } = this.preMonth(this.data.currentYear, this.data.currentMonth)
			this.setData({
				currentYear: year,
				currentMonth: month
			})
			this.getAllArr()
		},
		// 点击 下月
		gotoNextMonth() { 
			let { year, month } = this.nextMonth(this.data.currentYear, this.data.currentMonth)
			this.setData({
				currentYear: year,
				currentMonth: month
			})
			this.getAllArr()
		},

    //点击某天
    selectDate(e){
      console.log(e);
      
      let select = e.currentTarget.dataset;
      let date = select.date;
      if(date<10){date = "0"+date}
      let month = select.cumonth;
      if(month<10){month = "0" + month}

      let day = select.year + "-" + month + "-" +date;
      console.log(day)
      this.triggerEvent('myevent', { selectDay: day });
    },

    selectRestDay(e) {
      this.triggerEvent('selectRestDay',{data:"data"})
    }
	}
})