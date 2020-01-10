export default {
	/**
	 * 把字符串的中间部分用*替换
	 * @param {Object} data
	 * @param {Object} prefix  前端保留原样的长度
	 * @param {Object} suffix  后端保留原样的长度
	 */
	encryption (data, prefix, suffix) {
		if (!data) {
			return ""
		}
		let len = data.length
		if (len < (prefix + suffix)) {
			return data
		}
		let result = data.substr(0,prefix)
		while (result.length < len - suffix) {
			result += "*"
		} 
		return result + data.substr(len-suffix, suffix) // 因为这里起始从0开始，所以是3
	},
	/**
	 *  把date对象转化成字符串
	 * @param {Object} fmt
	 * @param {Object} date 时间对象
	 */
	dateFormat (fmt, date) { // author: meizz
	  if (date === null || date === undefined) {
		return null
	  }
	  if (typeof (date) === 'string') {
		return date
	  }
	  let o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		'S': date.getMilliseconds() // 毫秒
	  }
	  if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	  }
	  for (let k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
		  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	  }
	  return fmt
	},
	/**
	 * 把时分秒字符串 hh:mm:ss 转成当天的date对象
	 * @param {Object} now
	 * @param {Object} time
	 */
	timeToDate(now, time) {
		let timeArr = time.split(':')
		return new Date(now.getFullYear(), now.getMonth(), now.getDate(), timeArr[0], timeArr[1], timeArr[2], 0);
	},
	/**
	 * 获取时间的时段,并返回AM 或者 PM
	 * @param {Object} timeStr
	 */
	getDateArea(timeStr) {
		return typeof timeStr ? (parseInt(timeStr.substring(0, timeStr.indexOf(':'))) <= 12 ? ' AM' : ' PM') : ''
	}
}
