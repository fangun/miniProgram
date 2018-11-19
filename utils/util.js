const formatTime = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return (
		[ year, month, day ].map(formatNumber).join('/') + ' ' + [ hour, minute, second ].map(formatNumber).join(':')
	);
};

const formatNumber = (n) => {
	n = n.toString();
	return n[1] ? n : '0' + n;
};

const formatDate = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return [ year, month, day ].map(formatNumber).join('-');
};

const uniqArray = (array) => [ ...new Set(array) ];

const getFormatDate = function(par) {
	var currentDate = par ? new Date(par) : new Date(),
		curYear = currentDate.getFullYear(),
		curMonth = currentDate.getMonth() + 1,
		curDate = currentDate.getDate();

	curMonth = curMonth > 9 ? curMonth : '0' + curMonth;
	curDate = curDate > 9 ? curDate : '0' + curDate;
	// 兼容ios
	return curYear + '-' + curMonth + '-' + curDate;
};

// 逻辑:根据两个日期获取它们天数差
// 参数:prevDate nextDate
// 例子:getDateDimDd("2018-03-12","2018-03-14") => 2
// 作者:ydlx
// 日期:2018-11-06
const getDateDimdd = function(prevDate, nextDate) {
	var pdMs = new Date(prevDate).valueOf(),
		ndMs = new Date(nextDate).valueOf();
	return Math.floor((ndMs - pdMs) / (24 * 60 * 60 * 1000));
};

// 逻辑:根据两个日期获取它们天数差
// 参数:dayValue
// 例子:getWeekByDay("2018-11-11")
// 作者:ydlx
// 日期:2018-11-11
const getWeekByDay = function(dayValue) {
	var day = new Date(Date.parse(dayValue.replace(/-/g, '/')));
	var today = new Array('日', '一', '二', '三', '四', '五', '六');
	return today[day.getDay()]; //返一个星期中的某一天，其中0为星期日
};

module.exports = {
	formatTime: formatTime,
	formatDate: formatDate,
	getDateDimdd: getDateDimdd,
	uniqArray: uniqArray,
	getFormatDate: getFormatDate,
	getDateDimdd: getDateDimdd,
	getWeekByDay: getWeekByDay
};
