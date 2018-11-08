//index.js
//获取应用实例
const app = getApp();

const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()

Page({
	data: {
		pageTitle: '添加预约'
	},

	appointmentByHand: function() {
		wx.navigateTo({ url: '../addAppointmentHand/index' });
	},

	customPage: function() {
		wx.redirectTo({ url: '../customEntrance/index' });
	},

	minePage: function() {
		wx.redirectTo({ url: '../personalDetails/index' });
	},

	// 提示
	voiceTip: function() {
		wx.showModal({
			title: '',
			content: '暂未上线,请选择手动输入！',
			showCancel: false,
			confirmText: '知道了',
			success(res) {}
		});

	// 	const options = {
	// 		duration: 10000, //指定录音的时长，单位 ms
	// 		sampleRate: 16000, //采样率
	// 		numberOfChannels: 1, //录音通道数
	// 		encodeBitRate: 96000, //编码码率
	// 		format: 'mp3', //音频格式，有效值 aac/mp3
	// 		frameSize: 50 //指定帧大小，单位 KB
    // };
    
	// 	//开始录音
	// 	recorderManager.start(options);
	// 	recorderManager.onStart(() => {
	// 		console.log('recorder start');
    // });
    
	// 	//错误回调
	// 	recorderManager.onError((res) => {
	// 		console.log(res);
	// 	});
  },
  
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
			console.log('停止录音');
			console.log(res);
			let { tempFilePath } = res;
			wx.uploadFile({
				url: 'https://api.yuyue58.cn/api/PhoneticTransfer',
				method: "post",
				filePath: tempFilePath,
				name: "wx_record",
				success(ret) {
					console.log(ret);
				}
			})
    })
  },

	onLoad: function() {}
});
