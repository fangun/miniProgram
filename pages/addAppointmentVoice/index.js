//index.js
//获取应用实例
const app = getApp();

const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();

Page({
	
	data: {
		pageTitle: '添加预约'
	},

	appointmentByHand: function() {
		wx.redirectTo({ url: '../addAppointmentHand/index' });
	},

	customPage: function() {
		wx.redirectTo({ url: '../customEntrance/index' });
	},

	minePage: function() {
		wx.redirectTo({ url: '../personalDetails/index' });
	},

	// 提示
	start: function() {

		wx.showModal({
			title: '',
			content: '暂未上线,请选择手动输入！',
			showCancel: false,
			confirmText: '知道了',
			success(res) {
				if (res.confirm) {
					console.log('用户点击确定');
					wx.navigateTo({ url: '../addAppointmentHand/index' });
				  } else if (res.cancel) {
					console.log('用户点击取消');
				  }
			}
		});

		// const options = {
		// 	duration: 10000, //指定录音的时长，单位 ms
		// 	sampleRate: 16000, //采样率
		// 	numberOfChannels: 1, //录音通道数
		// 	encodeBitRate: 96000, //编码码率
		// 	format: 'mp3', //音频格式，有效值 aac/mp3
		// 	frameSize: 50 //指定帧大小，单位 KB
		// };

		// //开始录音
		// recorderManager.start(options);
		// recorderManager.onStart(() => {
		// 	console.log('recorder start');
		// });

		// //错误回调
		// recorderManager.onError((res) => {
		// 	console.log(res);
		// });
	},

	stop: function() {
		recorderManager.stop();
		recorderManager.onStop((res) => {
			console.log('停止录音');
			console.log(res);
			let { tempFilePath } = res;
			wx.uploadFile({
				url: 'https://www.kunqu.tech/smart_order',
				method: 'post',
				filePath: tempFilePath,
				name: 'wx_record',
				success(ret) {
					console.log(ret);
					var dataObj = JSON.parse(ret.data);
					var words;
					if(ret.statusCode == 200 && typeof ret.data == 'object') {
						words = dataObj.text;
					} else {
						words = '语音识别为空！';
					};

					wx.showModal({
						title: '添加预约',
						content: words,
						success(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});

				}
			});
		});
	},

	longTap: function() {
		console.log('longTap....');
	},

	touchStart: function() {
		console.log('touchStart....');
		this.start();
	},

	touchEnd: function() {
		console.log('touchEnd....');
		this.stop();
	},

	onLoad: function() {}
});
