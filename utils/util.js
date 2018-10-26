const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-');
}

const getDateDimdd = function (prevDate, nextDate) {
  var pdMs = new Date(prevDate).valueOf(),
    ndMs = new Date(nextDate).valueOf();
  return Math.floor((ndMs - pdMs) / (24 * 60 * 60 * 1000));
}

const uniqArray = (array) => [...new Set(array)]

const getFormatDate = function (par) {
  var currentDate = par ? new Date(par) : new Date(),
    curYear = currentDate.getFullYear(),
    curMonth = currentDate.getMonth() + 1,
    curDate = currentDate.getDate();

  curMonth = curMonth > 9 ? curMonth : "0" + curMonth;
  curDate = curDate > 9 ? curDate : "0" + curDate;
  // 兼容ios
  return curYear + "-" + curMonth + "-" + curDate;
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getDateDimdd: getDateDimdd,
  uniqArray: uniqArray,
  getFormatDate: getFormatDate
}
