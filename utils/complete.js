var util = require('./util.js');

const completing = (data) => {
	var tagArray = [];
	var itemArray = [];

	// var ctagArray = [];
	var timeArray = [];

	data.forEach(function(x, y, z) {
		var tag = x.time.slice(0, x.time.indexOf(' '));
		tagArray.push(tag);
	});

	data.forEach(function(x, y, z) {
		var t1 = x.time.slice(x.time.indexOf(' ') + 1).split(':');
		var t2 = x.time1.slice(x.time1.indexOf(' ') + 1).split(':');
		timeArray.push(t1[0] + ':' + t1[1] + '-' + t2[0] + ':' + t2[1]);
	});

	var tag;
	var a = [];
	tagArray.forEach(function(x, y, z) {
		if (!tag) {
			tag = x;
		}

		if (tag == x) {
			a.push(y);
		} else {
			itemArray.push(a);
			a = [];
			tag = x;

			a.push(y);
		}

		if (tagArray.length - 1 == y) {
			itemArray.push(a);
		}
	});

	var titleA = util.uniqArray(tagArray);
	var today = util.formatDate(new Date());

	var titleB = [];
	titleA.forEach(function(x, y, z) {
		var diff = util.getDateDimdd(today, x);
		var arry = x.split('-');
		var week = util.getWeekByDay(x);
		if (diff == 0) {
			titleB.push({
				rq: arry[1] + '/' + arry[2],
				week: '(' + week + ')',
				bd: '今天'
			});
		} else {
			titleB.push({
				rq: arry[1] + '/' + arry[2],
				week: '(' + week + ')',
				bd:  diff + '天后'
			});
		}
	});

	return { titleA: titleA, titleB: titleB, itemArray: itemArray, timeArray: timeArray };
};

module.exports = {
	completing: completing
};
