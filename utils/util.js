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

const getDateDimdd = function(prevDate, nextDate) {
  var pdMs = new Date(prevDate).valueOf(),
    ndMs = new Date(nextDate).valueOf();
  return Math.floor((ndMs - pdMs) / (24 * 60 * 60 * 1000));
}

const uniqArray = (array) => [...new Set(array)]

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getDateDimdd:getDateDimdd,
  uniqArray:uniqArray
}
